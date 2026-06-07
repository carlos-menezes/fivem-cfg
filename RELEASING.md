# Releasing

Releases are done manually using [changesets](https://github.com/changesets/changesets).

## Steps

1. **Document your changes**

   Run the following and follow the prompts to describe what changed and select the bump type (`major`, `minor`, or `patch`):

   ```sh
   pnpm changeset
   ```

   Commit the generated changeset file alongside your code changes.

2. **Bump the version**

   When you're ready to release, consume all pending changesets to update `package.json` and `CHANGELOG.md`:

   ```sh
   pnpm run version
   ```

   Commit the resulting changes:

   ```sh
   git add .
   git commit -m "chore: version bump"
   git tag v<new-version>
   ```

3. **Publish**

   Build and publish to npm:

   ```sh
   pnpm release
   ```
