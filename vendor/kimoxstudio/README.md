# Vendored kimox-fw packages (temporary)

These are `pnpm pack` tarballs of the `@kimoxstudio/*` framework packages at
**0.2.0**, committed so this site builds anywhere — including Vercel, which
clones only this repo and therefore cannot resolve a `link:../kimox-fw/...`
path. Total size is ~264 KB.

They are a **bridge, not the destination**: the same packages are meant to be
installed from npm. Once they are published under the `kimoxstudio` org, swap
back with:

```bash
# 1) point the deps at the registry and drop the local overrides
python3 - <<'EOF'
import json
p = "package.json"; d = json.load(open(p))
for k in d["dependencies"]:
    if k.startswith("@kimoxstudio/"):
        d["dependencies"][k] = "^0.2.0"
d.get("pnpm", {}).pop("overrides", None)
if d.get("pnpm") == {}: d.pop("pnpm")
json.dump(d, open(p, "w"), indent=2); open(p, "a").write("\n")
EOF

# 2) reinstall, verify, and delete this directory
pnpm install && pnpm build && git rm -r vendor/kimoxstudio
```

To regenerate them after changing the framework (from the kimox-fw checkout):

```bash
pnpm -r build
for d in packages/*/; do (cd "$d" && pnpm pack --pack-destination \
  ../../kimoxstudio.com/vendor/kimoxstudio); done
```

Note `pnpm pack` (not `npm pack`) is required: it rewrites the packages'
internal `workspace:*` dependencies to real versions. The `pnpm.overrides`
block in the root `package.json` maps those internal `@kimoxstudio/*: 0.2.0`
references back to these tarballs, since 0.2.0 is not on the registry yet.
