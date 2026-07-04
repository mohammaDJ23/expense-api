import type { Request } from 'express';

export function accessTokenExtractor(request: Request): string | null {
    const accessToken = request.cookies.accessToken;

    if (accessToken) {
        return accessToken;
    }

    return null;
}
