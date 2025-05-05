
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AddSemesterForm from '@/components/semester/AddSemesterForm';

const AddSemester: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Add New Semester</h1>
          <p className="text-muted-foreground">
            Create a new semester to track your courses and grades
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </div>
      
      <AddSemesterForm />
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          After creating a semester, you'll be able to add courses and track your GPA
        </p>
      </div>
    </div>
  );
};

export default AddSemester;
