//Initialization for PostgreSQL
export default {
  schema: "./src/utils/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:IwWPNZ8X1Ctj@ep-winter-hill-a1b96j5t.ap-southeast-1.aws.neon.tech/Expense%20Planner?sslmode=require",
  }
};