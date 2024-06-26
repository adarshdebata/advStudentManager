const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgresql://Student-management-system_owner:jNo9xis7DkUc@ep-sweet-math-a1pjc4md.ap-southeast-1.aws.neon.tech/Student-management-system?sslmode=require"
});

module.exports = pool;
