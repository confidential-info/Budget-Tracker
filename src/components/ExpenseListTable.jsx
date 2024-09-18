//React Imports
import React from 'react';
import { db } from '../utils/dbConfig';
import { Expenses } from '../utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'react-toastify';

//SVG Icon Import i.e. HeroIcon
import { TrashIcon } from '@heroicons/react/24/outline'

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
                    <TrashIcon className='size-6 text-red-600' />
                </h2>
            </div>
        ))}
    </div>
  )
}

export default ExpenseListTable;