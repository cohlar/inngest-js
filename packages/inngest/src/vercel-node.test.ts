import { InngestCommHandler } from "@local/components/InngestCommHandler";
import * as VercelNodeHandler from "@local/vercel-node";
import { createClient, testFramework } from "./test/helpers";

testFramework("Vercel/node", VercelNodeHandler);

describe("InngestCommHandler", () => {
  describe("registerBody", () => {
    it("Includes correct base URL for functions", () => {
      const client = createClient({ name: "test" });

      const fn = client.createFunction(
        { name: "Test vercel/node Function" },
        { event: "test/event.name" },
        () => undefined
      );
      const ch = new InngestCommHandler(
        "test-framework",
        client,
        [fn],
        {},
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
        () => undefined as unknown as any,
        () => undefined
      );

      const url = new URL("http://localhost:8000/api/inngest");

      const body = ch["registerBody"](url);
      expect(body.appName).toBe("test");
      expect(body.url).toBe("http://localhost:8000/api/inngest");
    });
  });
});
