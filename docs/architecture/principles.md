# MedicSim Architecture Principles

## 1. Human-first learning

MedicSim supports simulation, observation, evaluation, and feedback.

It must not unnecessarily perform cognitive work that the learner
should perform independently.

Students should continue to assess, reason, communicate, and record
important findings themselves.

## 2. Protocol-configurable

Clinical evaluation criteria must not be hard-coded into application
logic.

Protocols are versioned data interpreted by the protocol engine.

## 3. Evidence before conclusions

MedicSim stores evidence supporting an interpreted clinical event.

Speech, video, instructor observations, and other modalities remain
distinguishable.

Model uncertainty must not be represented as certainty.

## 4. Scenario truth is separate from observed evidence

The simulated patient's true state must remain separate from what
MedicSim believes the learner did.

## 5. Voice first, multimodal when useful

Everyday practice should work efficiently using audio alone.

Video is optional evidence for actions that benefit from physical
observation.

## 6. Multi-participant by design

The domain model must support multiple responders and multiple patients,
even when the initial product supports only one of each.

## 7. Low latency

Realtime interaction is a product requirement.

Latency must be measured and optimized.

## 8. Cost-aware

Use the least expensive computation that satisfies the required quality.

Expensive AI inference must have a measurable benefit.

## 9. Provider-independent

Core domain and evaluation logic must not depend on a specific AI,
speech, cloud, or storage provider.

## 10. Privacy by minimization

Collect and retain only information needed for the educational purpose.

Structured events should be preferred over indefinite retention of raw
audio or video.

## 11. Open and reproducible

Core software, protocol schemas, evaluation methods, and benchmarks
should be inspectable and reproducible.

## 12. Measurable improvement

Changes to AI components should eventually be evaluated across:

- accuracy
- latency
- cost
- resource consumption
- educational usefulness

## Product differentiation test

A MedicSim feature should provide meaningful value beyond giving a
general-purpose AI assistant a protocol and conducting a voice
conversation.

Priority is given to capabilities such as:

- deterministic protocol evaluation
- auditable evidence
- institution-defined protocols
- longitudinal learner modelling
- reproducible scenarios
- multimodal verification
- team interaction analysis
- multi-patient simulation
- cost-aware inference
- instructor validation
