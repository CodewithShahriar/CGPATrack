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

// GPA point to Grade conversion
export const pointToGrade = (point: number): Grade => {
  if (point >= 4.0) return 'A+';
  if (point >= 3.75) return 'A';
  if (point >= 3.5) return 'A-';
  if (point >= 3.25) return 'B+';
  if (point >= 3.0) return 'B';
  if (point >= 2.75) return 'B-';
  if (point >= 2.5) return 'C+';
  if (point >= 2.25) return 'C';
  if (point >= 2.0) return 'C-';
  if (point >= 1.0) return 'D';
  return 'F';
};

// Calculate GPA for a semester (excluding F grades from credit hour calculation)
export const calculateSemesterGPA = (courses: Course[]): number => {
  if (courses.length === 0) return 0;
  
  let totalPoints = 0;
  let totalCredits = 0;
  
  courses.forEach(course => {
    const point = gradeToPoint(course.grade);
    totalPoints += point * course.creditHours;
    
    // Only count credit hours if the course doesn't have a 0 GPA (F grade)
    if (point > 0) {
      totalCredits += course.creditHours;
    }
  });
  
  return totalCredits === 0 ? 0 : parseFloat((totalPoints / totalCredits).toFixed(2));
};

// Calculate total credits for a semester (excluding F grades)
export const calculateSemesterCredits = (courses: Course[]): number => {
  return courses.reduce((sum, course) => {
    const point = gradeToPoint(course.grade);
    // Only add to total credits if the course doesn't have a 0 GPA (F grade)
    return sum + (point > 0 ? course.creditHours : 0);
  }, 0);
};

// Calculate CGPA across all semesters (excluding F grades from credit hour calculation)
export const calculateCGPA = (semesters: Semester[]): number => {
  if (semesters.length === 0) return 0;
  
  let totalPoints = 0;
  let totalCredits = 0;
  
  semesters.forEach(semester => {
    semester.courses.forEach(course => {
      const point = gradeToPoint(course.grade);
      totalPoints += point * course.creditHours;
      
      // Only count credit hours if the course doesn't have a 0 GPA (F grade)
      if (point > 0) {
        totalCredits += course.creditHours;
      }
    });
  });
  
  return totalCredits === 0 ? 0 : parseFloat((totalPoints / totalCredits).toFixed(2));
};

// Calculate total credits across all semesters (excluding F grades)
export const calculateTotalCredits = (semesters: Semester[]): number => {
  return semesters.reduce((sum, semester) => 
    sum + semester.courses.reduce((semSum, course) => {
      const point = gradeToPoint(course.grade);
      // Only add to total credits if the course doesn't have a 0 GPA (F grade)
      return semSum + (point > 0 ? course.creditHours : 0);
    }, 0), 0);
};

// Update CGPA data
export const updateCGPAData = (semesters: Semester[]): CGPAData => {
  return {
    semesters,
    cgpa: calculateCGPA(semesters),
    totalCredits: calculateTotalCredits(semesters)
  };
};

// Get the next GPA value based on specified steps
export const getNextGpaStep = (currentGpa: number, direction: 'up' | 'down'): number => {
  const gpaSteps = [0.0, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5, 3.75, 4.0];
  
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
  
  return gpaSteps[newGpaIndex];
};