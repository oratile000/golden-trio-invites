import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  loadGuests,
  saveGuests,
  upsertGuest,
  RSVP_WHATSAPP,
  SITE_URL,
  type Guest,
  type GuestStatus,
} from "@/lib/guests";
import { GoldDivider } from "@/components/invite/GoldDivider";

export const Route = createFileRoute("/guests")({
  head: () => ({
    meta: [
      { title: "Guest List — Matric Dance 2026 | O³" },
      {
        name: "description",
        content:
          "Private guest list for the Matric Dance 2026 invitation: add names, track RSVPs and send invites over WhatsApp.",
      },
      { property: "og:title", content: "Guest List — Matric Dance 2026" },
      {
        property: "og:description",
        content: "Add names and track who has RSVP'd for the Matric Dance 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: GuestsPage,
});

const statusLabel: Record<GuestStatus, string> = {
  invited: "Awaiting",
  yes: "Attending",
  no: "Declined",
};

function GuestsPage() {
  const [list, setList] = useState<Guest[]>([]);
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");

  useEffect(() => {
    setList(loadGuests());
  }, []);

  const counts = useMemo(() => {
    const yes = list.filter((g) => g.status === "yes");
    return {
      total: list.length,
      yes: yes.length,
      seats: yes.reduce((n, g) => n + (g.guests || 1), 0),
      no: list.filter((g) => g.status === "no").length,
      pending: list.filter((g) => g.status === "invited").length,
    };
  }, [list]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return;
    setList(
      upsertGuest({
        name: name.trim(),
        guests: Number(guests) || 1,
        status: "invited",
      }),
    );
    setName("");
    setGuests("1");
  };

  const setStatus = (id: string, status: GuestStatus) => {
    const next = list.map((g) => (g.id === id ? { ...g, status, updatedAt: Date.now() } : g));
    setList(next);
    saveGuests(next);
  };

  const remove = (id: string) => {
    const next = list.filter((g) => g.id !== id);
    setList(next);
    saveGuests(next);
  };

  const inviteLink = (g: Guest) => {
    const text = encodeURIComponent(
      [
        `Dear ${g.name.split(" ")[0]},`,
        "",
        "You are invited to our Matric Dance — 23 September 2026.",
        "Open your invitation here:",
        SITE_URL,
        "",
        "Kindly RSVP on the invitation. — Oratile · Onthatile · Omphile",
      ].join("\n"),
    );
    return `https://wa.me/?text=${text}`;
  };

  const inputClass =
    "w-full bg-transparent border-b border-gold/40 focus:border-gold outline-none px-1 py-3 text-cream font-serif text-base transition-colors placeholder:text-gold-deep/60";

  return (
    <main className="relative min-h-screen bg-noir-radial text-cream px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p
          className="font-label uppercase text-gold-deep text-center"
          style={{ fontSize: "0.72rem", letterSpacing: "0.5em" }}
        >
          Private
        </p>
        <h1
          className="font-display italic text-gradient-gold mt-4 text-center"
          style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.15 }}
        >
          Guest List
        </h1>
        <GoldDivider className="my-8 mx-auto" width={120} />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            ["Invited", counts.total],
            ["Attending", counts.yes],
            ["Seats", counts.seats],
            ["Awaiting", counts.pending],
          ].map(([label, value]) => (
            <div key={String(label)} className="border border-gold/30 py-4 text-center">
              <p className="font-display text-gold" style={{ fontSize: "1.6rem" }}>
                {value}
              </p>
              <p
                className="font-label uppercase text-gold-deep mt-1"
                style={{ fontSize: "0.6rem", letterSpacing: "0.3em" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        <form onSubmit={add} className="flex flex-col sm:flex-row gap-4 sm:items-end mb-12">
          <div className="flex-1">
            <label
              className="font-label uppercase text-gold-deep block mb-2"
              style={{ fontSize: "0.65rem", letterSpacing: "0.35em" }}
            >
              Guest Name
            </label>
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 80))}
              placeholder="Add a name"
            />
          </div>
          <div className="sm:w-32">
            <label
              className="font-label uppercase text-gold-deep block mb-2"
              style={{ fontSize: "0.65rem", letterSpacing: "0.35em" }}
            >
              Seats
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className={inputClass + " appearance-none cursor-pointer"}
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n} className="bg-noir text-cream">
                  {n}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="px-8 py-3 border border-gold text-gold font-label uppercase tracking-[0.35em] text-xs transition-all duration-500 ease-luxury hover:bg-gold hover:text-noir"
          >
            Add
          </button>
        </form>

        {list.length === 0 ? (
          <p className="font-serif text-cream/70 text-center py-10">
            No guests yet. Add a name above, or RSVPs sent from the invitation will appear here.
          </p>
        ) : (
          <ul className="space-y-3">
            {list
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((g) => (
                <li
                  key={g.id}
                  className="border border-gold/25 p-4 flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <div className="flex-1">
                    <p className="font-display text-cream" style={{ fontSize: "1.15rem" }}>
                      {g.name}
                    </p>
                    <p
                      className="font-label uppercase text-gold-deep mt-1"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.3em" }}
                    >
                      {statusLabel[g.status]} · {g.guests} {g.guests === 1 ? "seat" : "seats"}
                    </p>
                    {g.message ? (
                      <p className="font-serif text-cream/70 text-sm mt-2 italic">“{g.message}”</p>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(["yes", "no", "invited"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStatus(g.id, s)}
                        className={
                          "px-3 py-2 border font-label uppercase tracking-[0.2em] text-[0.6rem] transition-all duration-300 " +
                          (g.status === s
                            ? "bg-gold text-noir border-gold"
                            : "border-gold/40 text-gold hover:bg-gold/10")
                        }
                      >
                        {statusLabel[s]}
                      </button>
                    ))}
                    <a
                      href={inviteLink(g)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 border border-gold/40 text-gold font-label uppercase tracking-[0.2em] text-[0.6rem] hover:bg-gold/10"
                    >
                      Invite
                    </a>
                    <button
                      type="button"
                      onClick={() => remove(g.id)}
                      className="px-3 py-2 border border-gold/20 text-gold-deep font-label uppercase tracking-[0.2em] text-[0.6rem] hover:border-gold/50"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}

        <div className="mt-14 text-center">
          <p className="font-serif text-cream/60 text-sm">
            RSVPs are confirmed on WhatsApp at +27 76 496 9438.
          </p>
          <Link
            to="/"
            className="inline-block mt-6 font-label uppercase tracking-[0.35em] text-xs text-gold border-b border-gold/40 pb-1"
          >
            Back to the invitation
          </Link>
          <p className="sr-only">{RSVP_WHATSAPP}</p>
        </div>
      </div>
    </main>
  );
}
