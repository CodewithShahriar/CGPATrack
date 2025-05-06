import React, { useState, useEffect } from 'react';
import { useCGPA } from '@/contexts/CGPAContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Grade, Course } from '@/types';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import AddSemesterForm from '@/components/semester/AddSemesterForm';
import { gradeToPoint, pointToGrade } from '@/utils/gpaCalculator';

const CGPACalculator: React.FC = () => {
  const { data, addCourse } = useCGPA();
  const { semesters, cgpa } = data;
  const [selectedSemester, setSelectedSemester] = useState('');
  const [courseName, setCourseName] = useState('');
  const [creditHours, setCreditHours] = useState(3);
  const [gpaPoint, setGpaPoint] = useState(4.0);
  const [grade, setGrade] = useState<Grade>('A+');
  const [showAddSemester, setShowAddSemester] = useState(false);

  // Define the GPA step values
  const gpaSteps = [0.0, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5, 3.75, 4.0];

  // Auto-select first semester if available and none selected
  useEffect(() => {
    if (semesters.length > 0 && !selectedSemester) {
      setSelectedSemester(semesters[0].id);
    }
  }, [semesters, selectedSemester]);

  // If semester was just added, hide the add semester form
  useEffect(() => {
    if (semesters.length > 0 && showAddSemester) {
      setShowAddSemester(false);
      // Auto-select the newest semester (last in the array)
      setSelectedSemester(semesters[semesters.length - 1].id);
    }
  }, [semesters.length]);

  // Update grade whenever GPA point changes
  useEffect(() => {
    setGrade(pointToGrade(gpaPoint));
  }, [gpaPoint]);

  // Get color based on GPA value
  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-green-600';
    if (gpa >= 3.0) return 'text-green-500';
    if (gpa >= 2.5) return 'text-yellow-600';
    if (gpa >= 2.0) return 'text-yellow-500';
    if (gpa >= 1.0) return 'text-red-500';
    return 'text-gray-500';
  };

  const handleGpaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 4.0) {
      setGpaPoint(parseFloat(value.toFixed(2)));
    }
  };

  const handleGpaStep = (direction: 'up' | 'down') => {
    // Find the nearest step value
    const nearestStepIndex = gpaSteps.findIndex(step => step > gpaPoint) - 1;
    let newGpaIndex;
    
    if (direction === 'up') {
      newGpaIndex = nearestStepIndex + 1;
      if (newGpaIndex >= gpaSteps.length) newGpaIndex = gpaSteps.length - 1;
    } else {
      newGpaIndex = nearestStepIndex;
      if (newGpaIndex < 0) newGpaIndex = 0;
    }
    
    setGpaPoint(gpaSteps[newGpaIndex]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSemester) {
      toast.error('Please select a semester');
      return;
    }
    
    if (!courseName.trim()) {
      toast.error('Please enter a course name');
      return;
    }
    
    const newCourse: Omit<Course, 'id'> = {
      name: courseName,
      creditHours,
      grade
    };
    
    addCourse(selectedSemester, newCourse);
    
    // Reset form
    setCourseName('');
    setCreditHours(3);
    setGpaPoint(4.0);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">CGPA Calculator</h1>
          <p className="text-muted-foreground">
            Add your courses to calculate your CGPA
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {showAddSemester ? (
          <div>
            <AddSemesterForm />
            <Button 
              variant="outline" 
              className="mt-4 w-full"
              onClick={() => setShowAddSemester(false)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Add Course</CardTitle>
            </CardHeader>
            <CardContent>
              {semesters.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">You need to create a semester first</p>
                  <Button onClick={() => setShowAddSemester(true)}>
                    Add Your First Semester
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="semester">Select Semester</Label>
                    <div className="flex space-x-2">
                      <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select a semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {semesters.map((semester) => (
                            <SelectItem key={semester.id} value={semester.id}>
                              {semester.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowAddSemester(true)}
                      >
                        + New
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="courseName">Course Name</Label>
                    <Input
                      id="courseName"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      placeholder="e.g. Introduction to Computer Science"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="creditHours">Credit Hours</Label>
                      <Input
                        id="creditHours"
                        type="number"
                        min="0.5"
                        max="6"
                        step="0.5"
                        value={creditHours}
                        onChange={(e) => setCreditHours(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gpaPoint">GPA (0.0 - 4.0)</Label>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center flex-1">
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            className="h-10 rounded-r-none"
                            onClick={() => handleGpaStep('down')}
                          >
                            -
                          </Button>
                          <Input
                            id="gpaPoint"
                            type="number"
                            min="0"
                            max="4.0"
                            step="0.01"
                            value={gpaPoint}
                            onChange={handleGpaChange}
                            className="rounded-none text-center"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            className="h-10 rounded-l-none"
                            onClick={() => handleGpaStep('up')}
                          >
                            +
                          </Button>
                        </div>
                        <div className="ml-2 text-sm font-medium bg-secondary px-2 py-1 rounded">
                          {grade}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">Add Course</Button>
                </form>
              )}
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Your CGPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="text-5xl font-bold mb-4">
                <span className={getGpaColor(cgpa)}>{cgpa.toFixed(2)}</span>
              </div>
              <p className="text-muted-foreground">
                Based on {data.totalCredits} total credit hours
              </p>
              
              {semesters.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Semester Breakdown</h3>
                  <div className="space-y-2">
                    {semesters.map((semester) => (
                      <div key={semester.id} className="flex justify-between items-center p-2 border rounded-lg">
                        <span>{semester.name}</span>
                        <span className={getGpaColor(semester.gpa)}>
                          GPA: {semester.gpa.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/">View All Semesters</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CGPACalculator;