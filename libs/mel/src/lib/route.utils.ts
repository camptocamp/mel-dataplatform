import { CatalogRecord } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'

export const DATAHUB_ROOT = '/catalogue'
export const DATAHUB_ROUTE_DATASET = 'dataset'
export const DATAHUB_ROUTE_SEARCH = 'search'

export function goFromHomeToRecord(record: CatalogRecord) {
  window.location.href = `${DATAHUB_ROOT}/${DATAHUB_ROUTE_DATASET}/${record.uniqueIdentifier}`
}

export function goFromHomeToSearch(query: string) {
  window.location.href = `${DATAHUB_ROOT}/${DATAHUB_ROUTE_SEARCH}?q=${query}`
}
