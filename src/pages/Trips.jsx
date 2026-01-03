import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db, auth } from '../firebase/config';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

const Trips = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const { user, loading: authLoading } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    // If auth is still loading, wait
    if (authLoading) return;

    // If no user is authenticated, stop loading and clear trips
    if (!user) {
      setTrips([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    let unsubscribe = () => { };

    try {
      const q = query(
        collection(db, 'trips'),
        where('userId', '==', user.uid)
      );

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tripsData = [];
        querySnapshot.forEach((doc) => {
          tripsData.push({ id: doc.id, ...doc.data() });
        });
        setTrips(tripsData);
        setLoading(false);
      }, (err) => {
        console.error("Firestore onSnapshot error:", err);
        setError("Failed to sync trips. Please check your connection or permissions.");
        setLoading(false);
      });
    } catch (err) {
      console.error("Firestore query creation error:", err);
      setError("An unexpected error occurred while setting up the trip list.");
      setLoading(false);
    }

    return () => unsubscribe();
  }, [user, authLoading]);

  const filterMatches = (title) => title?.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
      <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm border border-border-light dark:border-border-dark p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-icons-outlined text-gray-400 dark:text-gray-500">search</span>
          </div>
          <input
            className="block w-full pl-10 pr-3 py-2 border border-border-light dark:border-border-dark rounded-md leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
            placeholder="Search your trips..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {['All', 'Ongoing', 'Upcoming', 'Completed'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex items-center gap-2 px-6 py-2 text-sm font-medium border rounded-md transition-all whitespace-nowrap shadow-sm ${activeFilter === filter
                ? 'bg-primary text-white border-primary'
                : 'text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-10">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl text-red-600 dark:text-red-400">
            <div className="flex items-center gap-2 font-bold mb-1">
              <span className="material-icons">error_outline</span>
              Error Loading Trips
            </div>
            <p className="text-sm">{error}</p>
            {error.includes('index') && (
              <p className="text-xs mt-2 italic">
                Note: This usually means a Firestore Index needs to be created. Please check the browser console for the direct creation link.
              </p>
            )}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <span className="material-icons animate-spin text-primary text-4xl">refresh</span>
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/newtrip" className="md:col-span-1 group flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-surface-light dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800/80 hover:border-primary dark:hover:border-primary transition-all duration-300 cursor-pointer h-64">
                <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-all duration-300 shadow-sm">
                  <span className="material-icons-outlined text-gray-400 group-hover:text-primary transition-colors text-3xl">add</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">Plan a new trip</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center px-4">Start a new adventure from scratch</p>
              </Link>

              <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white shadow-lg flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-icons-outlined text-9xl">public</span>
                </div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2">Explore the World</h2>
                  <p className="text-blue-100 max-w-lg mb-6">Discover trending destinations and hidden gems for your next journey.</p>
                  <Link to="/explore" className="w-max px-6 py-2.5 bg-white text-blue-700 font-semibold rounded-lg shadow-sm hover:bg-blue-50 transition-colors flex items-center gap-2">
                    Explore Destinations <span className="material-icons-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* Empty State */}
            {!loading && trips.length === 0 && (
              <div className="text-center py-20 bg-surface-light dark:bg-surface-dark rounded-2xl border border-dashed border-border-light dark:border-border-dark">
                <span className="material-icons-outlined text-6xl text-gray-300 mb-4">flight_takeoff</span>
                <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">No trips planned yet</h2>
                <p className="text-text-muted-light dark:text-text-muted-dark mt-2">Start by creating your first adventure!</p>
                <Link to="/newtrip" className="mt-6 inline-flex bg-primary text-white px-6 py-2 rounded-lg font-medium">Create Trip</Link>
              </div>
            )}

            {/* Ongoing Section */}
            {(activeFilter === 'All' || activeFilter === 'Ongoing') && trips.filter(t => t.status === 'ongoing' && filterMatches(t.destination)).length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ongoing</h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {trips.filter(t => t.status === 'ongoing' && filterMatches(t.destination)).map((trip) => (
                    <div key={trip.id} className="group bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative">
                      <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-64 h-48 md:h-auto relative">
                          <img alt={trip.destination} className="w-full h-full object-cover" src={trip.image} />
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{trip.destination} Trip</h3>
                                <p className="text-sm text-primary font-medium mb-3">{trip.startDate} - {trip.endDate}</p>
                              </div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                Active
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                              Your current adventure in {trip.destination}. Capturing moments and making memories!
                            </p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex gap-3">
                              <button
                                onClick={() => navigate(`/itinerary/${trip.id}`)}
                                className="text-primary hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                              >
                                View Details <span className="material-icons-outlined text-base">arrow_forward</span>
                              </button>
                              <button
                                onClick={() => navigate(`/budget/${trip.id}`)}
                                className="text-green-600 hover:text-green-700 dark:hover:text-green-400 text-sm font-medium flex items-center gap-1 transition-all"
                              >
                                Budget <span className="material-icons-outlined text-base">savings</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Upcoming Section */}
            {(activeFilter === 'All' || activeFilter === 'Upcoming') && trips.filter(t => (t.status === 'planned' || t.status === 'upcoming') && filterMatches(t.destination)).length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-icons-outlined text-primary">flight_takeoff</span>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming</h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {trips.filter(t => (t.status === 'planned' || t.status === 'upcoming') && filterMatches(t.destination)).map((trip) => (
                    <div key={trip.id} className="group bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-64 h-48 md:h-auto relative">
                          <img alt={trip.destination} className="w-full h-full object-cover" src={trip.image} />
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="hidden md:block text-xl font-bold text-gray-900 dark:text-white mb-1">{trip.destination} Trip</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-3">{trip.startDate} - {trip.endDate}</p>
                              </div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                Planned
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                              Your upcoming trip to {trip.destination}. Get ready for an amazing adventure!
                            </p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex gap-3">
                              <button
                                onClick={() => navigate(`/itinerary/${trip.id}`)}
                                className="text-primary hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                              >
                                View Details <span className="material-icons-outlined text-base">arrow_forward</span>
                              </button>
                              <button
                                onClick={() => navigate(`/budget/${trip.id}`)}
                                className="text-green-600 hover:text-green-700 dark:hover:text-green-400 text-sm font-medium flex items-center gap-1 transition-all"
                              >
                                Budget <span className="material-icons-outlined text-base">savings</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Completed Section */}
            {(activeFilter === 'All' || activeFilter === 'Completed') && trips.filter(t => t.status === 'completed' && filterMatches(t.destination)).length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-icons-outlined text-gray-400">beenhere</span>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Completed</h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {trips.filter(t => t.status === 'completed' && filterMatches(t.destination)).map((trip) => (
                    <div key={trip.id} className="group bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden hover:shadow-md transition-shadow cursor-pointer opacity-80 hover:opacity-100">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-64 h-48 md:h-auto relative">
                          <img alt={trip.destination} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" src={trip.image} />
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{trip.destination} Trip</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-3">{trip.startDate} - {trip.endDate}</p>
                              </div>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                Completed
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                              A wonderful journey to {trip.destination} completed. Cherishing the memories!
                            </p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex gap-3">
                              <button
                                onClick={() => navigate(`/itinerary/${trip.id}`)}
                                className="text-primary hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                              >
                                View Details <span className="material-icons-outlined text-base">arrow_forward</span>
                              </button>
                              <button
                                onClick={() => navigate(`/budget/${trip.id}`)}
                                className="text-green-600 hover:text-green-700 dark:hover:text-green-400 text-sm font-medium flex items-center gap-1 transition-all"
                              >
                                Budget <span className="material-icons-outlined text-base">savings</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Trips;
