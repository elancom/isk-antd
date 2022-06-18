import {Button, Space} from "antd";
import {Link, Outlet, useLocation} from "react-router-dom";
import Fun from "../components/Fun";
import Body from "../components/Body";
import {OpButtonsToBodyCrevice} from "./crevice";
import {AppRoute} from "../route/AppRouter";

type BodyLayoutProps = {
  rootRoute: () => AppRoute | undefined
}

export default function BodyLayout({rootRoute}: BodyLayoutProps) {
  const {pathname} = useLocation();
  return <div style={{display: 'flex', flexDirection: 'column'}}>
    {/*<Breadcrumb/>*/}
    {/*<BreadcrumbToOpButtonsCrevice/>*/}
    <Fun>
      <Space>{getOpButtons(pathname, rootRoute())}</Space>
    </Fun>
    <OpButtonsToBodyCrevice/>
    <Body>
      <Outlet/>
    </Body>
  </div>
}

function getOpButtons(pathname: string, rootRoute?: AppRoute) {
  const segments = pathname.split('/').filter(it => it)
  if (segments.length === 0) {
    return
  }
  if (!rootRoute) {
    return
  }
  if (!rootRoute.children) {
    return
  }
  // 找到模块
  const find: any = (rootRoute.children as []).find((it: any) => it.path === segments[0]);
  // 菜单列表
  return find.children.map((it: any, index: any) => {
    return <Button key={index}><Link to={it.path}>{it.name}</Link></Button>
  })
}
