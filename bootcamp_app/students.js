const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx',
});

const logStudents = (cohort, count) =>
  pool.query(`
SELECT
  students.id as student_id,
  students.name as name,
  cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;`,
      [`%${cohort}%`, count]
    )
    .then((res) => {
      res.rows.forEach((user) => {
        console.log(
          `${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`
        );
      });
    })
    .catch((err) => console.error('query error', err.stack));

const [cohort, count] = process.argv.slice(2);
logStudents(cohort, count);
