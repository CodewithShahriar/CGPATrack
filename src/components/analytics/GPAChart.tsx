
import React from 'react';
import { useCGPA } from '@/contexts/CGPAContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const GPAChart: React.FC = () => {
  const { data } = useCGPA();
  const { semesters } = data;

  // Prepare data for the chart
  const chartData = semesters.map((semester, index) => ({
    name: semester.name,
    gpa: semester.gpa,
    credits: semester.totalCredits
  }));

  // Calculate cumulative GPA for each semester
  const cumulativeData = semesters.reduce((acc, semester, index) => {
    const previousSemesters = semesters.slice(0, index + 1);
    let totalPoints = 0;
    let totalCredits = 0;
    
    previousSemesters.forEach(sem => {
      totalPoints += sem.gpa * sem.totalCredits;
      totalCredits += sem.totalCredits;
    });
    
    const cgpa = totalCredits > 0 ? parseFloat((totalPoints / totalCredits).toFixed(2)) : 0;
    
    acc.push({
      name: semester.name,
      gpa: semester.gpa,
      cgpa: cgpa,
      credits: semester.totalCredits
    });
    
    return acc;
  }, [] as Array<{ name: string; gpa: number; cgpa: number; credits: number }>);

  if (semesters.length === 0) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No Data Available</h3>
            <p className="text-muted-foreground">
              Add some semesters with courses to see your GPA chart.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>GPA Trend Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={cumulativeData}
              margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                domain={[0, 4]} 
                ticks={[0, 1, 2, 3, 4]} 
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value: any) => [value.toFixed(2), '']}
                labelFormatter={(label) => `Semester: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="gpa"
                name="Semester GPA"
                stroke="#7E69AB"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="cgpa"
                name="Cumulative GPA"
                stroke="#4CAF50"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GPAChart;
