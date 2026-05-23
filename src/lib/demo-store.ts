import { useSyncExternalStore } from "react";

export const DEMO_INVESTOR_NAME = "Alex Morgan";
export const DEMO_FOUNDER_NAME = "Daniel";
export const DEMO_STARTUP_ID = "clearspace";
export const DEMO_STARTUP_NAME = "Apten";
export const DEMO_ASK_MESSAGE = "I love this! Up for a coffee chat?";
export const DEMO_PITCH_YOUTUBE_URL = "https://www.youtube.com/watch?v=VYM-lvMI5QY";
export const DEMO_PITCH_VIDEO_ID = "VYM-lvMI5QY";

export type DemoInvestorMessage = {
  startupId: string;
  startupName: string;
  founderName: string;
  text: string;
  sentAt: string;
};

export type DemoPitchSubmission = {
  company: string;
  youtubeVideoId: string;
  youtubeUrl: string;
  processedAt: string;
};

export type DemoFounderToInvestorMessage = {
  text: string;
  sentAt: string;
};

export type DemoStoreSnapshot = {
  investorMessage: DemoInvestorMessage | null;
  pitchSubmission: DemoPitchSubmission | null;
  founderToInvestorMessage: DemoFounderToInvestorMessage | null;
  founderReply: string | null;
};

type Listener = () => void;
const listeners = new Set<Listener>();

let investorMessage: DemoInvestorMessage | null = null;
let pitchSubmission: DemoPitchSubmission | null = null;
let founderToInvestorMessage: DemoFounderToInvestorMessage | null = null;
let founderReply: string | null = null;

const EMPTY_SNAPSHOT: DemoStoreSnapshot = {
  investorMessage: null,
  pitchSubmission: null,
  founderToInvestorMessage: null,
  founderReply: null,
};

let clientSnapshot: DemoStoreSnapshot = EMPTY_SNAPSHOT;

function buildSnapshot(): DemoStoreSnapshot {
  return {
    investorMessage,
    pitchSubmission,
    founderToInvestorMessage,
    founderReply,
  };
}

function refreshSnapshot() {
  clientSnapshot = buildSnapshot();
}

function emit() {
  refreshSnapshot();
  listeners.forEach((l) => l());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): DemoStoreSnapshot {
  return clientSnapshot;
}

export function getInvestorMessage(): DemoInvestorMessage | null {
  return investorMessage;
}

export function sendInvestorMessage(
  startupId: string,
  startupName: string,
  founderName: string,
  text: string,
): void {
  investorMessage = {
    startupId,
    startupName,
    founderName,
    text: text.trim(),
    sentAt: new Date().toISOString(),
  };
  emit();
}

export function getPitchSubmission(): DemoPitchSubmission | null {
  return pitchSubmission;
}

export function submitFounderPitch(company: string, youtubeUrl: string, youtubeVideoId: string): void {
  pitchSubmission = {
    company,
    youtubeUrl,
    youtubeVideoId,
    processedAt: new Date().toISOString(),
  };
  emit();
}

export function getFounderReply(): string | null {
  return founderReply;
}

export function getFounderToInvestorMessage(): DemoFounderToInvestorMessage | null {
  return founderToInvestorMessage;
}

export function sendFounderToInvestorMessage(text: string): void {
  founderToInvestorMessage = {
    text: text.trim(),
    sentAt: new Date().toISOString(),
  };
  emit();
}

export function sendFounderReply(text: string): void {
  founderReply = text.trim();
  emit();
}

export function useDemoStore(): DemoStoreSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_SNAPSHOT);
}

export function extractYouTubeVideoId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}
