import { Application, Request, Response } from 'express';

export const createRoutes = (app: Application) => {
  app.get('/', function (req: Request, res: Response) {
    res.sendFile(__dirname + '/views/index.html');
  });

  app.get('/api', function (req: Request, res: Response) {
    const date = new Date();
    const formattedUtc = date.toUTCString();
    const unixDate = date.getTime();
    res.json({ unix: unixDate, utc: formattedUtc });
  });

  app.get('/api/:date?', function (req: Request, res: Response) {
    if (typeof req.params.date !== 'string') {
      res.json({ error: 'Invalid Date' });
      return;
    }

    const validInput = checkValidInput(req.params.date);
    if (!validInput.valid) {
      res.json({ error: 'Invalid Date' });
      return;
    }

    const output = formatOutput(req.params.date, validInput.type);
    res.json(output);
  });
};

function checkValidInput(input: string): { valid: boolean; type?: string } {
  // Here we're handling pure number for Unix timestamps
  if (/^\d+$/.test(input)) {
    const parsed = parseInt(input);
    const date = new Date(parsed);
    if (date.toString() !== 'Invalid Date') {
      return { valid: true, type: 'unix' };
    }
  }

  // Try as date string
  const date = new Date(input);
  if (date.toString() !== 'Invalid Date') {
    return { valid: true, type: 'utc' };
  }

  // If we get here it means input couldn't be formatted into a date
  return { valid: false };
}

function formatOutput(
  input: string,
  type?: string
): { unix: number; utc: string } {
  if (type === 'unix') {
    const parsed = parseInt(input);
    const utcDate = new Date(parsed);
    return { unix: parsed, utc: utcDate.toUTCString() };
  } else {
    const date = new Date(input);
    const unixDate = date.getTime();
    return { unix: unixDate, utc: date.toUTCString() };
  }
}
