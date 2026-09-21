# MedicSim

MedicSim is an open-source, protocol-configurable simulation and
assessment platform for paramedic education.

The long-term goal is to support low-latency voice simulation,
evidence-backed protocol evaluation, optional multimodal analysis,
longitudinal learning, team scenarios, and multi-patient scenarios
without replacing first-principles student reasoning or instructor
judgment.

## Status

Early development.

Do not use MedicSim for real-patient clinical decision-making.

## Architecture

See `docs/architecture/principles.md`.

## Development

Requires Node.js 24 LTS and pnpm.

```bash
pnpm install
pnpm typecheck
pnpm test
```

## License

Apache-2.0.
