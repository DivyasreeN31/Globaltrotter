import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const SectionPage = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [section, setSection] = useState({
    id: sectionId,
    title: '',
    content: '',
    budget: '',
    dateRange: '',
    createdAt: new Date().toISOString()
  });
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const savedSections = JSON.parse(localStorage.getItem('itinerary-sections') || '[]');
    const currentSection = savedSections.find(s => s.id === sectionId);
    if (currentSection) {
      setSection(currentSection);
      setIsEditing(false);
    }
  }, [sectionId]);

  const handleSave = () => {
    const savedSections = JSON.parse(localStorage.getItem('itinerary-sections') || '[]');
    const index = savedSections.findIndex(s => s.id === sectionId);

    const sectionToSave = {
      ...section,
      icon: 'local_activity',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
    };

    if (index > -1) {
      savedSections[index] = sectionToSave;
    } else {
      savedSections.push(sectionToSave);
    }

    localStorage.setItem('itinerary-sections', JSON.stringify(savedSections));
    setIsEditing(false);
    setTimeout(() => {
      navigate('/itinerary');
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSection(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl shadow-lg mt-10">
      <div className="flex justify-between items-center mb-8 border-b border-border-light dark:border-border-dark pb-4">
        <div>
          <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
            {isEditing ? 'Configure Section' : section.title}
          </h1>
          {!isEditing && <p className="text-sm text-subtext-light dark:text-subtext-dark">Review your itinerary section details</p>}
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => navigate('/itinerary')}
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-primary hover:bg-primary-hover text-white px-6"
              >
                Save & Update
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-primary hover:bg-primary-hover text-white px-6"
            >
              Edit Details
            </Button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Section Title
            </label>
            <input
              type="text"
              name="title"
              value={section.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border-light dark:border-border-dark dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="e.g. Scuba Diving in Nusa Penida"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Activities & Description
            </label>
            <textarea
              name="content"
              value={section.content}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-border-light dark:border-border-dark dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Describe what you'll be doing..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Date Allocation
            </label>
            <input
              type="text"
              name="dateRange"
              value={section.dateRange}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border-light dark:border-border-dark dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="e.g. Oct 21 - Oct 22"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Budget Amount ($)
            </label>
            <input
              type="text"
              name="budget"
              value={section.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border-light dark:border-border-dark dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="e.g. 500.00"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-border-light dark:border-border-dark flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                <span className="material-icons">attach_money</span>
              </div>
              <div>
                <p className="text-xs font-medium text-subtext-light dark:text-subtext-dark uppercase tracking-wider mb-1">Budget Allocation</p>
                <p className="text-2xl font-bold text-text-light dark:text-text-dark">${section.budget || '0.00'}</p>
              </div>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-border-light dark:border-border-dark flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                <span className="material-icons">calendar_today</span>
              </div>
              <div>
                <p className="text-xs font-medium text-subtext-light dark:text-subtext-dark uppercase tracking-wider mb-1">Time Period</p>
                <p className="text-lg font-bold text-text-light dark:text-text-dark">{section.dateRange || 'TBD'}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-light dark:bg-gray-800/50 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">Itinerary Content</h3>
            <div className="prose dark:prose-invert max-w-none text-subtext-light dark:text-subtext-dark">
              {section.content ? (
                <div dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br>') }} />
              ) : (
                <p className="italic">No detailed activities described yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionPage;
