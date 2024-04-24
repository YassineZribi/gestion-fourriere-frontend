import { BrowserRouter, Route, Routes } from "react-router-dom"
import useAppDirection from "./hooks/useAppDirection"
import Login from "./pages/Login"
import PrivateRoute from "./routes/PrivateRoute"
import PublicRoute from "./routes/PublicRoute"
import NeutralRoute from "./routes/NeutralRoute"
import useAuthenticatedUser from "./hooks/useAuthenticatedUser"
import AppLoader from "./components/AppLoader"
import NotFound from "./pages/NotFound/NotFound"
import Profile from "./pages/Profile"
import Dashboard from "./pages/Dashboard"
import ChangePassword from "./pages/ChangePassword"
import UserAccountsManagement from "./pages/UserAccountsManagement"
import Institution from "./pages/Institution"

function App() {
  useAppDirection()
  const {isLoading} = useAuthenticatedUser()

  if (isLoading) return <AppLoader />;

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/user-accounts-management" element={<UserAccountsManagement />} />
          <Route path="/institution" element={<Institution />} />
        </Route>
        {/* <Route path="/dashboard" element={
          <PrivateRoute>
            <h1>Home<Link to={"/about"}>About</Link></h1>
          </PrivateRoute>
        } /> */}

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<NeutralRoute />}>
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
