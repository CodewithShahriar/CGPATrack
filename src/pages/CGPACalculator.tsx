
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

const CGPACalculator: React.FC = () => {
  const { data, addCourse } = useCGPA();
  const { semesters, cgpa } = data;
  const [selectedSemester, setSelectedSemester] = useState('');
  const [courseName, setCourseName] = useState('');
  const [creditHours, setCreditHours] = useState(3);
  const [grade, setGrade] = useState<Grade>('A');
  const [showAddSemester, setShowAddSemester] = useState(false);

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

  const gradeOptions: Grade[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];

  // Get color based on GPA value
  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-green-600';
    if (gpa >= 3.0) return 'text-green-500';
    if (gpa >= 2.5) return 'text-yellow-600';
    if (gpa >= 2.0) return 'text-yellow-500';
    if (gpa >= 1.0) return 'text-red-500';
    return 'text-gray-500';
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
    setGrade('A');
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
                        min="1"
                        max="6"
                        value={creditHours}
                        onChange={(e) => setCreditHours(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade</Label>
                      <Select value={grade} onValueChange={(value) => setGrade(value as Grade)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {gradeOptions.map((g) => (
                            <SelectItem key={g} value={g}>{g}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
