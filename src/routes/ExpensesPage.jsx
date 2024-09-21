//React Import
import React, { useEffect, useState } from 'react';

//Database Import i.e. PostgreSQL
import { db } from '../utils/dbConfig';
import { Budgets, Expenses } from '../utils/schema';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';

//Authorization Import i.e. Clerk
import { useUser } from '@clerk/clerk-react';
import ExpenseListTable from '../components/ExpenseListTable';

function ExpensesPage() {

  //To get user details from Clerk User
  const {user} = useUser();

  //Stattes to update data collected from database
  const [budgetList, setBudgetList] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    user&&getBudgetInfo();
  },[user]);

  //Fetchign all data from database
  const getBudgetInfo = async() => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpent: sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id));
    setBudgetList(result);
    getAllExpenses();
  }

  //Fetching data for Particular User
  const getAllExpenses = async() => {
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy,user.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));
    setExpenses(result);
  }
  return (
    <div className='m-8 text-left'>
      <h2 className='font-bold text-3xl'>My Expenses</h2>
      <h2 className='font-bold text-lg mt-3'>Latest Expenses</h2>
      <ExpenseListTable expensesList={expenses} refreshData={() => getBudgetInfo() } />
    </div>
  )
}


export default ExpensesPage;