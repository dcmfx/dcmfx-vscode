This directory contains a vendored JavaScript build of DCMfx's Gleam
implementation.

To update the build:

- `cd dcmfx/src/gleam/dcmfx_json`
- `gleam clean`
- `gleam build --target javascript`
- `rsync -av --delete --include="*/" --include="*.mjs" --include="*.mts" --exclude="*" build/dev/javascript/ ../../../../dcmfx-vscode/vendor/dcmfx`
- `find ../../../../dcmfx-vscode/vendor/dcmfx -type f -name "*.d.mts" -exec sed -i '' 's/ = any;/ = unknown;/g' {} \;`
