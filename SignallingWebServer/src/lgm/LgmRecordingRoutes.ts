// LGM recording management - same-origin HTTP endpoints proxied to the
// recorder service so the browser can list/download/delete a session's
// recordings. The session secret is the credential (same trust model as
// joining the session).

import { Express, Request, Response } from 'express';
import { Readable } from 'stream';
import { Logger } from '@epicgames-ps/lib-pixelstreamingsignalling-ue5.7';

export function registerLgmRecordingRoutes(app: Express, recorderUrl: string): void {
    const base = recorderUrl.replace(/\/$/, '');

    const sessionParam = (req: Request, res: Response): string | undefined => {
        const session = req.query.session;
        if (typeof session !== 'string' || session.length === 0) {
            res.status(400).json({ error: 'Missing session parameter' });
            return undefined;
        }
        return session;
    };

    // GET /api/lgm/recordings?session=S - list recordings for a session
    app.get('/api/lgm/recordings', (req: Request, res: Response) => {
        const session = sessionParam(req, res);
        if (!session) return;
        fetch(`${base}/recordings/${encodeURIComponent(session)}`)
            .then(async (upstream) => {
                res.status(upstream.status).json(await upstream.json());
            })
            .catch((err) => {
                Logger.error(`LGM recordings: list failed: ${err}`);
                res.status(502).json({ error: 'Recorder unavailable' });
            });
    });

    // GET /api/lgm/recordings/file?session=S&name=F - download a recording
    app.get('/api/lgm/recordings/file', (req: Request, res: Response) => {
        const session = sessionParam(req, res);
        if (!session) return;
        const name = req.query.name;
        if (typeof name !== 'string' || name.length === 0) {
            res.status(400).json({ error: 'Missing name parameter' });
            return;
        }
        fetch(`${base}/recordings/${encodeURIComponent(session)}/file/${encodeURIComponent(name)}`)
            .then((upstream) => {
                res.status(upstream.status);
                for (const header of ['content-type', 'content-length', 'content-disposition', 'accept-ranges']) {
                    const value = upstream.headers.get(header);
                    if (value) res.setHeader(header, value);
                }
                if (!upstream.body) {
                    res.end();
                    return;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Readable.fromWeb(upstream.body as any).pipe(res);
            })
            .catch((err) => {
                Logger.error(`LGM recordings: download failed: ${err}`);
                if (!res.headersSent) res.status(502).json({ error: 'Recorder unavailable' });
            });
    });

    // DELETE /api/lgm/recordings/file?session=S&name=F - delete a recording
    app.delete('/api/lgm/recordings/file', (req: Request, res: Response) => {
        const session = sessionParam(req, res);
        if (!session) return;
        const name = req.query.name;
        if (typeof name !== 'string' || name.length === 0) {
            res.status(400).json({ error: 'Missing name parameter' });
            return;
        }
        fetch(`${base}/recordings/${encodeURIComponent(session)}/file/${encodeURIComponent(name)}`, {
            method: 'DELETE'
        })
            .then(async (upstream) => {
                res.status(upstream.status).json(await upstream.json());
            })
            .catch((err) => {
                Logger.error(`LGM recordings: delete failed: ${err}`);
                res.status(502).json({ error: 'Recorder unavailable' });
            });
    });

    Logger.info('LGM: recording management routes registered at /api/lgm/recordings');
}
