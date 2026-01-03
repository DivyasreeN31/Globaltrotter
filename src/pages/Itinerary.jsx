import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, auth } from '../firebase/config';
import { collection, query, where, onSnapshot, doc, getDoc, deleteDoc } from 'firebase/firestore';

const Itinerary = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [sections, setSections] = useState([]);
  const [trip, setTrip] = useState(null);
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

    // Fetch itinerary sections in real-time
    const q = query(collection(db, 'itinerary_sections'), where('tripId', '==', tripId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const sectionsData = [];
      querySnapshot.forEach((doc) => {
        sectionsData.push({ id: doc.id, ...doc.data() });
      });
      // Sort sections by some criteria if needed, e.g., title or date
      setSections(sectionsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [tripId]);

  const handleAddSection = () => {
    const newId = `new-${Date.now()}`;
    navigate(`/itinerary/${tripId}/section/${newId}`);
  };

  const handleDeleteSection = async (sectionId) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      try {
        await deleteDoc(doc(db, 'itinerary_sections', sectionId));
      } catch (error) {
        console.error("Error deleting section:", error);
      }
    }
  };

  return (
    <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">Build Itinerary</h1>
          <p className="text-subtext-light dark:text-subtext-dark">Plan your upcoming adventure to <span className="text-primary font-semibold">{trip?.destination || '...'}</span> in detail.</p>
        </div>
        <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
          <span className="material-icons text-base">save</span> Save Draft
        </button>
      </div>

      {sections.map((section, idx) => (
        <section key={idx} className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-md border border-border-light dark:border-border-dark p-6 mb-6 transition-all hover:shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${section.iconBg} rounded-lg ${section.iconColor}`}>
                <span className="material-icons">{section.icon}</span>
              </div>
              <h2 className="text-lg font-semibold text-text-light dark:text-text-dark">{section.title}</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/itinerary/${tripId}/section/${section.id}`)}
                className="text-subtext-light dark:text-subtext-dark hover:text-primary transition-colors"
              >
                <span className="material-icons">edit</span>
              </button>
              <button
                onClick={() => handleDeleteSection(section.id)}
                className="text-subtext-light dark:text-subtext-dark hover:text-red-500 transition-colors"
              >
                <span className="material-icons">delete_outline</span>
              </button>
            </div>
          </div>
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-subtext-light dark:text-subtext-dark text-sm leading-relaxed">
              {section.content || section.desc}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-background-light dark:bg-background-dark rounded-lg p-4 border border-border-light dark:border-border-dark flex items-center justify-between group">
              <div>
                <span className="text-xs font-medium text-subtext-light dark:text-subtext-dark uppercase tracking-wider block mb-1">Date Range</span>
                <span className="text-sm font-semibold text-text-light dark:text-text-dark">{section.dateRange}</span>
              </div>
              <span className="material-icons text-subtext-light dark:text-subtext-dark group-hover:text-primary transition-colors">calendar_today</span>
            </div>
            <div className="bg-background-light dark:bg-background-dark rounded-lg p-4 border border-border-light dark:border-border-dark flex items-center justify-between group">
              <div>
                <span className="text-xs font-medium text-subtext-light dark:text-subtext-dark uppercase tracking-wider block mb-1">Budget Allocation</span>
                <span className="text-sm font-semibold text-text-light dark:text-text-dark">₹{section.budget}</span>
              </div>
              <span className="material-icons text-subtext-light dark:text-subtext-dark group-hover:text-green-500 transition-colors">currency_rupee</span>
            </div>
          </div>
        </section>
      ))}

      <button
        onClick={handleAddSection}
        className="w-full group relative flex items-center justify-center py-5 border-2 border-dashed border-border-light dark:border-border-dark rounded-xl text-subtext-light dark:text-subtext-dark hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-300"
      >
        <div className="flex items-center gap-2">
          <span className="material-icons transition-transform group-hover:rotate-90">add</span>
          <span className="font-semibold text-lg">Add another Section</span>
        </div>
      </button>

      <div className="mt-8 flex justify-end items-center gap-6 p-4 border-t border-border-light dark:border-border-dark">
        <div className="text-right">
          <p className="text-xs text-subtext-light dark:text-subtext-dark uppercase tracking-wide">Total Estimated Cost</p>
          <p className="text-2xl font-bold text-text-light dark:text-text-dark">
            ₹{sections.reduce((acc, curr) => {
              const cleanedBudget = (curr.budget || "0").toString().replace(/,/g, '');
              return acc + (parseFloat(cleanedBudget) || 0);
            }, 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
          Finalize Itinerary
        </button>
      </div>
    </main>
  );
};

export default Itinerary;
