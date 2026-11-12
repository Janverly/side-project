import type { ReactNode } from 'react';
import { X } from 'lucide-react';

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
};

export const Modal = ({ open, onClose, title, children }: Props) => {
    if (!open) return null;
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onClick={(event) => event.stopPropagation()}
            >
                <header className="modal__header">
                    <h2>{title}</h2>
                    <button type="button" className="icon-btn" onClick={onClose} aria-label="Close dialog">
                        <X size={18} />
                    </button>
                </header>
                {children}
            </div>
        </div>
    );
};
