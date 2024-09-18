//React and React-Router-Dom Import
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

//Authorization Import i.e. Clerk
import { UserButton } from '@clerk/clerk-react';

//SVG Icon Import i.e. HeroIcons
import { BuildingLibraryIcon, ComputerDesktopIcon, ReceiptPercentIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

function SideNav() {
    const menuList = [
        {
            id:1,
            name: "Dashboard",
            icon: ComputerDesktopIcon,
            path: "/dashboard"      
        },
        {
            id: 2,
            name: "Budgets",
            icon: BuildingLibraryIcon,
            path: "/dashboard/budgets"
        },
        {
            id: 3,
            name: "Expenses",
            icon: ReceiptPercentIcon,
            path: "/dashboard/expenses"
        },
        {
            id: 4,
            name: "Upgrades",
            icon: ShieldCheckIcon,
            path: "/dashboard/upgrade"
        }
    ]

    const path = useLocation();
    const pathName = path.pathname;

    // useEffect(() => {
    //     console.log(path.pathname);
    // },[]);
  return (
    <div className='h-screen p-5 border shadow-sm'>
        <h1>Logo</h1>
        <div className='mt-5'>
            {menuList.map((menu,index) => (
                <Link to={menu.path}>
                <div className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md justify-start hover:bg-blue-100 hover:text-indigo-700 ${pathName === menu.path&&'text-indigo-500 bg-blue-100'}`}>
                    <menu.icon className='size-5' />
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