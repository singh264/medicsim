import { z } from "zod";

/**
 * Runtime validation for evidence used to support an interpreted
 * clinical event.
 *
 * Evidence may originate from speech, video, an instructor,
 * scenario state, or another system component.
 */
export const EvidenceSchema = z
  .object({
    modality: z.enum([
      "speech",
      "video",
      "manual",
      "scenario",
      "system"
    ]),

    confidence: z.number().min(0).max(1),

    startTimeMs: z.number().int().nonnegative(),

    endTimeMs: z.number().int().nonnegative().optional(),

    sourceRef: z.string().min(1).optional()
  })
  .superRefine((evidence, ctx) => {
    if (
      evidence.endTimeMs !== undefined &&
      evidence.endTimeMs < evidence.startTimeMs
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["endTimeMs"],
        message:
          "endTimeMs must be greater than or equal to startTimeMs"
      });
    }
  });

/**
 * Clinical actions currently understood by the MedicSim domain.
 *
 * This is intentionally small. Actions should be introduced as
 * supported protocol requirements are implemented rather than
 * attempting to model all of paramedicine immediately.
 */
export const ClinicalActionSchema = z.enum([
  "ASSESS_SCENE_SAFETY",
  "INTRODUCE_SELF",
  "ASSESS_LEVEL_OF_CONSCIOUSNESS",
  "ASSESS_AIRWAY",
  "ASSESS_BREATHING",
  "ASSESS_RADIAL_PULSE"
]);

export const ProtocolContextSchema = z.object({
  protocolId: z.string().min(1),

  protocolVersion: z.string().min(1),

  requirementId: z.string().min(1).optional()
});

/**
 * Runtime boundary for an interpreted clinical event.
 *
 * External systems such as speech recognition, language models,
 * computer vision, APIs, and imported datasets must be validated
 * before their output enters the trusted MedicSim domain.
 */
export const ClinicalEventSchema = z.object({
  id: z.string().min(1),

  sessionId: z.string().min(1),

  actorId: z.string().min(1),

  targetId: z.string().min(1).optional(),

  action: ClinicalActionSchema,

  timestampMs: z.number().int().nonnegative(),

  durationMs: z.number().int().nonnegative().optional(),

  evidence: z.array(EvidenceSchema),

  confidence: z.number().min(0).max(1),

  protocolContext: ProtocolContextSchema.optional()
});
