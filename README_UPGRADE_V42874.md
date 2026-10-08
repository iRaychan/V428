# V4.28.74 Quick Search curve speed patch

Base: V4.28.73. Only Quick Search runtime changed. Fixed repeated model-open messages after acknowledgement that could cause repeated redraws. Curve SVG readiness is checked promptly; retry is conditional and bounded.

**Do not change selector zoom, scaling, or PDF output.** No DB migrations.

Safari manual test: Quick Search 56 IGPM @ 100 ft → CHC 15-3, first selection and again after returning. Observe curve display time.
