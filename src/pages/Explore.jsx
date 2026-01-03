import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

const Explore = () => {
  const [pastTrips, setPastTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const defaultTrips = [
      { title: 'Winter in NYC', date: 'Dec 2023', desc: 'A week-long exploration of Manhattan, featuring ice skating.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEk8RZsxWRUopuXaPK15_WWfv2OfTqdd7F9rZE-sKN-MgqcmoIumpXfsZJ2Lrstvrpir8iIiwT5PhFYwuaUEsdMYhKrv3N0pT7Eoi5jLV4YLzhntVgiKH7OD2yWIX72qFyFzu0f-JUBW4nOBWv3Vmqk3BB_SZkmfxSIKRITC2CkZ84R_k2VEfFPIILutND2Fl6OQX7IzTs8q2_Z74dt0fVnHz4MFoeBpFmHxo2FlUl1kcD78u4j9fJjDAdTjoxRdvMsgdUSFlE_J9W' },
      { title: 'Appalachian Hike', date: 'Oct 2023', desc: 'Hiking through the Smoky Mountains during peak fall foliage.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlXFThcoZKRbYtp5q_ptQCOxZ_L6Atuz0EkVg5sOR_AJDQ7A5nGJTpfR-rgO6uGXUQU6qg8i4PdgMcbvVbUrNRuusk3EDI9pmTvKlGG6aorurlXUupk6GfVrHebAA9uETYJs_DS91pOVXJ5s3jX29FXKwi7xOVFby6eKFRi6z8oGhwAipa79Mc1i_PTm29IbGd_OyvDNV0JrV-xf3QZw_Vf8ff7K8j2R14AkWzRbc7SqnQUfyrsAevWGrK2norTJzK6xNvxvmmJNNn' }
    ];

    if (!auth.currentUser) {
      setPastTrips(defaultTrips);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'past_trips'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tripsData = [];
      querySnapshot.forEach((doc) => {
        tripsData.push({ id: doc.id, ...doc.data() });
      });
      setPastTrips([...tripsData, ...defaultTrips]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <section className="relative h-[500px] w-full rounded-3xl overflow-hidden group shadow-xl">
        <img
          alt="Scenic mountain landscape with a traveler"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcCiTOdhkISnS8-alCXEHFYkbZQ7WYj32xd9xVj7NRrMrTmnVn6BJdjO9H-ext5V-dYIjWwSnzP2nUW99-Yw6SntfZ7EBe7pq_OWCkqP60eCik861wV3W_BbV6hWrgMFjH90cQsdEz6TtaLDwXQuecvKbHkW4C80RU5Fft12PJOHY_s9iW3_V_LPz8b2EAxZM-EHpRB9JpG_-iGjh4XmB7oqjgit7TGKQC7KoYLlxRcD7XUt56DAM7q8uN-X4mzcRdj_DWkRRM2Y9D"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-center items-center text-center p-8 md:p-12">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6 drop-shadow-lg">
            Where to next?
          </h1>
          <p className="text-white/90 text-lg md:text-2xl max-w-2xl font-light mb-10 drop-shadow-md leading-relaxed">
            Discover new destinations, plan your itinerary, and create memories that last a lifetime.
          </p>
          <div className="w-full max-w-3xl bg-surface-light dark:bg-surface-dark p-2 rounded-full shadow-2xl flex items-center border border-gray-100 dark:border-gray-700">
            <div className="pl-4 pr-2 text-gray-400">
              <span className="material-icons">search</span>
            </div>
            <input
              className="w-full bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-500 focus:ring-0 text-lg py-3 outline-none"
              placeholder="Search destinations, trips, or activities..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-bold transition-all shadow-md active:scale-95">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto hide-scroll pb-1 md:pb-0 w-full md:w-auto">
          {['All', 'Culture', 'Coastal', 'City', 'Nature', 'Romance'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all text-sm font-medium whitespace-nowrap shadow-sm ${activeCategory === cat
                ? 'bg-primary text-white border-primary'
                : 'bg-surface-light dark:bg-surface-dark text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Top Regional Selections</h2>
            <p className="text-subtext-light dark:text-subtext-dark mt-1">Curated destinations just for you</p>
          </div>
          <Link className="text-primary hover:text-primary-hover font-medium text-sm flex items-center gap-1 transition-colors" to="/explore">
            View all <span className="material-icons text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="flex overflow-x-auto pb-6 gap-6 hide-scroll snap-x snap-mandatory">
          {[
            { name: 'Kyoto, Japan', tag: 'Popular', tagColor: 'bg-primary', category: 'Culture & History', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXdaiQssaEOCN_emkm2-b5FnLw9e1KRJYQ7f7iQZiqYv3fTftNy82279qNCkiQ_TB34AdCSocygsK8o1W_6XCkuRHd2DkNESoiklv692afqynGyDdigROdwcriNPZWXqA13lrEK4P1eiwDQhu_f9dKrk9pt0Kd-p1swbP1u0mSb-0HlTF0ZA2gd3tcMZ_mbaRL50qesXtomppCXl63Z5EZ-fHeOY7eSSPVUSjp3KF-1FL9wEoetEJo65a7bDstI42gC3BWTPUive9e' },
            { name: 'Cinque Terre', category: 'Coastal & Hiking', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArBhwgf1TXoGRsPgsyhaQ-r1YXW3cos2OPJhGennvczFe3ANnd_gn4ChkxB3UlOZVeIoa683Lo02EjGW3m5TUt9BxiU6IL3kzfopJIaNBnOx3NWY7ThkbdodndbGE6jaiF3Dpga1a8kJtnKWFvVZGGyD1VRQNsaypbPxhDDQq9qZQQu3ujBY0a7XIXlYIwlvMbex2F9JsNJL9IK8z2e5PRaQJ7GoC3XuCEQyHcc8I4b_Ij3DGUd8JXYKRdob0dLdhiG8WQs5eogYL0' },
            { name: 'Paris, France', category: 'City & Dining', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0IbTd4hDYCixBXGCfOYPyn5LvsWEREynIyGIAsHEdlatY9_si9ED7q0eqCDmVzrWYow1L6SfsS-oRuMwdU6YWbCzypfe6Ch9MMg_vZNoU6a5TEgu1k8eu-XmGHR2TJsr6bemVm4FG2kArDE48VOtH668Y4x_TZNp_J8odT44QP1D9s8Q1hxakP34jbahg8bCwlL7xCTonl_YZz7N3buhMOXxylLMUgRjljr5Kx5Yi_niC0EwlwiEzqCC46h969_rihlrLAH23TABW' },
            { name: 'Bali, Indonesia', tag: 'Trending', tagColor: 'bg-green-600', category: 'Beaches & Nature', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaCpPyfoDYC1sMn3DtbeoNH1EIBJ5k1kf8upz1wSE9NAfuD0Js3fPtGMFjt6KsuCVDcMBBrbl44anFCtE56lfU9DIsMpxZ5U8JWy9fEHwKYbgKQlceCLcB47EhpRnGS_IrM6c_D4QNLHNCke5edOscjrQBUhPHNM3vbbmskpM12BHpcKbIUtKIFxFF_C6ytFnGnYz2DeqkyUft77Yhil4XWZzvQxyWy1HbbHLBxTTrvE7jMDHKdYk0TElnN2KDx-teDVsSsBJFoCNb' },
            { name: 'Santorini', category: 'Romance & Views', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDCLf_-5UH-UsL_2UWcbGjO_6iR6VyR8VNCevLtdFO2HZrtvdoBi5ET9s5RjLaPXASqAW5tVc91sdJbiAa0pdicJGrAU1eQpdvytECQDq5qo4RIViJ3wGyNxtmo94mG_8-aVROTEDvI2HGJIh9ggX3GwKlWw73oVJFpRo-3FS1S4HzvyixqRl_ggEll9D4HKuQ01hw3gy4LYfCwUzFu2uu-IaoZkLrAVsbbOI6BM5iaxp3-RFuIQXEt5k03VS1JMxZqz2u39AbxjgO' }
          ].filter(dest =>
            (activeCategory === 'All' || dest.category.includes(activeCategory)) &&
            (dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              dest.category.toLowerCase().includes(searchQuery.toLowerCase()))
          ).map((dest, idx) => (
            <div key={idx} className="min-w-[260px] md:min-w-[280px] snap-center group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3 shadow-md">
                <img alt={dest.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" src={dest.img} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 transition-opacity"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  {dest.tag && (
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${dest.tagColor} text-white px-2 py-0.5 rounded-sm mb-2 inline-block shadow-sm`}>
                      {dest.tag}
                    </span>
                  )}
                  <h3 className="font-bold text-xl leading-tight">{dest.name}</h3>
                  <p className="text-xs text-white/80 mt-1">{dest.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-12">
        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-6">Previous Trips</h2>
        <div className="flex overflow-x-auto pb-6 gap-6 hide-scroll snap-x snap-mandatory">
          {pastTrips.map((trip, idx) => (
            <div key={idx} className="min-w-[320px] max-w-[320px] snap-center bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow flex flex-col">
              <div className="h-40 overflow-hidden relative">
                <img alt={trip.title} className="w-full h-full object-cover" src={trip.img} />
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                  {trip.date}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{trip.title}</h3>
                <p className="text-subtext-light dark:text-subtext-dark text-xs mb-3 line-clamp-2">
                  {trip.desc}
                </p>
                <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex -space-x-2">
                    <img alt="User Avatar" className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsNYDdpA0YlusoQi4uyTL_5fenQwj6uAx5j6XCaJbJQCsJxGncjjh22_xSCVfLG1SHB1L-g7mxKrH0pjrBQ6JwYGlIY1wMGe-A0Z2Y5VxJZrHjBjgMqUE0SzNsLfH88oLUnVpQQuI7LTNa72AaVH2lGSlCvrVWZpRg5maIoX5wY35RTbhW12bstBl3ZLf48MckOTbHHObbP5ux3q31BDL_gwAhQhkP6r-w7ayJe0MTN85t-F_kjo2ODZU2QsJWq43doLLA7PBk6_of" />
                    <img alt="User Avatar" className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnQo-lEqiLZHkhlD3y14HoK5_0I9zh7nsFC9eOazjigZjwFBBbTKTuVBXsWsjXVyA690EypjX8Rg--gxq6lhrerVaqFYW6azWy-1qIUOwZSMG3WK4mM4x_PNnUbEuQ0vaxkz_wiKrKwUPJwkYpd2UneLv3551SxYTIAoxOQK-QlA5dLIr8uF4SIChMdxEzoM5h6-XWOzQffwVVrkx9J0NwoxYBAQRMtqwuWls4atNn1yEmIJHkpl1bZYQLubwPWXZ1TanWbnRkBLNG" />
                  </div>
                  <button className="text-primary text-xs font-bold uppercase tracking-wide hover:text-primary-dark">View</button>
                </div>
              </div>
            </div>
          ))}
          <Link to="/log-past-trip" className="min-w-[320px] max-w-[320px] snap-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center p-8 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <span className="material-icons text-primary text-2xl">add</span>
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Log a past trip</h3>
            <p className="text-subtext-light dark:text-subtext-dark text-xs text-center">
              Keep track of your travel history and stats.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Explore;

