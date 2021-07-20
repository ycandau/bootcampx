SELECT
  count(assistance_requests.*) as total_assistances,
  students.name as name
FROM students
JOIN assistance_requests ON students.id = student_id
WHERE name = 'Elliot Dickinson'
GROUP BY name;