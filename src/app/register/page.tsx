"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { useAppDispatch } from "@/store/hooks";
import { loginSuccess } from "@/store/slices/authSlice";
import { emailExists, registerMockUser } from "@/data/users";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => clearTimeout(redirectTimeoutRef.current);
  }, []);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!name.trim()) next.name = t.auth.errors.nameRequired;
    if (!email.trim()) next.email = t.auth.errors.emailRequired;
    else if (!EMAIL_RE.test(email)) next.email = t.auth.errors.emailInvalid;
    else if (emailExists(email)) next.email = t.auth.errors.emailTaken;
    if (!password) next.password = t.auth.errors.passwordRequired;
    else if (password.length < 6) next.password = t.auth.errors.passwordShort;
    if (confirmPassword !== password) next.confirmPassword = t.auth.errors.passwordMismatch;
    return next;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const user = registerMockUser(name.trim(), email.trim(), password);
      dispatch(loginSuccess({ id: user.id, name: user.name, email: user.email, role: user.role }));
      setSuccess(true);
      redirectTimeoutRef.current = setTimeout(() => router.push("/"), 1000);
    } catch {
      setErrors({ email: t.auth.errors.emailTaken });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center gap-3 px-4 text-center">
        <CheckCircle2 size={40} className="text-brand" />
        <p className="text-ink-100">{t.auth.registerSuccess}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-base-800">
          <UserPlus size={22} className="text-brand" />
        </div>
        <h1 className="font-display text-2xl font-extrabold text-ink-100">{t.auth.registerTitle}</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl2 border border-base-700 bg-base-900 p-6">
        <Input
          id="name"
          label={t.auth.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
        <Input
          id="confirmPassword"
          type="password"
          label={t.auth.confirmPassword}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <Button type="submit" disabled={submitting} className="mt-2">
          {t.auth.registerButton}
        </Button>

        <p className="text-center text-sm text-ink-300">
          {t.auth.haveAccount}{" "}
          <Link href="/login" className="text-brand hover:underline">
            {t.auth.goLogin}
          </Link>
        </p>
      </form>
    </div>
  );
}
