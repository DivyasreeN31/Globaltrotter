const Footer = () => {
  return (
    <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-icons text-primary text-2xl">public</span>
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">GlobalTrotter</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-right">
            © 2024 GlobalTrotter Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

