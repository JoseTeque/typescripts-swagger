import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/tasks.routes';

import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import { options } from './swaggerOption'

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const specs = swaggerJSDoc(options)

app.use(router)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));


export default app;