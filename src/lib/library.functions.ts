import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getLibraryForToken, getPurchaseStatus } from "./library.server";

export const fetchLibrary = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ token: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => getLibraryForToken(data.token));

export const checkPurchase = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ purchaseId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => getPurchaseStatus(data.purchaseId));
