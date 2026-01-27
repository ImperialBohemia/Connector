## 2026-01-27 - External Asset Latency
**Learning:** External assets (like background SVGs) can block rendering or cause layout shifts if the external server is slow. Hosting them locally (especially small ones) improves reliability and performance.
**Action:** Audit all external URLs in CSS/JSX and inline/host locally where appropriate.
