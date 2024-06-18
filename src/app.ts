import express, { type Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from '@/configs/passport';
import session from 'express-session';
import { env } from '@/utils/env';
import { mainRoutes } from './routes/main';
import { authRoutes } from './routes/auth';

//intializing the express app
const app:Application = express();

//using the dependancies
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: env.APP_COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());


// ROUTES
app.use(mainRoutes);
app.use('/auth', authRoutes);

//exporting app
export default app;
