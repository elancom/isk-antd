import {Link, useLocation} from "react-router-dom";
import {Breadcrumb as AntdBreadcrumb} from 'antd'
import {AppRoute} from "@/route/AppRouter";

type BreadcrumbProps = {
  rootRoute: () => AppRoute | undefined
}

function parse(path: string, rootRoute?: AppRoute): any[] {
  let segments: any[] = path.split('/').filter(it => it.length);
  if (segments.length === 0) {
    return []
  }

  if (!rootRoute) {
    return []
  }

  // 解析路径名称
  let root = rootRoute, finds = [];
  for (let segment of segments) {
    let find = (root.children || []).find(it => it.path === segment) as any
    if (!find) {
      continue
    }
    // 解析结构
    finds.push({path: find.redirect ?? find.path, name: find.name})
    root = find
  }

  return finds
}

export default function Breadcrumb({rootRoute}: BreadcrumbProps) {
  let {pathname} = useLocation();
  const finds = parse(pathname, rootRoute());
  let items = finds.map((it, index) => {
    return <AntdBreadcrumb.Item key={index}>
      <Link to={it.path}>{it.name}</Link>
    </AntdBreadcrumb.Item>;
  })
  // items = getOpButtons(pathname)
  if (items.length === 0) {
    return <></>
  }
  return <div style={{backgroundColor: '#fff', borderRadius: '0 0 6px 6px', padding: 3}}>
    <AntdBreadcrumb>{items}</AntdBreadcrumb>
  </div>
}
