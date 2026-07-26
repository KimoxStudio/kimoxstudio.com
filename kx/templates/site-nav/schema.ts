import { z } from "zod";

// Chrome node — the nav's links/labels are structural (read from the shared
// content dict via the existing Nav component), so there are no editable props.
export const siteNavSchema = z.object({});
