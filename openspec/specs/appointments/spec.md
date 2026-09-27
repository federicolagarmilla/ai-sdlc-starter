# appointments Specification

## Purpose

The Appointments screen lists the patient's upcoming and past appointments.

## Requirements

### Requirement: Upcoming and past lists

The Appointments screen SHALL list upcoming appointments (today or later) sorted soonest first, and past
appointments sorted most recent first.

#### Scenario: Appointment today

- **WHEN** the patient has an appointment today
- **THEN** it is listed under Upcoming

#### Scenario: Appointment in the past

- **WHEN** an appointment's date is before today
- **THEN** it is listed under Past

### Requirement: Calendar dates are time-zone independent

Appointment dates SHALL be shown as the same calendar day in every time zone.

#### Scenario: Patient west of UTC

- **WHEN** the patient's computer is set to a time zone west of UTC
- **THEN** each appointment shows the calendar date it was booked for
