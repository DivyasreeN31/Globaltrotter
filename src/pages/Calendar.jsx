const Calendar = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = [];
  
  // Empty days for the start of the month
  for (let i = 0; i < 5; i++) {
    calendarDays.push({ day: null, isEmpty: true });
  }
  
  // Actual days
  for (let i = 1; i <= 31; i++) {
    calendarDays.push({ day: i, isEmpty: false });
  }
  
  // Empty days for the end of the month
  for (let i = 0; i < 5; i++) {
    calendarDays.push({ day: null, isEmpty: true });
  }

  const getTripForDay = (day) => {
    if (day === 4) return { name: 'PARIS TRIP', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-primary' };
    if (day === 5) return { name: '(cont.)', color: 'bg-blue-100/50 text-blue-800/50 dark:bg-blue-900/50 dark:text-blue-200/50', isCont: true };
    if (day === 10) return { name: 'SARIS 10', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-500' };
    if (day === 12) return { name: '15 - 22', color: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200' };
    if (day === 14) return { name: 'NYC - GETAWAY', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-500' };
    if (day === 15) return { name: '(cont.)', color: 'bg-orange-100/80 text-orange-800 dark:bg-orange-900/80 dark:text-orange-200 border-orange-500', isCont: true, isToday: true };
    if (day === 17) return { name: 'JAPAN TRIP', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-500' };
    if (day === 28) return { name: 'NYC GETAWAY', color: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 border-teal-500' };
    return null;
  };

  return (
    <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-gray-400">search</span>
          </div>
          <input className="block w-full pl-10 pr-3 py-2 border border-border-light dark:border-border-dark rounded-md leading-5 bg-white dark:bg-gray-800 text-text-light dark:text-text-dark placeholder-text-secondary-light dark:placeholder-text-secondary-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out" placeholder="Search trips, events..." type="text" />
        </div>
        <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <button className="flex items-center justify-center px-4 py-2 border border-border-light dark:border-border-dark rounded-md shadow-sm text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none whitespace-nowrap">
            <span className="material-symbols-outlined text-lg mr-2">grid_view</span>
            Group by
          </button>
          <button className="flex items-center justify-center px-4 py-2 border border-border-light dark:border-border-dark rounded-md shadow-sm text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none whitespace-nowrap">
            <span className="material-symbols-outlined text-lg mr-2">filter_list</span>
            Filter
          </button>
          <button className="flex items-center justify-center px-4 py-2 border border-border-light dark:border-border-dark rounded-md shadow-sm text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none whitespace-nowrap">
            <span className="material-symbols-outlined text-lg mr-2">sort</span>
            Sort by...
          </button>
        </div>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg overflow-hidden border border-border-light dark:border-border-dark">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">Calendar View</h2>
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-text-secondary-light dark:text-text-secondary-dark transition">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <h3 className="text-lg font-bold text-text-light dark:text-text-dark min-w-[140px] text-center">January 2024</h3>
            <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-text-secondary-light dark:text-text-secondary-dark transition">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          <div className="hidden sm:block w-24"></div>
        </div>
        <div className="grid grid-cols-7 border-b border-border-light dark:border-border-dark bg-gray-50 dark:bg-gray-900">
          {days.map((day) => (
            <div key={day} className="py-2 text-center text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 bg-surface-light dark:bg-surface-dark">
          {calendarDays.map((item, idx) => {
            const trip = item.day ? getTripForDay(item.day) : null;
            const isToday = item.day === 15;
            return (
              <div 
                key={idx} 
                className={`min-h-[120px] p-2 border-b border-r border-border-light dark:border-border-dark ${
                  item.isEmpty 
                    ? 'bg-gray-50/50 dark:bg-gray-800/30' 
                    : isToday 
                      ? 'bg-gray-100 dark:bg-gray-800/60' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 transition relative group'
                }`}
              >
                {!item.isEmpty && (
                  <>
                    <span className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">{item.day}</span>
                    {trip && (
                      <div className={`mt-${trip.isCont ? '4' : '1'} px-2 py-1 text-xs font-semibold rounded ${trip.color} ${trip.isCont ? 'opacity-50' : ''} border-l-4 shadow-sm cursor-pointer truncate`}>
                        {trip.name}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Calendar;

