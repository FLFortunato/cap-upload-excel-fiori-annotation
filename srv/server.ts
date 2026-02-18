import cds from "@sap/cds";
import { registerProxy } from "./proxy/destination-proxy";

cds.on("bootstrap", (app) => {
  registerProxy(app);
});
