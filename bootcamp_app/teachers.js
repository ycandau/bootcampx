const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx',
});

const logTeachers = (cohort) =>
  pool.query(`
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
