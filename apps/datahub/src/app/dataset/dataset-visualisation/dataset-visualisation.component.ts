import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {
  BehaviorSubject,
  combineLatest,
  map,
  of,
  skip,
  startWith,
  Subscription,
  switchMap,
  take,
} from 'rxjs'
import {
  DataService,
  getIsMobile,
  MdViewFacade,
  PlatformServiceInterface,
} from 'geonetwork-ui'
import { DatasetOnlineResource } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'
import { DatavizConfigModel } from 'geonetwork-ui/libs/common/domain/src/lib/model/dataviz/dataviz-configuration.model'

@Component({
  selector: 'mel-datahub-dataset-visualisation',
  templateUrl: './dataset-visualisation.component.html',
  styles: `
    @media only screen and (max-width: 639px) {
      /*hide chart tab on mobile*/
      ::ng-deep .mat-mdc-tab.mdc-tab:nth-child(3) {
        display: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetVisualisationComponent implements OnInit, OnDestroy {
  @Input() recordUuid: string
  sub = new Subscription()
  hasConfig = false
  savingStatus: 'idle' | 'saving' | 'saved' | 'error' = 'idle'
  displaySource = false
  views = ['map', 'table', 'chart']
  displayMap$ = combineLatest([
    this.mdViewFacade.mapApiLinks$,
    this.mdViewFacade.geoDataLinksWithGeometry$,
  ]).pipe(
    map(([mapApiLinks, geoDataLinksWithGeometry]) => {
      const display =
        mapApiLinks?.length > 0 || geoDataLinksWithGeometry?.length > 0
      if (!this.datavizConfig) {
        this.selectedIndex$.next(display ? 0 : 1)
        this.selectedView$.next(display ? 'map' : 'table')
      }
      return display
    }),
    startWith(false)
  )

  displayData$ = combineLatest([
    this.mdViewFacade.dataLinks$,
    this.mdViewFacade.geoDataLinks$,
  ]).pipe(
    map(
      ([dataLinks, geoDataLinks]) =>
        dataLinks?.length > 0 || geoDataLinks?.length > 0
    )
  )

  displayChart$ = getIsMobile().pipe(map((isMobile) => !isMobile))

  selectedLink$ = new BehaviorSubject<DatasetOnlineResource>(null)

  selectedView$ = new BehaviorSubject(null)
  datavizConfig = null

  selectedIndex$ = new BehaviorSubject(0)

  constructor(
    public mdViewFacade: MdViewFacade,
    private dataService: DataService,
    private platformServiceInterface: PlatformServiceInterface,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.platformServiceInterface
      .getRecordAttachments(this.recordUuid)
      .pipe(
        map((attachments) =>
          attachments.find((att) => att.fileName === 'datavizConfig.json')
        ),
        switchMap((configAttachment) =>
          (configAttachment
            ? this.platformServiceInterface.getFileContent(configAttachment.url)
            : of(null)
          ).pipe(
            switchMap((config: DatavizConfigModel) =>
              this.displayMap$.pipe(
                skip(1),
                take(1),
                map((displayMap) => ({ config, displayMap }))
              )
            )
          )
        )
      )
      .subscribe(({ config, displayMap }) => {
        let view
        if (config) {
          view =
            window.innerWidth < 640
              ? config.view === 'chart'
                ? 'chart'
                : 'map'
              : config.view

          if (!displayMap && view === 'map') {
            view = 'table'
          }

          const tab = this.views.indexOf(view) + 1 || 3

          this.datavizConfig = {
            ...config,
            view,
          }
          this.selectedIndex$.next(tab)
          this.selectedView$.next(view)
          this.selectedLink$.next(config.source)
        } else {
          this.datavizConfig = {
            link: this.selectedLink$.value,
            view: this.selectedView$.value,
          }
        }
      })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  saveDatavizConfig() {
    this.savingStatus = 'saving'
    this.sub.add(
      combineLatest([
        this.selectedView$,
        this.selectedLink$,
        this.mdViewFacade.chartConfig$,
        // this.selectedTMSStyle$,
      ])
        .pipe(
          take(1),
          map(([selectedView, selectedLink, chartConfig]) => {
            return this.dataService.writeConfigAsJSON({
              view: selectedView,
              source: selectedLink,
              chartConfig: selectedView === 'chart' ? chartConfig : null,
              styleTMSIndex: null,
            })
          }),
          switchMap((config) =>
            this.platformServiceInterface.attachFileToRecord(
              this.recordUuid,
              config,
              true
            )
          )
        )
        .subscribe({
          next: () => {
            this.savingStatus = 'saved'
            this.cdr.detectChanges()
            setTimeout(() => {
              this.savingStatus = 'idle'
              this.cdr.detectChanges()
            }, 2000)
          },
          error: () => {
            this.savingStatus = 'error'
            this.cdr.detectChanges()
            setTimeout(() => {
              this.savingStatus = 'idle'
              this.cdr.detectChanges()
            }, 3000)
          },
        })
    )
  }

  onTabIndexChange(index: number): void {
    const view = this.views[index]
    this.selectedView$.next(view)
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  onSelectedLinkChange(link: DatasetOnlineResource) {
    this.selectedLink$.next(link)
  }
}
