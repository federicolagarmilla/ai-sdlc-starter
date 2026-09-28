## Purpose

The Find a Doctor screen lets a patient browse the full Northside provider directory on their
own, with the details they need to choose a doctor, without calling the contact center.

## ADDED Requirements

### Requirement: Full directory listing

The Find a Doctor screen SHALL list every doctor in the provider directory, sorted by last name.
The last name is the last word of the doctor's `name`; the comparison is locale-aware so an
accented letter sorts alongside its unaccented base letter, and ties are broken by the full name.

#### Scenario: Full list sorted by last name

- **WHEN** the patient opens the Find a Doctor screen
- **THEN** every doctor in the provider directory is listed, ordered by last name

#### Scenario: Accented last names sort with their base letter

- **WHEN** the directory contains doctors whose last names include an accented letter (for
  example "Méndez")
- **THEN** those doctors are ordered as if the accent were absent, alongside unaccented names
  that start with the same base letter, rather than sorted after every unaccented name

### Requirement: Doctor details

Each doctor's card SHALL show the doctor's name, specialty, clinic, languages spoken, whether
they accept new patients, and whether they offer telehealth. Every status SHALL be shown as text
(with an icon if used), never by colour alone.

#### Scenario: Doctor accepting new patients, no telehealth

- **WHEN** a doctor accepts new patients and does not offer telehealth
- **THEN** their card shows name, specialty, clinic, languages, an "Accepting new patients" label
  as text, and no telehealth label

#### Scenario: Doctor not accepting new patients, offers telehealth

- **WHEN** a doctor does not accept new patients and offers telehealth
- **THEN** their card shows a "Not accepting new patients" label and a "Telehealth available"
  label, both as text

#### Scenario: Doctor with no listed languages

- **WHEN** a doctor's languages list is empty
- **THEN** their card still renders every other field, and the languages line reads "Not listed"
  instead of being blank or omitted

### Requirement: Result count

The screen SHALL state how many doctors are currently listed.

#### Scenario: Count matches the directory

- **WHEN** the Find a Doctor screen is rendered
- **THEN** the screen shows the number of doctors listed, using the singular form for exactly one
  doctor and the plural form otherwise

### Requirement: Empty directory

When the provider directory has no doctors, the screen SHALL state that no doctors are available
instead of showing a blank area or an error.

#### Scenario: No doctors in the directory

- **WHEN** the provider directory contains zero doctors
- **THEN** the screen shows a count of "0 doctors" and a message that no doctors are available

### Requirement: Reachable from home and the navigation bar

The screen SHALL be reachable from the home screen's "Find a doctor" quick action and from the
navigation bar, and SHALL appear in the navigation bar's list of screens.

#### Scenario: Opened from the home quick action

- **WHEN** the patient activates the "Find a doctor" quick action on the home screen
- **THEN** the Find a Doctor screen opens

#### Scenario: Opened from the navigation bar

- **WHEN** the patient selects "Find a doctor" in the navigation bar from any screen
- **THEN** the Find a Doctor screen opens and its navigation entry is marked as the current page

### Requirement: Client-only data

The screen SHALL render entirely from the local synthetic provider directory. No doctor or clinic
data SHALL be requested from or sent to a network endpoint.

#### Scenario: No network activity

- **WHEN** the Find a Doctor screen is open and the network traffic is inspected
- **THEN** no request carries directory data outside the browser

### Requirement: Accessible and responsive

Every interactive element on the screen SHALL be reachable by keyboard in a logical order with a
visible focus indicator, and the screen SHALL render without horizontal scrolling or clipped text
at widths down to 360px.

#### Scenario: Keyboard-only navigation

- **WHEN** the patient tabs from the navigation bar through the screen using only the keyboard
- **THEN** every interactive element is reachable in a logical order with a visible focus
  indicator

#### Scenario: Narrow viewport

- **WHEN** the screen is rendered at a 360px-wide viewport
- **THEN** every doctor card renders with no horizontal scrolling and no clipped text
