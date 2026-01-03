import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Trips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const storedTrips = JSON.parse(localStorage.getItem('globaltrotter_trips') || '[]');
    setTrips(storedTrips);
  }, []);
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
      <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm border border-border-light dark:border-border-dark p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-icons-outlined text-gray-400 dark:text-gray-500">search</span>
          </div>
          <input className="block w-full pl-10 pr-3 py-2 border border-border-light dark:border-border-dark rounded-md leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors" placeholder="Search your trips..." type="text" />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap shadow-sm">
            <span className="material-icons-outlined text-lg">view_agenda</span>
            Group by
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap shadow-sm">
            <span className="material-icons-outlined text-lg">filter_list</span>
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-border-light dark:border-border-dark rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap shadow-sm">
            <span className="material-icons-outlined text-lg">sort</span>
            Sort by
          </button>
        </div>
      </div>

      <div className="space-y-10">
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
              <button className="w-max px-6 py-2.5 bg-white text-blue-700 font-semibold rounded-lg shadow-sm hover:bg-blue-50 transition-colors flex items-center gap-2">
                Explore Destinations <span class="material-icons-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ongoing</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="group bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden hover:shadow-md transition-shadow cursor-pointer relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-64 h-48 md:h-auto relative">
                  <img alt="Bali Landscape" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_yxvpc-SJEmfVPk5LeAhxxsvj2UkFUnBpLdg5d81B5ZaccPp_BLavsN6SJUyJABFTRf1EGzFbDwIoRtE4Dt20c1PSz0ZGMY9c-VD_dN1fHwOMbxRlGsyKpPS9GAnJXYvsXwfIyP7HA-yrVLKqZphWBg8H2_Ekd5zF_HmhI_dlNUbAz0ndnZmlsSIsap4G-_Hzc04BcFj32q-oQZrk32lqZOTVSRmlQ33MFTpxyZWjPzyBm38hmOheg4xgKc8JpGbXOZ0k9vonB1VR" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Bali Retreat</h3>
                        <p className="text-sm text-primary font-medium mb-3">5 Days Left • Oct 15 - Oct 25</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Active
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                      Exploring the spiritual heart of Bali. Visiting Ubud, hiking Mount Batur at sunrise, and relaxing on the beaches of Nusa Dua. Currently at: Maya Ubud Resort.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex -space-x-2 overflow-hidden">
                      <img alt="Friend 1" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy3asS2QliyxnnZ_1lhoBc9tjuMw2_nYUBXLnmSEj6zcjPZCEyr4L_ZvePf7g_MV0NYT9sJhaxo4fulAod75TPzx-pnSku4xKxaKwias1medPJ_tAM1AGAo6ChJG6VHtkTc-CinVp3sVpf9q2P5I35htKTETr1aILWJ8Zb8W_mr0UYfDg3OiBwbaTsMiH8i3zUyJPXRB3nTDMa7V3XBdeDa8YAeA8lH7PE1mrFOpg7Q4dvTPMQrjOkYi_vQ_4NmSkHTXqD8oyl3NXC" />
                      <img alt="Friend 2" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-AVL1peRPpsMI1f8MRNlDzGDRnymZfhZUa8CucFl6IChGkWSfrGDZvfploMXJTcd0PDU4rdiTH7Zm-qt0ZKzpKXDc_vYpiFEONp9xWTLJarpbPRDErb9UWL44yUDROmlOfB0uXPPFLWT1MZgQRIbsrIQ9B3GF8bv6OBfhMbdSW5ZTyCyIFvqULF1p6gcN_mtly9CwJiOo4k_PAvzIGUB4sYgzTMIDjCd-ltXXpxrfWhfak9GthQ4qOjcU0V4Z8KZ2VICxooW4Yx94" />
                      <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 bg-gray-100 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 font-medium">+2</div>
                    </div>
                    <button className="text-primary hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Details <span className="material-icons-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="material-icons-outlined text-primary">flight_takeoff</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Up-coming</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {trips.map((trip) => (
              <div key={trip.id} className="group bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-64 h-48 md:h-auto relative">
                    <img alt={trip.destination} className="w-full h-full object-cover" src={trip.image} />
                    <div className="absolute bottom-3 left-3 md:hidden">
                      <h3 class="text-lg font-bold text-white drop-shadow-md">{trip.destination}</h3>
                    </div>
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
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="material-icons-outlined text-base">calendar_today</span>
                        <span>Upcoming</span>
                      </div>
                      <button className="text-primary hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details <span className="material-icons-outlined text-base">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="group bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-64 h-48 md:h-auto relative">
                  <img alt="Paris Street" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOZlD3RH9hQfMNbldykDbxA1h452fokRGjGQQyKWjlV1lJKFNldvwuLpw-kvLu70Xoi4pF-Jbt4AKtYtP6YKQUIy84wrRecwVoQLYSM_AmuPBjdmtYGry_GbsILz90Np9VPUmbdvWSSugxuDoNzM1cfoaRECzuyWtSWk4D9e9LHXrLnwMipBLjVhuiR7xJz6hNLBTnP37mP7lFjGQ7XO679LhULlKxGVIkokzvk3AK8B-g9n85p0TBrNQTnNWtRfY_jQiCB-vz43Kp" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Paris Winter Gateway</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-3">Dec 20 - Jan 03</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Planned
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                      A romantic getaway for the holidays. Visiting the Louvre, Eiffel Tower dinner, and a day trip to Versailles. Hotel bookings confirmed.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="material-icons-outlined text-base">attach_money</span>
                      <span>Budget: $3,500</span>
                    </div>
                    <button className="text-primary hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Details <span className="material-icons-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="material-icons-outlined text-gray-400">beenhere</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Completed</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {[
              { title: 'Tokyo Adventure', date: 'Mar 10 - Mar 20, 2023', rating: 4.5, desc: 'Cherry blossom season tour. Akihabara shopping spree, Sushi making class in Tsukiji, and a bullet train ride to Kyoto.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5Qf_mhETs5btT5yGyj6mPOaKIVIZYWivqVb4oncWdHyMqrs3xHVfEvGn1dJ3Hdqj2Y2fI0lmHggeI2RM4fUQZxKUxPEUeo-x-Ie-ACbRC2jHHKzdQKZjvOUNHNXZZCLw7ygjbX7jcjI2nPnxlxn8JIRcCGRd5uZ05Miipf1e281X8a9666-KhYKvmI8Iv5rOaRqmvZeFIS_Xy7fJ3GxFO4ZQZ2rLoqjxtDtF7a6A6PH0FO7S16o781JPxCeXtHxNDN5dBVejjo55i' },
              { title: 'Dubai Weekend Escape', date: 'Nov 05 - Nov 08, 2022', rating: 5, desc: 'Luxury shopping and desert safari. Stayed at Atlantis The Palm. Visited Burj Khalifa and the Dubai Mall.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBubE4u-dFw1X7qMibPgluIAf00YCB5p_yvROoZB-w2-98yYIFpI3WJBAlb_JgE0bGOVVSg769-R0rUG4N0Ji__80hcZox_tF5R1Bfx0PAzhXMDgflt2q3xfgSi_psdkfYYd-qWB7TxlJsgV9lNzcaVkeKM8LW-OFL63IwDVXwAGZccuLK-T721TpfY4c3vXfze_iNS1waNK9-qhyWWw_VmXAeYw6XdlEto5OI6Dt9kD7KisbsIHEBTBU22sjSRwoRwFqnPa9BGxrCe' }
            ].map((trip, idx) => (
              <div key={idx} className="group bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden hover:shadow-md transition-shadow cursor-pointer opacity-80 hover:opacity-100">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-64 h-48 md:h-auto relative">
                    <img alt={trip.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" src={trip.img} />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{trip.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-3">{trip.date}</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          Completed
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                        {trip.desc}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="material-icons-outlined text-sm">
                            {i < Math.floor(trip.rating) ? 'star' : i < trip.rating ? 'star_half' : 'star_border'}
                          </span>
                        ))}
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({trip.rating})</span>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Review <span className="material-icons-outlined text-base">rate_review</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Trips;

