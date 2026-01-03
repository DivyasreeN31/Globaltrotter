const CitySearch = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
      <section className="mb-10 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Where to next?</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Find the best activities and cities for your next adventure.</p>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-icons-round text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          </div>
          <input className="block w-full pl-12 pr-4 py-4 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm dark:shadow-none text-lg transition-all" placeholder="Try 'Paragliding in Switzerland' or 'Tokyo Nightlife'..." type="text" />
          <div className="hidden group-focus-within:block absolute w-full mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden z-10 text-left">
            <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-800/50">Recent Searches</div>
            <a className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors" href="#">
              <span className="material-icons-round text-slate-400 text-sm">history</span>
              <span className="text-sm">Hiking in Alps</span>
            </a>
            <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">Trending</div>
            <a className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-3 transition-colors" href="#">
              <span className="material-icons-round text-primary text-sm">trending_up</span>
              <span className="text-sm">Kyoto Cherry Blossom</span>
            </a>
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Showing 64 results</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
            <span className="material-icons-round text-base">filter_list</span>
            Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
            <span className="material-icons-round text-base">sort</span>
            Sort by
          </button>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden sm:block"></div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
            <span className="material-icons-round text-base">view_agenda</span>
            Group by
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { title: 'Alpine Paragliding', type: 'Activity', typeColor: 'bg-blue-50 dark:bg-blue-900/30 text-primary', location: 'Interlaken, Switzerland', desc: 'Experience the thrill of flying over the Swiss Alps. Tandem flights available for beginners with certified instructors.', rating: 4.9, duration: '3 hrs', price: '$$', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALVyfX860sLXIGQNq-AWPfcOUrcjkeCktf5FLS1i5Bv-IGMna9f3rjECk0_7mS9TMo4A8pj3j59zW0XtpOHv5AHMkjUDYp_qbk8Ox1a9E5slQUTIYAG7Ml3Q9DpDgIRa2HB4_EaBfN2k35LRQVdO6tl5pONsrkMTR5J3V1zSIxyjumLGhs4BW6jekENMpaO_ZYuLCIuqxinZWBlemx8L_f9iwTkzJo4SbzvxSN15SsTkVpX73E5_bjSmPvqrXMor5d0ZYIwTa5zYEh' },
          { title: 'Tokyo Exploration', type: 'City', typeColor: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400', location: 'Tokyo, Japan', desc: "Discover the neon-lit streets, historic temples, and incredible culinary scene of Japan's bustling capital.", rating: 4.7, duration: '3-5 days', price: '$$$', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjdhvm80EJaWbMYcEsZVLDgq9uK2KIQIBb96Gfrn3amjW3z9sccU4QMUg0WW0aQUZmUNSwRED0sI5St1W8t-dknFqTwvKue9T76A-hgP_fVIfwm4LmX6gyrVAcX1xMv_v0npNThzlW2t8d_ZighGzPosXaPd_qh9WRKhLG6beJbfqHoZ_TAJqnlENlUkVmluY5b0TB-krMVPhZsNh31IHkE3D73cVTYBEhieV5MHvoEYuFLOixLIy-2hISxTV3C9kWx3ewiWgQMl7d' },
          { title: 'Cinque Terre Hike', type: 'Activity', typeColor: 'bg-blue-50 dark:bg-blue-900/30 text-primary', location: 'Liguria, Italy', desc: 'Walk the famous Blue Path connecting the five colorful villages along the rugged Italian Riviera coastline.', rating: 4.8, duration: '6 hrs', price: '$', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0al4j5XjHJ9uQUB3p58y53IN_p0q2vNC3uUbiGBmrchI8rvL60uGmp_RFm1qC5jaLS91qDWaTFKMWW20ZMxRB-hxaDJ-IJ34VOeb73g9prXb-pYbFxSDvHQno0cZXsLDYEEoBlve71uuknAMo3ZoLIB5f5Be_xaJNz3-P7Tcsx5NKo2QLpl3XVtD0dDKBCmofPpe4T5ucWMVydCdpoCXHWuz6uZ8usbxh-2QtZbD9REbViRwZt7QJl56Zuh9j7zRnMUOWc15MqleX' },
          { title: 'Agra Tour', type: 'City', typeColor: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400', location: 'Agra, India', desc: 'Home to the iconic Taj Mahal, Agra fort and other Mughal architecture masterpieces. A must-visit cultural hub.', rating: 4.5, duration: '2 days', price: '$', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABLzGWVPkNwf-MA99yJdZNcwM8NT86PU5n_47q_xXNwqtEGej7gVhPobkt_IFdqnG8cM3IVe7SmsEivjDQIqgfSePsIF7uRok89zZnT1wTzhN4qwEpQf2cAgRWhjKFeFnC1hx4yuWGYnBROv4wWGz0nXFerJ0Z4cLjkQZiwjCxdnr8lE0hfTcqli3mPT670YH0-rpAtlr1BDH7Both6OrQ5I2MXd8xgUBfzHL5pu3USK8MMi6VyTTTSeVzPOF7GZUVWts2KIXwZ-C4' },
          { title: 'Great Barrier Reef', type: 'Activity', typeColor: 'bg-blue-50 dark:bg-blue-900/30 text-primary', location: 'Queensland, Australia', desc: "Dive into the world's largest coral reef system. See turtles, clownfish, and vibrant coral formations.", rating: 4.9, duration: '5 hrs', price: '$$$', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNGG-VQg0_WUQ0B8M-GshCvFmOWVdaJTfDS-h8npOyO0hvRd-sXNvbYA49IrAO-WN5k017Ql1mcTfAtgFHYEtwVfpyUPCIcfGBisbzCPGuri-Iuv88j8wPfaLNzvVZ0eRWI7zXj59i9mgEEXMAvFFlyhU8epGx9wNrHfqDb1gurQbIyuWTHdQq_7Kk5o8JHMYeMJZzHbrkKCUd1scF52FfHe56sk0i7MvXIdJWtS2wj4c6D0-0Ob0sdAkwR-Ze-AE2woBi72XeZz0X' },
          { title: 'Banff National Park', type: 'City', typeColor: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400', location: 'Alberta, Canada', desc: 'Stunning turquoise lakes, soaring peaks, and abundant wildlife. Perfect for skiing in winter and hiking in summer.', rating: 5.0, duration: '4 days', price: '$$', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMka6NoLoG_jv5rMkOkmFXyYuQPHtilnXc6qH2n-kXcwCJkkmscLrBuskpNq8iVr1w5bDeUiVqlwf57ve7egOZ2aTIDe_UPi0LZYKQbGIjYqPoTIaZxYu3sMOAqvYVUltZUY4KNXNlknMo9JAZGJbH1aM5fi16rgcgi9ab7nYShJd0HK1h8gB-4aSCJnrcstDOGAfhBS_JrXGS2mSM-HfwLW9WiXT6n6dbDcsSThz_gmJRxY3sErUVTJKnXKlrwVdOI1pM5TkXVbdf' }
        ].map((item, idx) => (
          <article key={idx} className="flex flex-col sm:flex-row gap-0 sm:gap-4 bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-primary dark:hover:border-primary transition-all duration-300 group cursor-pointer">
            <div className="h-48 sm:h-auto sm:w-48 bg-slate-200 dark:bg-slate-700 relative flex-shrink-0">
              <img alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.img} />
              <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/70 backdrop-blur text-xs font-bold px-2 py-1 rounded text-slate-800 dark:text-white shadow-sm flex items-center gap-1">
                <span className="material-icons-round text-xs text-yellow-500">star</span> {item.rating}
              </div>
            </div>
            <div className="p-5 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{item.title}</h3>
                  <span className={`text-primary font-semibold text-sm ${item.typeColor} px-2 py-1 rounded`}>{item.type}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1">
                  <span className="material-icons-round text-sm">place</span> {item.location}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <div className="flex gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="material-icons-round text-sm">{item.duration.includes('day') ? 'calendar_today' : 'schedule'}</span> {item.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-icons-round text-sm">attach_money</span> {item.price}
                  </span>
                </div>
                <button className="text-primary text-sm font-medium hover:underline">View Details</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <nav className="flex items-center gap-1">
          <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition">
            <span className="material-icons-round">chevron_left</span>
          </button>
          <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium">1</button>
          <button className="px-4 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition">2</button>
          <button className="px-4 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition">3</button>
          <span className="px-2 text-slate-400">...</span>
          <button className="px-4 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition">12</button>
          <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition">
            <span className="material-icons-round">chevron_right</span>
          </button>
        </nav>
      </div>
    </main>
  );
};

export default CitySearch;

