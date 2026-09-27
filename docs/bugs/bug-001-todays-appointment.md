# BUG-001: Today's appointment is missing and every visit shows one day early

**Reported by:** a patient in Montevideo (UTC-3)
**Severity:** High (patients may miss a same-day visit)

## Steps to reproduce

1. Set the computer's time zone to America/Montevideo (or any zone west of UTC).
2. Open the home screen on a day with an appointment.

## Expected

"Next appointment" shows today's visit, dated today. The Appointments screen lists it under Upcoming.

## Actual

Today's visit is missing from "Next appointment" and appears under Past on the Appointments screen.
Every appointment shows the day before its real date.

## Notes

With the time zone set to UTC the problem does not appear, and the existing tests pass.
