export default {
  schema: "./utils/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.REACT_APP_DATABASE_URL,
  }
};