"""Package initializer kept minimal to avoid unnecessary imports.

The application currently runs via `app/app.py` and does not use the
factory/blueprint pattern. This file is intentionally minimal so that
`from app.app import app` does not trigger extra dependencies.
"""

# Intentionally empty.