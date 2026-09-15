"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/authSlice";
import { findUserByCredentials } from "@/data/users";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!email.trim()) next.email = t.auth.errors.emailRequired;
    if (!password) next.password = t.auth.errors.passwordRequired;
    return next;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setSubmitting(true);
    try {

      await new Promise((resolve) => setTimeout(resolve, 400));
      const user = findUserByCredentials(email, password);
      if (!user) {
        setErrors({ form: t.auth.errors.invalidCredentials });
        return;
      }
      dispatch(
        loginSuccess({ id: user.id, name: user.name, email: user.email, role: user.role })
      );
      router.push("/");
    } catch {
      setErrors({ form: t.auth.errors.invalidCredentials });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-base-800">
          <LogIn size={22} className="text-brand" />
        </div>
        <h1 className="font-display text-2xl font-extrabold text-ink-100">{t.auth.loginTitle}</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl2 border border-base-700 bg-base-900 p-6">
        <Input
          id="email"
          type="email"
          label={t.auth.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />
        <Input
          id="password"
          type="password"
          label={t.auth.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="current-password"
        />
        {errors.form && <p className="text-sm text-accent-coral">{errors.form}</p>}

        <Button type="submit" disabled={submitting} className="my-2">
          {t.auth.loginButton}
        </Button>

        {/* <p className="text-center text-xs text-ink-500">{t.auth.demoHint}</p> */}

        <p className="text-center text-sm text-ink-300">
          {t.auth.noAccount}{" "}
          <Link href="/register" className="text-brand hover:underline">
            {t.auth.goRegister}
          </Link>
        </p>
      </form>
    </div>
  );
}
