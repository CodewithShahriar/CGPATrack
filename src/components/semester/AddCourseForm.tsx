import React, { useState, useEffect } from 'react';
import { useCGPA } from '@/contexts/CGPAContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { coursesData } from '@/data/courses';
import { Grade } from '@/types';
import { pointToGrade } from '@/utils/gpaCalculator';

interface AddCourseFormProps {
  semesterId: string;
  onComplete?: () => void;
}

const AddCourseForm: React.FC<AddCourseFormProps> = ({ semesterId, onComplete }) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [creditHours, setCreditHours] = useState(3);
  const [gpaPoint, setGpaPoint] = useState(4.0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { addCourse } = useCGPA();

  // Derived state for the grade based on GPA point
  const [grade, setGrade] = useState<Grade>('A+');

  // Update grade whenever GPA point changes
  useEffect(() => {
    setGrade(pointToGrade(gpaPoint));
  }, [gpaPoint]);

  // For dropdown selection
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleCourseSelect = (courseCode: string) => {
    setSelectedCourse(courseCode);
    const selectedCourseData = coursesData.find(c => c.code === courseCode);
    
    if (selectedCourseData) {
      setCourseName(selectedCourseData.name);
      setCourseCode(selectedCourseData.code);
      setCreditHours(selectedCourseData.creditHours);
      setErrors({});
    }
  };

  const handleCustomCourseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseName(e.target.value);
    setSelectedCourse(''); // Clear selected course when custom name is entered
    setErrors({});
  };

  const handleGpaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 4.0) {
      setGpaPoint(parseFloat(value.toFixed(2)));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    if (!courseName.trim()) {
      newErrors.courseName = 'Course name is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    addCourse(semesterId, {
      name: courseCode ? `${courseCode} - ${courseName}` : courseName,
      creditHours,
      grade
    });
    
    // Reset form
    setCourseName('');
    setCourseCode('');
    setCreditHours(3);
    setGpaPoint(4.0);
    setSelectedCourse('');
    
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="courseSelect">Select Course</Label>
        <Select value={selectedCourse} onValueChange={handleCourseSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select a course or enter custom" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="custom">Custom Course</SelectItem>
            {coursesData.map((course) => (
              <SelectItem key={course.code} value={course.code}>
                {course.code} - {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {!selectedCourse && (
        <div className="space-y-2">
          <Label htmlFor="courseName">Course Name</Label>
          <Input
            id="courseName"
            placeholder="Enter course name"
            value={courseName}
            onChange={handleCustomCourseChange}
          />
          {errors.courseName && <p className="text-sm text-destructive">{errors.courseName}</p>}
        </div>
      )}
      
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
            <Input
              id="gpaPoint"
              type="number"
              min="0"
              max="4.0"
              step="0.01"
              value={gpaPoint}
              onChange={handleGpaChange}
            />
            <div className="text-sm font-medium bg-secondary px-2 py-1 rounded">
              {grade}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">Add Course</Button>
      </div>
    </form>
  );
};

export default AddCourseForm;