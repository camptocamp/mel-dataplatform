// eslint-disable-next-line @nx/enforce-module-boundaries
import packageJson from '../../../../package.json'
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  version:
    packageJson.dependencies['geonetwork-ui'].split('-')[1] === 'dev'
      ? 'main'
      : `v${packageJson.dependencies['geonetwork-ui']}`,
}