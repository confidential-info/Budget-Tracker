//PostgreSQL Query Import
import { integer, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets",{
    id: serial("ID").primaryKey(),
    name: varchar("NAME").notNull(),
    amount: numeric("AMOUNT").notNull(),
    icon: varchar("ICON"),
    createdBy: varchar("CREATED_BY").notNull()
})

export const Expenses = pgTable("expenses", {
    id: serial("ID").primaryKey(),
    name: varchar("NAME").notNull(),
    amount: numeric("AMOUNT").notNull().default(0),
    budgetId: integer("BUDGET_ID").notNull().references(() => Budgets.id),
    createdAt: varchar("CREATED_AT").notNull()
})