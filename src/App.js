//React-Rouder-Dom Imports
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Import the layouts
import RootLayout from './layouts/root-layout'
import DashboardLayout from './layouts/dashboard-layout'

// Import the components
import IndexPage from './routes'
import SignInPage from './routes/sign-in'
import SignUpPage from './routes/sign-up'
import DashboardPage from './routes/dashboard'
import Budgets from './routes/Budgets';
import ExpensesScreen from './routes/ExpensesScreen';

//Routes Definition
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <IndexPage /> },
      { path: '/sign-in/', element: <SignInPage /> },
      { path: '/sign-up/', element: <SignUpPage /> },
      {
        element: <DashboardLayout />,
        path: 'dashboard',
        children: [
          { index: 'true', element: <DashboardPage /> },
          { path: 'budgets', element: <Budgets />},
          { path: 'expenses/:id', element: <ExpensesScreen />}
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
