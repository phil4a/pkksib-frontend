'use client';

import { useModal } from './ModalProvider';

interface ConsultModalTriggerProps {
  children: React.ReactNode;
}

export function ConsultModalTrigger({ children }: ConsultModalTriggerProps) {
  const { openConsult } = useModal();
  return (
    <span onClick={openConsult} role='button' aria-label='Открыть консультацию'>
      {children}
    </span>
  );
}