"use strict";

import userRoutes from "./users";
import productRoutes from "./products";

export default function routes(app) {
  userRoutes(app);
  productRoutes(app);
}
