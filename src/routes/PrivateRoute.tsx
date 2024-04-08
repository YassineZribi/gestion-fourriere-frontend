import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import InsideLayout from "../layouts/InsideLayout";
import useAuthStore from "../store/useAuthStore";

interface Props {
    children?: ReactNode
}

export default function PrivateRoute({ children }: Props) {    
    const {isAuthenticated} = useAuthStore()
    if (!isAuthenticated) {
        return <Navigate to={"/login"} replace />;
    }

    return <InsideLayout>{children ? children : <Outlet />}</InsideLayout>;
};