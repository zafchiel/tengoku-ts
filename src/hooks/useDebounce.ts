import { useEffect } from "react"

import { debounce } from "../lib/utils"

export const useDebounce = <A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number
): ((args: A) => Promise<R>) => {
  const [debouncedFun, teardown] = debounce<A, R>(fn, ms)

  useEffect(() => () => teardown(), [])

  return debouncedFun
}
