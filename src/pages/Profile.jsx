import { useState, useEffect } from 'react';

const Profile = () => {
  const [pastTrips, setPastTrips] = useState([]);
  const [preplannedTrips, setPreplannedTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    img: ''
  });
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);

  useEffect(() => {
    // Get trips from localStorage
    const savedTrips = JSON.parse(localStorage.getItem('pastTrips') || '[]');
    // Merge with default trips
    const defaultTrips = [
      { title: 'India Expedition', date: 'Jan 2023', rating: 4.5, desc: 'An incredible journey through the Golden Triangle. The Taj Mahal at sunrise was unforgettable.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFf0x-lvvElRCu7auzwl1kolhhA7TriG4pmim3VWH2v61X7gp7DTVMVna8LA9zxMBV0lGuMB2Ep6RGU89AA1xlcoKFK3A5B63-oLPpvPnLJkdTr8MvgTbXp6Gl9vcxRG6awGyJdrwV_snbfD1sbvmkMi7RXrtsQSHB3dJTc8lkYHTl6Va2f1Q1jER4sdK3bJvbmcNRpkKntim4lFCXTJlz-5hW5Al2Sw4Qz7NhHJwCePYf2UlzZLGtPvl4Kkxx63OvRQ8j-OV4mn-T' },
      { title: 'Australian Coast', date: 'Nov 2022', rating: 5, desc: 'Surfing in Bondi, hiking in the Blue Mountains, and coffee culture in Melbourne.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBw_GtUvlUT5lQ-JUPu3WFgwl88VyJw7c2cTJfGJyf0PFHzzLVc5KlqhojJl3VauekuuOmgJGVY_0gknnMv8NUTGEmrOK031WU8SgNO2Q8NnyfpBk_jO2cZL8Btzy-fUpJy2hiBlt06EiLj7VsiqzrZhliYoibp8KnjA6og1gC8ic14jhfigfn2VR1jRYXNQ1P0rdcxA5ad_vUsiHDwSx305gi23hQ5_mLxA_fKY4mK9FRj9XtuB9tA8MU5fZVo_o7j3iDRwJHHKID' },
      { title: 'Euro Trip', date: 'Aug 2022', rating: 4, desc: 'Backpacking through Netherlands, Belgium, and Germany. Lots of beer and chocolate.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM5WQ_HbJ95gpp-yhDIGmfb6lMH5XPGN1zZSpIVJ6e-5P9jcGCjwB07Ei6l4XGlmRo0EAFoe-ElInYeIpInHfhHT4TxfH3medXJ2duHNgMHpWUKLj0pfieJGluG77_6tTXH5vBKMclC34oZTwaNIoCrcdoOjwJGAkfXu9q2Yzsm3-wa738w1FPLEBP1lsP8NC1_Fmp0_FyaEJbL5yvf26O3hUPUd8jgveC--JFrlilDEJpATXQzfPVxbHxFgSEf2SQuDKL8TpAnGQe' }
    ];
    setPastTrips([...savedTrips.map(trip => ({
      title: trip.title,
      date: trip.date,
      rating: trip.rating || 4,
      desc: trip.desc || trip.description,
      img: trip.img
    })), ...defaultTrips]);

    // Preplanned trips logic
    const savedPreplanned = JSON.parse(localStorage.getItem('preplannedTrips') || '[]');
    const defaultPreplanned = [
      { title: 'Autumn in Kyoto', date: 'Nov 12 - Nov 20, 2024', status: 'Upcoming', tag: 'Relaxation', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL9QM8G_T7MSeAndGFJKJ7A5Ev2iQ0eYUHVmu5Jsj5ZeutRL16fcyxnF6tz5VBUYF7ww6djCNttyzBXtYJz7dUQWddUEOuhV_G7R7llN0OY0AOyA3NZ6zeywJ8WhM9kkyH4uWKsJxhj1fkcJwZBnNIZ3USUn1VnZhBApQTuY8Dd1FFWV1yc0WUvJ5lr9z9QY2V-y7kfoMU1ZFGehOdrHegQKqv52jPDqTuguzZnB7Km-IiOt0BGyTA-mXxX0Eo2334wRcP3ooDWWUy' },
      { title: 'Parisian Escape', date: 'May 05 - May 12, 2025', status: 'Draft', tag: 'Culture', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzQW5NCrK70Ond-Ya9f4moJjchFI-4CsCo9CuAkhme0E0-4R9PkOXOf9R2-X81x5tAbo9vjVp6Bh6dobYBf2aVVIT5bhj8dWIh5uxvu_7OVo2uhe2XZ3PEvSQlJVB7soSdwuIaQwu7BDkfyOmVirGMswaXaS52zXU4LDQvZ4E3UWXZbFjRM5xlw3msFzRB-70YxDLfKR0JKxhS75ZmCGwv3ZJfHyJefCfY9oE-fvMEjMaR8vvOiqS_NIuSstmQXwDaGHkqSxEZOfke' },
      { title: 'Italian Summer', date: 'Jul 10 - Jul 24, 2025', status: 'Upcoming', tag: 'Beach', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3k8icgMe-uEoMG-Cx8faGXmynXMd-Ii-zNrYjch6C7WG0BqBXpZpAwRJbVhZ_35FPKOZOvAFhRoTTjgcEr1xwQUju6wzL5aWAZAuST8gH1vQ75kVOkCudcq9zKfjQozkea3OlbBUzxz5ZUNnB-ZhA0oX4ggYIoNnpc2fRRI67wvAU7NUaf7Y3hMaIKT-4_qjNLejxCaObYo754eqP4zbVoE7JMyuC9ayEIbcvf2TLKnQRw9VmKmibgWA3WntgnuWIGPgGHZUuT01I' }
    ];
    // Avoid dups if loading from localstorage contains defaults
    setPreplannedTrips(savedPreplanned.length > 0 ? savedPreplanned : defaultPreplanned);
  }, []);

  const handleFetchPhotos = () => {
    setIsLoadingPhotos(true);
    // Simulate API call
    setTimeout(() => {
      const images = [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD_yxvpc-SJEmfVPk5LeAhxxsvj2UkFUnBpLdg5d81B5ZaccPp_BLavsN6SJUyJABFTRf1EGzFbDwIoRtE4Dt20c1PSz0ZGMY9c-VD_dN1fHwOMbxRlGsyKpPS9GAnJXYvsXwfIyP7HA-yrVLKqZphWBg8H2_Ekd5zF_HmhI_dlNUbAz0ndnZmlsSIsap4G-_Hzc04BcFj32q-oQZrk32lqZOTVSRmlQ33MFTpxyZWjPzyBm38hmOheg4xgKc8JpGbXOZ0k9vonB1VR',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDOZlD3RH9hQfMNbldykDbxA1h452fokRGjGQQyKWjlV1lJKFNldvwuLpw-kvLu70Xoi4pF-Jbt4AKtYtP6YKQUIy84wrRecwVoQLYSM_AmuPBjdmtYGry_GbsILz90Np9VPUmbdvWSSugxuDoNzM1cfoaRECzuyWtSWk4D9e9LHXrLnwMipBLjVhuiR7xJz6hNLBTnP37mP7lFjGQ7XO679LhULlKxGVIkokzvk3AK8B-g9n85p0TBrNQTnNWtRfY_jQiCB-vz43Kp'
      ];
      const randomConfig = images[Math.floor(Math.random() * images.length)];
      setFormData(prev => ({ ...prev, img: randomConfig }));
      setIsLoadingPhotos(false);
    }, 1500);
  };

  const handleCreateTrip = (e) => {
    e.preventDefault();
    if (!formData.destination || !formData.startDate) {
      alert("Please fill in destination and start date");
      return;
    }

    const newTrip = {
      title: formData.destination,
      date: `${formData.startDate} - ${formData.endDate || 'TBD'}`,
      status: 'Draft',
      tag: 'New',
      img: formData.img || 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3k8icgMe-uEoMG-Cx8faGXmynXMd-Ii-zNrYjch6C7WG0BqBXpZpAwRJbVhZ_35FPKOZOvAFhRoTTjgcEr1xwQUju6wzL5aWAZAuST8gH1vQ75kVOkCudcq9zKfjQozkea3OlbBUzxz5ZUNnB-ZhA0oX4ggYIoNnpc2fRRI67wvAU7NUaf7Y3hMaIKT-4_qjNLejxCaObYo754eqP4zbVoE7JMyuC9ayEIbcvf2TLKnQRw9VmKmibgWA3WntgnuWIGPgGHZUuT01I'
    };

    const updatedTrips = [...preplannedTrips, newTrip];
    setPreplannedTrips(updatedTrips);
    localStorage.setItem('preplannedTrips', JSON.stringify(updatedTrips));

    setShowModal(false);
    setFormData({ destination: '', startDate: '', endDate: '', img: '' });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <section className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative group">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-gray-100 dark:ring-gray-700 shadow-md">
            <img alt="Profile Picture of John Doe" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD98XcaxkSBFjYCj9Ade8PZsWb1mldnC5cge_gLvKmtcMUcPB9yuFehVdkjnOgavQ8aTZzM7EiF4Kf1H8YzTlihTdqDnF5UWleWcnK78MVpPC06Oo1ozFPaw-qf__j5jfk4Lzz4fQtA0QfrQfwED1FnEDbPKCoqXtYvnhpVGZnqwUXDyMertsl4itKGON4ddtsVYpdV_YMteD8ulzDnXVY6xQ6B_HRH8JG5iG-GXGR6jWLL3ImCxXmUTtJvyAoZmdgXc8s0TMMo0HuK" />
          </div>
          <button className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors" title="Change Avatar">
            <span className="material-icons-outlined text-sm">camera_alt</span>
          </button>
        </div>
        <div className="flex-1 w-full text-center md:text-left">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">John Doe</h1>
              <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center md:justify-start gap-1">
                <span className="material-icons-outlined text-sm">location_on</span> New York, USA
              </p>
            </div>
            <button className="mt-4 md:mt-0 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 mx-auto md:mx-0">
              <span className="material-icons-outlined text-sm">edit</span> Edit Profile
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
            Travel enthusiast exploring the world one city at a time. Lover of architectural history, street food, and hidden gems. Currently planning my next big adventure to Southeast Asia!
          </p>
          <div className="grid grid-cols-3 gap-4 border-t border-gray-100 dark:border-gray-700 pt-6">
            <div className="text-center md:text-left">
              <span className="block text-2xl font-bold text-gray-900 dark:text-white">12</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Countries</span>
            </div>
            <div className="text-center md:text-left">
              <span className="block text-2xl font-bold text-gray-900 dark:text-white">45</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Cities</span>
            </div>
            <div className="text-center md:text-left">
              <span className="block text-2xl font-bold text-gray-900 dark:text-white">8</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Planned Trips</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="material-icons-outlined text-primary">flight_takeoff</span>
            Preplanned Trips
          </h2>
          <div className="flex gap-2">
            <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="material-icons-outlined">chevron_left</span>
            </button>
            <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <span className="material-icons-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory">
          {preplannedTrips.map((trip, idx) => (
            <div key={idx} className="snap-start shrink-0 w-80 bg-card-light dark:bg-card-dark rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800">
              <div className="h-48 relative">
                <img alt={trip.title} className="w-full h-full object-cover" src={trip.img} />
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 px-2 py-1 rounded text-xs font-bold text-gray-800 dark:text-white shadow-sm">
                  {trip.status}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{trip.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{trip.date}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{trip.tag}</span>
                  <button className="text-primary hover:text-blue-700 dark:hover:text-blue-400 font-medium text-sm flex items-center gap-1 group">
                    View Details
                    <span className="material-icons-outlined text-sm transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div
            onClick={() => setShowModal(true)}
            className="snap-start shrink-0 w-80 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center p-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-icons-outlined text-gray-400 dark:text-gray-500 text-3xl">add</span>
            </div>
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">Plan a new trip</h3>
            <p className="text-sm text-gray-400 dark:text-gray-500 text-center mt-2">Start a new adventure from scratch</p>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="material-icons-outlined text-primary">history</span>
            Previous Trips
          </h2>
          <a className="text-sm text-primary hover:underline" href="#">View All History</a>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory">
          {pastTrips.map((trip, idx) => (
            <div key={idx} className="snap-start shrink-0 w-80 bg-card-light dark:bg-card-dark rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800 opacity-90 hover:opacity-100">
              <div className="h-48 relative grayscale hover:grayscale-0 transition-all duration-500">
                <img alt={trip.title} className="w-full h-full object-cover" src={trip.img} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="text-white font-bold">{trip.title}</div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-icons-outlined text-sm">
                      {i < Math.floor(trip.rating) ? 'star' : i < trip.rating ? 'star_half' : 'star_border'}
                    </span>
                  ))}
                  <span className="text-xs text-gray-400 ml-auto">{trip.date}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                  {trip.desc}
                </p>
                <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  View Album
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Trip Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-fadeIn">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Plan a New Trip</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <span className="material-icons-outlined">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Destination</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Where to?"
                    className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-primary focus:border-primary"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  />
                  <button
                    onClick={handleFetchPhotos}
                    disabled={isLoadingPhotos}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-1"
                  >
                    {isLoadingPhotos ? (
                      <span className="material-icons-outlined animate-spin">refresh</span>
                    ) : (
                      <span className="material-icons-outlined">image_search</span>
                    )}
                  </button>
                </div>
              </div>

              {formData.img && (
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <img src={formData.img} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">Photo Selected</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-primary focus:border-primary"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                  <input
                    type="date"
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-primary focus:border-primary"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTrip}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm"
              >
                Create Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Profile;
