//React and React-Router-Dom Import
import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';

//Authorization Import i.e. Clerk
import { UserButton } from '@clerk/clerk-react';

function SideNav() {
    const menuList = [
        {
            id:1,
            name: "Dashboard",
            icon: (<svg className="w-6 h-6 text-gray-800 dark:text-gray-500 hover:text-indigo-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"/>
                  </svg>),
            path: "/dashboard"      
        },
        {
            id: 2,
            name: "Budgets",
            icon: (<svg className="w-6 h-6 text-gray-800 dark:text-gray-500 hover:text-indigo-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-.955a1 1 0 0 1 .458-.84l7-4.52a1 1 0 0 1 1.084 0l7 4.52a1 1 0 0 1 .458.84V9.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5Z"/>
                  </svg>),
            path: "/dashboard/budgets"
        },
        {
            id: 3,
            name: "Expenses",
            icon: (<svg className="w-6 h-6 text-gray-800 dark:text-gray-500 hover:text-indigo-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M5.617 2.076a1 1 0 0 1 1.09.217L8 3.586l1.293-1.293a1 1 0 0 1 1.414 0L12 3.586l1.293-1.293a1 1 0 0 1 1.414 0L16 3.586l1.293-1.293A1 1 0 0 1 19 3v18a1 1 0 0 1-1.707.707L16 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L12 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L8 20.414l-1.293 1.293A1 1 0 0 1 5 21V3a1 1 0 0 1 .617-.924ZM9 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clip-rule="evenodd"/>
                  </svg>),
            path: "/dashboard/expenses"
        },
        {
            id: 4,
            name: "Upgrades",
            icon: (<svg class="w-6 h-6 text-gray-800 dark:text-gray-500 hover:text-indigo-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M11.644 3.066a1 1 0 0 1 .712 0l7 2.666A1 1 0 0 1 20 6.68a17.694 17.694 0 0 1-2.023 7.98 17.406 17.406 0 0 1-5.402 6.158 1 1 0 0 1-1.15 0 17.405 17.405 0 0 1-5.403-6.157A17.695 17.695 0 0 1 4 6.68a1 1 0 0 1 .644-.949l7-2.666Zm4.014 7.187a1 1 0 0 0-1.316-1.506l-3.296 2.884-.839-.838a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.366.046l4-3.5Z" clip-rule="evenodd"/>
                  </svg>),
            path: "/dashboard/upgrade"
        }
    ]

    const path = useLocation();
    const pathName = path.pathname;

    useEffect(() => {
        console.log(path.pathname);
    },[]);
  return (
    <div className='h-screen p-5 border shadow-sm'>
        <h1>Logo</h1>
        <div className='mt-5'>
            {menuList.map((menu,index) => (
                <Link to={menu.path}>
                <div className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md justify-start hover:bg-blue-100 hover:text-indigo-700 ${pathName === menu.path&&'text-indigo-500 bg-blue-100'}`}>
                    {menu.icon}
                    {menu.name}
                </div>
                </Link>
            ))}
        </div>
        <div className='fixed bottom-10 flex gap-2 p-5 items-center'>
            <UserButton />
            Profile
        </div>
    </div>
  )
}

export default SideNav;