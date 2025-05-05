
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart2, FileText, Plus } from "lucide-react";

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            CGPA Tracker
          </Link>
          
          <div className="hidden md:flex space-x-1">
            <Button variant={isActive('/') ? 'default' : 'ghost'} asChild>
              <Link to="/">
                <FileText className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            
            <Button variant={isActive('/add-semester') ? 'default' : 'ghost'} asChild>
              <Link to="/add-semester">
                <Plus className="mr-2 h-4 w-4" />
                Add Semester
              </Link>
            </Button>
            
            <Button variant={isActive('/analytics') ? 'default' : 'ghost'} asChild>
              <Link to="/analytics">
                <BarChart2 className="mr-2 h-4 w-4" />
                Analytics
              </Link>
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu (simplified for this version) */}
      <div className="md:hidden pt-2 pb-3 border-t border-gray-200 bg-white hidden">
        <Link to="/" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
        <Link to="/add-semester" className="block px-4 py-2 hover:bg-gray-100">Add Semester</Link>
        <Link to="/analytics" className="block px-4 py-2 hover:bg-gray-100">Analytics</Link>
      </div>
    </nav>
  );
};

export default Navbar;
