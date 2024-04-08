import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { OutsideLayout } from "../layouts/OutsideLayout";
import InsideLayout from "../layouts/InsideLayout";
import useAuthStore from "../store/useAuthStore";

interface Props {
    children?: ReactNode
}

export default function NeutralRoute({ children }: Props) {
    const {isAuthenticated} = useAuthStore()
    
    const Layout = isAuthenticated ? InsideLayout : OutsideLayout

    return <Layout>{children ? children : <Outlet />}</Layout>;
};