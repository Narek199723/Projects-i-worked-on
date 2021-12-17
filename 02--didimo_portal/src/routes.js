import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome/Welcome';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Settings from './pages/Profile/Settings';
import ChangePassword from './pages/Profile/ChangePassword/ChangePassword';
import MyDidimos from './pages/MyDidimos/MyDidimos';
import Orders from './pages/Orders/Orders';
import Transactions from './pages/Transactions/Transactions';
import Details from './pages/PackageDetails/PackageDetails';
import Packages from './components/packages/Packages';
import DataUsagePolicy from './pages/Profile/DataUsagePolicy';

const routes = [
  {
    path: '',
    element: <DashboardLayout />,
    children: [
      { path: 'mydidmos', element: <MyDidimos /> },
      { path: 'orders', element: <Orders /> },
      { path: 'profile/settings', element: <Settings /> },
      { path: 'profile/changepassword', element: <ChangePassword /> },
      { path: 'profile/data-usage-policy', element: <DataUsagePolicy /> },
      { path: 'welcome', element: <Welcome /> },
      { path: 'mydidmos', element: <Dashboard /> },
      { path: 'transactions', element: <Transactions /> },
      { path: 'packages/details', element: <Details /> },
      { path: 'packages', element: <Packages /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: '*', element: <Dashboard /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: `${process.env.REACT_APP_ROOT_PATH}/login`, element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: `${process.env.REACT_APP_ROOT_PATH}/404`, element: <NotFound /> },
      {
        path: '/',
        element: (
          <Navigate to={`${process.env.REACT_APP_ROOT_PATH}/dashboard`} />
        ),
      },
      { path: '*', element: <Login /> },
    ],
  },
];

export default routes;
