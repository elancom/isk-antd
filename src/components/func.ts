import {message} from "antd";

type Msg<T> = {
  code?: number,
  msg?: string,
  isErr(): boolean,
};

export function showMsg(m: Msg<any>): Msg<any> {
  if (m.isErr()) {
    if (m.msg) {
      showError(m.msg)
    }
    return m
  }
  if (m.msg) {
    showSuccess(m.msg)
  }
  return m
}

export function showError(t: string = '操作失败') {
  message.error(t).then()
}

export function showSuccess(t: string = '操作成功') {
  message.success(t).then()
}

export function loadOrErr(loading: boolean, error: string) {
  if (loading) {
    return true
  }
  if (error) {
    message.error(error).then()
    return true
  }
  return false
}
