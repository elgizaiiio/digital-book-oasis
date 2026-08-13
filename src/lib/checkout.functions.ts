import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { startCheckout } from "./checkout.server";

export const createCheckout = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        email: z.string().email(),
        lang: z.enum(["ar", "en"]),
        product: z.enum(["book", "bundle"]),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const origin = new URL(getRequest().url).origin;
    return startCheckout({ ...data, origin });
  });
