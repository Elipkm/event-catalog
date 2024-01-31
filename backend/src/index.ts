import express from 'express';
import * as quelleRoute from './routes/quelleRoute';
import * as imageRoute from './routes/imageRoute';
import cors from 'cors';

const app = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', quelleRoute.router);
app.use("/api", imageRoute.router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
