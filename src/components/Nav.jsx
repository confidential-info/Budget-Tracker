//React and React-Router-Dom Import 
import React from 'react'
import { Link } from 'react-router-dom';

//Authorization Import i.e. Clerk
import { UserButton, useUser } from '@clerk/clerk-react';

function Nav() {

  const {user, isSignedIn} = useUser();
  return (
    <header>
        <div className="p-5 flex justify-between border shadow-sm">
            <h3>Logo</h3>
            {
              isSignedIn ?  <UserButton /> : <Link to="/sign-in"><button className="inline-block rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">Get Started</button></Link>
            }
            
            
        </div>
    </header>
  )
}

export default Nav;