import type { ClinicalEvent } from "./clinical-event.js";
import type { Protocol } from "./protocol.js";

export type RequirementStatus =
  | "satisfied"
  | "not_observed";

export interface RequirementResult {
  requirementId: string;
  label: string;
  status: RequirementStatus;
  evidenceEventIds: string[];
}

export interface EvaluationResult {
  protocolId: string;
  protocolVersion: string;
  requirements: RequirementResult[];
}

/**
 * Matches validated, session-scoped clinical events
 * against protocol requirements.
 *
 * This function does not infer clinical competence.
 */
export function evaluateProtocol(
  protocol: Protocol,
  events: readonly ClinicalEvent[]
): EvaluationResult {
  const requirements = protocol.requirements.map(
    (requirement): RequirementResult => {
      const matchingEvents = events.filter(
        (event) =>
          event.action === requirement.action &&
          event.protocolContext?.protocolId === protocol.id &&
          event.protocolContext?.protocolVersion ===
            protocol.version &&
          (
            event.protocolContext.requirementId === undefined ||
            event.protocolContext.requirementId ===
              requirement.id
          )
      );

      return {
        requirementId: requirement.id,
        label: requirement.label,
        status:
          matchingEvents.length > 0
            ? "satisfied"
            : "not_observed",
        evidenceEventIds: matchingEvents.map(
          (event) => event.id
        )
      };
    }
  );

  return {
    protocolId: protocol.id,
    protocolVersion: protocol.version,
    requirements
  };
}
