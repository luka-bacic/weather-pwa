import { Ref, RefObject } from 'react';

type Args = {
  ref: RefObject<HTMLDivElement>;
  toShow: boolean;
  cssSelector: string;
  outerElemTop: number;
};

export function placeHourlyLabel(
  ref: RefObject<HTMLDivElement>,
  toShow: boolean,
  cssSelector: string,
  outerElemTop: number
): void {
  if (typeof ref !== 'undefined' && ref.current !== null) {
    const padding = 32;

    if (toShow) {
      // Get first div where the data is displayed
      const displayedData = document.querySelector(cssSelector);

      // If node is found
      if (displayedData) {
        // Get amount of px from top of document
        const { top: displayedDataTop } = displayedData.getBoundingClientRect();
        // Add `top` to be above
        ref.current.style.top = `${
          displayedDataTop - outerElemTop - padding - 2
        }px`;
        // Show
        ref.current.classList.add('d-block');
      }
    } else {
      ref.current.classList.remove('d-block');
    }
  }
}
