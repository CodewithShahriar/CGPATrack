
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-secondary py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CGPA Tracker | <Link to="/" className="hover:text-primary">Home</Link> | <Link to="/about" className="hover:text-primary">About</Link></p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
