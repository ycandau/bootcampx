SELECT name, email, id, cohort_id, phone
FROM students
WHERE email NOT LIKE '%@gmail%' AND phone IS NULL;