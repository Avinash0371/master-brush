"use client";

import { create } from 'zustand';

type ModalState = {
  leadOpen: boolean;
  painterOpen: boolean;
  visualiserOpen: boolean;
  openLead: () => void;
  closeLead: () => void;
  openPainter: () => void;
  closePainter: () => void;
  openVisualiser: () => void;
  closeVisualiser: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  leadOpen: false,
  painterOpen: false,
  visualiserOpen: false,
  openLead: () => set({ leadOpen: true }),
  closeLead: () => set({ leadOpen: false }),
  openPainter: () => set({ painterOpen: true }),
  closePainter: () => set({ painterOpen: false }),
  openVisualiser: () => set({ visualiserOpen: true }),
  closeVisualiser: () => set({ visualiserOpen: false })
}));

export type { ModalState };
