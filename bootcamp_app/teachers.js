const { Pool } = require('pg');


const pool = new Pool({
  database: 'bootcampx',
  host: 'localhost',
  user: 'vagrant',
  password: '123'
});

const cohortName = process.argv[2];
const values = [`%${cohortName}%`];
const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teacher;
  `;

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
  process.exit();
}).catch(err => console.error('query error', err.stack));
