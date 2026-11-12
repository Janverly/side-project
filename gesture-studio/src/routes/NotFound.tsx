import { Link } from 'react-router-dom';
import { Ghost } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const NotFound = () => {
    useDocumentTitle('Page not found');
    return (
        <div className="not-found">
            <span className="not-found__emoji" aria-hidden="true">
                🖐️
            </span>
            <p className="eyebrow">
                <Ghost size={14} /> 404
            </p>
            <h1>Nothing to wave at</h1>
            <p>That page drifted out of frame. Head back to the studio.</p>
            <Link to="/studio" className="btn btn--primary">
                Back to studio
            </Link>
        </div>
    );
};
