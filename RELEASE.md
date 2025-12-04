# Release management and procedure

## Version

### How to upgrade the version

Use the following commands to upgrade to a stable (non development) version:

```shell
npm version 2.7.0 --no-git-tag-version
git add .
git commit -m "2.7.0"
git tag v2.7.0
git push upstream main v2.7.0 # replace "upstream" with your remote repo name
```

This will update all `package.json` files in the repository, create a commit changing the version and an associated tag, and push both
to the remote repository.

Once the version commit and tag are done and pushed, run the following commands to upgrade to an intermediary dev version:

```shell
npm version 2.8.0-dev --no-git-tag-version # dev versions are a minor version above stable ones
git add .
git commit -m "2.8.0-dev"
git push upstream main
```

> Note that we're not tagging dev versions.

> The same workflow can be applied to a patch branch, just replace `main` with the branch name

## Releases

### How to make a release

When a release is created in GitHub, the CI automatically generates the associated artifacts which
are then either attached to the release (archives) or pushed to github (docker images).

To trigger this, simply push a git tag and then create a release from it as described here:
https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release

## Geonetwork-UI versions

The geonetwork-ui npm package is updated like any other package in the `package.json`. During migration it can be useful
to install the package locally. Make sure to follow the [instructions](https://geonetwork.github.io/geonetwork-ui/main/docs/guide/custom-app.html#using-the-npm-package-in-development-mode) and use the `--install-links` flag when using `npm install`.

Important: When updating gn-ui within the project, remember to also update the `GN_UI_VERSION` in [`.github/workflows/ci.yml#L5`](.github/workflows/ci.yml#L5). This ensures the CI uses the database dump of the according gn-ui version.
