const Register = () => {
  return (
    <main className="w-full max-w-2xl mx-auto p-4 min-h-screen flex items-center justify-center">
      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-2">Start Your Journey</h1>
          <p className="text-gray-500 dark:text-gray-400">Create your profile to begin planning your next adventure.</p>
        </div>
        <div className="bg-surface-light dark:bg-surface-dark shadow-xl rounded-2xl p-8 md:p-10 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <form action="#" className="relative z-10 space-y-8" method="POST">
            <div className="flex justify-center mb-8">
              <div className="relative group cursor-pointer">
                <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-primary group-hover:bg-primary/5">
                  <img alt="Profile Avatar Placeholder" className="w-full h-full object-cover opacity-30 group-hover:opacity-20 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhyyhI8Jze-_G7ZrlgSTnCWAOL80alrHX3_iWg6GkFrGlvhH9QxbZilLo_qvV5C8zwHBaEn-VnX_ICHMH1kDJ3L7imGcTSP1_7vDAmko2fazCfts8bpy5gNz3dTqXXOpXtDy2HpBTHWFm3pIZV-07U2iyTHnPuEEIdEriyo9MnxpoKVShAg5oQ6FwSLA10x0hLJPMVqFf-EbRrGolUSVn-6fp3CpddZgqfTJDTgD5HSWdbMzfJuQV3XYk6Q60mq9wd1Le-cZLb0MBh" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors">
                    <span className="material-icons-round text-3xl mb-1">add_a_photo</span>
                    <span className="text-xs font-medium uppercase tracking-wide">Upload</span>
                  </div>
                  <input accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" id="photo-upload" type="file" />
                </div>
                <div className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg transform translate-x-1/4 translate-y-1/4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="material-icons-round text-sm">edit</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              <div className="relative">
                <input className="floating-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" id="firstName" placeholder=" " required type="text" />
                <label className="floating-label absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface-light dark:bg-surface-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" htmlFor="firstName">First Name</label>
              </div>
              <div className="relative">
                <input className="floating-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" id="lastName" placeholder=" " required type="text" />
                <label className="floating-label absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface-light dark:bg-surface-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" htmlFor="lastName">Last Name</label>
              </div>
              <div className="relative">
                <input className="floating-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" id="email" placeholder=" " required type="email" />
                <label className="floating-label absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface-light dark:bg-surface-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" htmlFor="email">Email Address</label>
              </div>
              <div className="relative">
                <input className="floating-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" id="phone" placeholder=" " type="tel" />
                <label className="floating-label absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface-light dark:bg-surface-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" htmlFor="phone">Phone Number</label>
              </div>
              <div className="relative">
                <input className="floating-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer" id="city" placeholder=" " type="text" />
                <label className="floating-label absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface-light dark:bg-surface-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" htmlFor="city">City</label>
              </div>
              <div className="relative">
                <select className="floating-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer cursor-pointer" id="country" required defaultValue="">
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
              <textarea className="floating-input block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer resize-y" id="additionalInfo" placeholder=" "></textarea>
              <label className="floating-label absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface-light dark:bg-surface-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1" htmlFor="additionalInfo">Additional Information (Travel preferences, dietary restrictions, etc.)</label>
            </div>
            <div className="pt-6 flex flex-col items-center">
              <button className="bg-primary hover:bg-primary-dark text-white font-medium py-3.5 px-10 rounded-xl shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2 transform active:scale-95 w-full md:w-auto justify-center" type="submit">
                <span className="material-icons-round text-xl">person_add</span>
                <span>Register User</span>
              </button>
              <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 text-center">By registering, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;

