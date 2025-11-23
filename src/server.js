import express, { Router } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import cookieParser from 'cookie-parser';
import { myCookieParser } from './middleware/myCookieParser.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errors } from 'celebrate';
import { errorHandler } from './middleware/errorHandler.js';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import goodsRoutes from './routes/goodsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const PORT = process.env.PORT ?? 3030;
const router = Router();
const specs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Clothica API',
      version: '1.0.0',
      description: 'Clothica API',
    },
  },
  apis: ['./src/routes/*.js'],
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  }),
);
app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN,
    credentials: true,
  })
);

app.use(helmet());
app.use(logger);
app.use(cookieParser());
app.use(myCookieParser);

app.use('/api', router);
router.use(authRoutes);
router.use(ordersRoutes);
router.use(goodsRoutes);
router.use(userRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`✅ Server ran successfully on port ${PORT}`);
});
