import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import WidgetPage from "./pages/Widget";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getOrganization, getToken } from "./utils/auth";

function HomeRoute() {
  const org = getOrganization();
  if (getToken() && org?.slug) {
    return <Navigate to={`/org/${org.slug}/dashboard`} replace />;
  }
  return <Home />;
}

function OrgRoute({ children }) {
  return (
    <ProtectedRoute>
      {(organization) => children(organization)}
    </ProtectedRoute>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/org/:slug/dashboard"
        element={
          <OrgRoute>
            {(org) => <Dashboard organization={org} />}
          </OrgRoute>
        }
      />
      <Route
        path="/org/:slug/documents"
        element={
          <OrgRoute>
            {(org) => <Documents organization={org} />}
          </OrgRoute>
        }
      />
      <Route
        path="/org/:slug/widget"
        element={
          <OrgRoute>
            {(org) => <WidgetPage organization={org} />}
          </OrgRoute>
        }
      />
      <Route
        path="/org/:slug/analytics"
        element={
          <OrgRoute>
            {(org) => <Analytics organization={org} />}
          </OrgRoute>
        }
      />
      <Route
        path="/org/:slug/settings"
        element={
          <OrgRoute>
            {(org) => <Settings organization={org} />}
          </OrgRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          getToken() && getOrganization()?.slug ? (
            <Navigate to={`/org/${getOrganization().slug}/dashboard`} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
