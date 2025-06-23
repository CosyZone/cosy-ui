import { HttpContext } from '@coffic/cosy-framework-mvp';

export async function authMiddleware(ctx: HttpContext, next: () => Promise<void>) {
    const apiKey = ctx.request.headers['x-api-key'];

    if (!apiKey || apiKey !== 'test-key') {
        ctx.response.status = 401;
        ctx.response.json({ error: 'Unauthorized' });
        return;
    }

    await next();
} 
