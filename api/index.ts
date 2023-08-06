import { generateToken } from './middleware/authentication'
import express from 'express';
import { attachRoutes } from './routes/routes';

const app = express();
const port = process.env.PORT;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

generateToken();

attachRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
