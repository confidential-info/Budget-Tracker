//React Import
import React, { useEffect, useState } from 'react';

//React Router DOM Imports
import { useParams } from 'react-router-dom';

//Database Imports i.e. PostgreSQL
import { db } from '../utils/dbConfig';
import { Budgets, Expenses } from '../utils/schema';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';

// Authorization Import i.e. Clerk
import { useUser } from '@clerk/clerk-react';

//Component Imports
import BudgetItem from '../components/BudgetItem';
import AddExpense from '../components/AddExpense';
import ExpenseListTable from '../components/ExpenseListTable';

function ExpensesScreen() {

  const {id} = useParams();
  const {user} = useUser();
  const [budgetInfo, setBudgetInfo] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
      user&&getBudgetInfo();
  },[user]);

  //Function to fetch data from the database
  const getBudgetInfo = async() => {
      const result = await db.select({
          ...getTableColumns(Budgets),
          totalSpent: sql `sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql `count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
        .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .where(eq(Budgets.id, id))
        .groupBy(Budgets.id);
      setBudgetInfo(result[0]);
      getBudgetList();
  }

  // Function to fetch Lastest Expenses
  const getBudgetList = async() => {
    const result = await db.select().from(Expenses)
    .where(eq(Expenses.budgetId, id))
    .orderBy(desc(Expenses.id));
    setExpensesList(result);
    console.log(result);
  }

  return (
    <div className='p-8'>
        <h2 className='text-2xl font-bold'>My Expenses</h2>
        <div className='grid grid-col-1 md:grid-cols-2 mt-6 gap-5'>
          {budgetInfo ? 
            <BudgetItem budget={budgetInfo} />
            :
            <div className='bg-slate-200 rounded-lg w-full h-[145px] animate-pulse'>
            </div>
          }
          <AddExpense budgetId={id} user={user} refreshData={() => getBudgetInfo()} />
        </div>
        <div className='mt-4'>
          <h2 className='font-bold'>Latest Expenses</h2>
          <ExpenseListTable expensesList={expensesList} refreshData={() => getBudgetInfo()} />
        </div>
    </div>
  )
}

export default ExpensesScreen;