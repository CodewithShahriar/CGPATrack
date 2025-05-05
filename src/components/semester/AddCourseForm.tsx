
import React, { useState } from 'react';
import { useCGPA } from '@/contexts/CGPAContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { coursesData } from '@/data/courses';
import { Grade } from '@/types';

interface AddCourseFormProps {
  semesterId: string;
  onComplete?: () => void;
}

const AddCourseForm: React.FC<AddCourseFormProps> = ({ semesterId, onComplete }) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [creditHours, setCreditHours] = useState(3);
  const [grade, setGrade] = useState<Grade>('A');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { addCourse } = useCGPA();

  // For dropdown selection
  const [selectedCourse, setSelectedCourse] = useState('');

  const gradeOptions: Grade[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];

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
    setGrade('A');
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
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              {gradeOptions.map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">Add Course</Button>
      </div>
    </form>
  );
};

export default AddCourseForm;
