import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogPastTrip = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    imageUrl: '',
    rating: 0,
    tag: 'Travel'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Trip title is required';
    }
    
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Please select a rating';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Format date for display
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const monthYear = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    // Create trip object
    const newTrip = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      destination: formData.destination.trim(),
      date: monthYear,
      startDate: formData.startDate,
      endDate: formData.endDate,
      desc: formData.description.trim(),
      description: formData.description.trim(),
      img: formData.imageUrl.trim() || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEk8RZsxWRUopuXaPK15_WWfv2OfTqdd7F9rZE-sKN-MgqcmoIumpXfsZJ2Lrstvrpir8iIiwT5PhFYwuaUEsdMYhKrv3N0pT7Eoi5jLV4YLzhntVgiKH7OD2yWIX72qFyFzu0f-JUBW4nOBWv3Vmqk3BB_SZkmfxSIKRITC2CkZ84R_k2VEfFPIILutND2Fl6OQX7IzTs8q2_Z74dt0fVnHz4MFoeBpFmHxo2FlUl1kcD78u4j9fJjDAdTjoxRdvMsgdUSFlE_J9W',
      rating: parseFloat(formData.rating),
      tag: formData.tag,
      status: 'Completed',
      createdAt: new Date().toISOString()
    };

    // Get existing trips from localStorage
    const existingTrips = JSON.parse(localStorage.getItem('pastTrips') || '[]');
    
    // Add new trip
    const updatedTrips = [newTrip, ...existingTrips];
    
    // Save to localStorage
    localStorage.setItem('pastTrips', JSON.stringify(updatedTrips));
    
    // Show success message
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/explore');
    }, 500);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
        >
          <span className="material-icons">arrow_back</span>
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Log a Past Trip</h1>
        <p className="text-gray-600 dark:text-gray-400">Keep track of your travel history and stats</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Trip Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${
                errors.title ? 'border-red-500' : ''
              }`}
              placeholder="e.g., Winter in NYC"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Destination *
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${
                errors.destination ? 'border-red-500' : ''
              }`}
              placeholder="e.g., New York, USA"
            />
            {errors.destination && <p className="mt-1 text-sm text-red-500">{errors.destination}</p>}
          </div>

          <div>
            <label htmlFor="tag" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              id="tag"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
            >
              <option value="Travel">Travel</option>
              <option value="Beach">Beach</option>
              <option value="Culture">Culture</option>
              <option value="Adventure">Adventure</option>
              <option value="Relaxation">Relaxation</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Start Date *
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${
                errors.startDate ? 'border-red-500' : ''
              }`}
            />
            {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              End Date *
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${
                errors.endDate ? 'border-red-500' : ''
              }`}
            />
            {errors.endDate && <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 resize-none ${
                errors.description ? 'border-red-500' : ''
              }`}
              placeholder="Tell us about your trip..."
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image URL (Optional)
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
              placeholder="https://example.com/image.jpg"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Leave empty to use default image</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rating *
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, rating: star }));
                    if (errors.rating) {
                      setErrors(prev => ({ ...prev, rating: '' }));
                    }
                  }}
                  className="focus:outline-none"
                >
                  <span className={`material-icons text-3xl transition-colors ${
                    star <= formData.rating
                      ? 'text-yellow-500'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}>
                    {star <= formData.rating ? 'star' : 'star_border'}
                  </span>
                </button>
              ))}
              {formData.rating > 0 && (
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {formData.rating} / 5
                </span>
              )}
            </div>
            {errors.rating && <p className="mt-1 text-sm text-red-500">{errors.rating}</p>}
          </div>
        </div>

        <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="material-icons animate-spin">refresh</span>
                Saving...
              </>
            ) : (
              <>
                <span className="material-icons">save</span>
                Save Trip
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
};

export default LogPastTrip;

