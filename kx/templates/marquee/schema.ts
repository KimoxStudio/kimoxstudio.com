import { localizedList } from "@/kx/localized";
import { z } from "zod";

const LANGS = ["es", "en", "ja"] as const;

export const marqueeSchema = z.object({
  items: localizedList(LANGS),
});
