import {useEffect} from 'react';
import {Dropdown, Menu, Space} from 'antd';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {HomeOutlined, LogoutOutlined, SettingOutlined} from '@ant-design/icons';
import css from './Home.module.less'
import {AppRoute} from "../route/AppRouter";

type HomeProps = {
  username: string,
  rootRoute: () => AppRoute | undefined,
  onLogout: () => void,
}

function getNav(it: any, key: any) {
  let to = it.path;
  if (it.redirect) {
    to += '/' + it.redirect
  }
  return <Dropdown overlay={getNavMenu(it.path, it.children || [])} placement='bottomLeft' key={key}>
    <Link to={to}>
      <div className={css.menu}><HomeOutlined/><span>{it.name}</span></div>
    </Link>
  </Dropdown>;
}

function getNavMenu(path: string, children: []) {
  const menus = children.map((it: any) => {
    if (path && !path.endsWith('/') && it.path) {
      path += '/'
    }
    return {
      key: it.path,
      label: <Link to={path + it.path}><Space><SettingOutlined/><span>{it.name}</span></Space></Link>
    }
  });
  return <Menu items={menus}/>
}

export default function Home({username = '', rootRoute, onLogout}: HomeProps) {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  // 导航菜单
  const root = rootRoute() as any;
  if (!root) {
    return <>无菜单</>
  }
  const navs = root.children.map((it: any, index: any) => {
    return getNav(it, index)
  });

  // 退出登录菜单
  const logoutMenu = <Menu items={[{
    key: 'logout',
    label: <Space onClick={logout} style={{cursor: 'pointer'}}><LogoutOutlined/><span>退出登录</span></Space>
  }]}/>

  // 退出登录
  function logout() {
    onLogout()
    navigate('/login')
  }

  useEffect(() => {
    if (pathname === '/') navigate('/sys/user-list')
  }, [navigate, pathname])

  return <div style={{
    backgroundColor: '#f0f2f5',
    display: "flex", flexDirection: 'column',
    minHeight: '100vh',
    height: '100%',
  }}>
    <div style={{
      backgroundColor: '#fff',
      display: 'flex', alignItems: 'center',
      boxShadow: '0 2px 5px rgb(0 0 0 / 10%)'
    }}>
      <div className={css.logo}>
        <span className={css.logoTitle}>后台管理</span>
      </div>
      <div style={{flex: 1}}>
        {/*导航列表*/}
        <Space>{navs}</Space>
      </div>
      <div style={{fontSize: 12}}>{/*超级管理员，*/}{username}</div>
      <div style={{width: 20}}/>
      <div>
        <Dropdown overlay={logoutMenu} placement='bottomLeft'>
          <div className={css.logoutBtn}><SettingOutlined/></div>
        </Dropdown>
      </div>
      <div style={{width: 20}}/>
    </div>
    <hr style={{margin: 0}}/>
    <div style={{flex: 1}} className={css.mainBody}>
      <Outlet/>
    </div>
  </div>;
}
