export type GuestStatus = "invited" | "yes" | "no";

export type Guest = {
  id: string;
  name: string;
  guests: number;
  status: GuestStatus;
  message?: string;
  updatedAt: number;
};

const KEY = "matric-dance-guest-list";

export const SITE_URL = "https://golden-trio-invites.lovable.app";
export const RSVP_WHATSAPP = "27764969438";

export function loadGuests(): Guest[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Guest[]) : [];
  } catch {
    return [];
  }
}

export function saveGuests(list: Guest[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

export function upsertGuest(entry: Omit<Guest, "id" | "updatedAt">): Guest[] {
  const list = loadGuests();
  const key = entry.name.trim().toLowerCase();
  const idx = list.findIndex((g) => g.name.trim().toLowerCase() === key);
  const next: Guest = {
    id: idx >= 0 ? list[idx].id : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    updatedAt: Date.now(),
    ...entry,
  };
  const out = idx >= 0 ? list.map((g, i) => (i === idx ? next : g)) : [...list, next];
  saveGuests(out);
  return out;
}
