type ApiError = { code?: string; title?: string; message?: string };

/** `null` means "not a field error", so the page shows a general toast instead. */
export const mapSessionApiError = (e: unknown): { field: 'name'; message: string } | null => {
    const err = e as ApiError;
    return err?.code === 'PLE400' ? { field: 'name', message: err.title ?? 'Name taken' } : null;
};

export const sessionApiErrorMessage = (e: unknown, fallback: string) => (e as ApiError)?.message ?? fallback;
