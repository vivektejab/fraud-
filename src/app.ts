import express from "express";
import initRouter from "./routes/router";
import connect from "./utils/dbConnection";
import config from "config";
import cors from 'cors';
import _default from "../config/default";
import { errorHandler } from "../common/src";
import log from "./utils/logger";


const app = express();
const port = config.get<number>("port");


const whitelist = _default.whileListDomains ? _default.whileListDomains.split(',') : [];

//cors
const corsOptions:cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  // origin: '*',
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
initRouter(app);

app.use(errorHandler);


const start = async()=>{

  //db connection
  await connect();
  app.listen(port, async () => {
    log.info(`App is running at http://localhost:${port}`);
  });
}

// Start server
start();



