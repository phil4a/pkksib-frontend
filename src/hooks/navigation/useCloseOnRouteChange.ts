'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useCloseOnRouteChange(enabled: boolean, onClose: () => void) {
  const pathname = usePathname();
  const enabledRef = useRef(enabled);
  const onCloseRef = useRef(onClose);

  // Keep refs in sync with latest values
  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Close ONLY when the pathname changes and menu is currently open
  useEffect(() => {
    if (enabledRef.current) {
      onCloseRef.current();
    }
  }, [pathname]);
}
