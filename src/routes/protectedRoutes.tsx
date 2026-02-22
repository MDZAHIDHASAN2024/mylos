import { Navigate } from 'react-router';

type ProtectedRoutesProps = {
  isLoggedIn: boolean;
  children: React.ReactNode;
};

const ProtectedRoutes = ({ isLoggedIn, children }: ProtectedRoutesProps) => {
  if (!isLoggedIn) {
    return <Navigate to="*" replace />;
  }
  return children;
};

export default ProtectedRoutes;
