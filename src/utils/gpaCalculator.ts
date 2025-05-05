
import { Grade, Course, Semester, CGPAData } from '../types';

// Grade to GPA point conversion
export const gradeToPoint = (grade: Grade): number => {
  const gradeMap: Record<Grade, number> = {
    'A+': 4.0,
    'A': 3.75,
    'A-': 3.5,
    'B+': 3.25,
    'B': 3.0,
    'B-': 2.75,
    'C+': 2.5,
    'C': 2.25,
    'C-': 2.0,
    'D': 1.0,
    'F': 0.0
  };
  
  return gradeMap[grade];
};

// Calculate GPA for a semester
export const calculateSemesterGPA = (courses: Course[]): number => {
  if (courses.length === 0) return 0;
  
  let totalPoints = 0;
  let totalCredits = 0;
  
  courses.forEach(course => {
    const point = gradeToPoint(course.grade);
    totalPoints += point * course.creditHours;
    totalCredits += course.creditHours;
  });
  
  return totalCredits === 0 ? 0 : parseFloat((totalPoints / totalCredits).toFixed(2));
};

// Calculate total credits for a semester
export const calculateSemesterCredits = (courses: Course[]): number => {
  return courses.reduce((sum, course) => sum + course.creditHours, 0);
};

// Calculate CGPA across all semesters
export const calculateCGPA = (semesters: Semester[]): number => {
  if (semesters.length === 0) return 0;
  
  let totalPoints = 0;
  let totalCredits = 0;
  
  semesters.forEach(semester => {
    semester.courses.forEach(course => {
      const point = gradeToPoint(course.grade);
      totalPoints += point * course.creditHours;
      totalCredits += course.creditHours;
    });
  });
  
  return totalCredits === 0 ? 0 : parseFloat((totalPoints / totalCredits).toFixed(2));
};

// Calculate total credits across all semesters
export const calculateTotalCredits = (semesters: Semester[]): number => {
  return semesters.reduce((sum, semester) => 
    sum + semester.courses.reduce((semSum, course) => semSum + course.creditHours, 0), 0);
};

// Update CGPA data
export const updateCGPAData = (semesters: Semester[]): CGPAData => {
  return {
    semesters,
    cgpa: calculateCGPA(semesters),
    totalCredits: calculateTotalCredits(semesters)
  };
};
