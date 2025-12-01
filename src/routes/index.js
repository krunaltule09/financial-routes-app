import { Navigate } from 'react-router-dom';
import {
  FinancialStatementPage,
  Y14ReportPage,
  PersonalWelcomePage,
  WelcomePage,
  DSCRTrendPage,
  BenefitsSummaryPage,
  CovenantMonitoringPage,
  LoanServicePage,
  WelcomeHomePage
} from '../pages';

// Define routes configuration
const routes = [
  {
    path: '/financial-statement',
    element: <FinancialStatementPage />,
  },
  {
    path: '/y14-report/large',
    element: <Y14ReportPage />,
  },
  {
    path: '/personal-welcome',
    element: <PersonalWelcomePage />,
  },
  {
    path: '/welcome',
    element: <WelcomeHomePage />,
  },
  {
    path: '/dscr-trend',
    element: <DSCRTrendPage />,
  },
  {
    path: '/benefits-summary',
    element: <BenefitsSummaryPage />,
  },
  {
    path: '/covenant-monitoring',
    element: <CovenantMonitoringPage />,
  },
  {
    path: '/loan-service',
    element: <LoanServicePage />,
  },
  {
    path: '/',
    element: <Navigate to="/welcome" replace />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;
