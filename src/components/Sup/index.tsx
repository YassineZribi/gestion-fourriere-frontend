import { ReactNode } from "react";

interface Props {
    children: ReactNode
    style?: React.CSSProperties
}

export default function Sup({children, style}: Props) {
    return (
        <sup style={{fontSize: 10.5, opacity: 0.5, ...style}}>{children}</sup>
    )
}