//React Import
import React, { useEffect, useState } from 'react';

//Authorization Import i.e. Clerk
import { useUser } from '@clerk/clerk-react';

//Component Import
import CardInfo from '../components/CardInfo';

//Database Import i.e. PostgreSQL
import { db } from '../utils/dbConfig';
import { Budgets, Expenses } from '../utils/schema';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';

function DashboardPage() {
  const {user} = useUser();

  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    user&&getBudgetInfo();
  },[user]);

  //Function to fetche data from the database
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
  }
  return (
    <div className='p-8 text-left'>
      <h2 className='font-bold text-3xl'>Hi, {user.fullName} 👋</h2>
      <p className='text-gray-500'>Here is your expense history, Start Managing</p>
      <CardInfo budgetList={budgetList} />
      <div className='grid grid-cols-1 md:grid-cols-3'>
        <div className='md:col-span-2'>
          Chart
        </div>
        <div>
          Other COntent 
        </div>
      </div>
    </div>
  )
}

export default DashboardPage;