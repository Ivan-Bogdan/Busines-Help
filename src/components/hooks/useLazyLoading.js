import { useRef, useCallback } from "react";
import throttle from "lodash/throttle";

export function useLazyLoading({
  onIntersection,
  delay = 1000,
}) {
  const containerRef = useRef(null);

  const onScroll = useCallback(
    throttle(() => {
      const containerScrollTop = containerRef.current.scrollTop;
      const containerHeight = containerRef.current.clientHeight;
      const scrollHeight = containerRef.current.scrollHeight;
      if (
        scrollHeight -
        containerScrollTop -
        containerHeight <
        100
      ) {
        onIntersection();
      }
    }, delay),
    [onIntersection, containerRef, delay]
  );

  return [onScroll, containerRef];
}