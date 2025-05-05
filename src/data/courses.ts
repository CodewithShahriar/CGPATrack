
export interface CourseOption {
  name: string;
  code: string;
  creditHours: number;
}

export const coursesData: CourseOption[] = [
  { name: "Competitive Programming", code: "CS200", creditHours: 3 },
  { name: "Algorithm Design and Analysis", code: "CS231", creditHours: 3 },
  { name: "Algorithms", code: "CS301", creditHours: 4 },
  { name: "Database Systems", code: "CS305", creditHours: 3 },
  { name: "Web Development", code: "CS325", creditHours: 3 },
  { name: "Mobile App Development", code: "CS330", creditHours: 3 },
  { name: "Calculus I", code: "MATH101", creditHours: 4 },
  { name: "Linear Algebra", code: "MATH201", creditHours: 3 },
  { name: "Statistics", code: "MATH240", creditHours: 3 },
  { name: "Discrete Mathematics", code: "MATH220", creditHours: 4 },
  { name: "Physics I", code: "PHYS101", creditHours: 4 },
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
