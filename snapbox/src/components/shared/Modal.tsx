import type { ReactNode } from 'react';

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    kicker?: string;
    wide?: boolean;
    children: ReactNode;
};

export const Modal = ({ open, onClose, title, kicker, wide, children }: Props) => {
    if (!open) return null;
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div role="dialog" aria-modal="true" aria-label={title} className={`modal${wide ? ' modal-wide' : ''}`} onClick={(e) => e.stopPropagation()}>
                <button type="button" className="dialog-close" aria-label="Close" onClick={onClose}>
                    ×
                </button>
                {kicker && <p className="kicker">{kicker}</p>}
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    );
};
