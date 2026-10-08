import { profile } from "@/data/profile"

export default function Contact() {
  return (
    <footer className="connect-footer" id="iletisim" aria-labelledby="contact-title">
      <div className="connect-card" data-reveal>
        <div className="connect-intro">
          <h2 id="contact-title">Fikirlerini yaratıcı tasarım çözümleriyle hayata geçirmeye hazır mısın?</h2>
          <p>Birlikte harika bir şey üretelim <span aria-hidden="true">✦</span></p>
          <a className="connect-button" href={ `mailto:${ profile.email }` }>
            İletişime geç
          </a>
        </div>

        <div className="connect-meta">
          <div>
            <span className="connect-label">İletişim</span>
            <a className="connect-email" href={ `mailto:${ profile.email }` }>{ profile.email }</a>
          </div>
          <div>
            <span className="connect-label">Takip et</span>
            <nav className="connect-social" aria-label="Sosyal medya">
              { profile.social.map((item) => (
                <a key={ item.label } href={ item.href } target="_blank" rel="noopener noreferrer" aria-label={ item.label }>
                  { item.label === "LinkedIn" ? "in" : "Bē" }
                </a>
              )) }
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
