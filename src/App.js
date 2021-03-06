import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/use-auth-listener";
import UserContext from "./context/user";

import ProtectedRoute from "./helpers/protectedRoute";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Profile = lazy(() => import("./pages/Profile"));

export default function App() {
  const user = useAuthListener();

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route
              path={ROUTES.LOGIN}
              element={
                (!user && <Login />) || <Navigate to={ROUTES.DASHBOARD} />
              }
            />
            <Route
              path={ROUTES.SIGNUP}
              element={
                (!user && <Signup />) || <Navigate to={ROUTES.DASHBOARD} />
              }
            />
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
