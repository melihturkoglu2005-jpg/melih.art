import Link from "next/link";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="portfolio-footer">
      <div className="footer-topline">
        <div className="footer-identity">
          <Link
            className="footer-logo"
            href="/beta"
            aria-label={`${profile.name}, ana sayfa`}
          >
            melih<span aria-hidden="true">.</span>
          </Link>
          <span className="footer-availability">
            <span className="dot" aria-hidden="true" />
            İşe alıma uygun
          </span>
        </div>
        <p className="footer-note">
          İyi tasarım,
          <br />
          güzel bir sohbetle başlar.
        </p>
        <a className="footer-contact" href={`mailto:${profile.email}`}>
          Birlikte çalışalım <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <nav className="footer-links" aria-label="Alt menü">
          <Link href="/beta#projeler">Projelerim</Link>
          <Link href="/beta/hakkimda">Hakkımda</Link>
          {profile.social.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <a className="footer-top" href="#top">
          Yukarı dön <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
