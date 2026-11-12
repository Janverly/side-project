import type { ReactNode } from 'react';

type Props = {
    title: string;
    children?: ReactNode;
};

export const EmptyState = ({ title, children }: Props) => (
    <div className="empty-state">
        <span className="empty-state__orb" aria-hidden="true" />
        <p>{title}</p>
        {children}
    </div>
);
