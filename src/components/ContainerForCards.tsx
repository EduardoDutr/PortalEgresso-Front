import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

function ContainerForCards({ children }: Props) {
    return (
        <div className="grid grid-cols-4 text-center gap-4 p-10 border border-element-delimiter rounded-xl bg-background-header shadow-lg">
            {children}
        </div>
    )
}

export { ContainerForCards };