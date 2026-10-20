import { useCallback, useEffect, useState } from "react";

interface Props {
  links: Array<{ label: string; href: string }>;
}

/** History state flag marking the pushed "menu open" entry. */
const MENU_FLAG = "jmgaMenuOpen";

function menuEntryPresent(): boolean {
  return typeof history !== "undefined" && history.state != null && (history.state as Record<string, unknown>)[MENU_FLAG] === true;
}

/**
 * Mobile navigation island: hamburger button + full-screen overlay.
 * - Opening pushes a history entry, so Android/iOS "back" closes the menu
 *   instead of leaving the site (and "forward" re-opens it).
 * - Overlay links close the menu; the global hash-navigation script handles
 *   history and scrolling (see Layout.astro).
 * - The toggle button keeps z-index above the overlay at all times.
 */
export default function MobileMenu({ links }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      const st = event.state as Record<string, unknown> | null;
      setOpen(st != null && st[MENU_FLAG] === true);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const openMenu = useCallback(() => {
    setOpen(true);
    if (!menuEntryPresent()) history.pushState({ [MENU_FLAG]: true }, "");
  }, []);

  /** Close rolled through history when a menu entry exists (pops it). */
  const closeMenu = useCallback(() => {
    setOpen(false);
    if (menuEntryPresent()) history.back();
  }, []);

  const handleLinkClick = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) closeMenu();
    },
    [closeMenu]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeMenu]);

  return (
    <>
      <button
        type="button"
        className="mobile-menu-btn"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mobile-menu-overlay"
        onClick={open ? closeMenu : openMenu}
      >
        <span className="mobile-menu-icon" aria-hidden="true">
          {open ? "✕" : "☰"}
        </span>
      </button>

      <div
        id="mobile-menu-overlay"
        className={`mobile-menu-overlay${open ? " open" : ""}`}
        hidden={!open}
        onClick={handleOverlayClick}
      >
        <nav aria-label="Navegación móvil">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={handleLinkClick}>
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
