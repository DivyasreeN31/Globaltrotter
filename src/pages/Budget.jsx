const Budget = () => {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur border-b border-border-light dark:border-border-dark mb-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons-round text-text-sub-light dark:text-text-sub-dark text-xl">search</span>
              </div>
              <input className="block w-full pl-10 pr-3 py-2 border border-border-light dark:border-border-dark rounded-full leading-5 bg-card-light dark:bg-card-dark placeholder-text-sub-light dark:placeholder-text-sub-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-sm" placeholder="Search itinerary..." type="text" />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
              <button className="inline-flex items-center px-4 py-2 border border-border-light dark:border-border-dark shadow-sm text-sm font-medium rounded-full text-text-sub-light dark:text-text-sub-dark bg-card-light dark:bg-card-dark hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none transition-colors whitespace-nowrap" type="button">
                <span className="material-icons-round text-sm mr-2">view_agenda</span>
                Group
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-border-light dark:border-border-dark shadow-sm text-sm font-medium rounded-full text-text-sub-light dark:text-text-sub-dark bg-card-light dark:bg-card-dark hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none transition-colors whitespace-nowrap" type="button">
                <span className="material-icons-round text-sm mr-2">filter_list</span>
                Filter
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-border-light dark:border-border-dark shadow-sm text-sm font-medium rounded-full text-text-sub-light dark:text-text-sub-dark bg-card-light dark:bg-card-dark hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none transition-colors whitespace-nowrap" type="button">
                <span className="material-icons-round text-sm mr-2">sort</span>
                Sort
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-text-main-light dark:text-text-main-dark sm:text-4xl">
            Itinerary for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Japan Trip</span>
          </h2>
          <p className="mt-2 text-lg text-text-sub-light dark:text-text-sub-dark">Explore the culture, food, and scenery.</p>
          <div className="mt-4 inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800">
            <span className="material-icons-round text-sm mr-1.5">savings</span>
            Total Budget: $3,200
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 text-sm font-medium text-text-sub-light dark:text-text-sub-dark mb-4 px-4 uppercase tracking-wider">
          <div className="col-span-12 md:col-span-8 pl-14 md:pl-0">Physical Activity Timeline</div>
          <div className="hidden md:block col-span-4 pl-4">Expense Breakdown</div>
        </div>

        {[
          { day: '01', title: 'Arrival in Tokyo', date: 'Oct 12, 2023', budget: '$150.00', activities: [
            { icon: 'flight_land', iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400', title: 'Land at Narita Airport', time: '10:00 AM', desc: 'Pick up JR Rail Pass and pocket Wi-Fi.', expense: '$25.00', expenseType: 'Transport' },
            { icon: 'hotel', iconBg: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600 dark:text-purple-400', title: 'Check-in at Shinjuku Hotel', time: '02:00 PM', desc: 'Hotel Gracery Shinjuku. Rest and freshen up.', expense: 'Paid', expenseType: 'Accommodation' },
            { icon: 'ramen_dining', iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400', title: 'Dinner at Omoide Yokocho', time: '07:00 PM', desc: 'Try Yakitori alley. Cash only.', expense: '$45.00', expenseType: 'Food' }
          ]},
          { day: '02', title: 'Exploring Asakusa', date: 'Oct 13, 2023', budget: '$85.00', activities: [
            { icon: 'temple_buddhist', iconBg: 'bg-red-100 dark:bg-red-900/30', iconColor: 'text-red-600 dark:text-red-400', title: 'Senso-ji Temple', time: '09:00 AM', desc: 'Oldest temple in Tokyo. Try Omikuji.', expense: 'Free', expenseType: 'Entrance' },
            { icon: 'park', iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', title: 'Sumida Park Walk', time: '11:30 AM', desc: 'Walk along the river. Great view of Skytree.', expense: '$15.00', expenseType: 'Snacks' },
            { icon: 'directions_boat', iconBg: 'bg-sky-100 dark:bg-sky-900/30', iconColor: 'text-sky-600 dark:text-sky-400', title: 'Tokyo Water Bus', time: '02:00 PM', desc: 'Cruise to Odaiba. Scenic route.', expense: '$18.00', expenseType: 'Ticket' }
          ]}
        ].map((day, dayIdx) => (
          <div key={dayIdx} className="bg-card-light dark:bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark mb-8 overflow-hidden transition-all hover:shadow-md">
            <div className="bg-gray-50 dark:bg-slate-800/50 px-6 py-4 border-b border-border-light dark:border-border-dark flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                <button className="text-primary hover:text-primary-hover transition-colors">
                  <span className="material-icons-round transform transition-transform">expand_more</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="relative timeline-line space-y-8">
                {day.activities.map((activity, actIdx) => (
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
          </div>
        ))}

        <div className="text-center py-6">
          <button className="inline-flex items-center px-6 py-3 border border-dashed border-border-light dark:border-border-dark shadow-sm text-sm font-medium rounded-xl text-text-sub-light dark:text-text-sub-dark bg-transparent hover:bg-gray-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all">
            <span className="material-icons-round mr-2">add</span>
            Add New Day
          </button>
        </div>
      </div>
    </main>
  );
};

export default Budget;

