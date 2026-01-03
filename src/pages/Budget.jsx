import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc, collection, query, where, onSnapshot, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '../firebase/config';

const Budget = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [expandedDays, setExpandedDays] = useState({ 0: true });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDay, setNewDay] = useState({ title: '', date: '', budget: '' });
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tripId) return;

    // Fetch trip details
    const fetchTrip = async () => {
      try {
        const tripDoc = await getDoc(doc(db, 'trips', tripId));
        if (tripDoc.exists()) {
          setTrip(tripDoc.data());
        }
      } catch (error) {
        console.error("Error fetching trip:", error);
      }
    };
    fetchTrip();

    // Fetch budget days in real-time
    const q = query(
      collection(db, 'budget_days'),
      where('tripId', '==', tripId),
      orderBy('day', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const daysData = [];
      querySnapshot.forEach((doc) => {
        daysData.push({ id: doc.id, ...doc.data() });
      });
      setDays(daysData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [tripId]);


  const toggleDay = (idx) => {
    setExpandedDays(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleAddDay = () => {
    setIsModalOpen(true);
  };

  const handleSaveDay = async (e) => {
    e.preventDefault();
    if (!newDay.title || !newDay.date || !auth.currentUser) return;

    try {
      const nextDayNum = (days.length + 1).toString().padStart(2, '0');
      const dayToSave = {
        tripId,
        userId: auth.currentUser.uid,
        day: nextDayNum,
        title: newDay.title,
        date: newDay.date,
        budget: `₹${parseFloat(newDay.budget || 0).toFixed(2)}`,
        activities: [],
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'budget_days'), dayToSave);

      setIsModalOpen(false);
      setNewDay({ title: '', date: '', budget: '' });
    } catch (error) {
      console.error("Error saving budget day:", error);
      alert("Failed to save day. Please try again.");
    }
  };
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur border-b border-border-light dark:border-border-dark mb-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          {loading ? (
            <div className="flex justify-center py-4">
              <span className="material-icons animate-spin text-primary">refresh</span>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-icons-round text-text-sub-light dark:text-text-sub-dark text-xl">search</span>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-border-light dark:border-border-dark rounded-full leading-5 bg-card-light dark:bg-card-dark placeholder-text-sub-light dark:placeholder-text-sub-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-sm"
                  placeholder="Search itinerary..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {['All', 'Food', 'Transport', 'Accommodation', 'Tickets'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`inline-flex items-center px-6 py-2 border shadow-sm text-sm font-medium rounded-full transition-all whitespace-nowrap ${activeFilter === filter
                    ? 'bg-primary text-white border-primary'
                    : 'text-text-sub-light dark:text-text-sub-dark bg-card-light dark:bg-card-dark border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark sm:text-4xl">
            Itinerary for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">{trip?.destination || '...'} Trip</span>
          </h2>
          <p className="mt-2 text-lg text-text-sub-light dark:text-text-sub-dark">Explore the culture, food, and scenery.</p>
          <div className="mt-4 inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800">
            <span className="material-icons-round text-sm mr-1.5">savings</span>
            Total Budget: ₹3,200
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 text-sm font-medium text-text-sub-light dark:text-text-sub-dark mb-4 px-4 uppercase tracking-wider">
          <div className="col-span-12 md:col-span-8 pl-14 md:pl-0">Physical Activity Timeline</div>
          <div className="hidden md:block col-span-4 pl-4">Expense Breakdown</div>
        </div>

        {days.map((day, dayIdx) => (
          <div key={dayIdx} className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark mb-8 overflow-hidden transition-all hover:shadow-md">
            <div
              className="bg-gray-50 dark:bg-slate-800/50 px-6 py-4 border-b border-border-light dark:border-border-dark flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
              onClick={() => toggleDay(dayIdx)}
            >
              <div className="flex items-center gap-4">
                <div className={`${dayIdx === 0 ? 'bg-primary/10 text-primary' : 'bg-white dark:bg-slate-700 text-text-sub-light dark:text-text-sub-dark border border-border-light dark:border-border-dark'} rounded-lg px-3 py-2 font-bold text-lg flex flex-col items-center min-w-[4rem]`}>
                  <span className="uppercase text-xs font-semibold tracking-wider opacity-80">Day</span>
                  <span>{day.day}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">{day.title}</h3>
                  <p className="text-sm text-text-sub-light dark:text-text-sub-dark">{day.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-right">
                  <span className="block text-text-sub-light dark:text-text-sub-dark text-xs">Day Budget</span>
                  <span className="font-semibold text-text-main-light dark:text-text-main-dark">{day.budget}</span>
                </div>
                <button
                  className="text-primary hover:text-primary-hover transition-colors"
                  onClick={(e) => { e.stopPropagation(); toggleDay(dayIdx); }}
                >
                  <span className={`material-icons-round transform transition-transform duration-300 ${expandedDays[dayIdx] ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
              </div>
            </div>
            {expandedDays[dayIdx] && (
              <div className="p-6">
                <div className="relative timeline-line space-y-8">
                  {day.activities.filter(activity => {
                    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      activity.desc.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesFilter = activeFilter === 'All' || activity.expenseType.includes(activeFilter) || (activeFilter === 'Tickets' && activity.expenseType === 'Ticket');
                    return matchesSearch && matchesFilter;
                  }).map((activity, actIdx) => (
                    <div key={actIdx} className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      <div className="md:col-span-1 flex justify-center mt-1 hidden md:flex">
                        <div className="h-4 w-4 rounded-full bg-white dark:bg-slate-800 border-4 border-primary shadow-sm"></div>
                      </div>
                      <div className="md:col-span-7 bg-white dark:bg-slate-800 rounded-xl p-4 border border-border-light dark:border-border-dark shadow-sm hover:border-primary/50 transition-colors group">
                        <div className="flex items-start gap-4">
                          <div className={`h-10 w-10 rounded-full ${activity.iconBg} flex items-center justify-center shrink-0 ${activity.iconColor}`}>
                            <span className="material-icons-round">{activity.icon}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="text-base font-semibold text-text-main-light dark:text-text-main-dark">{activity.title}</h4>
                              <span className="text-xs font-medium text-text-sub-light dark:text-text-sub-dark bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded">{activity.time}</span>
                            </div>
                            <p className="mt-1 text-sm text-text-sub-light dark:text-text-sub-dark">{activity.desc}</p>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:flex md:col-span-1 justify-center items-center h-full pt-4">
                        <span className="material-icons-round text-border-light dark:text-border-dark">arrow_forward</span>
                      </div>
                      <div className="md:col-span-3">
                        <div className="bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 border border-border-light dark:border-border-dark flex items-center justify-between">
                          <div className="flex items-center gap-2 text-text-sub-light dark:text-text-sub-dark">
                            <span className="material-icons-round text-sm">receipt_long</span>
                            <span className="text-sm">{activity.expenseType}</span>
                          </div>
                          <span className={`font-semibold text-text-main-light dark:text-text-main-dark ${activity.expense === 'Paid' ? 'text-orange-600 dark:text-orange-400' : ''}`}>{activity.expense}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="text-center py-6">
          <button
            onClick={handleAddDay}
            className="inline-flex items-center px-6 py-3 border border-dashed border-border-light dark:border-border-dark shadow-sm text-sm font-medium rounded-xl text-text-sub-light dark:text-text-sub-dark bg-transparent hover:bg-gray-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-95"
          >
            <span className="material-icons-round mr-2">add</span>
            Add New Day
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-surface-light dark:bg-surface-dark w-full max-w-md rounded-2xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-6 py-4 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
              <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Add New Day</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-text-sub-light dark:text-text-sub-dark hover:text-red-500 transition-colors"
              >
                <span className="material-icons-round">close</span>
              </button>
            </div>
            <form onSubmit={handleSaveDay} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-sub-light dark:text-text-sub-dark mb-1">Day Title</label>
                <input
                  required
                  type="text"
                  placeholder="e.g., Exploring Shibuya"
                  className="w-full px-4 py-2 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-gray-700 text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={newDay.title}
                  onChange={(e) => setNewDay({ ...newDay, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-sub-light dark:text-text-sub-dark mb-1">Date</label>
                <input
                  required
                  type="date"
                  className="w-full px-4 py-2 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-gray-700 text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={newDay.date}
                  onChange={(e) => setNewDay({ ...newDay, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-sub-light dark:text-text-sub-dark mb-1">Estimated Budget (INR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-sub-light dark:text-text-sub-dark">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-gray-700 text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    value={newDay.budget}
                    onChange={(e) => setNewDay({ ...newDay, budget: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-border-light dark:border-border-dark text-text-sub-light dark:text-text-sub-dark font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary-dark hover:-translate-y-0.5 transition-all"
                >
                  Create Day
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Budget;

