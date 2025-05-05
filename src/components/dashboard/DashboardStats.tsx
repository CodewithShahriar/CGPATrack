
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useCGPA } from '@/contexts/CGPAContext';

const DashboardStats: React.FC = () => {
  const { data } = useCGPA();
  const { cgpa, totalCredits, semesters } = data;
  
  // Calculate GPA color based on value
  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-cgpa-a-plus';
    if (gpa >= 3.3) return 'text-cgpa-a';
    if (gpa >= 3.0) return 'text-cgpa-a-minus';
    if (gpa >= 2.7) return 'text-cgpa-b-plus';
    if (gpa >= 2.3) return 'text-cgpa-b';
    if (gpa >= 2.0) return 'text-cgpa-b-minus';
    if (gpa >= 1.7) return 'text-cgpa-c-plus';
    if (gpa >= 1.3) return 'text-cgpa-c';
    if (gpa >= 1.0) return 'text-cgpa-c-minus';
    if (gpa > 0) return 'text-cgpa-d';
    return 'text-gray-500';
  };

  // Calculate percentage for progress bar
  const gpaPercentage = Math.min(cgpa * 25, 100);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="dashboard-stat">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Current CGPA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2 tracking-tight">
            <span className={getGpaColor(cgpa)}>{cgpa.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground ml-2">/ 4.0</span>
          </div>
          <Progress value={gpaPercentage} className="h-2" />
        </CardContent>
      </Card>
      
      <Card className="dashboard-stat">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Credits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold tracking-tight">
            {totalCredits}
            <span className="text-sm text-muted-foreground ml-2">credits</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="dashboard-stat">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Semesters Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold tracking-tight">
            {semesters.length}
            <span className="text-sm text-muted-foreground ml-2">semesters</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
