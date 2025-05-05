
export type Grade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'F';

export interface GradePoint {
  grade: Grade;
  point: number;
}

export interface Course {
  id: string;
  name: string;
  creditHours: number;
  grade: Grade;
}

export interface Semester {
  id: string;
  name: string;
  courses: Course[];
  gpa: number;
  totalCredits: number;
}

export interface CGPAData {
  semesters: Semester[];
  cgpa: number;
  totalCredits: number;
}
