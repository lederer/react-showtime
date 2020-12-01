---
name: Hotfix YYYY-MM-DD
about: When applying a hotfix for the example site
title: Hotfix YYYY-MM-DD
labels: hotfix
assignees: ''

---

- [ ] Start a new hotfix branch:
```bash
$ git flow hotfix start YYYY-MM-DD
```
- [ ] Make commits to hotfix branch to address any issues that need to be resolved
- [ ] Publish the hotfix branch:
```bash
$ git flow hotfix publish YYYY-MM-DD
```
- [ ] Create a PR for the hotfix branch, target it to `main`, have it reviewed, and confirm that all checks pass
- [ ] Finish and publish the hotfix branch:
    - When prompted, keep default commit messages
    - Use `-n` to skip tagging
```bash
$ git flow hotfix finish -n
```
