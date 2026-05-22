/** Deterministic logo-style avatars for startups (DiceBear icons). */
export function startupLogoUrl(seed: string): string {
  return `https://api.dicebear.com/9.x/icons/png?seed=${encodeURIComponent(seed)}&size=128`;
}

/** Portrait photos for angel investors (randomuser.me). */
export function investorAvatarUrl(portraitId: number): string {
  const gender = portraitId % 2 === 0 ? "women" : "men";
  const index = (portraitId % 90) + 1;
  return `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;
}
