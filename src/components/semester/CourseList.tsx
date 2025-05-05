import React, { useState } from 'react';
import { useCGPA } from '@/contexts/CGPAContext';
import { Button } from '@/components/ui/button';
import { Course, Grade } from '@/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { gradeToPoint, pointToGrade } from '@/utils/gpaCalculator';

interface CourseListProps {
  semesterId: string;
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ semesterId, courses }) => {
  const { updateCourse, removeCourse } = useCGPA();
  const [editingGpa, setEditingGpa] = useState<Record<string, number>>({});

  // Get color based on GPA value
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

  // Define the GPA step values
  const gpaSteps = [0.0, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5, 3.75, 4.0];

  const handleGpaChange = (courseId: string, value: string) => {
    const gpa = parseFloat(value);
    if (!isNaN(gpa) && gpa >= 0 && gpa <= 4.0) {
      setEditingGpa({...editingGpa, [courseId]: gpa});
      const grade = pointToGrade(gpa);
      updateCourse(semesterId, courseId, { grade });
    }
  };

  const handleGpaStep = (courseId: string, direction: 'up' | 'down') => {
    const currentGpa = editingGpa[courseId] !== undefined 
      ? editingGpa[courseId] 
      : gradeToPoint(courses.find(c => c.id === courseId)?.grade || 'F');
    
    // Find the nearest step value
    const nearestStepIndex = gpaSteps.findIndex(step => step > currentGpa) - 1;
    let newGpaIndex;
    
    if (direction === 'up') {
      newGpaIndex = nearestStepIndex + 1;
      if (newGpaIndex >= gpaSteps.length) newGpaIndex = gpaSteps.length - 1;
    } else {
      newGpaIndex = nearestStepIndex;
      if (newGpaIndex < 0) newGpaIndex = 0;
    }
    
    const newGpa = gpaSteps[newGpaIndex];
    handleGpaChange(courseId, newGpa.toString());
  };

  if (courses.length === 0) {
    return (
      <div className="text-center py-8 border rounded-xl bg-secondary/30">
        <p className="text-muted-foreground mb-2">No courses added to this semester yet</p>
        <p className="text-sm">Use the "Add Course" button to add your first course</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {courses.map((course) => {
        const gpaValue = editingGpa[course.id] !== undefined 
          ? editingGpa[course.id] 
          : gradeToPoint(course.grade);
          
        return (
          <div key={course.id} className="course-item">
            <div className="flex-1">
              <h3 className="font-medium">{course.name}</h3>
              <p className="text-sm text-muted-foreground">{course.creditHours} credit hours</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">GPA:</span>
                <div className="flex items-center">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-r-none"
                    onClick={() => handleGpaStep(course.id, 'down')}
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    min="0"
                    max="4.0"
                    step="0.25"
                    value={gpaValue}
                    onChange={(e) => handleGpaChange(course.id, e.target.value)}
                    className="w-20 h-8 text-center rounded-none"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-l-none"
                    onClick={() => handleGpaStep(course.id, 'up')}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Grade:</span>
                <span className={`text-sm font-medium ${getGpaColor(gpaValue)}`}>
                  {course.grade}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Points:</span>
                <span className={`text-sm font-medium ${getGpaColor(gpaValue)}`}>
                  {gpaValue.toFixed(2)}
                </span>
              </div>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">Remove</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove this course?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove "{course.name}" from this semester.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => removeCourse(semesterId, course.id)}>
                      Remove
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseList;