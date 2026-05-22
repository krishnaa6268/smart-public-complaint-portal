import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 text-slate-950 dark:text-slate-100">
      <div className="relative max-w-3xl w-full rounded-[2rem] border border-slate-200 bg-white/90 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/90">
        <div className="absolute -right-10 top-8 h-24 w-24 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -left-10 bottom-8 h-28 w-28 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative z-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-sky-700 dark:text-sky-300">
            Page not found
          </p>
          <h1 className="mt-6 text-6xl font-semibold tracking-tight sm:text-7xl">
            404
          </h1>
          <p className="mt-6 mx-auto max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Oops, the page you are looking for does not exist. It may have moved
            or been removed, but you can still return to the complaint portal.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Go to home
            </Link>
            <Link
              href="/track"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Track complaint
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
