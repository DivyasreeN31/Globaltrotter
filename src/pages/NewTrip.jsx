import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const NewTrip = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!destination || !startDate || !endDate) {
      alert('Please fill in all fields');
      return;
    }

    if (!auth.currentUser) {
      alert('You must be logged in to create a trip');
      return;
    }

    setIsSubmitting(true);

    const images = [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_yxvpc-SJEmfVPk5LeAhxxsvj2UkFUnBpLdg5d81B5ZaccPp_BLavsN6SJUyJABFTRf1EGzFbDwIoRtE4Dt20c1PSz0ZGMY9c-VD_dN1fHwOMbxRlGsyKpPS9GAnJXYvsXwfIyP7HA-yrVLKqZphWBg8H2_Ekd5zF_HmhI_dlNUbAz0ndnZmlsSIsap4G-_Hzc04BcFj32q-oQZrk32lqZOTVSRmlQ33MFTpxyZWjPzyBm38hmOheg4xgKc8JpGbXOZ0k9vonB1VR",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDOZlD3RH9hQfMNbldykDbxA1h452fokRGjGQQyKWjlV1lJKFNldvwuLpw-kvLu70Xoi4pF-Jbt4AKtYtP6YKQUIy84wrRecwVoQLYSM_AmuPBjdmtYGry_GbsILz90Np9VPUmbdvWSSugxuDoNzM1cfoaRECzuyWtSWk4D9e9LHXrLnwMipBLjVhuiR7xJz6hNLBTnP37mP7lFjGQ7XO679LhULlKxGVIkokzvk3AK8B-g9n85p0TBrNQTnNWtRfY_jQiCB-vz43Kp",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5Qf_mhETs5btT5yGyj6mPOaKIVIZYWivqVb4oncWdHyMqrs3xHVfEvGn1dJ3Hdqj2Y2fI0lmHggeI2RM4fUQZxKUxPEUeo-x-Ie-ACbRC2jHHKzdQKZjvOUNHNXZZCLw7ygjbX7jcjI2nPnxlxn8JIRcCGRd5uZ05Miipf1e281X8a9666-KhYKvmI8Iv5rOaRqmvZeFIS_Xy7fJ3GxFO4ZQZ2rLoqjxtDtF7a6A6PH0FO7S16o781JPxCeXtHxNDN5dBVejjo55i",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBubE4u-dFw1X7qMibPgluIAf00YCB5p_yvROoZB-w2-98yYIFpI3WJBAlb_JgE0bGOVVSg769-R0rUG4N0Ji__80hcZox_tF5R1Bfx0PAzhXMDgflt2q3xfgSi_psdkfYYd-qWB7TxlJsgV9lNzcaVkeKM8LW-OFL63IwDVXwAGZccuLK-T721TpfY4c3vXfze_iNS1waNK9-qhyWWw_VmXAeYw6XdlEto5OI6Dt9kD7KisbsIHEBTBU22sjSRwoRwFqnPa9BGxrCe"
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];

    try {
      await addDoc(collection(db, 'trips'), {
        userId: auth.currentUser.uid,
        destination,
        startDate,
        endDate,
        image: randomImage,
        status: 'planned',
        createdAt: serverTimestamp()
      });
      setIsSubmitting(false);
      navigate('/trips');
    } catch (error) {
      console.error("Error creating trip: ", error);
      alert("Failed to create trip. Please try again.");
      setIsSubmitting(false);
    }
  };
  return (
    <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-7 text-slate-900 dark:text-white sm:text-3xl sm:truncate">
            Create a New Trip
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Start planning your next adventure by filling out the details below.
          </p>
        </div>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark shadow rounded-lg overflow-hidden border border-border-light dark:border-border-dark mb-10">
        <div className="px-4 py-5 sm:px-6 border-b border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800/50">
          <h3 className="text-lg leading-6 font-medium text-slate-900 dark:text-white flex items-center">
            <span className="material-icons text-primary mr-2 text-base">edit_calendar</span>
            Plan a new trip
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <form className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6" onSubmit={handleSubmit}>
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="destination">
                Select a Place
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-icons text-slate-400 text-lg">place</span>
                </div>
                <input
                  className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
                  id="destination"
                  name="destination"
                  placeholder="Where do you want to go? e.g. Paris, Tokyo"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="start-date">
                Start Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-icons text-slate-400 text-lg">calendar_today</span>
                </div>
                <input
                  className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
                  id="start-date"
                  name="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="end-date">
                End Date
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-icons text-slate-400 text-lg">event</span>
                </div>
                <input
                  className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400"
                  id="end-date"
                  name="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-6 mt-6 flex justify-end gap-3 border-t border-border-light dark:border-border-dark pt-6">
              <button
                type="button"
                onClick={() => navigate('/trips')}
                className="inline-flex justify-center py-2 px-6 border border-border-light dark:border-border-dark shadow-sm text-sm font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={isSubmitting}
                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
              >
                {isSubmitting ? 'Creating...' : 'Start Planning'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center">
            <span className="material-icons text-primary mr-2">explore</span>
            Suggestions for Places to Visit / Activities
          </h2>
          <a className="text-sm font-medium text-primary hover:text-sky-600 dark:hover:text-sky-400 flex items-center" href="#">
            See all
            <span className="material-icons text-base ml-1">arrow_forward</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Paris City Tour', country: 'France', tag: 'Popular', tagColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', rating: 4.8, price: '₹120 / person', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJk1m2-6XjywezphXRbriOKXbHEDypXQ3wC3O3BHwT3dPsuApTHfEzRxEPSMYvkTKYZ0B2TTosFfOOYRTdtBIu7u_fEg7bJGYaP9uGaCDH3ngBo5gepuTJxc5kaThmCK2n7IMGvWsRMYpr3cjSCZ-FjIT2vVm_xc9WKhowT89pRNd0SrRXxwu_0URM1R-2xNgNjlrHw4WVuF304YNIUBz6_bdkQewIsPj6svMGP6UEO7KfdAspzsIYjN2maFVDR7biY6By02SYYdVY' },
            { title: 'Tokyo Night Walk', country: 'Japan', rating: 4.9, price: '₹45 / person', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5ShFOALPaHicmeSYlhIduRQ6dKeL-vQv7pz2uoPtgHhwc76tH0_j8kEUKZcMRj0KiCQ7rwBMvs5kuEc0XqB2h93zd9sXfBZ_UHaFQVSbCRD0Rfz4EnXrLfYgEYtydh6SNcQoVTLud05SunElomeKybddXVPfWAFkSXz2E4y1vDjBAtSgEWCHxhv_jzU8vVac1QrtPjyA2aSsEUmN-DGJEf1sKBT495X1VWPsAsKR7H5ov7RY2ZiXjV8UNloZeZaPyvnMqzG8gOJFw' },
            { title: 'Bali Beach Retreat', country: 'Indonesia', rating: 4.7, price: '₹800 / week', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGz3CBQplrc6H4r5zDznEiafwaTxjmtIPwv-Pjb55jnPPB6ZzbkrEbCisBl7ZXJJGyDJ4OY1_Co9EtM6x-jGLy88_YWIU_iffVWQDojBC-uvMuk0EdxHGFnVUYljwZ021eyOJ7JUM5tb5hYziylt7-J-yhijXleuZcQGgoJ5SHCAOigjh3yWyS7VYh7uuUoBJ-q5kMt913K7lMQK6JF8rrZHPKurerCtaEQo9DHu_M-EbkM_Ruz-o0ahLDdhfxWvfmHjIJMdURF5I9' },
            { title: 'Pyramid Exploration', country: 'Egypt', tag: 'Adventure', tagColor: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200', rating: 4.6, price: '₹200 / person', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHO4Us8wC5NLg-2Q9iOiWGMdDFfKIXI0qaSenek-rNgVoUSkYIW-zUDcqobBksgC01rsK9L2vvGTy2Hf2d0Wd-hRn1cT_lfgPXrJFESjLeOmk9urd66ZIH_rigm24YMMODJCAsaTm3Ol-N9iDjIcKdVvdLUYYS8KVaG1-eFnUCEcCiX76Ykk1F6BP59swyI-JANIYZHVSDJOsCSGB6htjFau764PLtx1smFXzhGuOSeCLGsOeZvESl7sLTdo0-jP4MlW9pOGpIaNI2' },
            { title: 'Alpine Hiking', country: 'Switzerland', rating: 5.0, price: 'Free', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt7l0sdH7j0ArWQS3OvO62B4Zg08xed1OvAT9dJwK2Xwtu6KKmCUrwossxle94lAzBVMpBA1Ftf6qdI_Tsav_zxeOhFAsJOwC41MNx3S_7fRUqShTlcFwa-V7P7uNVc5atjYqpNSLuZExUkvYmUgBb0IBfW-_os_N1sgMsfk1MQ5XFHKM5a92T7nb1J_7Q0S-t16F8SutfFcheJwQFRouMitKnfAo2kameCHL35ym8tgvFlAluAvhUvikDAfAlu7g_0i6aCeLZ76xh' },
            { title: 'Luxury Escape', country: 'Maldives', rating: 4.9, price: '₹1200 / night', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDik--dfL9XH9-NcQu4IXkjp6kM1ASTnvpQse3izR2kKuiQz5P6ywAR5vLLv3JVJonLbskotgYMEYH28_P4x2xICxezTAPKLmU6j9aZ53pKtnBTVDYCm395b-2lK0z8upWxP72fpz0M0jR060i4wFvsIaGWoRVM-kaYqf9dvbfqNGwf3dmZMbe3ZTaxGuNH2KEFTL-mHmge0o5uBc9WDRe1cZifM76nLt7Aqtb4YHE6hyteBdal1b2rsg5XL1LmxfmAPnMOJlCz8sH0' }
          ].map((item, idx) => (
            <div key={idx} className="group relative bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm border border-border-light dark:border-border-dark hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer">
              <div className="aspect-w-3 aspect-h-2 bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                <img alt={item.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src={item.img} />
                <div className="absolute top-2 right-2 bg-white dark:bg-slate-900 p-1.5 rounded-full shadow-sm">
                  <span className="material-icons text-slate-400 hover:text-red-500 text-sm block">favorite_border</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.country}</p>
                  </div>
                  {item.tag && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center">
                    <span className="material-icons text-sm mr-1">star</span> {item.rating}
                  </span>
                  <span>{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default NewTrip;

