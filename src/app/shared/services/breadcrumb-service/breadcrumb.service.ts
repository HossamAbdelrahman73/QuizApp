import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private breadcrumbs$ = new BehaviorSubject<{ label: string; url: string }[]>([]);

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.breadcrumbs$.next(this.buildBreadcrumbs(this.activatedRoute.root));
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs$.next(this.buildBreadcrumbs(this.activatedRoute.root));
      });
  }

  getBreadcrumbs() {
    return this.breadcrumbs$.asObservable();
  }

private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: any[] = []): any[] {
  const children: ActivatedRoute[] = route.children;

  if (children.length === 0) {
    return breadcrumbs;
  }

  for (const child of children) {
    const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
    if (routeURL !== '') {
      url += `/${routeURL}`;
    }

    const label = child.snapshot.data['breadcrumb'];

    // Prevent duplicate breadcrumbs
    if (label && (!breadcrumbs.length || breadcrumbs[breadcrumbs.length - 1].label !== label)) {
      breadcrumbs.push({ label, url });
    }

    return this.buildBreadcrumbs(child, url, breadcrumbs);
  }

  return breadcrumbs;
}

}
