
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">About CGPA Tracker</h1>
          <p className="text-muted-foreground">
            Learn more about the application and how to use it
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </div>
      
      <Card className="mb-8 animate-fade-in">
        <CardHeader>
          <CardTitle>What is CGPA Tracker?</CardTitle>
          <CardDescription>
            A tool designed to help students manage and track their academic performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            CGPA Tracker is a web application that helps students track their course grades, 
            calculate semester GPAs, and monitor their cumulative GPA (CGPA) throughout their 
            academic journey.
          </p>
          <p>
            With an intuitive interface and powerful analytics, CGPA Tracker makes it easy to 
            understand your academic progress and identify areas for improvement.
          </p>
        </CardContent>
      </Card>
      
      <Card className="mb-8 animate-fade-in">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4 py-2">
              <h3 className="font-medium">Step 1: Add Semesters</h3>
              <p className="text-muted-foreground">
                Create semesters for each academic term you want to track
              </p>
            </div>
            
            <div className="border-l-4 border-primary pl-4 py-2">
              <h3 className="font-medium">Step 2: Add Courses</h3>
              <p className="text-muted-foreground">
                For each semester, add the courses you took along with credit hours and grades
              </p>
            </div>
            
            <div className="border-l-4 border-primary pl-4 py-2">
              <h3 className="font-medium">Step 3: Track Your Progress</h3>
              <p className="text-muted-foreground">
                The app automatically calculates your semester GPA and cumulative CGPA
              </p>
            </div>
            
            <div className="border-l-4 border-primary pl-4 py-2">
              <h3 className="font-medium">Step 4: Analyze Performance</h3>
              <p className="text-muted-foreground">
                View charts and analytics to understand your academic trends
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-8 animate-fade-in">
        <CardHeader>
          <CardTitle>Grading Scale</CardTitle>
          <CardDescription>
            GPA is calculated based on the following scale
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-gradient-to-r from-cgpa-a-plus to-cgpa-a-plus/80 p-3 rounded-md text-white">
              <div className="font-bold">A+</div>
              <div className="text-white/90">4.00</div>
            </div>
            <div className="bg-gradient-to-r from-cgpa-a to-cgpa-a/80 p-3 rounded-md text-white">
              <div className="font-bold">A</div>
              <div className="text-white/90">3.75</div>
            </div>
            <div className="bg-gradient-to-r from-cgpa-a-minus to-cgpa-a-minus/80 p-3 rounded-md text-white">
              <div className="font-bold">A-</div>
              <div className="text-white/90">3.50</div>
            </div>
            <div className="bg-gradient-to-r from-cgpa-b-plus to-cgpa-b-plus/80 p-3 rounded-md text-white">
              <div className="font-bold">B+</div>
              <div className="text-white/90">3.25</div>
            </div>
            <div className="bg-gradient-to-r from-cgpa-b to-cgpa-b/80 p-3 rounded-md text-white">
              <div className="font-bold">B</div>
              <div className="text-white/90">3.00</div>
            </div>
            <div className="bg-gradient-to-r from-cgpa-b-minus to-cgpa-b-minus/80 p-3 rounded-md text-white">
              <div className="font-bold">B-</div>
              <div className="text-white/90">2.75</div>
            </div>
            <div className="bg-gradient-to-r from-cgpa-c-plus to-cgpa-c-plus/80 p-3 rounded-md text-white">
              <div className="font-bold">C+</div>
              <div className="text-white/90">2.50</div>
            </div>
            <div className="bg-gradient-to-r from-cgpa-c to-cgpa-c/80 p-3 rounded-md text-white">
              <div className="font-bold">C</div>
              <div className="text-white/90">2.25</div>
            </div>
            <div className="bg-gradient-to-r from-cgpa-c-minus to-cgpa-c-minus/80 p-3 rounded-md text-white">
              <div className="font-bold">C-</div>
              <div className="text-white/90">2.00</div>
            </div>
            <div className="bg-gradient-to-r from-cgpa-d to-cgpa-d/80 p-3 rounded-md text-white">
              <div className="font-bold">D</div>
              <div className="text-white/90">1.00</div>
            </div>
            <div className="bg-gradient-to-r from-cgpa-f to-cgpa-f/80 p-3 rounded-md text-white">
              <div className="font-bold">F</div>
              <div className="text-white/90">0.00</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center mt-8 mb-8">
        <Button asChild>
          <Link to="/">Get Started Now</Link>
        </Button>
      </div>
    </div>
  );
};

export default About;
