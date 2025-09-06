import React from "react";
import { Outlet } from "react-router-dom";
import RequiredRole from "./RequiredRole";

export const StudentRoutes = () => (
  <RequiredRole allowedRoles={["STUDENT"]}>
    <Outlet />
  </RequiredRole>
);

export const StudentInstructorRoutes = () => (
  <RequiredRole allowedRoles={["STUDENT", "INSTRUCTOR"]}>
    <Outlet />
  </RequiredRole>
);


export const InstructorRoutes = () => (
  <RequiredRole allowedRoles={["INSTRUCTOR"]}>
    <Outlet />
  </RequiredRole>
);

export const AdminRoutes = () => (
  <RequiredRole allowedRoles={["ADMIN"]}>
    <Outlet />
  </RequiredRole>
);
