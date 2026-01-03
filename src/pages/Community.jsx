import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const q = query(collection(db, 'community_posts'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsData);
    });

    return () => unsubscribe();
  }, []);

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate();
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
      <div className="flex-grow w-full lg:w-3/4 space-y-6">
        <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-border-light dark:border-border-dark flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons-outlined text-text-muted-light dark:text-text-muted-dark">search</span>
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-border-light dark:border-border-dark rounded-lg leading-5 bg-background-light dark:bg-gray-700 text-text-main-light dark:text-text-main-dark placeholder-text-muted-light dark:placeholder-text-muted-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
              placeholder="Search experiences, trips..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Recent', 'Popular', 'Photos'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex items-center px-4 py-2 border rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeFilter === filter
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'text-text-muted-light dark:text-text-muted-dark bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark flex items-center gap-2">
            <span className="material-icons-outlined text-primary">diversity_3</span>
            Community Feed
          </h2>
          <Link to="/community/create" className="hidden sm:flex items-center text-sm text-primary font-medium hover:text-indigo-600 transition-colors">
            Share your story
            <span className="material-icons-outlined text-base ml-1">edit</span>
          </Link>
        </div>

        {posts.filter(post => {
          const matchesSearch = post.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.name.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesFilter = activeFilter === 'All' ||
            (activeFilter === 'Photos' && (post.images?.length > 0 || post.singleImage)) ||
            (activeFilter === 'Popular' && post.likes?.length > 200) ||
            (activeFilter === 'Recent'); // Simple simulation
          return matchesSearch && matchesFilter;
        }).map((post, idx) => (
          <article key={idx} className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 transition-transform hover:scale-[1.01] duration-200">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <img alt="User avatar" className="h-12 w-12 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-sm" src={post.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuD-O7APKyYdplwuyxI7pFW8BipHU1XgI8zVXdR4RHgI4DIaWgyHyXNyr_21U64ZUPMN307RjdfvxEg_2YPwVpRsDdbcLEQNgJy-j9MT7ZO6BiYcDjJJz3SYIwOcG5RAipyY7FwIHit5fePFyNjZVamNP5bVTO1AS1O3cH1jJzbTCIr_JM219rdw4V3XmHGCzuDlHELYmWC0N2t89gCvWYeuaiUL0VsGCUz5kbwgnZBfLIgMIYGIXJVcZWlDnZQTZD6clWgBPy-vP5YD"} />
              </div>
              <div className="flex-grow space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-semibold text-text-main-light dark:text-text-main-dark">{post.name}</h3>
                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark">{formatTime(post.timestamp)} • {post.location}</p>
                  </div>
                  <button className="text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">
                    <span className="material-icons-outlined">more_horiz</span>
                  </button>
                </div>
                <p className="text-text-main-light dark:text-text-gray-300 text-sm leading-relaxed">
                  {post.content}
                </p>
                {post.images && post.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 rounded-lg overflow-hidden">
                    {post.images.map((img, i) => (
                      <img key={i} alt={`Post image ${i + 1}`} className="h-32 w-full object-cover hover:opacity-90 transition-opacity" src={img} />
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
                    {post.likes?.length || 0}
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
              <li key={topic} className="group cursor-pointer">
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
        <Link to="/community/create" className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-indigo-600 transition-colors flex items-center justify-center">
          <span className="material-icons-outlined">edit</span>
        </Link>
      </div>
    </main>
  );
};

export default Community;
