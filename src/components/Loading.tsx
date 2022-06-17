import {Spin} from "antd";

export default function Loading() {
  return <Spin style={{
    width: '100%',
    margin: '20px 0',
    padding: '30px 50px',
    textAlign: 'center',
    borderRadius: '4px',
  }} tip={'loading'} spinning={true}/>
}
