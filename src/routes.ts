import { Application, Request, Response } from 'express';

export const createRoutes = (app: Application) => {
  // http://expressjs.com/en/starter/basic-routing.html
  app.get('/', function (req: Request, res: Response) {
    res.sendFile(__dirname + '/views/index.html');
  });

  // your first API endpoint...
  app.get('/api/hello', function (req: Request, res: Response) {
    res.json({ greeting: 'hello API' });
  });
};
