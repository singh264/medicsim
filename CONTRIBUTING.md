# Contributing to MedicSim

Thank you for your interest in contributing.

## Principles

Before contributing, read:

`docs/architecture/principles.md`

## Development

1. Create a focused branch.
2. Keep changes small and reviewable.
3. Add or update tests for behavioral changes.
4. Run type checking and tests before opening a pull request.
5. Document public interfaces and architectural changes.

## Clinical and educational content

Do not present community-contributed protocol content as authoritative.

Protocol changes must identify their source and validation status.

Institution-validated protocols will require additional review rules.

## Data

Do not commit:

- identifiable patient information
- identifiable student recordings
- real clinical records
- credentials or API keys

Use synthetic test data.

## AI changes

Changes to AI or ML components should eventually include evidence about
accuracy, latency, and cost rather than relying only on subjective
examples.
