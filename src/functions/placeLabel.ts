import { RefObject } from 'react';

export function placeLabel(
  outerWrapRef: RefObject<HTMLDivElement | null> | undefined,
  statRef: RefObject<HTMLDivElement>,
  statLabelRef: RefObject<HTMLDivElement>
): void {
  const padding = 16 * 2.5;

  // Is the wrapper div's ref valid
  if (typeof outerWrapRef !== 'undefined' && outerWrapRef.current !== null) {
    if (statRef.current !== null && statLabelRef.current !== null) {
      statLabelRef.current.style.top = `${
        statRef.current.getBoundingClientRect().top -
        outerWrapRef.current.getBoundingClientRect().top -
        padding -
        2
      }px`;
    }
  }
}
