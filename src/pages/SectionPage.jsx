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
    createdAt: new Date().toISOString()
  });
  const [isEditing, setIsEditing] = useState(true);

  // In a real app, you would fetch the section data here
  useEffect(() => {
    const savedSection = localStorage.getItem(`section-${sectionId}`);
    if (savedSection) {
      setSection(JSON.parse(savedSection));
    }
  }, [sectionId]);

  const handleSave = () => {
    // In a real app, you would save to an API here
    localStorage.setItem(`section-${sectionId}`, JSON.stringify(section));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSection(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {section.title || 'New Section'}
        </h1>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Edit Section
            </Button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Title
            </label>
            <input
              type="text"
              name="title"
              value={section.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter section title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={section.content}
              onChange={handleChange}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter section content"
            />
          </div>
        </div>
      ) : (
        <div className="prose max-w-none">
          {section.content ? (
            <div dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br>') }} />
          ) : (
            <p className="text-gray-500 italic">No content available for this section.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionPage;
