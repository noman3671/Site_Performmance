import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function RemoveTrailingSlash() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;

    if (path.length > 1 && path.endsWith('/')) {
      const newPath = path.slice(0, -1) + location.search;
      if (newPath !== location.pathname) {
        navigate(newPath, { replace: true });
      }
    }
  }, [location, navigate]);

  return null;
}
