## MODIFIED Requirements

### Requirement: Quick actions

The home screen SHALL offer quick actions to the portal's features. Features not yet available SHALL be
shown as disabled and labelled "Coming soon".

#### Scenario: Available feature

- **WHEN** the patient activates the Appointments action
- **THEN** the Appointments screen opens

#### Scenario: Find a doctor action opens the directory

- **WHEN** the patient activates the Find a doctor action
- **THEN** the Find a Doctor screen opens and the action is no longer labelled "Coming soon"

#### Scenario: Feature not yet available

- **WHEN** a feature such as Test results is not available yet
- **THEN** its action is disabled and labelled "Coming soon"
