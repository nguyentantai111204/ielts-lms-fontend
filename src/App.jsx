// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider, LoginPage } from "./auth";
import Home from "./home/Pages/Home";
import MainLayout from "./shared/Layout/MainLayout";
import { CourseProvider } from "./course/Context/CourseContext";
import About from "./shared/About/About";
import Instructors from "./Instructor/pages/Instructor";
import TestOnlineDetail from "./test-online/page/TestOnlineDetail";
import TestOnline from "./test-online/page/TestOnline";
import Course from "./course/Pages/Course";
import StudentCourse from "./student/Pages/StudentCourse";
import TestPage from "./test-online/page/TestPage";
import TestLayout from "./shared/Layout/TestLayout";
import TestResultPage from "./test-online/page/TestResultPage";
import StudentCourseView from "./student/Pages/StudentCourseView";
import LessonDetailPage from "./student/Pages/LessonDetailPage";
import AssignmentPage from "./student/Pages/AssignmentPage";
import QuizPage from "./student/Pages/QuizPage";

import ForbiddenPage from "./shared/Error/ForbiddenPage";
import NotFoundPage from "./shared/Error/NotFoundPage";

import { StudentRoutes, StudentInstructorRoutes, InstructorRoutes, AdminRoutes } from "./auth/Pages/ProtectedRoutes";
import InstructorCourse from "./Instructor/pages/InstructorCourse";
import InstructorCourseView from "./Instructor/pages/InstructorCourseView";
import InstructorLessonDetailPage from "./Instructor/pages/InstructorLessonDetailPage";
import InstructorAssignmentPage from "./Instructor/pages/InstructorAssignmentPage";
import InstructorQuizPage from "./Instructor/pages/InstructorQuizPage";
import Profile from "./student/Pages/Profile";
import NotificationsPage from "./student/Pages/NotificationsPage";
import AdminLayout from "./shared/Layout/AdminLayout";
import AdminDashboard from "./admin/Pages/AdminDashBoard";
import AdminUsersManagement from "./admin/Pages/AdminUsersManagements";
import AdminCourseManagement from "./admin/Pages/AdminCourseManagement";
import AdminTestManagement from "./admin/Pages/AdminTestManagement";
import TestStat from "./admin/Pages/TestStat";
import AdminInstructorManagement from "./admin/Pages/AdminIntructorManagement";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CourseProvider>
          <BrowserRouter>
            <Routes>
              {/* Layout chung */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/course/:slug" element={<Course />} />
                <Route path="/instructors" element={<Instructors />} />
                <Route path="/test-online" element={<TestOnline />} />
                <Route path="/test-online/:testId" element={<TestOnlineDetail />} />

                {/* Student-only routes */}
                <Route element={<StudentRoutes />}>
                  <Route path="/student/my-courses" element={<StudentCourse />} />
                  <Route path="/my-courses/view/:courseId" element={<StudentCourseView />} />
                  <Route path="/my-courses/view/:courseId/lesson/:lessonId" element={<LessonDetailPage />} />
                  <Route path="/my-courses/view/:courseId/lesson/:lessonId/assignment/:assignmentId" element={<AssignmentPage />} />
                  <Route path="/my-courses/view/:courseId/lesson/:lessonId/quiz/:quizId" element={<QuizPage />} />
                  <Route path="/student/profile/:studentId" element={<Profile />} />
                  <Route path="/student/notifications/:userId" element={<NotificationsPage />} />
                </Route>

                {/* Instructor routes */}
                <Route element={<InstructorRoutes />}>
                  <Route path="/instructor/my-courses" element={<InstructorCourse />} />
                  <Route path="/instructor/my-courses/view/:courseId" element={<InstructorCourseView />} />
                  <Route path="/instructor/courses/:courseId/lesson/:lessonId" element={<InstructorLessonDetailPage />} />
                  <Route path="/instructor/courses/:courseId/lesson/:lessonId/assignment/:assignmentId/view" element={< InstructorAssignmentPage />} />
                  <Route path="/instructor/courses/:courseId/lesson/:lessonId/quiz/:quizId/view" element={< InstructorQuizPage />} />
                </Route>

                {/* Error pages */}
                <Route path="/403" element={<ForbiddenPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>



              <Route element={<StudentInstructorRoutes />}>
                <Route element={<TestLayout />}>
                  <Route path="/test-online/:testId/take/:submissionId" element={<TestPage />} />
                  <Route path="/test-online/:testId" element={<TestOnlineDetail />} />
                  <Route path="/test-result/:submissionId" element={<TestResultPage />} />
                </Route>
              </Route>


              <Route element={<AdminRoutes />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard/>} />
                  <Route path="users" element={<AdminUsersManagement/>} />
                  <Route path="courses" element={<AdminCourseManagement/>} />
                  <Route path="tests" element={<AdminTestManagement/>} />
                  <Route path="tests/:testId/stat" element={<TestStat />} />
                  <Route path="instructors" element={<AdminInstructorManagement/>} />
                </Route>
              </Route>

            </Routes>
          </BrowserRouter>
        </CourseProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
