import { MutableRefObject, useCallback } from 'react';

/**
 * Creates animation handlers that perform smooth horizontal scrolling.
 *
 * @param ref scroll container ref
 * @param direction scrolling direction of the handler
 *
 * @returns animation handler
 */
export const useCreateScrollAnimationHandler = (
    ref: MutableRefObject<HTMLDivElement>,
    direction: 'left' | 'right',
): (() => void) =>
    useCallback(() => {
        if (!ref) return;

        const scrollRow = ref.current;

        const duration = 400;
        const scrollStep = 10;

        let start = 0;
        let previousTimestamp = 0;

        let animationId = null;

        const step: FrameRequestCallback = (timestamp) => {
            cancelAnimationFrame(animationId);

            if (!start) {
                start = timestamp;
            }

            const elapsed = timestamp - start;

            if (previousTimestamp !== timestamp) {
                if (direction === 'left') {
                    scrollRow.scrollLeft -= scrollStep;
                } else {
                    scrollRow.scrollLeft += scrollStep;
                }
            }

            if (elapsed < duration) {
                previousTimestamp = timestamp;
                animationId = requestAnimationFrame(step);
            }
        };

        animationId = requestAnimationFrame(step);
    }, [direction, ref]);
