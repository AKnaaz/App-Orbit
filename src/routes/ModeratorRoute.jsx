import { Navigate } from 'react-router';
import useUserRole from '../hooks/useUserRole';
import useAuth from '../hooks/useAuth';
import Loading from '../pages/shared/Loading/Loading';

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) return <Loading></Loading>;

  if (!user && role !== 'moderator') {
    return <Navigate to="/" replace />;
  } 
  
  return children;
};

export default ModeratorRoute;
