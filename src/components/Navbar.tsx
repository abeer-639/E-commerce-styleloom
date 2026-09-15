"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ShoppingCart, Package, Languages, User, LayoutDashboard, type LucideIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { useAppDispatch, useAppSelector, useIsAdmin } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { ThemeToggleButton } from "./ThemeToggle";
import { Badge } from "@/components/ui/Badge";

interface NavLinkItem {
  href: string;
  label: string;
  icon: LucideIcon | null;
  count: number;
}

function isActiveLink(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClass(active: boolean) {
  return [
    "flex items-center gap-2 rounded-[12px] px-[24px] py-[14px] text-[16px] whitespace-nowrap transition-colors transition-transform duration-200 hover:-translate-y-0.5",
    active
      ? "bg-[#ae9b84] text-base-900"
      : "border border-dashed border-base-700 text-ink-500 hover:text-ink-100",
  ].join(" ");
}

function NavLinks({
  links,
  pathname,
  onNavigate,
  fullWidth = false,
}: {
  links: NavLinkItem[];
  pathname: string;
  onNavigate?: () => void;
  fullWidth?: boolean;
}) {
  return (
    <>
      {links.map((link) => {
        const Icon = link.icon;
        const active = isActiveLink(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={navLinkClass(active) + (fullWidth ? " w-full justify-center" : "")}
          >
            {Icon && <Icon size={16} />}
            {link.label}
            {link.count > 0 && <Badge tone="neutral">{link.count}</Badge>}
          </Link>
        );
      })}
    </>
  );
}

export function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, currentUser } = useAppSelector((s) => s.auth);
  const cartCount = useAppSelector((s) => s.cart.items.reduce((sum, i) => sum + i.quantity, 0));
  const isAdmin = useIsAdmin();

  const links: NavLinkItem[] = [
    { href: "/products", label: t.nav.products, icon: null, count: 0 },
    isAdmin
      ? { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard, count: 0 }
      : { href: "/cart", label: t.nav.cart, icon: ShoppingCart, count: cartCount },
    { href: "/orders", label: t.nav.orders, icon: Package, count: 0 },
  ];

  const toggleLocale = () => setLocale(locale === "ar" ? "en" : "ar");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    router.push("/");
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b border-dashed border-base-700 transition-all duration-300 ${
        scrolled ? "bg-base-950/90 backdrop-blur-md shadow-md shadow-black/10" : "bg-base-950/95 backdrop-blur"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 lg:grid lg:grid-cols-[1fr_auto_1fr] ${
          scrolled ? "py-[10px] lg:py-[14px]" : "py-[18px] lg:py-[30px]"
        }`}
      >
        <nav className="hidden items-center gap-[14px] lg:flex">
          <NavLinks links={links} pathname={pathname} />
        </nav>

        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-xl font-medium text-ink-100 lg:justify-self-center transition-all duration-200 hover:-translate-y-0.5 hover:text-2xl hover:text-[#ae9b84]"
        >
          {t.nav.brand}
        </Link>

        <div className="hidden items-center gap-[14px] lg:flex lg:justify-end">
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t.common.languageToggle}
            className="flex h-9 w-9 items-center justify-center rounded-xl2 border border-base-600 text-ink-100 transition-colors hover:bg-base-800
            inline-flex items-center justify-center gap-2 rounded-xl2 font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-base-950"
          >
            <Languages size={20} />
          </button>
          <ThemeToggleButton />
          {isAuthenticated ? (
            <div className="flex items-center gap-[14px]">
              <span className="flex items-center gap-1 text-[14px] text-ink-500">
                <User size={16} /> {currentUser?.name}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-[12px] border border-dashed border-base-700 px-[24px] py-[18px] text-[16px] text-ink-500 transition-colors hover:text-ink-100
                inline-flex items-center justify-center gap-2 rounded-xl2 font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-base-950"
              >
                {t.nav.logout}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-[10px] hover:-translate-y-0.5">
              <Link
                href="/login"
                className="rounded-[12px] border border-dashed border-base-700 px-[24px] py-[18px] text-[16px] text-ink-500 transition-colors hover:text-ink-100 transition-transform duration-200 hover:-translate-y-0.5 "
              >
                {t.nav.login}
              </Link>
              <Link
                href="/register"
                className="rounded-[12px] bg-[#ae9b84] px-[30px] py-[18px] text-[16px] font-medium text-[#0f0f0f] transition-colors hover:bg-[#b8a893] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {t.nav.register}
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-[10px] bg-[#ae9b84] p-[10px] text-[#0f0f0f] lg:hidden
          inline-flex items-center justify-center gap-2 rounded-xl2 font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-base-950"
          aria-label={t.common.menuToggle}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-dashed border-base-700 bg-base-950 px-4 pb-5 lg:hidden">
          <nav className="flex flex-col gap-[10px] pt-4">
            <NavLinks links={links} pathname={pathname} onNavigate={() => setOpen(false)} fullWidth />
          </nav>

          <div className="mt-4 flex items-center gap-[10px] border-t border-dashed border-base-700 pt-4">
            <button
              type="button"
              onClick={toggleLocale}
              className="flex flex-1 items-center justify-center gap-2 rounded-[12px] bg-base-800 px-[16px] py-[14px] text-[15px] text-ink-100
              inline-flex items-center justify-center gap-2 rounded-xl2 font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-base-950"
            >
              <Languages size={18} /> {t.common.languageToggle}
            </button>
            <ThemeToggleButton />
          </div>

          <div className="mt-4">
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <span className="flex items-center justify-center gap-1 text-[14px] text-ink-500">
                  <User size={16} /> {t.nav.hello} {currentUser?.name}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-[12px] border border-dashed border-base-700 px-[24px] py-[14px] text-[16px] text-ink-500
                  inline-flex items-center justify-center gap-2 rounded-xl2 font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-base-950"
                >
                  {t.nav.logout}
                </button>
              </div>
            ) : (
              <div className="flex gap-[10px]">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-[12px] border border-dashed border-base-700 px-[24px] py-[14px] text-center text-[16px] text-ink-500"
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-[12px] bg-[#ae9b84] px-[24px] py-[14px] text-center text-[16px] font-medium text-[#0f0f0f]"
                >
                  {t.nav.register}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}