import React from 'react';
import { Link } from 'react-router-dom';

function BudgetItem({budget}) {
    const calculateProgress = () => {
        const percentage = (budget.totalSpent/budget.amount)*100;
        return percentage.toFixed(2);
    }
  return (
    <Link to={"/dashboard/expenses/" + budget.id} className='p-5 rounded-lg border cursor-pointer hover:shadow-md h-[170px]'>
        <div className='flex gap-2 items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <h2 className='text-2xl p-3 px-4 bg-slate-200 rounded-full'>{budget.icon}</h2>
                <div className='text-left'>
                    <h2 className='font-bold'>{budget.name}</h2>
                    <h2 className='text-sm text-gray-500'>{budget.totalItem} Item</h2>
                </div>
            </div>
            <h2 className='font-bold text-indigo-600 text-lg'>₹{budget.amount}</h2>
        </div>
        <div className='mt-5'>
            <div className='flex justify-between item-center mb-3'> 
                <h2 className='text-xs text-slate-400'>₹{budget.totalSpent?budget.totalSpent:0} Spent</h2>
                <h2 className='text-xs text-slate-400'>₹{budget.amount-budget.totalSpent} Remaining</h2>
            </div>
            <div className='w-full h-2 bg-slate-300 rounded-full'>
                <div className='h-2 bg-indigo-600 rounded-full' style={{width:`${calculateProgress()}%`}}></div>
            </div>
        </div>
    </Link>
  )
}

export default BudgetItem;