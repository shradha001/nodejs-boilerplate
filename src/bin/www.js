"use strict";

import app from "../app";
import logger from "../libraries/logger";
import { serverConfig } from "../config";
import http from "http";

const server = http.createServer(app);
const port = serverConfig.PORT;

server.listen(port, logger.info(`Server up, listening on port ${port}`));

export default server;
