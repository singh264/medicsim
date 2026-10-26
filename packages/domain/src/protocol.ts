import { z } from "zod";

import { ClinicalActionSchema } from "./schemas.js";

/**
 * One observable requirement within a protocol.
 *
 * A requirement maps to a known clinical action.
 * More complex evidence and ordering constraints will
 * be introduced in later versions.
 */
export const ProtocolRequirementSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  action: ClinicalActionSchema
});

export const ProtocolSchema = z.object({
  id: z.string().min(1),
  version: z.string().min(1),

  name: z.string().min(1),

  requirements: z
    .array(ProtocolRequirementSchema)
    .min(1)
}).superRefine((protocol, ctx) => {
  const seen = new Set<string>();

  for (const [index, requirement] of
    protocol.requirements.entries()) {
    if (seen.has(requirement.id)) {
      ctx.addIssue({
        code: "custom",
        path: ["requirements", index, "id"],
        message: "Requirement IDs must be unique"
      });
    }

    seen.add(requirement.id);
  }
});

export type Protocol = z.infer<typeof ProtocolSchema>;

export type ProtocolRequirement =
  z.infer<typeof ProtocolRequirementSchema>;
