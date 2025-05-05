
import React, { useState } from 'react';
import { useCGPA } from '@/contexts/CGPAContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";

const AddSemesterForm: React.FC = () => {
  const [semesterName, setSemesterName] = useState('');
  const [error, setError] = useState('');
  const { addSemester } = useCGPA();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!semesterName.trim()) {
      setError('Please enter a semester name');
      return;
    }
    
    try {
      addSemester(semesterName.trim());
      toast.success(`Semester "${semesterName}" added successfully`);
      
      // Only redirect to home if not on calculator page
      if (location.pathname !== '/calculator') {
        navigate('/');
      }
      
      setSemesterName(''); // Clear form after submission
    } catch (error) {
      console.error('Failed to add semester:', error);
      setError('Failed to add semester. Please try again.');
    }
  };

  return (
    <Card className="max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle>Add New Semester</CardTitle>
        <CardDescription>Create a new semester to start tracking courses and grades</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="semesterName">Semester Name</Label>
            <Input
              id="semesterName"
              placeholder="e.g. Fall 2023"
              value={semesterName}
              onChange={(e) => {
                setSemesterName(e.target.value);
                setError('');
              }}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <Button type="submit" className="w-full">Create Semester</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddSemesterForm;
