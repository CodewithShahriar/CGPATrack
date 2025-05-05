
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import DashboardStats from '@/components/dashboard/DashboardStats';
import SemestersList from '@/components/dashboard/SemestersList';
import { useCGPA } from '@/contexts/CGPAContext';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const Dashboard: React.FC = () => {
  const { data, resetData } = useCGPA();
  const { semesters } = data;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CGPA Dashboard</h1>
          <p className="text-muted-foreground">
            Track and analyze your academic performance
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
          <Button variant="outline" asChild>
            <Link to="/add-semester">Add Semester</Link>
          </Button>
          
          <Button variant="default" asChild>
            <Link to="/calculator">CGPA Calculator</Link>
          </Button>
          
          <Button variant="secondary" asChild>
            <Link to="/analytics">View Analytics</Link>
          </Button>
          
          {semesters.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Reset Data</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset all data?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your semesters, courses, and GPA data.
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={resetData}>
                    Reset All Data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
      
      <DashboardStats />
      
      <SemestersList />
      
      {semesters.length > 0 && (
        <Card className="mb-6 mt-10 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-lg font-medium">Want to calculate your CGPA?</h3>
                <p className="text-muted-foreground">
                  Use our CGPA Calculator to add courses and calculate your GPA
                </p>
              </div>
              <Button asChild>
                <Link to="/calculator">CGPA Calculator</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
