//React Imports
import React from 'react';
import { db } from '../utils/dbConfig';
import { Expenses } from '../utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'react-toastify';

function ExpenseListTable({expensesList, refreshData}) {
    const deleteExpense = async(expenses) => {
        const result = await db.delete(Expenses)
        .where(eq(Expenses.id, expenses.id))
        .returning();

        if(result)
        {
            toast.success("Expense Deleted !!");
            refreshData();
        }
    }

  return (
    <div className='mt-3'>
        <div className='grid grid-cols-4 bg-slate-200 p-2'>
            <h2 className='font-bold'>Name</h2>
            <h2 className='font-bold'>Amount</h2>
            <h2 className='font-bold'>Date</h2>
            <h2 className='font-bold'>Action</h2>
        </div>
        {expensesList.map((expenses, index) => (
            <div className='grid grid-cols-4 bg-slate-50 p-2'>
                <h2>{expenses.name}</h2>
                <h2>{expenses.amount}</h2>
                <h2>{expenses.createdAt}</h2>
                <h2>
                    {<svg class="w-6 h-6 text-red-6  00 dark:text-red-600 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" onClick={() => deleteExpense(expenses)}>
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                    </svg>}

                </h2>
            </div>
        ))}
    </div>
  )
}

export default ExpenseListTable;