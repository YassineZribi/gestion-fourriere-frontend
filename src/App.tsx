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
import WarehousesManagement from "./pages/WarehousesManagement"
import RegistersManagement from "./pages/RegistersManagement"
import SubRegistersManagement from "./pages/SubRegistersManagement"
import MeasurementUnitsManagement from "./pages/MeasurementUnitsManagement"
import ArticleFamiliesManagement from "./pages/ArticleFamiliesManagement"
import ArticlesManagement from "./pages/ArticlesManagement"
import SourcesManagement from "./pages/SourcesManagement"

function App() {
  useAppDirection()
  const { isLoading } = useAuthenticatedUser()

  if (isLoading) return <AppLoader />;

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/user-accounts-management" element={<UserAccountsManagement />} />
          <Route path="/warehouses-management" element={<WarehousesManagement />} />
          <Route path="/registers-management" element={<RegistersManagement />} />
          <Route path="/sub-registers-management" element={<SubRegistersManagement />} />
          <Route path="/measurement-units-management" element={<MeasurementUnitsManagement />} />
          <Route path="/article-families-management" element={<ArticleFamiliesManagement />} />
          <Route path="/articles-management" element={<ArticlesManagement />} />
          <Route path="/sources-management" element={<SourcesManagement />} />
          {["/institution", "/institution/:tab"].map(path => (
            <Route key={path} path={path} element={<Institution />} />
          ))}
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
