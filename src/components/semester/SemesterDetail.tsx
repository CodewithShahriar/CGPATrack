
import React, { useState } from 'react';
import { useCGPA } from '@/contexts/CGPAContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Separator } from '@/components/ui/separator';
import AddCourseForm from './AddCourseForm';
import CourseList from './CourseList';

const SemesterDetail: React.FC = () => {
  const { semesterId } = useParams<{ semesterId: string }>();
  const { data, removeSemester } = useCGPA();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);

  // Find the semester using the ID from the URL
  const semester = data.semesters.find(s => s.id === semesterId);

  if (!semester) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Semester Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The semester you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    );
  }

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

  // Calculate percentage for the progress bar
  const gpaPercentage = Math.min(semester.gpa * 25, 100);

  const handleDeleteSemester = () => {
    removeSemester(semester.id);
    navigate('/');
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{semester.name}</h1>
          <p className="text-muted-foreground">
            Manage courses and track your performance
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Semester GPA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2 tracking-tight">
            <span className={getGpaColor(semester.gpa)}>{semester.gpa.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground ml-2">/ 4.0</span>
          </div>
          <Progress value={gpaPercentage} className="h-2" />
          <div className="flex justify-between mt-4">
            <div>
              <span className="text-sm font-medium">Total Credits: </span>
              <span className="text-sm">{semester.totalCredits}</span>
            </div>
            <div>
              <span className="text-sm font-medium">Courses: </span>
              <span className="text-sm">{semester.courses.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Courses</h2>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : 'Add Course'}
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <AddCourseForm semesterId={semester.id} onComplete={() => setShowAddForm(false)} />
            </CardContent>
          </Card>
        )}

        <CourseList semesterId={semester.id} courses={semester.courses} />
      </div>

      <Separator className="my-8" />

      <div className="flex justify-between items-center">
        <Button variant="outline" asChild>
          <Link to="/">Back to Dashboard</Link>
        </Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Semester</Button>
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
              <AlertDialogAction onClick={handleDeleteSemester}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default SemesterDetail;
