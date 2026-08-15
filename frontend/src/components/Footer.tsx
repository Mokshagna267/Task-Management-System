import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-gray-100 text-gray-500 text-center py-4 mt-8 border-t">
    <span>© {new Date().getFullYear()} Task Manager. All rights reserved.</span>
  </footer>
);

export default Footer;
