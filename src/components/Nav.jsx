import React from 'react'

function Nav() {
  return (
    <header>
        <div className="p-5 flex justify-between border shadow-sm">
            <h3>Logo</h3>
            <button className="inline-block rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">Get Started</button>
        </div>
    </header>
  )
}

export default Nav;