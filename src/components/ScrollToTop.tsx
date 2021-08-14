import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the top of a page on route change.
 * @see https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
 */
export const ScrollToTop = (): null => {
    const { pathname } = useLocation();

    useEffect(() => {
        scrollTo(0, 0);
    }, [pathname]);

    return null;
};
