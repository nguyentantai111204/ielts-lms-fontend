import { createContext, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCourseAPI, deleteCourseAPI, fetchCourses } from "../Services/CourseService";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const queryClient = useQueryClient();


  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });


  const addCourseMutation = useMutation({
    mutationFn: addCourseAPI,
    onSuccess: (newCourse) => {
      queryClient.setQueryData(["courses"], (old = []) => [...old, newCourse]);
    },
  });


  const deleteCourseMutation = useMutation({
    mutationFn: deleteCourseAPI,
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["courses"], (old = []) =>
        old.filter((c) => c.id !== deletedId)
      );
    },
  });

  return (
    <CourseContext.Provider
      value={{
        courses,
        isLoading,
        error,
        addCourse: addCourseMutation.mutate,
        deleteCourse: deleteCourseMutation.mutate,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
