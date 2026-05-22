import { useSyncExternalStore } from "react";

type Listener = () => void;
const listeners = new Set<Listener>();

const interestedIds = new Set<string>();
const savedIds = new Set<string>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function isInterested(startupId: string): boolean {
  return interestedIds.has(startupId);
}

export function toggleInterested(startupId: string): boolean {
  if (interestedIds.has(startupId)) {
    interestedIds.delete(startupId);
  } else {
    interestedIds.add(startupId);
  }
  emit();
  return interestedIds.has(startupId);
}

export function isSaved(startupId: string): boolean {
  return savedIds.has(startupId);
}

export function toggleSaved(startupId: string): boolean {
  if (savedIds.has(startupId)) {
    savedIds.delete(startupId);
  } else {
    savedIds.add(startupId);
  }
  emit();
  return savedIds.has(startupId);
}

export function useInterested(startupId: string): boolean {
  return useSyncExternalStore(
    subscribe,
    () => isInterested(startupId),
    () => false,
  );
}

export function useSaved(startupId: string): boolean {
  return useSyncExternalStore(
    subscribe,
    () => isSaved(startupId),
    () => false,
  );
}
