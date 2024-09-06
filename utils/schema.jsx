import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets",{
    id: serial("ID").primaryKey(),
    name: varchar("NAME").notNull(),
    amount: varchar("AMOUNT").notNull(),
    icon: varchar("ICON"),
    createdBy: varchar("CREATED_BY").notNull()
})