---
name: Release
about: When ready to cut a release
title: Release X.Y.Z
labels: release
assignees: ""
---

-   [ ] Start a new release branch:

```bash
$ git flow release start X.Y.Z
```

-   [ ] Bump version in `package.json` to `X.Y.Z`:

```bash
$ yarn version X.Y.Z
```

-   [ ] Rotate `CHANGELOG.md` (following [Keep a Changelog](https://keepachangelog.com/) principles)
-   [ ] Ensure outstanding changes are committed:

```bash
$ git status # Is the git staging area clean?
$ git add package.json CHANGELOG.md
$ git commit -m "X.Y.Z"
```

-   [ ] Publish the release branch:

```bash
$ git flow release publish X.Y.Z
```

-   [ ] Finish and publish the release branch:
    -   When prompted, keep default commit messages
    -   Use `X.Y.Z` as the tag message

```bash
$ git flow release finish -p X.Y.Z
```
