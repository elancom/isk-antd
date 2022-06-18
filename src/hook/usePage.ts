import {useState} from "react";
import usePrevious from "./usePrevious";
import {newPage, Page} from "isk-util/lib/page";

export function usePage(): {
  page: Page,
  getPage: () => Page,
  setPage: (p: Page) => void,
  setPageLoad: (p: Page, fn: () => void) => void,
  wasChanged: () => boolean,
  resetPage: () => void,
  resetPageLoad: (fn: () => void) => void,
} {
  const [page, setPage] = useState<Page>(newPage());
  const prevPage = usePrevious(page);

  let rtPage = {...page}

  function wasChanged() {
    return prevPage === page ? false :
      prevPage?.current !== page.current || prevPage?.pageSize !== page.pageSize
  }

  function resetPage() {
    setPage0({...page, current: 1})
  }

  function setPage0(p: Page) {
    let { // 只提取需要的属性
      current = rtPage.current,
      pageSize = rtPage.pageSize
    } = p
    rtPage = {...rtPage, current, pageSize}
    setPage({...rtPage})
  }

  function setPageLoad(p: any, fn: () => void) {
    setPage0(p)
    fn && fn()
  }

  function resetPageLoad(fn: () => void) {
    resetPage()
    fn && fn()
  }

  function getPage() {
    return rtPage
  }

  return {
    page,
    setPage: setPage0,
    setPageLoad,
    getPage,
    wasChanged,
    resetPage,
    resetPageLoad,
  }
}
