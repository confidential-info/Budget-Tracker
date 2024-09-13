//React Import
import React, { useEffect, useState } from 'react';

//Component Import
import CreateBudget from './CreateBudget';
import BudgetItem from './BudgetItem';

//Database Import i.e. PostgreSQL
import { db } from '../utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '../utils/schema';

//Authorization Import i.e. Clerk
import { useUser } from '@clerk/clerk-react';

function BudgetList() {

  const {user} = useUser();
  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    user&&getBudgetList();
  },[user]);

  //Function to fetche data from the database
  const getBudgetList = async() => {
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
    <div className='mt-7'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <CreateBudget refreshData={()=>getBudgetList()}/>
            {budgetList.length>0 ? budgetList.map((budget,index)=>{
              return <BudgetItem budget={budget} />
            })
          :
          [1,2,3,4].map((item, index) => (
            <div className='w-full bg-slate-200 rounded-lg h-[145px] animate-pulse'>
            </div>
          ))}
        </div>
    </div>
  )
}

export default BudgetList;