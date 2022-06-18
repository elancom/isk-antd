import {useRef, useState} from "react";
import {OkHandler} from "isk-util/lib/func";

export default function useEditor<T>(value: T) {
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState(value);
  const itemRef = useRef<OkHandler>(null);

  function close() {
    return setVisible(false);
  }

  function show() {
    return setVisible(true);
  }

  function showItem(value: T) {
    setItem(value)
    setVisible(true)
  }

  return {
    visible,
    close: close,
    show: show,
    showItem: showItem,
    item,
    setItem,
    itemRef,
  }
}
