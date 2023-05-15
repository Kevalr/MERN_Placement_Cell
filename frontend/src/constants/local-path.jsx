import Login from "../components/login-form";
import Register from "../components/sign-up-form";
import Dashboard from "../views/dashboard";
import InterviewCreateUpdate from "../views/interviewCreateUpdate";
import Interviews from "../views/interviews";
import StudentCreateUpdateForm from "../views/studentCreateUpdateForm";
import StudentUpdateForm from "../views/studentUpdateForm";

const PathAuth = {
  Login: "/login",
  Register: "register",
  ForgotPassword: "/forgot-password",
  ResetPassword: "/reset-password",
  SuccessEmail: "/success-email",
  EmailVerification: "/email-verification",
};

const PathDashboard = {
  Dashboard: "/dashboard",
  Interviews: "/interviews",
  StudentCreate: "/student-create",
  StudentUpdate: "/student-update/:id",
  InterviewsCreateUpdate: "/interviews-create-update",
};

const Path = {
  // No layout
  Root: "/", // This redirect to Login

  // Auth layout
  ...PathAuth,

  ...PathDashboard,

  NotFound: "/not-found",
};

const ProtectedRoutes = [
  {
    element: <Dashboard />,
    path: Path.Dashboard,
    name: "Students",
    subRoute: [],
    showInSidebar: true,
  },
  {
    element: <StudentCreateUpdateForm />,
    path: Path.StudentCreate,
    name: "Create Student Page",
    subRoute: [],
    showInSidebar: false,
  },
  {
    element: <StudentUpdateForm />,
    path: Path.StudentUpdate,
    name: "Update Student Page",
    subRoute: [],
    showInSidebar: false,
  },
  {
    element: <Interviews />,
    path: Path.Interviews,
    name: "Interviews",
    subRoute: [],
    showInSidebar: true,
  },
  {
    element: <InterviewCreateUpdate />,
    path: Path.InterviewsCreateUpdate,
    name: "Interviews Create Upate Page",
    subRoute: [],
    showInSidebar: false,
  },
];

const PublicRoutes = [
  {
    element: <Login />,
    path: Path.Login,
    name: "Login",
    subRoute: [],
  },
  {
    element: <Register />,
    path: Path.Register,
    name: "Register",
    subRoute: [],
  },
];

export { ProtectedRoutes, PublicRoutes };

export default Path;
