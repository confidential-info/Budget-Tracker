//React Import
import React, { useEffect, useState } from 'react';

//Authorization Import i.e. Clerk
import { useUser } from '@clerk/clerk-react';

//Component Import
import CardInfo from '../components/CardInfo';
import BarChartDashboard from '../components/BarChartDashboard';
import BudgetItem from '../components/BudgetItem';
import ExpenseListTable from '../components/ExpenseListTable';

//Database Import i.e. PostgreSQL
import { db } from '../utils/dbConfig';
import { Budgets, Expenses } from '../utils/schema';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';

function DashboardPage() {

  //Used for Fetching User Details from Clerk
  const {user} = useUser();

  //Maintaing States and Data of User
  const [budgetList, setBudgetList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

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
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id));
    setBudgetList(result);
    getAllExpenses();
  }

  //Fetching Expenses of Particular User
  const getAllExpenses = async() => {
    const result = await db.select({
      id:Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));

    console.log(result);
    setExpenseList(result);
  }

  return (
    <div className='p-8 text-left'>
      <h2 className='font-bold text-3xl'>Hi, {user.fullName} 👋</h2>
      <p className='text-gray-500'>Here is your expense history, Start Managing</p>
      <CardInfo budgetList={budgetList} />
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDashboard budgetList={budgetList} />
          <h2 className='font-bold text-lg mt-3'>Latest Expenses</h2>
          <ExpenseListTable expensesList={expenseList} refreshData={() => getBudgetInfo} />
        </div>
        <div className='grid gap-3'>
          <h2 className='font-bold text-lg'>Latest Budget</h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))} 
        </div>
      </div>
    </div>
  )
}

export default DashboardPage;