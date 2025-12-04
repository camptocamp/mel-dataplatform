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
  catchError,
  combineLatest,
  map,
  of,
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
  @Input()
  set recordUuid(value: string) {
    this.recordUuid$.next(value)
  }
  get recordUuid(): string {
    return this.recordUuid$.value
  }
  private recordUuid$ = new BehaviorSubject<string>(null)

  hasConfig = false
  savingStatus: 'idle' | 'saving' | 'saved' | 'error' = 'idle'
  displaySource = false
  views = ['map', 'table', 'chart']
  datavizConfig = null

  private readonly TAB_INDICES = {
    map: 0,
    table: 1,
    chart: 2,
    stac: 3,
  } as const

  private readonly VIEW_PRIORITY = ['map', 'table', 'stac'] as const

  subscription: Subscription
  selectedLink$ = new BehaviorSubject<DatasetOnlineResource>(null)
  selectedView$ = new BehaviorSubject(null)
  selectedIndex$ = new BehaviorSubject(0)
  selectedTMSStyle$ = new BehaviorSubject(0)

  displayMap$ = combineLatest([
    this.mdViewFacade.mapApiLinks$,
    this.mdViewFacade.geoDataLinksWithGeometry$,
  ]).pipe(
    map(
      ([mapApiLinks, geoDataLinksWithGeometry]) =>
        mapApiLinks?.length > 0 || geoDataLinksWithGeometry?.length > 0
    ),
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

  isMobile$ = getIsMobile()

  config$ = this.recordUuid$.pipe(
    switchMap((uuid) => {
      if (!uuid) return of(null)
      return this.platformServiceInterface.getRecordAttachments(uuid)
    }),
    map((attachments) => {
      return attachments?.find((att) => att.fileName === 'datavizConfig.json')
    }),
    switchMap((configAttachment) => {
      return configAttachment
        ? this.platformServiceInterface.getFileContent(configAttachment.url)
        : of(null)
    }),
    map((config) => {
      return config?.source && typeof config.source.url === 'string'
        ? ({
            ...config,
            source: {
              ...config.source,
              url: new URL(config.source.url as string),
            },
          } as DatavizConfigModel)
        : (config as DatavizConfigModel)
    }),
    catchError(() => of(null))
  )

  displayDatavizConfig$ = combineLatest([
    this.platformServiceInterface.getMe(),
    this.mdViewFacade.metadata$,
  ]).pipe(
    map(([userInfo, metadata]) => {
      const isAdmin =
        userInfo?.profile === 'Administrator' ||
        userInfo?.username ===
          (metadata?.extras?.['ownerInfo'] as string).split('|')[0]
      const isPublished = metadata?.extras?.['isPublishedToAll']
      return isAdmin && isPublished
    })
  )

  constructor(
    public mdViewFacade: MdViewFacade,
    private dataService: DataService,
    private platformServiceInterface: PlatformServiceInterface,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.displayMap$,
      this.displayData$,
      this.config$,
      this.isMobile$,
    ])
      .pipe(
        map(([displayMap, displayData, config, isMobile]) => {
          const availableViews = this.getAvailableViews(
            displayMap,
            displayData,
            isMobile
          )
          const selectedView = this.determineView(config, availableViews)
          return { selectedView, config }
        })
      )
      .subscribe(({ selectedView, config }) => {
        this.applyViewConfiguration(selectedView, config)
      })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  private getAvailableViews(
    displayMap: boolean,
    displayData: boolean,
    isMobile: boolean
  ): Set<string> {
    const views = new Set<string>()
    if (displayMap) views.add('map')
    if (displayData) {
      views.add('table')
      if (!isMobile) views.add('chart')
    }
    return views
  }

  private determineView(
    config: DatavizConfigModel | null,
    availableViews: Set<string>
  ): string | null {
    if (config && availableViews.has(config.view)) {
      return config.view
    } else {
      return this.getDefaultView(availableViews)
    }
  }

  private getDefaultView(availableViews: Set<string>): string | null {
    for (const view of this.VIEW_PRIORITY) {
      if (availableViews.has(view)) {
        return view
      }
    }
    return null
  }

  private applyViewConfiguration(
    view: string | null,
    config: DatavizConfigModel | null
  ): void {
    const tabIndex = view ? this.TAB_INDICES[view] : this.TAB_INDICES.map

    this.selectedView$.next(view)
    this.selectedIndex$.next(tabIndex)

    if (config) {
      this.selectedLink$.next(config.source)
      this.datavizConfig = { ...config, view }
    } else {
      this.datavizConfig = {
        source: this.selectedLink$.value,
        view: view,
      }
    }
  }

  saveDatavizConfig() {
    this.savingStatus = 'saving'
    combineLatest([
      this.selectedView$,
      this.selectedLink$,
      this.mdViewFacade.chartConfig$,
      this.selectedTMSStyle$,
    ])
      .pipe(
        take(1),
        map(([selectedView, selectedLink, chartConfig, selectedTMSStyle]) => {
          return this.dataService.writeConfigAsJSON({
            view: selectedView,
            source: selectedLink,
            chartConfig: selectedView === 'chart' ? chartConfig : null,
            styleTMSIndex: selectedView === 'map' ? selectedTMSStyle : null,
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
  }

  onTabIndexChange(index: number): void {
    const view = this.views[index]
    this.selectedView$.next(view)
  }

  onSelectedLinkChange(link: DatasetOnlineResource) {
    this.selectedLink$.next(link)
  }
}
