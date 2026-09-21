import { describe, expect, it } from "vitest";

import type { ClinicalEvent } from "../src/index.js";

describe("ClinicalEvent", () => {
  it("can represent speech evidence for a clinical action", () => {
    const event: ClinicalEvent = {
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
    };

    expect(event.actorId).toBe("student-1");
    expect(event.targetId).toBe("patient-1");

    expect(event.action).toBe(
      "ASSESS_RADIAL_PULSE"
    );

    expect(event.evidence).toHaveLength(1);

    expect(event.evidence[0]?.modality).toBe(
      "speech"
    );
  });
});
