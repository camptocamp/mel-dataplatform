import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import {
  DataService,
  MdViewFacade,
  getFileFormat,
  getLinkPriority,
} from 'geonetwork-ui'
import {
  DatasetDownloadDistribution,
  DatasetServiceDistribution,
} from 'geonetwork-ui/libs/common/domain/src/lib/model/record'
import { catchError, combineLatest, map, of, switchMap } from 'rxjs'

@Component({
  selector: 'mel-datahub-dataset-links',
  templateUrl: './dataset-links.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetLinksComponent {
  @Input() section: string
  constructor(
    public facade: MdViewFacade,
    private dataService: DataService
  ) {}

  error: string = null

  downloadLinks$ = this.facade.downloadLinks$.pipe(
    switchMap((links) => {
      const wfsLinks = links.filter(
        (link) =>
          link.type === 'service' && link.accessServiceProtocol === 'wfs'
      )
      const esriRestLinks = links
        .filter(
          (link) =>
            link.type === 'service' && link.accessServiceProtocol === 'esriRest'
        )
        .flatMap((link) =>
          this.dataService.getDownloadLinksFromEsriRest(
            link as DatasetServiceDistribution
          )
        )
      const ogcLinks = links.filter(
        (link) =>
          link.type === 'service' &&
          link.accessServiceProtocol === 'ogcFeatures'
      )
      const otherLinks = links.filter(
        (link) =>
          link.type !== 'service' ||
          (link.type === 'service' &&
            link.accessServiceProtocol !== 'esriRest' &&
            link.accessServiceProtocol !== 'wfs')
      )

      this.error = null

      return combineLatest([
        ...(wfsLinks.length > 0
          ? wfsLinks.map((link) =>
              this.dataService
                .getDownloadLinksFromWfs(link as DatasetServiceDistribution)
                .pipe(
                  catchError((e) => {
                    this.error = e.message
                    return [of([] as DatasetDownloadDistribution[])]
                  })
                )
            )
          : [of([] as DatasetDownloadDistribution[])]),
        ...(ogcLinks.length > 0
          ? ogcLinks.map((link) =>
              this.dataService
                .getDownloadLinksFromOgcApiFeatures(
                  link as DatasetServiceDistribution
                )
                .catch((e) => {
                  this.error = e.message
                  return Promise.resolve([])
                })
            )
          : [of([] as DatasetDownloadDistribution[])]),
      ]).pipe(
        map(flattenArray),
        map(removeDuplicateLinks),
        map((downloadLinks) => {
          return [...otherLinks, ...downloadLinks, ...esriRestLinks]
        }),
        map(removeLinksWithUnknownFormat),
        catchError((e) => {
          this.error = e.message
          return of([...otherLinks, ...esriRestLinks])
        }),
        map(sortLinks)
      )
    })
  )

  associatedLinks$ = this.facade.otherLinks$.pipe(
    map((links) => removeLinksWithUnknownFormat(links)),
    map((links) => sortLinks(links))
  )
}

const flattenArray = (arrayOfArrays) =>
  arrayOfArrays.reduce((prev, curr) => [...prev, ...curr], [])

const removeLinksWithUnknownFormat = (downloadLinks) =>
  downloadLinks.filter((link) => !!getFileFormat(link))

const removeDuplicateLinks = (wfsDownloadLinks) =>
  wfsDownloadLinks.filter(
    (link, i, links) =>
      links.findIndex(
        (firstLink) =>
          getFileFormat(firstLink) === getFileFormat(link) &&
          firstLink.name === link.name &&
          firstLink.type === link.type
      ) === i
  )

const sortLinks = (allLinks) =>
  allLinks.sort(
    (
      a: DatasetDownloadDistribution,
      b: DatasetDownloadDistribution
    ): number => {
      return getLinkPriority(b) - getLinkPriority(a)
    }
  )
