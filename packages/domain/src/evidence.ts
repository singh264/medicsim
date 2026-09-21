export type EvidenceModality =
  | "speech"
  | "video"
  | "manual"
  | "scenario"
  | "system";

export interface Evidence {
  /**
   * How the evidence was obtained.
   */
  modality: EvidenceModality;

  /**
   * Confidence that this evidence supports the interpreted event.
   *
   * Range: 0.0 - 1.0
   */
  confidence: number;

  /**
   * Milliseconds from the beginning of the session.
   */
  startTimeMs: number;

  /**
   * Optional end of the evidence interval.
   */
  endTimeMs?: number;

  /**
   * Reference to the underlying evidence.
   *
   * Examples:
   * - transcript segment ID
   * - video segment ID
   * - instructor observation ID
   *
   * Do not place raw media in this object.
   */
  sourceRef?: string;
}
