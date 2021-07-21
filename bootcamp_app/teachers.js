require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const logTeachers = (cohort) =>
  pool
    .query(
      `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM
  assistance_requests
  JOIN teachers ON teacher_id = teachers.id
  JOIN students ON student_id = students.id
  JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teacher;
`,
      [`%${cohort}%`]
    )
    .then((res) => console.log(res.rows))
    .catch((err) => console.error('query error', err.stack));

const [cohort] = process.argv.slice(2);
logTeachers(cohort);
