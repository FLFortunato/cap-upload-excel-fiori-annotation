import { getDestination } from "@sap-cloud-sdk/connectivity";
import { executeHttpRequest } from "@sap-cloud-sdk/http-client";

const DESTINATION_WHITELIST: Record<string, string> = {
  postman: "postman-destination",
};

export function registerProxy(app: any) {
  app.use("/proxy", async (req: any, res: any) => {
    try {
      const [, destKey, ...rest] = req.path.split("/");
      const path = rest.join("/");

      const destinationName = DESTINATION_WHITELIST[destKey];
      if (!destinationName) {
        return res.status(400).json({ error: "Destination not allowed" });
      }

      const dest = await getDestination({
        destinationName: "postman-destination",
      });

      console.log(dest);

      const response = await executeHttpRequest(
        { destinationName },
        {
          method: req.method,
          url: `/${path}`,
          headers: sanitizeHeaders(req.headers),
          data: req.body,
        },
      );

      res.status(response.status).send(response.data);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}

function sanitizeHeaders(headers: any) {
  const { host, connection, "content-length": _, ...safe } = headers;
  return safe;
}
