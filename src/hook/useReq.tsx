import {useCallback, useEffect, useRef, useState} from "react";
import Msg from "isk-util/lib/msg";
import {message} from "antd";

interface ReqState<T> {
  loading: boolean,
  isFirstLoading: boolean,
  isErr: boolean,
  isOk: boolean,
  error: string
  data: T,
  msg?: Msg<T>,
  reload: () => void
}

interface ReqState2<T1, T2> extends ReqState<T1> {
  data2: T2
  msg2?: Msg<T2>
}

interface ReqState3<T1, T2, T3> extends ReqState2<T1, T2> {
  data3: T3
  msg3?: Msg<T3>
}

interface ReqState4<T1, T2, T3, T4> extends ReqState3<T1, T2, T3> {
  data4: T4
  msg4?: Msg<T4>
}

export default function useReq<T>(loader: () => Promise<Msg<T>>, def: T): ReqState<T> {
  let f = async () => Msg.ok({data: 1})
  return useReq2<T, number>(loader, f, def, 1)
}

export function useReq2<T1, T2>(
  loader1: () => Promise<Msg<T1>>,
  loader2: () => Promise<Msg<T2>>,
  def1: T1,
  def2: T2,
): ReqState2<T1, T2> {
  let f = async () => Msg.ok({data: 1})
  return useReq3<T1, T2, number>(loader1, loader2, f, def1, def2, 1)
}

export function useReq3<T1, T2, T3>(
  loader1: () => Promise<Msg<T1>>,
  loader2: () => Promise<Msg<T2>>,
  loader3: () => Promise<Msg<T3>>,
  def1: T1,
  def2: T2,
  def3: T3,
): ReqState3<T1, T2, T3> {
  let f = async () => Msg.ok({data: 1})
  return useReq4<T1, T2, T3, number>(loader1, loader2, loader3, f, def1, def2, def3, 1)
}

export function useReq4<T1, T2, T3, T4>(
  loader1: () => Promise<Msg<T1>>,
  loader2: () => Promise<Msg<T2>>,
  loader3: () => Promise<Msg<T3>>,
  loader4: () => Promise<Msg<T4>>,
  def1: T1,
  def2: T2,
  def3: T3,
  def4: T4,
): ReqState4<T1, T2, T3, T4> {
  const [loading, setLoading] = useState(true)
  const [isFirstLoading, setIsFirstLoading] = useState(true)
  const [data1, setData1] = useState<T1>(def1);
  const [data2, setData2] = useState<T2>(def2);
  const [data3, setData3] = useState<T3>(def3);
  const [data4, setData4] = useState<T4>(def4);
  const [isErr, setIsErr] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const [error, setError] = useState('');
  const [msg1, setMsg1] = useState<Msg<T1>>();
  const [msg2, setMsg2] = useState<Msg<T2>>();
  const [msg3, setMsg3] = useState<Msg<T3>>();
  const [msg4, setMsg4] = useState<Msg<T4>>();
  const loaderRef1 = useRef<any>(loader1);
  const loaderRef2 = useRef<any>(loader2);
  const loaderRef3 = useRef<any>(loader3);
  const loaderRef4 = useRef<any>(loader4);

  const load = useCallback(async () => {
    setLoading(true)
    setIsOk(false)
    setIsErr(false)
    setError('')
    // setMsg(null as any)

    let rss = await Promise.all<[T1, T2, T3, T4]>([
      loaderRef1.current().catch((e: any) => Msg.err({code: 400, msg: e.message})),
      loaderRef2.current().catch((e: any) => Msg.err({code: 400, msg: e.message})),
      loaderRef3.current().catch((e: any) => Msg.err({code: 400, msg: e.message})),
      loaderRef4.current().catch((e: any) => Msg.err({code: 400, msg: e.message})),
    ])

    let firstErrMsg: any = rss.find((it: any) => it.isErr())
    let isErr = !!firstErrMsg
    setIsErr(isErr)
    setIsOk(!isErr)

    // if err then error require
    if (firstErrMsg) {
      setError(firstErrMsg.msg || firstErrMsg.code.toString())
    }

    const msg1 = rss[0] as any;
    const msg2 = rss[1] as any;
    const msg3 = rss[2] as any;
    const msg4 = rss[3] as any;
    setMsg1(msg1)
    setMsg2(msg2)
    setMsg3(msg3)
    setMsg4(msg4)

    setData1(msg1.data)
    setData2(msg2.data)
    setData3(msg3.data)
    setData4(msg4.data)

    setLoading(false);
    setIsFirstLoading(false)

    if (firstErrMsg?.isErr()) {
      message.error(firstErrMsg.msg)
    }

  }, [loaderRef1]);

  useEffect(() => {
    loaderRef1.current = loader1
    loaderRef2.current = loader2
    loaderRef3.current = loader3
    loaderRef4.current = loader4
  }, [loader1, loader2, loader3, loader4])

  useEffect(() => {
    load().finally()
  }, [load])

  return {
    loading,
    isFirstLoading,
    isOk: isOk,
    isErr: isErr,
    error,
    data: data1,
    data2,
    data3,
    data4,
    msg: msg1,
    msg2,
    msg3,
    msg4,
    reload: load
  }
}
