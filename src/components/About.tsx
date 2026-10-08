import Link from "next/link"
import { profile } from "@/data/profile"
import Lanyard from "./Lanyard"
import "./about.css"

const experiences = [
  {
    title: "Freelance",
    role: "Grafik tasarımcı",
    date: "Mayıs 2024 — Bugün",
    text: "Markalar için sosyal medya görselleri, kampanya içerikleri ve arayüz tasarımları hazırlıyorum. Çalışmalarımı Photoshop, Figma ve Adobe araçlarıyla üretiyorum.",
    href: "/beta#projeler",
    link: "Çalışmalarımı gör"
  },
  {
    title: "Future Scope Uluslararası Film Festivali",
    role: "Video kurgu",
    date: "5–6 Aralık 2025",
    text: "Festival sırasında gelen ham görüntüleri düzenleyip sosyal medyada paylaşılacak kısa videolara dönüştürdüm. Etkinlik devam ederken içerikleri kısa sürede hazırlayıp teslim ettim."
  },
  {
    title: "Indoles",
    role: "Web ve mobil arayüz tasarımı",
    date: "Devam ediyor",
    text: "MBTI ve Enneagram testlerini, kişilik tipi açıklamalarını ve karakter rehberini bir araya getiren proje. Ana sayfa, test akışı ve sonuç ekranlarının web ve mobil görünümleri üzerinde çalışıyorum.",
    href: "/beta/projeler/indoles",
    link: "Projeyi incele"
  }
]

function ProfileLanyard() {
  return (
    <div className="bio-lanyard-wrap">
      <div className="bio-lanyard" aria-label="Sürüklenebilir Melih kimlik kartı">
        <Lanyard
          frontImage="/images/lanyard-portrait.webp"
          backImage="/images/lanyard-portrait.webp"
          imageFit="contain"
          strapImage={ undefined }
          cardColor="#fffdfa"
          finish="matte"
          cornerRadius={ 0.2 }
          size={ 0.62 }
          strapLength={ 0.13 }
          strapColor="#2a1b14"
          strapWidth={ 0.7 }
          metal="silver"
          gravity={ 0.9 }
          damping={ 0.58 }
          elasticity={ 0.48 }
          breeze={ 0.28 }
          flippable={ false }
          intro={ false }
          style={ undefined }
        />
      </div>
    </div>
  )
}

export default function About() {
  return (
    <article className="bio-page" aria-labelledby="bio-title">
      <ProfileLanyard />
      <section className="bio-introduction">
        <h1 id="bio-title">Merhaba, ben Melih.</h1>
        <p>Sosyal medya görselleri ve mobil arayüzler tasarlıyorum. İstanbul Gelişim Üniversitesi’nde Görsel İletişim Tasarımı öğrencisiyim. Öğrendiklerimi, Mayıs 2024’ten beri sürdürdüğüm freelance çalışmalarımda ve kendi projelerimde uyguluyorum.</p>
        <p>Markalar için kampanya içerikleri hazırlıyor, arayüzler tasarlıyor ve video kurgu yapıyorum. Bu sitede seçtiğim çalışmaların yanında, geliştirmeye devam ettiğim Indoles projesini de paylaşıyorum.</p>
      </section>

      <section className="bio-experience" aria-labelledby="bio-work-title">
        <h2 id="bio-work-title">Deneyimlerim</h2>
        <p className="bio-section-note">Çalıştığım işler ve projeler.</p>
        <div className="bio-rows">
          { experiences.map((experience) => (
            <details className="bio-row" key={ experience.title }>
              <summary>
                <span className="bio-row-name"><strong>{ experience.title }</strong><span>{ experience.role }</span></span>
                <span className="bio-row-date">{ experience.date }</span>
                <span className="bio-toggle" aria-hidden="true" />
              </summary>
              <div className="bio-row-content">
                <p>{ experience.text }</p>
                { experience.href ? <Link href={ experience.href }>{ experience.link } <span aria-hidden="true">↗</span></Link> : null }
              </div>
            </details>
          )) }
        </div>
      </section>

      <section className="bio-info bio-education" aria-labelledby="bio-education-title">
        <h2 id="bio-education-title">Eğitim</h2>
        <div className="bio-info-row"><div><h3>{ profile.school.name }</h3><p>{ profile.school.detail }</p></div><span>Devam ediyor</span></div>
      </section>
      <section className="bio-info bio-toolbox" aria-labelledby="bio-tools-title">
        <h2 id="bio-tools-title">Kullandığım araçlar</h2>
        <div className="bio-info-row"><div><h3>Tasarım ve üretim</h3><p>Figma, Photoshop, Illustrator (başlangıç), Final Cut Pro ve CapCut.</p></div></div>
      </section>
      <section className="bio-info bio-languages" aria-labelledby="bio-languages-title">
        <h2 id="bio-languages-title">Diller</h2>
        <div className="bio-language-list">
          <div className="bio-info-row"><div><h3>Türkçe</h3><p>Ana dil</p></div></div>
          <div className="bio-info-row"><div><h3>İngilizce</h3><p>A2+</p></div></div>
        </div>
      </section>
    </article>
  )
}
