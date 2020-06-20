"use strict";

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import passport from "passport";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import session from "express-session";
import passportLib from "./libraries/passport";

import logger from "./libraries/logger";
import routes from "./routes";
import { errorHandler } from "./middleware";
import { constants } from "./config";
import swaggerDoc from "./docs/swagger";
import * as database from "./database";

passportLib(passport);

if (process.env.NODE_ENV !== "test") database.getConnection();

const app = express();

const apiLimiter = rateLimit({
  windowMs: constants.apiLimiter.duration,
  max: constants.apiLimiter.max,
  message: constants.apiLimiter.message
});

app.use(
  session({
    secret: constants.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.static(path.join(__dirname, "/public")));
app.use(apiLimiter);
app.use(helmet());
app.use(morgan(constants.morganFormat, { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
routes(app);

app.use(errorHandler);

export default app;
