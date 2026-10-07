import Link from "next/link";
import { profile } from "@/data/profile";
import { Doodle } from "./Doodles";
import "./about.css";

const experiences = [
  {
    title: "Freelance",
    role: "Grafik tasarımcı",
    date: "Mayıs 2024 — Bugün",
    text: "Markalar için sosyal medya görselleri, kampanya içerikleri ve arayüz tasarımları hazırlıyorum. Çalışmalarımı Photoshop, Figma ve Adobe araçlarıyla üretiyorum.",
    href: "/#projeler",
    link: "Çalışmalarımı gör",
  },
  {
    title: "Future Scope Uluslararası Film Festivali",
    role: "Video kurgu",
    date: "5–6 Aralık 2025",
    text: "Festival sırasında gelen ham görüntüleri düzenleyip sosyal medyada paylaşılacak kısa videolara dönüştürdüm. Etkinlik devam ederken içerikleri kısa sürede hazırlayıp teslim ettim.",
  },
  {
    title: "Indoles",
    role: "Web ve mobil arayüz tasarımı",
    date: "Devam ediyor",
    text: "MBTI ve Enneagram testlerini, kişilik tipi açıklamalarını ve karakter rehberini bir araya getiren proje. Ana sayfa, test akışı ve sonuç ekranlarının web ve mobil görünümleri üzerinde çalışıyorum.",
    href: "/projeler/indoles",
    link: "Projeyi incele",
  },
];

function Portrait() {
  return (
    <div className="bio-portrait" aria-hidden="true">
      <img src={profile.avatar} alt="" width={240} height={240} />
      <svg className="bio-portrait-ink" viewBox="0 0 480 380" fill="none">
        <g
          stroke="var(--ink)"
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M129 104C133 59 189 39 229 53M222 44L233 53L222 62" />
          <path d="M92 149L50 239L50 261L69 246L111 159Z" fill="#f3d88a" />
          <path d="M52 239L68 246M93 150L110 158M62 236L99 163" />
          <path
            d="M327 85L330 104L348 111L329 116L322 134L319 115L300 107L319 102Z"
            fill="#c4d76a"
          />
          <path
            d="M332 263C354 234 374 248 352 276C390 258 408 275 375 291C412 286 415 307 378 313L325 317"
            fill="#a8cdf0"
          />
          <path d="M127 300Q158 315 194 310M148 323Q172 333 192 327" />
          <path d="M104 95L109 84M119 99L128 93" />
          <path d="M376 172C389 157 402 174 389 184C409 182 410 200 395 203" />
        </g>
      </svg>
      <Doodle name="star" className="bio-portrait-star" width="3.6rem" />
      <Doodle name="cursor" className="bio-portrait-cursor" width="3.4rem" />
    </div>
  );
}

export default function About() {
  return (
    <article className="bio-page" aria-labelledby="bio-title">
      <Portrait />
      <section className="bio-introduction">
        <h1 id="bio-title">Merhaba, ben Melih.</h1>
        <p>
          Sosyal medya görselleri ve mobil arayüzler tasarlıyorum. İstanbul
          Gelişim Üniversitesi’nde Görsel İletişim Tasarımı öğrencisiyim.
          Öğrendiklerimi, Mayıs 2024’ten beri sürdürdüğüm freelance
          çalışmalarımda ve kendi projelerimde uyguluyorum.
        </p>
        <p>
          Markalar için kampanya içerikleri hazırlıyor, arayüzler tasarlıyor ve
          video kurgu yapıyorum. Bu sitede seçtiğim çalışmaların yanında,
          geliştirmeye devam ettiğim Indoles projesini de paylaşıyorum.
        </p>
      </section>

      <section className="bio-experience" aria-labelledby="bio-work-title">
        <h2 id="bio-work-title">Deneyimlerim</h2>
        <p className="bio-section-note">Çalıştığım işler ve projeler.</p>
        <div className="bio-rows">
          {experiences.map((experience) => (
            <details className="bio-row" key={experience.title}>
              <summary>
                <span className="bio-row-name">
                  <strong>{experience.title}</strong>
                  <span>{experience.role}</span>
                </span>
                <span className="bio-row-date">{experience.date}</span>
                <span className="bio-toggle" aria-hidden="true" />
              </summary>
              <div className="bio-row-content">
                <p>{experience.text}</p>
                {experience.href ? (
                  <Link href={experience.href}>
                    {experience.link} <span aria-hidden="true">↗</span>
                  </Link>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="bio-education" aria-labelledby="bio-education-title">
        <h2 id="bio-education-title">Eğitim</h2>
        <div className="bio-education-row">
          <div>
            <h3>{profile.school.name}</h3>
            <p>{profile.school.detail}</p>
          </div>
          <span>Devam ediyor</span>
        </div>
      </section>
      <section className="bio-toolbox" aria-labelledby="bio-tools-title">
        <h2 id="bio-tools-title">Kullandığım araçlar</h2>
        <p>
          Figma, Photoshop, Illustrator (başlangıç), Final Cut Pro ve CapCut.
        </p>
        <p className="bio-language">Türkçe (ana dil) · İngilizce (A2+)</p>
      </section>
    </article>
  );
}
