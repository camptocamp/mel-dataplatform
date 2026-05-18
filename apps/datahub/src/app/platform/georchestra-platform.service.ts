import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, shareReplay, tap } from 'rxjs/operators'

@Injectable()
export class GeorchestraPlatformService {
  private httpClient = inject(HttpClient)

  private headers = new HttpHeaders().set('Accept', 'application/json')

  private whoami$ = this.httpClient
    .get(`/whoami`, {
      responseType: 'json',
      withCredentials: true,
      headers: this.headers,
      observe: 'body',
      reportProgress: false,
    })
    .pipe(shareReplay({ bufferSize: 1, refCount: true }))

  getMyRoles(): Observable<string[]> {
    return this.whoami$.pipe(
      map((response: any) => response.GeorchestraUser?.roles || [])
    )
  }
}
