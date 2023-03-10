/**
 * @file api/index.ts
 * @author dworac <mail@dworac.com>
 *
 * This file is used to initialize the API. It includes auth, database, and graphql.
 */
import express from "express";
import "express-async-errors";
import cors from "cors";
import ip from "ip";
import config from "../utils/config";
import setupRoutes from "./routes";
import logger from "../utils/logger";
import errorHandling from "./errorHandling";
import graphql from "./graphql";
import setupAuth from "./auth";

export default async () => {
  const app = express();

  // Parse body and urlencoded parameters.
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Allow requests from all origins.
  app.use(cors({ credentials: true }));

  // Setup authentication.
  setupAuth(app);

  // Setup routes
  setupRoutes(app);

  // Setup graphql
  await graphql(app);

  // Setup error handling
  errorHandling(app);

  // Start Express API
  app.listen(config.PORT, () => {
    logger.logSuccess(
      `Express server listening on url http://${ip.address()}:${config.PORT}`
    );
  });
};
