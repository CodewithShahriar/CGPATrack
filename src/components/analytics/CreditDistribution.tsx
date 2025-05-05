
import React from 'react';
import { useCGPA } from '@/contexts/CGPAContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

const CreditDistribution: React.FC = () => {
  const { data } = useCGPA();
  const { semesters } = data;

  // Prepare data for the chart
  const chartData = semesters.map((semester) => ({
    name: semester.name,
    credits: semester.totalCredits,
    gpa: semester.gpa
  }));

  // Generate dynamic colors based on GPA
  const getBarColor = (gpa: number) => {
    if (gpa >= 3.7) return '#4CAF50'; // A+
    if (gpa >= 3.3) return '#66BB6A'; // A
    if (gpa >= 3.0) return '#81C784'; // A-
    if (gpa >= 2.7) return '#90CAF9'; // B+
    if (gpa >= 2.3) return '#64B5F6'; // B
    if (gpa >= 2.0) return '#42A5F5'; // B-
    if (gpa >= 1.7) return '#FFD54F'; // C+
    if (gpa >= 1.3) return '#FFCA28'; // C
    if (gpa >= 1.0) return '#FFC107'; // C-
    if (gpa > 0) return '#FFA726';    // D
    return '#EF5350';                 // F
  };

  if (semesters.length === 0) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No Data Available</h3>
            <p className="text-muted-foreground">
              Add some semesters with courses to see your credit distribution.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Credit Hours Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
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
                tick={{ fontSize: 12 }}
                label={{ value: 'Credit Hours', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
              />
              <Tooltip 
                formatter={(value: any) => [`${value} credits`, 'Credit Hours']}
                labelFormatter={(label) => `Semester: ${label}`}
              />
              <Bar dataKey="credits" name="Credit Hours">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.gpa)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditDistribution;
