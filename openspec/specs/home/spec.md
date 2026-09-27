# home Specification

## Purpose

The home screen is the patient's landing page: it greets the patient, shows what comes next in their
care and offers entry points to the rest of the portal.

## Requirements

### Requirement: Greeting

The home screen SHALL greet the patient by first name, with a greeting that matches the time of day.

#### Scenario: Morning greeting

- **WHEN** the patient opens the portal before 12:00 local time
- **THEN** the screen shows "Good morning" followed by the patient's first name

### Requirement: Next appointment

The home screen SHALL show the patient's next upcoming appointment, including one later the same day,
with its reason, doctor, location, date and time.

#### Scenario: Appointment later today

- **WHEN** the patient has an appointment later today
- **THEN** that appointment is shown as the next appointment, dated today

#### Scenario: No upcoming appointments

- **WHEN** the patient has no upcoming appointments
- **THEN** the card says there are no upcoming appointments

### Requirement: Primary care doctor

The home screen SHALL show the patient's primary care doctor with specialty and clinic.

#### Scenario: Primary doctor shown

- **WHEN** the patient opens the home screen
- **THEN** the primary care doctor card shows the doctor's name, specialty and clinic

### Requirement: Quick actions

The home screen SHALL offer quick actions to the portal's features. Features not yet available SHALL be
shown as disabled and labelled "Coming soon".

#### Scenario: Available feature

- **WHEN** the patient activates the Appointments action
- **THEN** the Appointments screen opens

#### Scenario: Feature not yet available

- **WHEN** a feature such as Find a doctor is not available yet
- **THEN** its action is disabled and labelled "Coming soon"
