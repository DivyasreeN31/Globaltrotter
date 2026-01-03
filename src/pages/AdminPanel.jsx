import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const AdminPanel = () => {
  const demographicsChartRef = useRef(null);
  const activityChartRef = useRef(null);

  useEffect(() => {
    // Demographics Pie Chart
    if (demographicsChartRef.current) {
      const ctxPie = demographicsChartRef.current.getContext('2d');
      const chart = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
          labels: ['New Users', 'Returning'],
          datasets: [{
            data: [65, 35],
            backgroundColor: ['#3B82F6', '#10B981'],
            borderWidth: 0,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });

      return () => chart.destroy();
    }
  }, []);

  useEffect(() => {
    // Activity Line Chart
    if (activityChartRef.current) {
      const ctxLine = activityChartRef.current.getContext('2d');
      const chart = new Chart(ctxLine, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Active Users',
            data: [12, 19, 15, 25, 22, 30, 35],
            borderColor: '#EF4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            pointBackgroundColor: '#EF4444',
            pointRadius: 4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: false,
                drawBorder: false
              },
              ticks: {
                display: false
              }
            },
            x: {
              grid: {
                display: false,
                drawBorder: false
              },
              ticks: {
                color: '#9CA3AF'
              }
            }
          }
        }
      });

      return () => chart.destroy();
    }
  }, []);

  return (
    <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm p-4 border border-border-light dark:border-border-dark flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-icons text-gray-400">search</span>
          </div>
          <input 
            className="block w-full pl-10 pr-3 py-2 border border-border-light dark:border-border-dark rounded-md leading-5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition duration-150 ease-in-out" 
            placeholder="Search data..." 
            type="text"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
          <button className="inline-flex items-center px-4 py-2 border border-border-light dark:border-border-dark shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition">
            <span className="material-icons text-sm mr-2">view_list</span>
            Group by
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-border-light dark:border-border-dark shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition">
            <span className="material-icons text-sm mr-2">filter_list</span>
            Filter
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-border-light dark:border-border-dark shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition">
            <span className="material-icons text-sm mr-2">sort</span>
            Sort by...
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a className="group flex items-center justify-center px-6 py-3 border border-border-light dark:border-border-dark text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-surface-light dark:bg-surface-dark hover:text-primary hover:border-primary dark:hover:border-primary transition-all shadow-sm hover:shadow-md" href="#">
          <span className="material-icons mr-2 text-gray-400 group-hover:text-primary">people</span>
          Manage Users
        </a>
        <a className="group flex items-center justify-center px-6 py-3 border border-border-light dark:border-border-dark text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-surface-light dark:bg-surface-dark hover:text-primary hover:border-primary dark:hover:border-primary transition-all shadow-sm hover:shadow-md" href="#">
          <span className="material-icons mr-2 text-gray-400 group-hover:text-primary">location_city</span>
          Popular Cities
        </a>
        <a className="group flex items-center justify-center px-6 py-3 border border-border-light dark:border-border-dark text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-surface-light dark:bg-surface-dark hover:text-primary hover:border-primary dark:hover:border-primary transition-all shadow-sm hover:shadow-md" href="#">
          <span className="material-icons mr-2 text-gray-400 group-hover:text-primary">local_activity</span>
          Popular Activities
        </a>
        <a className="group flex items-center justify-center px-6 py-3 border-2 border-primary text-sm font-bold rounded-lg text-primary bg-blue-50 dark:bg-blue-900/20 shadow-md" href="#">
          <span className="material-icons mr-2">trending_up</span>
          User Trends
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg border border-border-light dark:border-border-dark p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="material-icons text-primary">analytics</span>
              Trends & Analytics Overview
            </h2>
            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Data
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-border-light dark:border-border-dark">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Demographics</h3>
              <div className="flex items-center justify-center h-48 relative">
                <canvas ref={demographicsChartRef}></canvas>
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span> New Users
                  <span className="ml-auto font-medium">65%</span>
                </li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span> Returning
                  <span className="ml-auto font-medium">35%</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-border-light dark:border-border-dark">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">User Activity</h3>
              <div className="flex items-center justify-center h-48 relative w-full">
                <canvas ref={activityChartRef}></canvas>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Peak activity recorded on <span className="font-bold text-gray-900 dark:text-white">Sundays</span></p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 h-48 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 flex flex-col justify-end items-center relative border border-border-light dark:border-border-dark">
              <div className="flex items-end gap-2 h-full w-full justify-center pb-2">
                <div className="w-8 bg-orange-300 dark:bg-orange-400/80 rounded-t-md h-[60%] transition-all hover:bg-orange-400"></div>
                <div className="w-8 bg-orange-400 dark:bg-orange-500/80 rounded-t-md h-[80%] transition-all hover:bg-orange-500"></div>
                <div className="w-8 bg-orange-500 dark:bg-orange-600/80 rounded-t-md h-[100%] transition-all hover:bg-orange-600"></div>
              </div>
              <p className="text-xs text-center text-gray-500 mt-2 font-medium">Conversion Rates</p>
            </div>
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Recent Insights</h3>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
              <p className="text-xs text-gray-400 mt-2 italic">Data is processing for the current week...</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-md border border-border-light dark:border-border-dark p-6 transition hover:shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                <span className="material-icons text-xl">manage_accounts</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">Manage Users</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              This section is responsible for managing users and their actions. Admins can view trips made by users and access other functionalities.
            </p>
            <button className="mt-4 w-full py-2 text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/10 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/20 font-medium transition">
              Go to Users
            </button>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-md border border-border-light dark:border-border-dark p-6 transition hover:shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-pink-600 dark:text-pink-400">
                <span className="material-icons text-xl">location_on</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">Popular Cities</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Lists all popular cities users are currently visiting based on trending data.
            </p>
            <div className="mt-4 flex -space-x-2 overflow-hidden">
              <img alt="Paris" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB91Z4SrV04zPnYwM8kYxj8Ourpsvy2IMIsDXe7bgtKtjNO3hYPjIHzbKc4ighTDkqrI1Ba6f80hoewHr8gsoDirsyO3ZaX5n6BesNMjw54sjMg-GBnE3iVwjDnmUChP7QU_x8uJrJdhzXANXzJ9dmMP2Ie2wob72-BYcKITJnZX_m5yQKk56Ce8yJNYz9WUB8RU7RI41CnBs_W_rn9PRif1P6SqGbBVc0en7B7BKHiipfie8bFzBM2Aep0TxhZro0LtcDYNjkY_XPL"/>
              <img alt="Resort" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr0yhMNcyvH8DfMTY835oHAHE80LEiGKhu6wnOG5ndaRE9fhCmGxkjbwFnwnmtg9vo3qLpokMJAh2S1QEEdblvqnrQIyQcBb_FQ7zr8jHjneOOGCFQLj79kmk9kutOrLycjIVcTvtvobzFoTMrx3C5G6oKyCQ-SItQB02Ie5JZN_d-UI7EVdQkf0RIUiw7Obq2C4hdvt3iPw5HbJRuev3mkiU-q8W65WaIsMXLW-SUK_wObMw4hUXFvOf9Djml4PZF2-5m_5lc1zRW"/>
              <img alt="City" className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR7vDUsJ-PGGnM8X0NXp8V-rlRTNurkZ8tC254lYEh45xdHXLwREWuvY7Ka6o429-MYME_YE0cQiisKFJtdFxO4fvndyrkpTvTv5dGat0CZUQBV8bYmK7XTdbGVXV4lBDOcIqfJQHyoPliqvhDuhNHy6o9Ak58fspyOj9Vj-oTEQBUPlAF8vlJM4yFw0NDmNMfuu2kkX9pDU2g8Z-VWtmYpbcSoVc1d0c_fkYqvK8fERjasKAuf2vtWxCQvoURtaVp72Tio4N1hekV"/>
              <div className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-300">+12</div>
            </div>
          </div>

          <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-md border border-border-light dark:border-border-dark p-6 transition hover:shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-icons text-8xl text-primary">auto_graph</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                  <span className="material-icons text-xl">insights</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Summary Analysis</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Major focus on providing analysis across various points and giving useful information to the admin.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Current Trend</span>
                  <span className="text-green-600 dark:text-green-400 font-bold flex items-center">
                    <span className="material-icons text-sm mr-1">arrow_upward</span> 12.5%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminPanel;

