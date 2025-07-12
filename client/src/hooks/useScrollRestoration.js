import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useScrollRestoration(key = 'scroll-position') {
    const location = useLocation();

    useEffect(() => {
        const savedY = sessionStorage.getItem(key + location.pathname);
        if(savedY) {
            window.scrollTo(0, parseInt(savedY, 10));
        }

        return () => {
            sessionStorage.setItem(key + location.pathname, window.scrollY.toString());
        };
    }, [location.pathname, key]);
}