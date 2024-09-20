//React Import 
import React, { useEffect, useState } from 'react';

//SVG Icons Import i.e. HeroIcons
import { BanknotesIcon, ReceiptPercentIcon, WalletIcon } from '@heroicons/react/24/outline';

function CardInfo({budgetList}) {

    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);
    
    useEffect(() => {
        budgetList&&calculateCardInfo();
    },[budgetList])
    const calculateCardInfo = () => {
        // console.log(budgetList);
        let totalBudget_ = 0;
        let totalSpent_ = 0;
        budgetList.forEach(element => {
            totalBudget_ = totalBudget_ + Number(element.amount);
            totalSpent_ = totalSpent_ + Number(element.totalSpent);
        });
        setTotalBudget(totalBudget_);
        setTotalSpent(totalSpent_);
    }
  return (
    <div>
        {budgetList.length>0 ? <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div className=''>
                    <h2 className='text-sm'>Total Budget</h2>
                    <h2 className='font-bold text-2xl text-green-600'>₹{totalBudget}</h2>
                </div>
                <BanknotesIcon className='rounded-full bg-green-600 text-white h-12 w-12 p-3' />
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div className=''>
                    <h2 className='text-sm'>Total Spent</h2>
                    <h2 className='font-bold text-2xl text-red-600'>₹{totalSpent}</h2>
                </div>
                <ReceiptPercentIcon className='rounded-full bg-red-600 text-white h-12 w-12 p-3' />
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div className=''>
                    <h2 className='text-sm'>No. of Budget</h2>
                    <h2 className='font-bold text-2xl'>{budgetList.length}</h2>
                </div>
                <WalletIcon className='rounded-full bg-indigo-600 text-white h-12 w-12 p-3' />
            </div>
        </div>
        :
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {[1,2,3].map((item, index) => (
                <div className='w-full bg-slate-200 rounded-lg h-[100px] animate-pulse'>
                </div>))}
        </div>}
    </div>
  )
}

export default CardInfo;