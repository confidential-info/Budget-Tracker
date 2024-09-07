//React Import
import React from 'react';

//Authorization Import i.e. Clerk
import { UserButton } from '@clerk/clerk-react';

function DashboardHeader() {
  return (
    <div className='p-5 shadow-sm border-b flex justify-between'>
        <div>
            Search Bar
        </div>
        <div>
            <UserButton />
        </div>
    </div>
  )
}

export default DashboardHeader;