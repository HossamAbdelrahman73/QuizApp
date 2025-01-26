import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  constructor(private router: Router, private route: ActivatedRoute) { }
  getBreadcrumbs(): Observable<Array<{ label: string; url: string }>> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        let breadcrumbs: Array<{ label: string; url: string }> = [];
        let currentRoute = this.route.root;
        let url = '';

        while (currentRoute.children.length > 0) {
          const childRoute = currentRoute.children[0];
          const routeSnapshot = childRoute.snapshot;

          if (routeSnapshot.data['breadcrumb']) {
            url += `/${routeSnapshot.url.map((segment) => segment.path).join('/')}`;
            breadcrumbs.push({
              label: routeSnapshot.data['breadcrumb'],
              url,
            });
          }

          currentRoute = childRoute;
        }

        return breadcrumbs;
      })
    );
  }
}
