import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DEMO_ADMIN } from "@/lib/leads";
import logo from "@/assets/alineu-logo.jpg.asset.json";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | AlineU Lead Manager" },
      { name: "description", content: "Secure sign-in for the AlineU appointment lead manager." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin Login | AlineU Lead Manager" },
      { property: "og:description", content: "Secure sign-in for the AlineU appointment lead manager." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(DEMO_ADMIN.email);
  const [password, setPassword] = useState(DEMO_ADMIN.password);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (active && data.user) navigate({ to: "/admin", replace: true });
    });
    return () => {
      active = false;
    };
  }, [navigate]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError("Incorrect email or password.");
      return;
    }
    navigate({ to: "/admin", replace: true });
  }

  const fieldClass =
    "mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2.5">
          <img src={logo.url} alt="AlineU logo" className="h-10 w-10 rounded-xl object-contain" />
          <span className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground">
            AlineU Admin
          </span>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-6 rounded-3xl border border-border bg-card p-7 shadow-[0_30px_60px_-40px_rgba(31,46,23,0.7)]"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Lock className="h-3.5 w-3.5" />
            Lead manager access
          </div>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground">
            Sign in
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Manage appointment leads from the clinic website.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Sign in
          </button>

          <div className="mt-6 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4 text-sm">
            <p className="font-semibold text-primary">Demo access</p>
            <p className="mt-1 text-muted-foreground">
              Email: <span className="font-medium text-foreground">{DEMO_ADMIN.email}</span>
              <br />
              Password: <span className="font-medium text-foreground">{DEMO_ADMIN.password}</span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Pre-filled above — just press Sign in.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}