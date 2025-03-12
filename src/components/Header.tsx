import { ReactNode } from "react";

type HeaderProps = {
    children?: ReactNode;
};

function Header({ children }: HeaderProps) {
    return (
        <header className="fixed top-0 left-0 w-full bg-background-header shadow-md flex gap-4 p-1">
            {children}
        </header>
    );
}

export default Header;