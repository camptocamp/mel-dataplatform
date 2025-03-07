import * as TOML from '@ltd/j-toml'
import { parseConfigSection } from './parse-utils'
import { SearchConfig, WarningConfig } from './model'

let searchConfig: SearchConfig | null = null
let warningConfig: WarningConfig | null = null

export function getOptionalSearchConfig(): SearchConfig | null {
  return searchConfig
}

export function getOptionalWarningConfig(): WarningConfig | null {
  return warningConfig
}

let appConfigLoaded = false

export function loadAppConfig() {
  return fetch('assets/configuration/default.toml')
    .then((resp) => {
      if (!resp.ok) throw new Error('Configuration file could not be loaded')
      return resp.text()
    })
    .then((conf) => {
      let parsed
      try {
        parsed = TOML.parse(conf, { joiner: '\n', bigint: false })
      } catch (e: unknown) {
        throw new Error(
          `An error occurred when parsing the configuration file: ${
            (e as Error).message
          }`
        )
      }
      const errors = []
      const warnings = []

      const parsedSearchSection = parseConfigSection(
        parsed,
        'search',
        [],
        ['advanced_filters'],
        warnings,
        errors
      )
      const parsedWarningSection = parseConfigSection(
        parsed,
        'warning',
        [],
        ['warning_level'],
        warnings,
        errors
      )
      searchConfig =
        parsedSearchSection === null
          ? null
          : ({
              ADVANCED_FILTERS: parsedSearchSection['advanced_filters'],
            } as SearchConfig)
      warningConfig =
        parsedWarningSection === null
          ? null
          : ({
              WARNING_LEVEL: parsedWarningSection['warning_level'],
            } as WarningConfig)
      if (errors.length) {
        throw new Error(`One or more mandatory settings were missing from the configuration file.
      ${errors.join('\n')}`)
      } else if (warnings.length) {
        console.warn(`One or more unexpected settings were encountered in the configuration file.
      ${warnings.join('\n')}`)
      }

      appConfigLoaded = true
    })
}

export function isConfigLoaded() {
  return appConfigLoaded
}
