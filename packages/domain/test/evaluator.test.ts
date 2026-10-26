import { describe, expect, it } from "vitest";

import {
  ClinicalEventSchema,
  ProtocolSchema,
  evaluateProtocol
} from "../src/index.js";

const protocol = ProtocolSchema.parse({
  id: "demo-primary-survey",
  version: "0.1.0",
  name: "Demonstration Primary Survey",
  requirements: [
    {
      id: "scene-safety",
      label: "Assess scene safety",
      action: "ASSESS_SCENE_SAFETY"
    },
    {
      id: "introduction",
      label: "Introduce self",
      action: "INTRODUCE_SELF"
    },
    {
      id: "airway",
      label: "Assess airway",
      action: "ASSESS_AIRWAY"
    }
  ]
});

const event = ClinicalEventSchema.parse({
  id: "event-1",
  sessionId: "session-1",
  actorId: "student-1",
  action: "ASSESS_SCENE_SAFETY",
  timestampMs: 1000,
  confidence: 0.95,
  evidence: [
    {
      modality: "speech",
      confidence: 0.95,
      startTimeMs: 900,
      endTimeMs: 1200,
      sourceRef: "transcript-1"
    }
  ],
  protocolContext: {
    protocolId: "demo-primary-survey",
    protocolVersion: "0.1.0",
    requirementId: "scene-safety"
  }
});

describe("Protocol evaluation", () => {
  it("recognizes matching observed actions", () => {
    const result = evaluateProtocol(protocol, [event]);

    expect(result.requirements[0]?.status)
      .toBe("satisfied");

    expect(result.requirements[0]?.evidenceEventIds)
      .toEqual(["event-1"]);
  });

  it("reports unobserved requirements", () => {
    const result = evaluateProtocol(protocol, [event]);

    expect(result.requirements[1]?.status)
      .toBe("not_observed");

    expect(result.requirements[2]?.status)
      .toBe("not_observed");
  });

  it("does not match events from another protocol", () => {
    const unrelated = {
      ...event,
      protocolContext: {
        protocolId: "another-protocol",
        protocolVersion: "0.1.0"
      }
    };

    const result = evaluateProtocol(
      protocol,
      [unrelated]
    );

    expect(
      result.requirements.every(
        (requirement) =>
          requirement.status === "not_observed"
      )
    ).toBe(true);
  });

  it("rejects duplicate requirement IDs", () => {
    const invalid = {
      ...protocol,
      requirements: [
        protocol.requirements[0],
        protocol.requirements[0]
      ]
    };

    expect(ProtocolSchema.safeParse(invalid).success)
      .toBe(false);
  });
});
