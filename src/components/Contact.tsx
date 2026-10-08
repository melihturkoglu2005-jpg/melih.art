import { profile } from "@/data/profile"
import CopyEmail from "./CopyEmail"
import { Doodle } from "./Doodles"

export default function Contact() {
  return (
    <section className="reach-out" id="iletisim" aria-labelledby="contact-title">
      <div className="reach-heading" data-reveal>
        <p className="label">İletişim</p>
        <h2 id="contact-title">Birlikte güzel<br /><span className="mark-wrap">işler çıkaralım.<Doodle name="underline" className="mark" stretch /></span></h2>
        <p className="reach-description">Aklındaki projeyi, ekibindeki fırsatı ya da sadece bir merhabayı duymak isterim.</p>
      </div>
      <div className="reach-details" data-reveal>
        <Doodle name="plane" className="reach-plane" width="5rem" />
        <span className="reach-note">Bir mesaj kadar yakınım.</span>
        <a className="reach-email" href={ `mailto:${ profile.email }` }>
          <span>{ profile.email }</span><span aria-hidden="true">↗</span>
        </a>
        <div className="reach-actions">
          <a className="btn btn-dark" href={ `mailto:${ profile.email }` }>E-posta gönder <span aria-hidden="true">↗</span></a>
          <CopyEmail email={ profile.email } />
        </div>
      </div>
    </section>
  )
}
