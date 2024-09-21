//React Import
import React, { useState } from 'react';

//Headless UI Import i.e. Framework
import { Input } from '@headlessui/react';
import { db } from '../utils/dbConfig';
import { Budgets, Expenses } from '../utils/schema';

//Pop-Up Import
import { toast, ToastContainer } from 'react-toastify';

//Improt for Time Format in Table
import moment from 'moment';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

function AddExpense({budgetId, user, refreshData}) {
    //For Storing the Value on Budget Name and Budget Amount
    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const [loading, setLoading] = useState(false);

    //Function to Add New Expenses
    const addNewExpense = async() => {
        setLoading(true);
        const result = await db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdAt: moment().format('DD/MM/YYYY')
        }).returning({insertedId: Budgets.id});

        setAmount('');
        setName('');
        if(result)
        {
            toast.success("New Expense Created !!");
            refreshData();
        }
        setLoading(false);
    }
  return (
    <div className='border p-5 rounded-lg'>
        <h2 className='font-bold text-lg'>Add Expense</h2>
        <div className='mt-2 text-left'>
            <h2 className='text-sm font-medium my-1'>Expense Name</h2>
            <Input name="full_name" value={name} type="text" placeholder='E.g. Grocery' className="border-2 w-full p-2 text-sm rounded-lg px-4" onChange={(e)=>setName(e.target.value)} />
        </div>
        <div className='mt-2 text-left'>
            <h2 className='text-sm font-medium my-1'>Expense Amount</h2>
            <Input name="amount" value={amount} type="number" placeholder='E.g. ₹5000' className="border-2 w-full p-2 text-sm rounded-lg px-4" onChange={(e)=>setAmount(e.target.value)} />
        </div>
        <button disabled={!(name&&amount)||loading} className='mt-3 inline-block rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-sm font-medium text-white focus:outline-none focus:ring active:text-indigo-500 w-full cursor-pointer' onClick={() => addNewExpense()} >
            {
                loading ? <ArrowPathIcon className='animate-spin size-5 text-center' /> : "Add New Expense"
            }
        </button>
        <ToastContainer />
    </div>
  )
}

export default AddExpense;