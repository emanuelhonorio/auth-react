import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isLoggedIn, loading, user } = useAuth();
  if (loading) {
    return <div>Loading...</div>
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }
  console.log("permissions", user)

  if (!user?.permissions?.includes("ROLE_ADMIN")) {
    return <Navigate to="/unauthorized" />
  }
  return children;
};

export default PrivateRoute;