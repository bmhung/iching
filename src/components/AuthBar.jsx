import { useState } from "react";
import { isSupabaseConfigured } from "../sync/supabase.js";
import { useSession, sendMagicLink, signOut } from "../sync/auth.js";

export default function AuthBar({ t }) {
  const { session, ready } = useSession();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  if (!isSupabaseConfigured) return null;
  if (!ready) return <div className="text-[11px] text-stone-400">…</div>;

  if (session?.user) {
    return (
      <div className="flex items-center gap-2 text-[11px] text-stone-600">
        <span className="hidden sm:inline truncate max-w-[160px]" title={session.user.email}>
          {session.user.email}
        </span>
        <button onClick={() => signOut()}
          className="px-2 py-0.5 rounded border border-stone-300 hover:border-rose-900 hover:text-rose-900 transition-colors">
          {t.auth.signOut}
        </button>
      </div>
    );
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="text-[11px] px-2 py-0.5 rounded border border-stone-300 hover:border-rose-900 hover:text-rose-900 text-stone-600 transition-colors">
        {t.auth.signIn}
      </button>
    );
  }

  async function submit(e) {
    e?.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const res = await sendMagicLink(email);
    if (res.ok) {
      setStatus("sent");
    } else {
      setStatus("error");
      setErrorMsg(res.reason === "invalid-email" ? t.auth.invalidEmail : (res.message || t.auth.genericError));
    }
  }

  return (
    <div className="flex items-center gap-2">
      {status === "sent" ? (
        <div className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 rounded px-2 py-1">
          {t.auth.sent}
        </div>
      ) : (
        <form onSubmit={submit} className="flex items-center gap-1">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder={t.auth.emailPh}
            disabled={status === "sending"}
            className="text-[11px] px-2 py-0.5 border border-stone-300 focus:border-rose-900 outline-none rounded bg-white w-44"
            autoFocus />
          <button type="submit" disabled={status === "sending"}
            className="text-[11px] px-2 py-0.5 rounded bg-stone-900 text-stone-50 hover:bg-rose-900 transition-colors disabled:opacity-60">
            {status === "sending" ? t.auth.sending : t.auth.send}
          </button>
          <button type="button" onClick={() => { setOpen(false); setStatus("idle"); setEmail(""); setErrorMsg(""); }}
            className="text-[11px] px-1.5 py-0.5 text-stone-500 hover:text-rose-900">
            ×
          </button>
        </form>
      )}
      {status === "error" && errorMsg && (
        <div className="text-[11px] text-rose-700">{errorMsg}</div>
      )}
    </div>
  );
}
