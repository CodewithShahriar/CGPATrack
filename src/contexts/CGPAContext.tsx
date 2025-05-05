
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CGPAData, Semester, Course, Grade } from '../types';
import { calculateSemesterGPA, calculateSemesterCredits, updateCGPAData } from '../utils/gpaCalculator';
import { saveDataToLocalStorage, loadDataFromLocalStorage } from '../utils/localStorage';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

// Default empty state
const defaultCGPAData: CGPAData = {
  semesters: [],
  cgpa: 0,
  totalCredits: 0
};

interface CGPAContextType {
  data: CGPAData;
  addSemester: (name: string) => void;
  addCourse: (semesterId: string, course: Omit<Course, 'id'>) => void;
  updateCourse: (semesterId: string, courseId: string, updates: Partial<Omit<Course, 'id'>>) => void;
  removeCourse: (semesterId: string, courseId: string) => void;
  removeSemester: (semesterId: string) => void;
  resetData: () => void;
  getSemester: (semesterId: string) => Semester | undefined;
}

const CGPAContext = createContext<CGPAContextType | undefined>(undefined);

export function CGPAProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CGPAData>(defaultCGPAData);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedData = loadDataFromLocalStorage();
    if (savedData) {
      setData(savedData);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveDataToLocalStorage(data);
  }, [data]);

  const addSemester = (name: string) => {
    const newSemester: Semester = {
      id: uuidv4(),
      name,
      courses: [],
      gpa: 0,
      totalCredits: 0
    };
    
    const updatedSemesters = [...data.semesters, newSemester];
    const updatedData = updateCGPAData(updatedSemesters);
    
    setData(updatedData);
    toast.success(`Semester "${name}" added successfully`);
  };

  const addCourse = (semesterId: string, course: Omit<Course, 'id'>) => {
    const updatedSemesters = data.semesters.map(semester => {
      if (semester.id === semesterId) {
        const newCourse = { ...course, id: uuidv4() };
        const updatedCourses = [...semester.courses, newCourse];
        
        return {
          ...semester,
          courses: updatedCourses,
          gpa: calculateSemesterGPA(updatedCourses),
          totalCredits: calculateSemesterCredits(updatedCourses)
        };
      }
      return semester;
    });
    
    const updatedData = updateCGPAData(updatedSemesters);
    setData(updatedData);
    toast.success(`Course "${course.name}" added successfully`);
  };

  const updateCourse = (semesterId: string, courseId: string, updates: Partial<Omit<Course, 'id'>>) => {
    const updatedSemesters = data.semesters.map(semester => {
      if (semester.id === semesterId) {
        const updatedCourses = semester.courses.map(course => {
          if (course.id === courseId) {
            return { ...course, ...updates };
          }
          return course;
        });
        
        return {
          ...semester,
          courses: updatedCourses,
          gpa: calculateSemesterGPA(updatedCourses),
          totalCredits: calculateSemesterCredits(updatedCourses)
        };
      }
      return semester;
    });
    
    const updatedData = updateCGPAData(updatedSemesters);
    setData(updatedData);
  };

  const removeCourse = (semesterId: string, courseId: string) => {
    const updatedSemesters = data.semesters.map(semester => {
      if (semester.id === semesterId) {
        const updatedCourses = semester.courses.filter(course => course.id !== courseId);
        
        return {
          ...semester,
          courses: updatedCourses,
          gpa: calculateSemesterGPA(updatedCourses),
          totalCredits: calculateSemesterCredits(updatedCourses)
        };
      }
      return semester;
    });
    
    const updatedData = updateCGPAData(updatedSemesters);
    setData(updatedData);
    toast.success("Course removed successfully");
  };

  const removeSemester = (semesterId: string) => {
    const semesterToRemove = data.semesters.find(s => s.id === semesterId);
    const updatedSemesters = data.semesters.filter(semester => semester.id !== semesterId);
    const updatedData = updateCGPAData(updatedSemesters);
    
    setData(updatedData);
    toast.success(`Semester "${semesterToRemove?.name || 'Unknown'}" removed successfully`);
  };

  const resetData = () => {
    setData(defaultCGPAData);
    toast.success("All data has been reset");
  };

  const getSemester = (semesterId: string) => {
    return data.semesters.find(semester => semester.id === semesterId);
  };

  const value = {
    data,
    addSemester,
    addCourse,
    updateCourse,
    removeCourse,
    removeSemester,
    resetData,
    getSemester
  };

  return <CGPAContext.Provider value={value}>{children}</CGPAContext.Provider>;
}

export const useCGPA = () => {
  const context = useContext(CGPAContext);
  if (context === undefined) {
    throw new Error('useCGPA must be used within a CGPAProvider');
  }
  return context;
};
