import { useForm, type UseFormSetError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '@/components/shared/Modal';
import { SESSION_NAME_MAX } from '@/lib/constants';
import { sessionNameSchema, type SessionNameValues } from '../schemas';

const nameForm = z.object({ name: sessionNameSchema });

type Props = {
    open: boolean;
    title: string;
    submitLabel: string;
    defaultName?: string;
    isSubmitting?: boolean;
    onClose: () => void;
    onSubmit: (values: SessionNameValues, setError: UseFormSetError<SessionNameValues>) => void;
};

// Its own component so the form starts fresh (and prefilled) every time the dialog opens.
const NameForm = ({ defaultName = '', submitLabel, isSubmitting, onClose, onSubmit }: Omit<Props, 'open' | 'title'>) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<SessionNameValues>({ resolver: zodResolver(nameForm), defaultValues: { name: defaultName } });

    return (
        <form noValidate onSubmit={handleSubmit((values) => onSubmit(values, setError))}>
            <div className="field">
                <label htmlFor="sessionName">Session name</label>
                <input id="sessionName" maxLength={SESSION_NAME_MAX} placeholder="Friday night out" autoFocus {...register('name')} />
                {errors.name && <p role="alert" className="field-error">{errors.name.message}</p>}
            </div>
            <div className="dialog-actions">
                <button className="outline-button" type="button" onClick={onClose}>
                    Cancel
                </button>
                <button className="primary-button" type="submit" disabled={isSubmitting}>
                    {submitLabel} <span>↗</span>
                </button>
            </div>
        </form>
    );
};

/** Asks for the session's name. Used to save a new session and to save changes to an existing one. */
export const SaveSessionModal = ({ open, title, ...form }: Props) => (
    <Modal open={open} onClose={form.onClose} title={title} kicker="SAVE TO YOUR ARCHIVE">
        <NameForm {...form} />
    </Modal>
);
