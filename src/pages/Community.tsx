import { useState } from 'react'
import { CheckCircle2, MessageSquare, Play, Send, ShieldCheck, Users } from 'lucide-react'
import { discordPerks, featuredClips, news } from '../data/community'

const threads = [
  { title: 'Best Iron Legion loadout after the recoil pass?', replies: 412, tag: 'Loadouts' },
  { title: 'Neon Drift: optimal drift-chain timing on Overpass', replies: 188, tag: 'Guides' },
  { title: 'Hollow Crown boss tier list (spoilers, obviously)', replies: 917, tag: 'Discussion' },
  { title: 'Looking for a Verdant Hollow co-op partner, EU evenings', replies: 63, tag: 'LFG' },
  { title: 'Starfall Odyssey ship builder spreadsheet, v3', replies: 245, tag: 'Tools' },
]

export default function Community() {
  const [handle, setHandle] = useState('')
  const [joined, setJoined] = useState(false)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aqua-400">Community</p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          The Nexus is 2.4 million players strong
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
          Squads, guides, clips, and theorycrafting. Whether you are chasing a world record or
          looking for people to play cozy co-op with, there is a channel for it.
        </p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="glass p-6">
          <h2 className="font-display text-xl font-bold">Join the Discord</h2>
          <p className="mt-2 text-sm text-slate-400">
            Free account, instant access to every public channel and tournament slot.
          </p>

          {joined ? (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              <p className="text-sm text-emerald-100">
                Welcome, <strong>{handle}</strong>! Check your inbox for the invite link. Your starter
                badge and Season 7 role are already applied.
              </p>
            </div>
          ) : (
            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault()
                if (handle.trim().length >= 3) setJoined(true)
              }}
            >
              <label className="flex-1">
                <span className="sr-only">Choose a handle</span>
                <input
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="Choose your handle…"
                  minLength={3}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-aqua-400/60 focus:outline-none focus:ring-2 focus:ring-aqua-400/25"
                />
              </label>
              <button type="submit" className="btn-primary">
                <Send className="h-4 w-4" />
                Create account
              </button>
            </form>
          )}

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {discordPerks.map((perk) => (
              <li key={perk} className="flex items-start gap-2.5 text-sm text-slate-300">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" />
                {perk}
              </li>
            ))}
          </ul>
        </section>

        <section className="glass p-6">
          <h2 className="font-display text-xl font-bold">Live community stats</h2>
          <dl className="mt-4 space-y-4">
            {[
              { label: 'Members online now', value: '18,402', icon: Users },
              { label: 'Active threads', value: '2,190', icon: MessageSquare },
              { label: 'Clips posted today', value: '764', icon: Play },
              { label: 'Squads formed this week', value: '3,318', icon: Users },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 text-aqua-300">
                  <stat.icon className="h-5 w-5" />
                </span>
                <div>
                  <dt className="text-xs text-slate-500">{stat.label}</dt>
                  <dd className="font-display text-lg font-bold text-white">{stat.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold">Featured clips</h2>
        <p className="mt-2 text-sm text-slate-400">The highest-rated plays from the last seven days.</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredClips.map((clip) => (
            <article key={clip.id} className="glass card-hover group overflow-hidden !p-0">
              <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-neon-600/25 via-void-800 to-aqua-500/20">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur transition group-hover:scale-110 group-hover:bg-white/20">
                  <Play className="h-5 w-5 translate-x-0.5 fill-white text-white" />
                </span>
                <span className="absolute bottom-2 right-2 rounded-md bg-void-950/80 px-2 py-0.5 text-[11px] text-slate-200">
                  {clip.duration}
                </span>
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 text-sm font-semibold text-white">{clip.title}</h3>
                <p className="mt-1.5 text-xs text-slate-400">
                  {clip.author} · {clip.game}
                </p>
                <p className="mt-1 text-xs text-slate-500">{clip.views} views</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl font-bold">Trending threads</h2>
          <ul className="glass mt-6 divide-y divide-white/5 overflow-hidden !p-0">
            {threads.map((thread, i) => (
              <li key={thread.title}>
                <button
                  type="button"
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-white/[0.04]"
                >
                  <span className="font-display text-sm font-bold text-slate-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-white">{thread.title}</span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      {thread.replies} replies · #{thread.tag.toLowerCase()}
                    </span>
                  </span>
                  <MessageSquare className="h-4 w-4 shrink-0 text-slate-600" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold">Latest news</h2>
          <ul className="mt-6 space-y-4">
            {news.map((post) => (
              <li key={post.id} className="glass card-hover flex flex-wrap items-center justify-between gap-3 p-5">
                <div className="min-w-0">
                  <span className="chip !px-2.5 !py-0.5 !text-[11px] text-aqua-300">{post.category}</span>
                  <h3 className="mt-2 text-sm font-semibold text-white">{post.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {post.date} · {post.readTime} read
                  </p>
                </div>
                <span className="text-xs font-semibold text-aqua-400">Read →</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="glass mt-14 flex flex-wrap items-center justify-between gap-6 p-8">
        <div>
          <h2 className="font-display text-xl font-bold">Creator program applications are open</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Stream on Nexus, get revenue share on clip embeds, and unlock early access builds for
            your community. Applications close at the end of the season.
          </p>
        </div>
        <button type="button" className="btn-ghost">
          Apply as creator
        </button>
      </section>
    </div>
  )
}
