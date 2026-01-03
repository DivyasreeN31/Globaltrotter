import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const AddSection = ({ onAddSection }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleAddSection = () => {
    // Generate a unique ID for the new section
    const sectionId = `section-${Date.now()}`;
    
    // If there's a callback, call it with the new section ID
    if (onAddSection) {
      onAddSection(sectionId);
    }
    
    // Navigate to the new section's edit page
    navigate(`/section/${sectionId}`);
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
        isHovered ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      }`}
      onClick={handleAddSection}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isHovered ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
        }`}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <p className={`text-sm font-medium ${
          isHovered ? 'text-blue-700' : 'text-gray-700'
        }`}>
          Add another Section
        </p>
        <p className="text-xs text-gray-500">
          Click to create a new section
        </p>
      </div>
    </div>
  );
};

export default AddSection;
