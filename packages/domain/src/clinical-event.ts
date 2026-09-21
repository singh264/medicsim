import type { Evidence } from "./evidence.js";

export type ParticipantRole =
  | "student"
  | "patient"
  | "instructor"
  | "simulator";

export type ClinicalAction =
  | "ASSESS_SCENE_SAFETY"
  | "INTRODUCE_SELF"
  | "ASSESS_LEVEL_OF_CONSCIOUSNESS"
  | "ASSESS_AIRWAY"
  | "ASSESS_BREATHING"
  | "ASSESS_RADIAL_PULSE";

export interface ProtocolContext {
  protocolId: string;
  protocolVersion: string;
  requirementId?: string;
}

export interface ClinicalEvent {
  id: string;

  sessionId: string;

  /**
   * Who performed or verbalized the action.
   *
   * This is deliberately not called studentId because
   * future scenarios can contain multiple responders.
   */
  actorId: string;

  /**
   * Who or what the action concerned.
   *
   * Example:
   * responder-2 -> ASSESS_RADIAL_PULSE -> patient-3
   */
  targetId?: string;

  action: ClinicalAction;

  /**
   * Milliseconds from scenario start.
   */
  timestampMs: number;

  durationMs?: number;

  evidence: readonly Evidence[];

  /**
   * Confidence in the event interpretation itself,
   * independent of individual evidence confidence.
   */
  confidence: number;

  protocolContext?: ProtocolContext;
}
