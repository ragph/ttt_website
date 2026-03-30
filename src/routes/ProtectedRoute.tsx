interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Authentication removed - always allow access
  return children;
};

export default ProtectedRoute;
