//REact Import
import React from 'react'

//Component Imports
import BudgetList from '../components/BudgetList';

function Budgets() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl'>My Budget List</h2>
      <BudgetList />
    </div>
  )
}

export default Budgets;