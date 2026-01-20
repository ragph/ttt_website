import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { rehydrateAuth } from '../features/auth/authSlice';
import { hydrateTheme } from '../features/theme/themeSlice';

/**
 * Hook to handle store hydration from localStorage after initial React render.
 * This prevents hydration mismatch errors by ensuring localStorage data
 * is only loaded after the server-rendered HTML has been hydrated.
 */
export const useStoreHydration = () => {
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Hydrate store from localStorage after initial render
    dispatch(rehydrateAuth());
    dispatch(hydrateTheme());
    setIsHydrated(true);
  }, [dispatch]);

  return isHydrated;
};
