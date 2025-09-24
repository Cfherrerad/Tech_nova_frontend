import { ReactNode } from "react";

interface TypographyProps {
    children: ReactNode;
    className?: string;
}

export const H1 = ({ children, className }: TypographyProps) => {
return (
        <h1 className={`font-manrope text-4xl font-bold text-black ${className}`}>
        {children}
    </h1>
    );
}