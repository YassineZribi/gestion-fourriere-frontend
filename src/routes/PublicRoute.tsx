import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { OutsideLayout } from "../layouts/OutsideLayout";
import useAuthStore from "../store/useAuthStore";

interface Props {
    children?: ReactNode
}

export default function PublicRoute({ children }: Props) {
    const {isAuthenticated} = useAuthStore()
    if (isAuthenticated) {
        return <Navigate to={"/dashboard"} replace />;
    }

    return <OutsideLayout>{children ? children : <Outlet />}</OutsideLayout>;
};