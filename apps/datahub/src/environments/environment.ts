// eslint-disable-next-line @nx/enforce-module-boundaries
import packageJson from 'geonetwork-ui/package.json'
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  version: packageJson.version.split('-')[1]?.includes('dev')
    ? 'main'
    : `v${packageJson.version.split('-')[0]}`,
}
