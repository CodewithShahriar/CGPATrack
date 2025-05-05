
export interface CourseOption {
  name: string;
  code: string;
  creditHours: number;
}

export const coursesData: CourseOption[] = [
  { name: "Competitive Programming", code: "CSE200", creditHours: 3 },
  { name: "Algorithm Design and Analysis", code: "CSE231", creditHours: 3 },
  { name: "Algorithm Design and Analysis Lab", code: "CSE232", creditHours: 1.5 },
  { name: "Digital Logic Design", code: "CSE211", creditHours: 3 },
  { name: "Digital Logic Design Lab", code: "CSE212", creditHours: 1.5 },
  { name: "Geometry & Vector Analysis", code: "MAT216", creditHours: 3 },
  { name: "Data Structure", code: "CSE133", creditHours: 4 },
  { name: "Data Structure Lab", code: "CSE134", creditHours: 1.5 },
  { name: "Matrices, Complex Variable & Fourier Analysis", code: "MAT135", creditHours: 3 },
  { name: "Basic Electronics Engineering", code: "CSE131", creditHours: 3 },
  { name: "Basic Electronics Engineering Lab", code: "CSE132", creditHours: 1.5 },
  { name: "Physics II", code: "PHYS102", creditHours: 4 },
  { name: "English Composition", code: "ENG101", creditHours: 3 },
  { name: "Technical Writing", code: "ENG205", creditHours: 3 },
  { name: "Artificial Intelligence", code: "CS410", creditHours: 4 },
  { name: "Machine Learning", code: "CS420", creditHours: 4 },
  { name: "Computer Networks", code: "CS340", creditHours: 3 },
  { name: "Operating Systems", code: "CS350", creditHours: 4 },
  { name: "Software Engineering", code: "CS360", creditHours: 3 },
  { name: "Computer Graphics", code: "CS370", creditHours: 4 },
  { name: "Cybersecurity", code: "CS380", creditHours: 3 },
  { name: "Cloud Computing", code: "CS430", creditHours: 3 },
  { name: "Introduction to Psychology", code: "PSY101", creditHours: 3 },
  { name: "Introduction to Sociology", code: "SOC101", creditHours: 3 },
  { name: "Business Management", code: "BUS101", creditHours: 3 },
  { name: "Microeconomics", code: "ECON101", creditHours: 3 },
  { name: "Macroeconomics", code: "ECON102", creditHours: 3 },
  { name: "Introduction to Marketing", code: "MKT101", creditHours: 3 },
  { name: "Ethics in Technology", code: "PHIL230", creditHours: 3 },
  { name: "Professional Development", code: "PROF100", creditHours: 1 }
];
