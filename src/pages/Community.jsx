const Community = () => {
  return (
    <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
      <div className="flex-grow w-full lg:w-3/4 space-y-6">
        <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-border-light dark:border-border-dark flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons-outlined text-text-muted-light dark:text-text-muted-dark">search</span>
            </div>
            <input className="block w-full pl-10 pr-3 py-2 border border-border-light dark:border-border-dark rounded-lg leading-5 bg-background-light dark:bg-gray-700 text-text-main-light dark:text-text-main-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors" placeholder="Search experiences, trips..." type="text" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button className="flex items-center px-4 py-2 border border-border-light dark:border-border-dark rounded-lg text-sm font-medium text-text-muted-light dark:text-text-muted-dark bg-surface-light dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap">
              <span className="material-icons-outlined text-base mr-2">view_agenda</span>
              Group by
            </button>
            <button className="flex items-center px-4 py-2 border border-border-light dark:border-border-dark rounded-lg text-sm font-medium text-text-muted-light dark:text-text-muted-dark bg-surface-light dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap">
              <span className="material-icons-outlined text-base mr-2">filter_list</span>
              Filter
            </button>
            <button className="flex items-center px-4 py-2 border border-border-light dark:border-border-dark rounded-lg text-sm font-medium text-text-muted-light dark:text-text-muted-dark bg-surface-light dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap">
              <span className="material-icons-outlined text-base mr-2">sort</span>
              Sort by...
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark flex items-center gap-2">
            <span className="material-icons-outlined text-primary">diversity_3</span>
            Community Feed
          </h2>
          <button className="hidden sm:flex items-center text-sm text-primary font-medium hover:text-indigo-600 transition-colors">
            Share your story
            <span className="material-icons-outlined text-base ml-1">edit</span>
          </button>
        </div>

        {[
          { name: 'Sarah Jenkins', time: '2 hours ago', location: 'Paris, France', content: "Just got back from an amazing 5-day trip to Paris! The Eiffel Tower at sunset is absolutely breathtaking. Highly recommend grabbing a crepe near the Trocadéro gardens. Here are some of my favorite shots! 🥐🗼", likes: 243, comments: 18, images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuB89ieirM4uI72FoIRhfglnjsikgmodQtHcwrkpthOv_0wcccg7LqxnMi5v5-EzGHO1qyg8j47OY8PS4y9dMj7jk_y1o7iJYkdAMrOOAQB7FUEa3n-RZsA8QX-rz_GurqIBuF2QKieDIkL5y5YCGvcmMdrxClymAqwT91ykQjMwY8hVDRXjWZytyqG6hJqJX_NDtdfP_DJEMfj-LrCbnnSxlMokUwUkB2EOH4iTM5eE76nBehgaSZTjShDFgCTc5Xcrp7Lzi5KquEbx', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBd0B3A2nMoZuDZOc_2QQJTh4gbyIYm8MOQZfxnnHcPguuNwwnEVmFY4GQAt-YFV86AQajJuw5zsJpwZtt5S_w_DAs5aVXKKSOzyCLPh-G2o47teM3ywkr-r-ha9UWUeDoNmcT-vjE816d1Kkep9pMquAVW-dzhPgR3O01YE8TJKq0-v7OAUCrSL_A3Xk8SVlv2oMouxdz8KLUk754rgoHroULfiovMR1I4P6d63bM9raWk5gw3eppUgukKwxKFetMB4MNqf9S31iVn'] },
          { name: 'Michael Chen', time: '5 hours ago', location: 'Kyoto, Japan', content: "Kyoto in autumn is pure magic. The colors of the leaves at Kinkaku-ji are unlike anything I've ever seen. Pro tip: Get there early (around 7 AM) to beat the crowds! 🍁🏯", likes: 156, comments: 32, hasItinerary: true, itineraryTitle: 'Kyoto 3-Day Itinerary' },
          { name: 'David Ross', time: '1 day ago', location: 'Cusco, Peru', content: 'Finally made it to Machu Picchu! The hike was tough but absolutely worth every step. The altitude is no joke though, make sure to acclimate in Cusco for a few days first.', likes: 892, comments: 145, singleImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX0YOjp6vaYSj9kwOQy9Y4mGhf7Sr4Re3dEAt2kOq8z5-o6vLWuB3a6FXF9a4Pm8i9BKzlSK2ixboqaLXmX4jMYGUwaokJyYSHmoKClLVCoiAxqeBdaoKCG2450cVP7a9L1JiiEH2Wk9EtxiX0ItsXwbTRXnaxUQKMr6ANUEjQBOqeoTSzzf0U2SMfTAZ4nql-f8Bwwt6ZkyABK5dWEhjAh82ZHxJPXOleQTmzW0sNdn6_PvRHWHzC23iZ9vJtzc483MnciZCBv0op' }
        ].map((post, idx) => (
          <article key={idx} className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 transition-transform hover:scale-[1.01] duration-200">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <img alt="User avatar" className="h-12 w-12 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-O7APKyYdplwuyxI7pFW8BipHU1XgI8zVXdR4RHgI4DIaWgyHyXNyr_21U64ZUPMN307RjdfvxEg_2YPwVpRsDdbcLEQNgJy-j9MT7ZO6BiYcDjJJz3SYIwOcG5RAipyY7FwIHit5fePFyNjZVamNP5bVTO1AS1O3cH1jJzbTCIr_JM219rdw4V3XmHGCzuDlHELYmWC0N2t89gCvWYeuaiUL0VsGCUz5kbwgnZBfLIgMIYGIXJVcZWlDnZQTZD6clWgBPy-vP5YD" />
              </div>
              <div className="flex-grow space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-semibold text-text-main-light dark:text-text-main-dark">{post.name}</h3>
                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark">{post.time} • {post.location}</p>
                  </div>
                  <button className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">
                    <span className="material-icons-outlined">more_horiz</span>
                  </button>
                </div>
                <p className="text-text-main-light dark:text-text-gray-300 text-sm leading-relaxed">
                  {post.content}
                </p>
                {post.images && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 rounded-lg overflow-hidden">
                    {post.images.map((img, i) => (
                      <img key={i} alt={`Post image ${i+1}`} className="h-32 w-full object-cover hover:opacity-90 transition-opacity" src={img} />
                    ))}
                  </div>
                )}
                {post.hasItinerary && (
                  <div className="bg-background-light dark:bg-gray-800 p-3 rounded-lg border border-border-light dark:border-border-dark mt-2 flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
                      <span className="material-icons-outlined">map</span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-medium text-text-main-light dark:text-text-main-dark">{post.itineraryTitle}</h4>
                      <p className="text-xs text-text-muted-light dark:text-text-muted-dark">Shared by {post.name}</p>
                    </div>
                    <button className="text-primary text-sm font-medium hover:underline">View</button>
                  </div>
                )}
                {post.singleImage && (
                  <div className="w-full h-48 rounded-lg overflow-hidden mt-2 relative group cursor-pointer">
                    <img alt="Post image" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={post.singleImage} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  </div>
                )}
                <div className="flex items-center gap-6 mt-4 pt-3 border-t border-border-light dark:border-gray-700">
                  <button className="flex items-center gap-1.5 text-sm text-text-muted-light dark:text-text-muted-dark hover:text-rose-500 dark:hover:text-rose-400 transition-colors group">
                    <span className="material-icons-outlined group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors">favorite_border</span>
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors group">
                    <span className="material-icons-outlined group-hover:text-primary transition-colors">chat_bubble_outline</span>
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-text-muted-light dark:text-text-muted-dark hover:text-green-500 transition-colors group ml-auto">
                    <span className="material-icons-outlined group-hover:text-green-500 transition-colors">share</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="hidden lg:block w-1/4 space-y-6">
        <div className="bg-indigo-50 dark:bg-gray-800 rounded-xl p-5 border border-indigo-100 dark:border-gray-700">
          <div className="flex items-start gap-3">
            <span className="material-icons-outlined text-primary mt-0.5">info</span>
            <p className="text-xs text-text-muted-light dark:text-gray-300 leading-relaxed">
              Community section where all users can share their experience about a certain trip or activity. Use the search and filters to narrow down results.
            </p>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-5">
          <h3 className="font-bold text-text-main-light dark:text-text-main-dark mb-4 flex items-center gap-2">
            <span className="material-icons-outlined text-rose-500">local_fire_department</span>
            Trending Topics
          </h3>
          <ul className="space-y-4">
            {['#SummerInItaly', '#SoloTravel', '#HiddenGems', '#BudgetTrips'].map((topic, idx) => (
              <li key={idx} className="group cursor-pointer">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors">{topic}</span>
                  {idx === 0 && <span className="text-xs text-text-muted-light dark:text-text-muted-dark bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">New</span>}
                </div>
                <p className="text-xs text-text-muted-light dark:text-text-muted-dark">{['12.5k', '8.2k', '5.1k', '3.9k'][idx]} posts</p>
              </li>
            ))}
          </ul>
          <button className="w-full mt-4 text-sm text-primary font-medium hover:underline text-left">Show more</button>
        </div>
      </aside>

      <div className="fixed bottom-6 right-6 lg:hidden">
        <button className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-indigo-600 transition-colors flex items-center justify-center">
          <span className="material-icons-outlined">edit</span>
        </button>
      </div>
    </main>
  );
};

export default Community;

