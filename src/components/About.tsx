import Lanyard from "./Lanyard"
import "./about.css"

const skillGroups = [
  {
    title: "Tasarım Araçları",
    skills: [ "Photoshop", "Illustrator", "Premiere Pro", "Final Cut Pro", "After Effects", "Figma" ]
  },
  {
    title: "Yapay zekâ",
    skills: [ "ChatGPT", "Claude", "Gemini" ]
  },
  {
    title: "Yetkinlikler",
    skills: [ "Sosyal medya tasarımı", "UI/UX tasarımı", "Video kurgu", "Marka kimliği", "Prototipleme", "Yapay zekâ destekli üretim" ]
  }
]

const career = [
  { date: "Mayıs 2024 — Devam ediyor", title: "Freelance grafik tasarımcı" },
  { date: "5–6 Aralık 2025", title: "Future Scope Film Festivali · Video kurgu" }
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
          strapColor="#000000"
          strapWidth={ 0.7 }
          metal="silver"
          gravity={ 0.9 }
          damping={ 0.58 }
          elasticity={ 0.48 }
          breeze={ 0.28 }
          freeDrag
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

      <section className="bio-skills" aria-labelledby="bio-skills-title">
        <h2 id="bio-skills-title">Beni genellikle bunların bir kombinasyonunu yaparken bulursun.</h2>
        <div className="skill-deck">
          { skillGroups.map((group, index) => (
            <article className={ `skill-card skill-card-${ index + 1 }` } key={ group.title }>
              <h3>{ group.title }</h3>
              <ul>
                { group.skills.map((skill) => <li key={ skill }>{ skill }</li>) }
              </ul>
            </article>
          )) }
        </div>
      </section>

      <section className="career-journey" aria-labelledby="career-title">
        <h2 id="career-title">Şimdiye kadarki profesyonel yolculuğum</h2>
        <div className="career-timeline">
          { career.map((item, index) => (
            <article className={ index % 2 === 0 ? "career-item career-right" : "career-item career-left" } key={ item.title }>
              <span className="career-dot" aria-hidden="true" />
              <div>
                <p>{ item.date }</p>
                <h3>{ item.title }</h3>
              </div>
            </article>
          )) }
        </div>
      </section>

    </article>
  )
}
