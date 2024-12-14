import React from 'react';
import { clsx } from 'clsx';

interface ILayout {
    children: React.ReactNode;
    stack?: boolean;
    justifyContent?: 'start' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 15 | 20;
    width?: number;
    className?: string;
    height?: number;
    background?: string;
    vAlign?: 'stretch' | 'flex-start' | 'flex-end' | 'start' | 'center' | 'end';
    grid?: boolean;
    columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

const Layout = ({
    children,
    stack,
    justifyContent = 'start',
    width,
    height,
    background,
    className,
    vAlign = 'stretch',
    grid = false,
    columns = 2,
    gap = 1
}: ILayout) => {
    const layoutClasses = clsx(
        grid ? 'grid' : stack ? 'flex flex-col' : 'flex',
        justifyContent && `justify-${justifyContent}`,
        vAlign && `items-${vAlign}`,
        gap !== undefined && `gap-${gap}`,
        width ? `w-[${width}px]` : 'w-full',
        height ? `h-[${height}px]` : 'h-auto',
        background && `bg-${background}`,
        grid && `grid-cols-${columns}`,
        className
    );

    return <div className={layoutClasses}>{children}</div>;
};

export default Layout;
