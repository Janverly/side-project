import type { ReactNode } from 'react';

type Props = { title: string; text?: string; children?: ReactNode };

export const EmptyState = ({ title, text, children }: Props) => (
    <div className="empty-state">
        <div className="empty-mark">✳</div>
        <h3>{title}</h3>
        {text && <p>{text}</p>}
        {children}
    </div>
);
