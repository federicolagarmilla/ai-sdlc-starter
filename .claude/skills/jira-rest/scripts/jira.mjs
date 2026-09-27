#!/usr/bin/env node
// Read-only Jira client for the jira-rest skill. No dependencies (Node 20+).
//
//   node jira.mjs get KAN-12            one work item as a markdown dossier
//   node jira.mjs search "project = KAN AND issuetype = Story ORDER BY key"
//
// Credentials come from the environment, never from arguments:
//   JIRA_SITE       your-site.atlassian.net (or a full https:// URL)
//   JIRA_EMAIL      the Atlassian account email       } Jira Cloud: API token, Basic auth
//   JIRA_API_TOKEN  from id.atlassian.com, Security    }
//   JIRA_PAT        Jira Data Center personal access token (Bearer auth, REST API v2)

const [, , command, arg] = process.argv;
const { JIRA_SITE, JIRA_EMAIL, JIRA_API_TOKEN, JIRA_PAT } = process.env;

function fail(message) {
  console.error(`jira-rest: ${message}`);
  process.exit(1);
}

if (!['get', 'search'].includes(command) || !arg) {
  fail('usage: jira.mjs get <KEY> | jira.mjs search "<JQL>"');
}
if (!JIRA_SITE) fail('JIRA_SITE is not set. Copy .env.example to .env and fill it in.');

const base = (JIRA_SITE.startsWith('http') ? JIRA_SITE : `https://${JIRA_SITE}`).replace(/\/+$/, '');
const dataCenter = Boolean(JIRA_PAT);
const api = dataCenter ? `${base}/rest/api/2` : `${base}/rest/api/3`;
let auth;
if (dataCenter) {
  auth = `Bearer ${JIRA_PAT}`;
} else {
  if (!JIRA_EMAIL || !JIRA_API_TOKEN) fail('set JIRA_EMAIL and JIRA_API_TOKEN (Cloud) or JIRA_PAT (Data Center).');
  auth = `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64')}`;
}

async function call(path, init = {}) {
  const res = await fetch(`${api}${path}`, {
    ...init,
    headers: { Authorization: auth, Accept: 'application/json', 'Content-Type': 'application/json' },
  });
  if (res.status === 401 || res.status === 403) {
    fail(`HTTP ${res.status}: the credential was rejected or lacks access. Check the token and the site.`);
  }
  if (res.status === 404) fail('HTTP 404: not found, or not visible to this account.');
  if (!res.ok) fail(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

// Atlassian Document Format (Cloud descriptions and rich-text fields) to plain text.
function adfToText(node, depth = 0) {
  if (node == null) return '';
  if (typeof node === 'string') return node;
  const kids = (node.content ?? []).map((c) => adfToText(c, depth + (node.type?.endsWith('List') ? 1 : 0)));
  switch (node.type) {
    case 'text': return node.text ?? '';
    case 'hardBreak': return '\n';
    case 'paragraph':
    case 'heading': return `${kids.join('')}\n`;
    case 'bulletList': return kids.map((k) => `${'  '.repeat(depth)}- ${k.trim()}\n`).join('');
    case 'orderedList': return kids.map((k, i) => `${'  '.repeat(depth)}${i + 1}. ${k.trim()}\n`).join('');
    case 'codeBlock': return `\`\`\`\n${kids.join('')}\n\`\`\`\n`;
    default: return kids.join('');
  }
}
const asText = (value) => (value && typeof value === 'object' ? adfToText(value) : String(value ?? '')).trim();

async function get(key) {
  if (!/^[A-Z][A-Z0-9_]+-\d+$/.test(key)) fail(`"${key}" is not a work item key like KAN-12.`);
  const issue = await call(`/issue/${encodeURIComponent(key)}?expand=names`);
  const f = issue.fields ?? {};
  const names = issue.names ?? {};
  const acField = Object.keys(names).find((id) => /acceptance criteria/i.test(names[id]));
  const out = [
    `# ${issue.key}: ${f.summary ?? ''}`,
    '',
    `| Field | Value |`,
    `|---|---|`,
    `| Type | ${f.issuetype?.name ?? ''} |`,
    `| Status | ${f.status?.name ?? ''} |`,
    `| Priority | ${f.priority?.name ?? ''} |`,
    `| Parent | ${f.parent ? `${f.parent.key}: ${f.parent.fields?.summary ?? ''}` : ''} |`,
    `| Labels | ${(f.labels ?? []).join(', ')} |`,
    `| Link | ${base}/browse/${issue.key} |`,
    '',
    '## Description',
    '',
    asText(f.description) || '_Empty._',
  ];
  if (acField) out.push('', '## Acceptance criteria', '', asText(f[acField]) || '_Empty._');
  console.log(out.join('\n'));
}

async function search(jql) {
  const fields = ['summary', 'status', 'issuetype'];
  const data = dataCenter
    ? await call(`/search?jql=${encodeURIComponent(jql)}&fields=${fields.join(',')}&maxResults=50`)
    : await call('/search/jql', { method: 'POST', body: JSON.stringify({ jql, fields, maxResults: 50 }) });
  const issues = data.issues ?? [];
  console.log('| Key | Type | Status | Summary |\n|---|---|---|---|');
  for (const i of issues) {
    console.log(`| ${i.key} | ${i.fields?.issuetype?.name ?? ''} | ${i.fields?.status?.name ?? ''} | ${i.fields?.summary ?? ''} |`);
  }
  console.log(`\n${issues.length} work item(s).`);
}

await (command === 'get' ? get(arg) : search(arg));
