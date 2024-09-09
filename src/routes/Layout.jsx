// React Routers
import React, { useEffect } from 'react'
import SideNav from '../components/SideNav';

//Component Imports
import DashboardHeader from '../components/DashboardHeader';

//Database Import
import { eq } from 'drizzle-orm';

//Authorisation Import i.e. Cler
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../utils/dbConfig';
import { Budgets } from '../utils/schema';

function Layout({children}) {
  const {user} = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    user&&checkUserBudgets();
  },[user]);
  const checkUserBudgets = async () => {
    const result = await db.select().from(Budgets).where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress));
    if(result?.length===0)
    {
      navigate('/dashboard/budgets');
    }
  }
  return (
    <div>
        <div className='fixed md:w-64 hidden md:block '>
            <SideNav />
        </div>
        <div className='md:ml-64'>
          <DashboardHeader />
          {children}
        </div>
    </div>
  )
}

export default Layout;