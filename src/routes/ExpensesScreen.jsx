//React Import
import React, { useEffect, useState } from 'react';

//React Router DOM Imports
import { useNavigate, useParams } from 'react-router-dom';

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

//Trash Icon Import
import { TrashIcon } from '@heroicons/react/24/outline';

//Headless UI Component Import
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { toast } from 'react-toastify';


function ExpensesScreen() {

  //State for Create Budget Dialog 
  let [isOpen, setIsOpen] = useState(false);

  // To get ID to current path i.e. Dynamic Route UD
  const {id} = useParams();

  //For Clerk Email-ID 
  const {user} = useUser();

  //State for setting Budget-Info and Display budget list
  const [budgetInfo, setBudgetInfo] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  const route = useNavigate();

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

  const deleteBudget = async() => {
    const deleteExpenseResult = await db.delete(Expenses)
    .where(eq(Expenses.budgetId, id))
    .returning();

    if(deleteExpenseResult)
    {
      const result = await db.delete(Budgets)
      .where(eq(Budgets.id, id))
      .returning();
    }
    
    toast.success('Budget Deleted !!');
    route('/dashboard/budgets', { replace: true });
  }

  return (
    <div className='p-8'>
        <h2 className='text-2xl font-bold flex justify-between items-center'>My Expenses
          <button onClick={() => setIsOpen(true)} className='flex gap-2 rounded border border-red-600 bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500' ><TrashIcon className='size-6' /> Delete</button>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4  bg-black bg-opacity-85">
              <DialogPanel className="max-w-lg space-y-4 border bg-white p-7 rounded-lg">
                <DialogTitle className="font-bold">Are you absolutely sure ?</DialogTitle>
                <Description className='text-gray-500'>This action cannot be undone. This will permanently delete your current budget along with expenses.</Description>
                <div className="flex gap-4 justify-end">
                  <button className='inline-block text-sm font-medium text-black border border-slate-500 px-4 py-2 rounded' onClick={() => setIsOpen(false)}>Cancel</button>
                  <button className='inline-block text-sm font-medium text-white border border-indigo-600 bg-indigo-600 px-4 py-2 rounded' onClick={() => deleteBudget()}>Continue</button>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        </h2>
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