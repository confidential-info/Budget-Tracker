//Neon Database for PostgreSQL
import { neon } from '@neondatabase/serverless';

//Drizzle Import for connection with PostgreSQL
import { drizzle } from 'drizzle-orm/neon-http';

//Database i.e. Table Import
import * as schema from './schema';

const sql = neon("postgresql://neondb_owner:IwWPNZ8X1Ctj@ep-winter-hill-a1b96j5t.ap-southeast-1.aws.neon.tech/Expense%20Planner?sslmode=require");
export const db = drizzle(sql, {schema});