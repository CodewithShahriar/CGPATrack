
import React from 'react';
import { useCGPA } from '@/contexts/CGPAContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const SemestersList: React.FC = () => {
  const { data, removeSemester } = useCGPA();
  const { semesters } = data;

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

  if (semesters.length === 0) {
    return (
      <Card className="mb-6 animate-fade-in">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No Semesters Added Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start tracking your academic progress by adding your first semester.
            </p>
            <Button asChild>
              <Link to="/add-semester">Add Your First Semester</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Semesters</h2>
      {semesters.map((semester) => (
        <Card key={semester.id} className="mb-6 overflow-hidden animate-fade-in semester-card">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>{semester.name}</CardTitle>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">
                  GPA: <span className={getGpaColor(semester.gpa)}>{semester.gpa.toFixed(2)}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  ({semester.totalCredits} credits)
                </p>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            {semester.courses.length > 0 ? (
              <div className="space-y-2">
                <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground mb-1">
                  <div>Course</div>
                  <div>Credits</div>
                  <div>Grade</div>
                </div>
                {semester.courses.map((course) => (
                  <div key={course.id} className="grid grid-cols-3 text-sm py-2 border-b last:border-0">
                    <div>{course.name}</div>
                    <div>{course.creditHours}</div>
                    <div className={getGpaColor(course.grade === 'F' ? 0 : 1)}>{course.grade}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-3">No courses in this semester</p>
            )}
            
            <div className="flex justify-between mt-4">
              <Button variant="outline" asChild>
                <Link to={`/semester/${semester.id}`}>View Details</Link>
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Remove</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the semester "{semester.name}" and all its courses.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => removeSemester(semester.id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SemestersList;
