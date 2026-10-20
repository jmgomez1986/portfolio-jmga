import { useEffect, useState } from "react";

interface Props {
  links: Array<{ label: string; href: string }>;
}

/**
 * Mobile navigation island: hamburger button + full-screen overlay.
 * Desktop navigation is rendered in Nav.astro (pure HTML/CSS).
 */
export default function MobileMenu({ links }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="mobile-menu-btn"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mobile-menu-overlay"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="mobile-menu-icon" aria-hidden="true">
          {open ? "✕" : "☰"}
        </span>
      </button>

      <div
        id="mobile-menu-overlay"
        className={`mobile-menu-overlay${open ? " open" : ""}`}
        hidden={!open}
      >
        <nav aria-label="Navegación móvil">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
