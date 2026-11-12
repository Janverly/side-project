import { HttpResponse } from 'msw';

// Every success is { code, result }. Every failure is { code, title, message }.
export const ok = (result: unknown, code = 'VS200', status = 200) =>
    HttpResponse.json({ code, result }, { status });

export const fail = (code: string, title: string, message: string, status = 400) =>
    HttpResponse.json({ code, title, message }, { status });
