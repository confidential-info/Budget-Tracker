import { Outlet } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'

export default function RootLayout() {
  return (
    <div>
      <header className="header">
        <SignedIn>
        </SignedIn>
        <SignedOut>
        </SignedOut>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
