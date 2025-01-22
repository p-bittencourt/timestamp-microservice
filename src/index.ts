// index.js
// where your node app starts
import { createRoutes } from './routes';
import express from 'express';
import path from 'path';
import cors from 'cors';

// init project
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
const viewsPath = path.join(__dirname, 'views');
const publicPath = path.join(__dirname, 'public');

app.use(express.static(viewsPath));
app.use(express.static(publicPath));

createRoutes(app);

// Listen on port set in environment variable or default to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
