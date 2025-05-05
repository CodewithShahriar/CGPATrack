
import React from 'react';
import { useCGPA } from '@/contexts/CGPAContext';
import { Button } from '@/components/ui/button';
import { Course, Grade } from '@/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { gradeToPoint } from '@/utils/gpaCalculator';

interface CourseListProps {
  semesterId: string;
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ semesterId, courses }) => {
  const { updateCourse, removeCourse } = useCGPA();

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

  const handleGradeChange = (courseId: string, grade: Grade) => {
    updateCourse(semesterId, courseId, { grade });
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
      {courses.map((course) => (
        <div key={course.id} className="course-item">
          <div className="flex-1">
            <h3 className="font-medium">{course.name}</h3>
            <p className="text-sm text-muted-foreground">{course.creditHours} credit hours</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Grade:</span>
              <Select
                value={course.grade}
                onValueChange={(value) => handleGradeChange(course.id, value as Grade)}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="C+">C+</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="C-">C-</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                  <SelectItem value="F">F</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Points:</span>
              <span className={`text-sm font-medium ${getGpaColor(gradeToPoint(course.grade))}`}>
                {gradeToPoint(course.grade).toFixed(2)}
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
      ))}
    </div>
  );
};

export default CourseList;
