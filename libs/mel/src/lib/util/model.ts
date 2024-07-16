import { SearchPreset } from 'geonetwork-ui'

export interface SearchConfig {
  FILTER_GEOMETRY_URL?: string
  FILTER_GEOMETRY_DATA?: string
  SEARCH_PRESET?: SearchPreset[]
  ADVANCED_FILTERS?: []
}
