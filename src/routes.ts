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

  app.get('/api/:date?', function (req: Request, res: Response) {
    if (typeof req.params.date !== 'string') {
      res.json({ error: 'Invalid date format' });
      return;
    }

    // Here we're handling the case for date objects sent as parameters
    const input = req.params.date;
    let date = new Date(input);

    if (date.toString() !== 'Invalid Date') {
      res.json({ date });
      return;
    }

    // In case previous date was an Invalid Date object, we parseInt on the string to extract the UTC integer
    const parsed = parseInt(input);
    date = new Date(parsed);

    if (date.toString() !== 'Invalid Date') {
      res.json({ date });
      return;
    }

    // If we get here it means input couldn't be formatted into a date
    res.json({ error: 'Invalid date format' });
  });
};
