export interface AppRoute {
  name: string
  path: string,
  element?: any,
  children?: AppRoute[]
}

export interface AppRoutes {

  getRoute(name: string): AppRoute | undefined

  getRoot(name: string): AppRoute | undefined

  getRoutes(): readonly AppRoute[]
}

class AppRouter implements AppRoutes {
  private readonly routeMap = new Map<string, AppRoute>()
  private routes: AppRoute[] = []

  constructor(routes: AppRoute[]) {
    this.setRoutes(routes)
  }

  setRoutes(routes: AppRoute[]) {
    this.routeMap.clear()
    this.routes = []
    for (let route of routes) {
      this.routeMap.set(route.path, route)
      this.routes.push(route)
    }
  }

  getRoute(name: string): AppRoute | undefined {
    return this.routeMap.get(name);
  }

  getRoot(): AppRoute | undefined {
    return this.routeMap.get('/') ?? this.routeMap.get('')
  }

  getRoutes(): readonly AppRoute[] {
    return this.routes
  }
}

export default AppRouter
