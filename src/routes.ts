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

    const validInput = checkValidInput(req.params.date);
    if (!validInput.valid) {
      res.json({ error: 'Invalid date format' });
      return;
    }

    const output = formatOutput(req.params.date, validInput.type);
    res.json(output);
  });
};

function checkValidInput(input: string): { valid: boolean; type?: string } {
  // Here we're handling the case for date objects sent as parameters
  let date = new Date(input);
  if (date.toString() !== 'Invalid Date') {
    return { valid: true, type: 'utc' };
  }

  // In case previous date was an Invalid Date object, we parseInt on the string to extract the UTC integer
  const parsed = parseInt(input);
  date = new Date(parsed);
  if (date.toString() !== 'Invalid Date') {
    return { valid: true, type: 'unix' };
  }

  // If we get here it means input couldn't be formatted into a date
  return { valid: false };
}

function formatOutput(
  input: string,
  type?: string
): { unix: string; utc: string } {
  if (type === 'unix') {
    const parsed = parseInt(input);
    const utcDate = new Date(parsed);
    return { unix: input, utc: utcDate.toUTCString() };
  } else {
    const date = new Date(input);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate() + 1;
    const unixDate = Date.UTC(year, month, day).toString();
    return { unix: unixDate, utc: date.toUTCString() };
  }
}
