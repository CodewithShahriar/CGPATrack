
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GPAChart from '@/components/analytics/GPAChart';
import CreditDistribution from '@/components/analytics/CreditDistribution';
import { useCGPA } from '@/contexts/CGPAContext';

const Analytics: React.FC = () => {
  const { data } = useCGPA();
  const { semesters } = data;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Academic Analytics</h1>
          <p className="text-muted-foreground">
            Visual insights into your academic performance
          </p>
        </div>
        <Button variant="outline" className="mt-4 sm:mt-0" asChild>
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </div>
      
      {semesters.length === 0 ? (
        <div className="text-center py-12 bg-secondary/30 rounded-xl border">
          <h2 className="text-xl font-medium mb-2">No Data to Analyze</h2>
          <p className="text-muted-foreground mb-6">
            Add at least one semester with courses to see analytics.
          </p>
          <Button asChild>
            <Link to="/add-semester">Add Your First Semester</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          <GPAChart />
          
          <CreditDistribution />
        </div>
      )}
    </div>
  );
};

export default Analytics;
