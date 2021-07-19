SELECT SUM(assignment_submissions.duration) AS total_duration
FROM cohorts
JOIN students ON cohorts.id = students.cohort_id
JOIN assignment_submissions ON assignment_submissions.student_id = students.id
WHERE cohorts.name = 'FEB12';