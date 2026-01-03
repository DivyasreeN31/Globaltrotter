import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to={isAuthenticated ? "/" : "/login"} className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <span className="material-icons text-primary text-3xl">public</span>
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">GlobalTrotter</span>
            </Link>
            {isAuthenticated && (
              <nav className="hidden md:flex items-center gap-1">
                <Link
                  to="/trips"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive('/trips')
                    ? 'text-primary bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                  My Trips
                </Link>
                <Link
                  to="/explore"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive('/explore')
                    ? 'text-primary bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                  Explore
                </Link>
                <Link
                  to="/community"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive('/community')
                    ? 'text-primary bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                  Community
                </Link>
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive('/')
                    ? 'text-primary bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive('/profile')
                    ? 'text-primary bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                  Profile
                </Link>
              </nav>
            )}
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark cursor-pointer transition hover:opacity-90">
                    {user?.photoURL ? (
                      <img alt="User Avatar" className="h-full w-full object-cover" src={user.photoURL} />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-white font-semibold text-sm">
                        {user?.displayName?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors flex items-center gap-1"
                    title="Logout"
                  >
                    <span className="material-icons text-base">logout</span>
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-md transition-colors flex items-center gap-2 shadow-md shadow-primary/30"
              >
                <span className="material-icons text-base">login</span>
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
