import { describe, expect, it } from "vitest";

import {
  ClinicalEventSchema,
  EvidenceSchema
} from "../src/index.js";

describe("EvidenceSchema", () => {
  it("accepts valid speech evidence", () => {
    const result = EvidenceSchema.safeParse({
      modality: "speech",
      confidence: 0.96,
      startTimeMs: 1_000,
      endTimeMs: 2_000,
      sourceRef: "transcript-segment-1"
    });

    expect(result.success).toBe(true);
  });

  it("rejects confidence greater than one", () => {
    const result = EvidenceSchema.safeParse({
      modality: "speech",
      confidence: 1.2,
      startTimeMs: 1_000
    });

    expect(result.success).toBe(false);
  });

  it("rejects negative timestamps", () => {
    const result = EvidenceSchema.safeParse({
      modality: "speech",
      confidence: 0.9,
      startTimeMs: -100
    });

    expect(result.success).toBe(false);
  });

  it("rejects evidence ending before it begins", () => {
    const result = EvidenceSchema.safeParse({
      modality: "video",
      confidence: 0.8,
      startTimeMs: 5_000,
      endTimeMs: 4_000
    });

    expect(result.success).toBe(false);
  });
});

describe("ClinicalEventSchema", () => {
  it("accepts an evidence-backed clinical event", () => {
    const result = ClinicalEventSchema.safeParse({
      id: "event-1",
      sessionId: "session-1",

      actorId: "student-1",
      targetId: "patient-1",

      action: "ASSESS_RADIAL_PULSE",

      timestampMs: 52_000,

      evidence: [
        {
          modality: "speech",
          confidence: 0.97,
          startTimeMs: 51_200,
          endTimeMs: 52_600,
          sourceRef: "transcript-segment-17"
        }
      ],

      confidence: 0.95,

      protocolContext: {
        protocolId: "demo-primary-assessment",
        protocolVersion: "0.1.0",
        requirementId: "circulation-radial-pulse"
      }
    });

    expect(result.success).toBe(true);
  });

  it("rejects an unknown clinical action", () => {
    const result = ClinicalEventSchema.safeParse({
      id: "event-2",
      sessionId: "session-1",
      actorId: "student-1",

      action: "MADE_UP_ACTION",

      timestampMs: 10_000,

      evidence: [],

      confidence: 0.9
    });

    expect(result.success).toBe(false);
  });

  it("rejects event confidence outside zero to one", () => {
    const result = ClinicalEventSchema.safeParse({
      id: "event-3",
      sessionId: "session-1",
      actorId: "student-1",

      action: "ASSESS_AIRWAY",

      timestampMs: 10_000,

      evidence: [],

      confidence: 47
    });

    expect(result.success).toBe(false);
  });

  it("rejects negative event timestamps", () => {
    const result = ClinicalEventSchema.safeParse({
      id: "event-4",
      sessionId: "session-1",
      actorId: "student-1",

      action: "ASSESS_BREATHING",

      timestampMs: -500,

      evidence: [],

      confidence: 0.95
    });

    expect(result.success).toBe(false);
  });

  it("supports multiple independent evidence modalities", () => {
    const result = ClinicalEventSchema.safeParse({
      id: "event-multimodal-1",
      sessionId: "session-1",
  
      actorId: "student-1",
      targetId: "patient-1",
  
      action: "ASSESS_RADIAL_PULSE",
  
      timestampMs: 52_000,
  
      evidence: [
        {
          modality: "speech",
          confidence: 0.97,
          startTimeMs: 51_200,
          endTimeMs: 52_600,
          sourceRef: "transcript-segment-17"
        },
        {
          modality: "video",
          confidence: 0.84,
          startTimeMs: 51_500,
          endTimeMs: 54_000,
          sourceRef: "video-segment-8"
        }
      ],
  
      confidence: 0.94
    });
  
    expect(result.success).toBe(true);
  
    if (result.success) {
      expect(result.data.evidence).toHaveLength(2);
  
      expect(
        result.data.evidence.map(
          (evidence) => evidence.modality
        )
      ).toEqual(["speech", "video"]);
    }
  });
});
