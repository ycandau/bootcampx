SELECT
  cohorts.name as name,
  avg(completed_at - started_at) as average_assistance_time 
FROM
  assistance_requests
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
GROUP BY cohorts.id
ORDER BY average_assistance_time;