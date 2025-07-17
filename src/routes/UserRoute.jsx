import { Navigate } from 'react-router';
import useUserRole from '../hooks/useUserRole';
import useAuth from '../hooks/useAuth';
import Loading from '../pages/shared/Loading/Loading';

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) return <Loading></Loading>;

  if (!user && role !== 'user') {
    return <Navigate to="/" replace />;
  } 
  return children;
};

export default UserRoute;
