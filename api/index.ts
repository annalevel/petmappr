import { generateToken } from './middleware/authentication'
import express from 'express';
import { attachRoutes } from './routes/routes';

const app = express();
const port = process.env.PORT;

generateToken();

attachRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
