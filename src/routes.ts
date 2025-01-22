import { Application, Request, Response } from 'express';

export const createRoutes = (app: Application) => {
  app.get('/', function (req: Request, res: Response) {
    res.sendFile(__dirname + '/views/index.html');
  });

  app.get('/api', function (req: Request, res: Response) {
    const formattedUtc = new Date().toUTCString();
    const unixDate = Date.now().toString();
    res.json({ unix: unixDate, utc: formattedUtc });
  });

  app.get('/api/:date', function (req: Request, res: Response) {
    res.json(req.params);
  });
};
