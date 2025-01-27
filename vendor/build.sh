# This script rebuilds the vendored JavaScript build of DCMfx's Gleam
# implementation stored under dcmfx/

set -e

cd dcmfx_vendor

# Rebuild for the JavaScript target
gleam clean
gleam build --target javascript

# Copy build into place
rsync -av --delete --include="*/" --include="*.mjs" --include="*.mts" --exclude="*" build/dev/javascript/ ../dcmfx

cd ../dcmfx

# Replace use of `any` in the TypeScript types with `unknown`
# See: https://github.com/gleam-lang/gleam/discussions/3801
find . -type f -name "*.d.mts" -exec sed -i '' 's/ = any;/ = unknown;/g' {} \;
