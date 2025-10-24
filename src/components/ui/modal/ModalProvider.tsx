'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Modal } from './Modal';
import { ConsultForm } from '@/components/layout/form/consult/ConsultForm';

interface ModalContextValue {
  openConsult: () => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [consultOpen, setConsultOpen] = useState(false);

  const openConsult = useCallback(() => setConsultOpen(true), []);
  const close = useCallback(() => setConsultOpen(false), []);

  // Global delegate: open consult modal on click of any element with data-open-consult
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const trigger = target.closest('[data-open-consult]') as HTMLElement | null;
      if (trigger) {
        e.preventDefault();
        openConsult();
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [openConsult]);

  return (
    <ModalContext.Provider value={{ openConsult, close }}>
      {children}
      <Modal open={consultOpen} onClose={close}>
        <ConsultForm onSubmitted={close} />
      </Modal>
    </ModalContext.Provider>
  );
}