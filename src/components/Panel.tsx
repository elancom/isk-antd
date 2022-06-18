import {Card} from "antd";

export function BarTitle({children}: any) {
  return <div style={{
    fontWeight: 700,
    fontSize: 16,
    opacity: 0.85,
  }}>{children}</div>
}

export function BarBody({children}: any) {
  return <div style={{
    flex: 1,
  }}>{children}</div>
}

export function BarOption({children}: any) {
  return <div style={{}}>{children}</div>
}

function find(children: any, name: string) {
  let find = children
  if (Array.isArray(children)) {
    find = children.find((it: any) => it.type.name === name);
  }
  if (!find) {
    return null
  }
  return find.type.name === name ? find : null;
}

export const Bar = (props: any) => {
  let {children} = props;
  const title = find(children, BarTitle.name);
  const body: any = find(children, BarBody.name)
  const option: any = find(children, BarOption.name)
  return <>
    <div style={{
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      padding: '6px'
    }}>
      {title}
      <div style={{width: 10}}/>
      {body ?? <BarBody/>}
      {option}
    </div>
    <PanelDivider/>
  </>
};

export function PanelDivider() {
  return <div style={{height: 1, borderBottom: '1px solid #e8e8e8'}}/>
}

export const Body = ({children}: any) => {
  return <Card bordered={false}>{children}</Card>
}

export default function Panel({children}: any) {
  return <div style={{
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
  }}>
    {children}
  </div>
}
