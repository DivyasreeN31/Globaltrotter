import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase/config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    country: '',
    bio: ''
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setPhotoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { email, password, firstName, lastName, phone, city, country, bio } = formData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let photoURL = '';
      if (photo) {
        const storageRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(storageRef, photo);
        photoURL = await getDownloadURL(storageRef);
      }

      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
        photoURL: photoURL
      });

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        phone,
        city,
        country,
        bio,
        photoURL,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full max-w-2xl mx-auto p-4 min-h-screen flex items-center justify-center">
      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-2">Start Your Journey</h1>
          <p className="text-gray-500 dark:text-gray-400">Create your profile to begin planning your next adventure.</p>
        </div>
        <div className="bg-surface-light dark:bg-surface-dark shadow-xl rounded-2xl p-8 md:p-10 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            <div className="flex justify-center mb-8">
              <div className="relative group cursor-pointer">
                <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-primary group-hover:bg-primary/5">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <img alt="Profile Avatar Placeholder" className="w-full h-full object-cover opacity-30 group-hover:opacity-20 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhyyhI8Jze-_G7ZrlgSTnCWAOL80alrHX3_iWg6GkFrGlvhH9QxbZilLo_qvV5C8zwHBaEn-VnX_ICHMH1kDJ3L7imGcTSP1_7vDAmko2fazCfts8bpy5gNz3dTqXXOpXtDy2HpBTHWFm3pIZV-07U2iyTHnPuEEIdEriyo9MnxpoKVShAg5oQ6FwSLA10x0hLJPMVqFf-EbRrGolUSVn-6fp3CpddZgqfTJDTgD5HSWdbMzfJuQV3XYk6Q60mq9wd1Le-cZLb0MBh" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors">
                        <span className="material-icons-round text-3xl mb-1">add_a_photo</span>
                        <span className="text-xs font-medium uppercase tracking-wide">Upload</span>
                      </div>
                    </>
                  )}
                  <input accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" id="photo-upload" type="file" onChange={handlePhotoChange} />
                </div>
                {photoPreview && (
                  <div className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg transform translate-x-1/4 translate-y-1/4">
                    <span className="material-icons-round text-sm">edit</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              <div className="relative">
                <input
                  className="floating-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                  id="firstName"
                  placeholder=" "
                  required
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <label className="floating-label absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface-light dark:bg-surface-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" htmlFor="firstName">First Name</label>
              </div>
              <div className="relative">
                <input
                  className="floating-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                  id="lastName"
                  placeholder=" "
                  required
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <label className="floating-label absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface-light dark:bg-surface-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" htmlFor="lastName">Last Name</label>
              </div>
              <div className="relative">
                <input
                  className="floating-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                  id="email"
                  placeholder=" "
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label className="floating-label absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface-light dark:bg-surface-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" htmlFor="email">Email Address</label>
              </div>
              <div className="relative">
                <input
                  className="floating-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                  id="password"
                  placeholder=" "
                  required
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label className="floating-label absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface-light dark:bg-surface-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" htmlFor="password">Password</label>
              </div>
              <div className="relative">
                <input
                  className="floating-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                  id="phone"
                  placeholder=" "
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label className="floating-label absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface-light dark:bg-surface-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" htmlFor="phone">Phone Number</label>
              </div>
              <div className="relative">
                <input
                  className="floating-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                  id="city"
                  placeholder=" "
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                />
                <label className="floating-label absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface-light dark:bg-surface-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" htmlFor="city">City</label>
              </div>
              <div className="relative">
                <select
                  className="floating-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer cursor-pointer"
                  id="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option disabled value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                </select>
                <label className="floating-label absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface-light dark:bg-surface-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" htmlFor="country">Country</label>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                  <span className="material-icons-round text-sm">expand_more</span>
                </div>
              </div>
            </div>
            <div className="relative mt-2">
              <textarea
                className="floating-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer resize-y"
                id="bio"
                placeholder=" "
                value={formData.bio}
                onChange={handleChange}
              ></textarea>
              <label className="floating-label absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface-light dark:bg-surface-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" htmlFor="bio">About You</label>
            </div>
            <div className="pt-6 flex flex-col items-center">
              <button
                disabled={loading}
                className="bg-primary hover:bg-primary-dark text-white font-medium py-3.5 px-10 rounded-xl shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2 transform active:scale-95 w-full md:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
              >
                {loading ? (
                  <span className="material-icons-round text-xl animate-spin">refresh</span>
                ) : (
                  <span className="material-icons-round text-xl">person_add</span>
                )}
                <span>{loading ? 'Registering...' : 'Register User'}</span>
              </button>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-primary hover:text-primary-dark transition-colors">Sign in</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
