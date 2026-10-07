import type { Project } from "./types"

const img = (name: string, alt: string, ratio = "16 / 10") => ({ src: `/images/projects/indoles/${ name }.webp`, alt, ratio })
const phone = (name: string, caption: string) => ({ image: img(name, `Indoles mobil görünümü: ${ caption }`, "390 / 844"), device: "phone" as const, caption })
const desktop = (name: string, caption: string, ratio = "16 / 10") => ({ image: img(name, `Indoles masaüstü görünümü: ${ caption }`, ratio), device: "browser" as const, caption })

export const indoles: Project = {
  slug: "indoles",
  title: "Indoles",
  headline: "Kendini tanımaya küçük bir ara.",
  cardTitle: "Indoles — Kendini tanımaya bir başlangıç.",
  summary: "Bazen kendimizle ilgili bir sorunun peşine düşeriz: Nasıl karar veriyorum? Beni ne harekete geçiriyor? Indoles, bu merakı MBTI ve Enneagram testleriyle başlayan, kişilik tipleri ve karakter rehberiyle devam eden bir keşfe dönüştürüyor.",
  kicker: "Indoles · Masaüstü ve mobil arayüz tasarımı",
  mark: "I",
  name: "Indoles",
  tags: [ "Devam eden proje" ],
  meta: "MBTI · Enneagram · Karakter rehberi",
  role: "Arayüz tasarımı",
  tools: [ "React Native", "Expo", "React Native Web" ],
  cover: img("cover", "Indoles ana sayfası: doğa manzarası üzerinde kişilik keşfine davet"),
  tint: "#e7ecdf",
  sections: [
    {
      id: "genel-bakis", nav: "Genel Bakış",
      blocks: [
        { type: "intro", label: "FİKİR", title: "Bir testten daha fazlası, meraka yer açan bir başlangıç.", paragraphs: [
          "Indoles’te iki farklı kişilik yaklaşımı aynı yerde buluşuyor. MBTI, bilgiyi işleme ve karar verme biçimlerine odaklanırken Enneagram, davranışların arkasındaki motivasyonları ele alıyor. Kullanıcı istediği testle başlayabiliyor; dilerse ikisini de tamamlayıp sonuçlarını aynı sayfada görebiliyor.",
          "Bu projede ana sayfanın davetkâr havasıyla testin ihtiyaç duyduğu sakinliği bir arada tutmaya çalıştım. Doğa manzarası ve büyük başlıklarla başlayan deneyim, sorulara geçildiğinde sadeleşiyor. Kişilik tipleri, karakter rehberi ve kaynaklar ise sonuçtan sonra keşfetmeye devam etmek isteyenlere eşlik ediyor."
        ] },
        { type: "showcase", tone: "sage", label: "BÜTÜNÜYLE INDOLES", title: "Başla, düşün, kendinle ilgili yeni bir şey fark et.", text: "Telefonda da aynı keşif hissi korunuyor. Ana sayfa başlangıcı sunuyor, soru ekranı dikkati tek bir noktada topluyor, sonuç sayfası ise yanıtları okunabilir bir anlatı hâline getiriyor.", screens: [ phone("mobile-home", "Keşfe davet"), phone("mobile-question", "Tek soruya odaklanma"), phone("mobile-result", "Sonucu anlamlandırma") ] }
      ]
    },
    {
      id: "yaklasim", nav: "Tasarım Yaklaşımı",
      blocks: [
        { type: "intro", label: "TASARIM SORUSU", title: "Çok sayıda soruyu, takip etmesi kolay bir deneyime nasıl dönüştürürüz?", paragraphs: [
          "50 soruluk MBTI ve 45 soruluk Enneagram testlerinde yalnızca soruların okunması yeterli değil. Kullanıcının neye başladığını, nerede olduğunu ve bir sonraki adımda ne yapacağını da anlaması gerekiyor. Sayfaların düzenini bu üç ihtiyacın çevresinde ele aldım.",
          "İki testin farkını başlangıçta açıklamak, ilerlemeyi görünür tutmak ve önceki yanıtlara dönebilmeyi sağlamak bu yaklaşımın temel parçaları. Böylece arayüz, kullanıcıdan hızlı cevap vermesini beklemek yerine kendi ritminde ilerlemesine alan açıyor."
        ] },
        { type: "journey", label: "DENEYİMİN ÜÇ ADIMI", title: "Her aşamada bir sonraki adım belli.", items: [
          { title: "Neye başladığını bil", text: "Testler sayfasında MBTI ve Enneagram’ın neyi ele aldığı, kaç soru içerdiği ve sonuçta hangi bilgilerin sunulduğu açıklanıyor." },
          { title: "Kendi hızında ilerle", text: "Önceki soruya dönülebiliyor. Yanıt seçince otomatik geçiş yapmak isteyenler bu tercihi kendileri açabiliyor." },
          { title: "Merakını takip et", text: "Sonuçtan diğer teste ya da aynı kişilik tipiyle ilişkilendirilen isimlere geçilebiliyor. Deneyim, bir tip koduyla sona ermiyor." }
        ] },
        { type: "showcase", tone: "peach", label: "BAŞLANGIÇ", title: "İki test, iki ayrı bakış açısı.", text: "Masaüstünde yan yana duran test açıklamaları telefonda alt alta geliyor. Başlık, kısa açıklama, soru sayısı ve başlama düğmesi her iki görünümde de aynı sırayı koruyor. Üyelik adımı olmadan teste geçilebiliyor.", screens: [ desktop("tests", "İki yaklaşımı yan yana tanıma"), phone("mobile-tests", "Mobilde rahat okunan tek sütun") ] }
      ]
    },
    {
      id: "test-deneyimi", nav: "Test Deneyimi",
      blocks: [
        { type: "intro", label: "SORU AKIŞI", title: "Ekranda tek bir soru, karar vermek için yeterince alan.", paragraphs: [
          "Test ekranında sorunun kendisi en güçlü öğe. Beş yanıt seçeneği, katılmama ve katılma uçları arasında sıralanıyor. Seçilen yanıtın metni de ölçeğin altında beliriyor; seçim yalnızca renkle anlatılmıyor.",
          "Üstteki sayaç ve ilerleme çizgisi, testin neresinde olunduğunu gösteriyor. Geniş ekranlarda bunlara cevaplanan soruları ve yaklaşık kalan süreyi gösteren bir yan panel eşlik ediyor. Soru haritasından belirli bir soruya geri dönmek de mümkün."
        ] },
        { type: "showcase", tone: "blue", label: "MASAÜSTÜNDEN TELEFONA", title: "Aynı akış, ekranın ihtiyacına göre farklı bir düzen.", text: "Telefonda yan panel kaldırılıyor; soru, yanıtlar ve ilerleme bilgisi tek sütunda kalıyor. Başlık boyutları ve boşluklar dar ekrana göre ayarlanıyor. Bu sayede masaüstündeki bütün bilgileri küçük bir alana sıkıştırmak yerine, o anda gerekenler öne çıkıyor.", screens: [ desktop("question", "Soru haritası ve durum paneli"), phone("mobile-question", "Mobilde soruya ayrılan alan") ] },
        { type: "split", title: "İlerlemenin kontrolü kullanıcıda.", text: "**Cevaba dokununca ilerle** seçeneği açıkken yanıtın ardından sonraki soruya geçiliyor. Kapalıyken kullanıcı seçimini yapıp Sonraki düğmesine basıyor. Önceki soruya dönebilmek, yanıtını yeniden düşünmek isteyenler için akışın bir parçası." }
      ]
    },
    {
      id: "sonuclar", nav: "Sonuçları Anlamak",
      blocks: [
        { type: "intro", label: "SONUÇ EKRANI", title: "Dört harfin arkasında bir açıklama olmalı.", paragraphs: [
          "MBTI sonucu yalnızca büyük bir tip kodundan oluşmuyor. Harflerin Türkçe karşılıkları, tipin açıklaması, enerji yönelimi, güçlü yönler ve kariyer önerileri ayrı bölümlerde sunuluyor. Önce genel sonuç görülüyor; ayrıntılar sayfada ilerledikçe açılıyor.",
          "Enneagram tarafında tip ve kanat bilgisine stres ve güvenlik yönlerini gösteren bir şema eşlik ediyor. İki testi de tamamlayan kullanıcı, bu bilgileri aynı sonuç sayfasında inceleyebiliyor. Test öncesindeki bilgilendirme ise sonuçların psikolojik tanı yerine geçmediğini açıkça belirtiyor."
        ] },
        { type: "showcase", tone: "lavender", label: "OKUNABİLİR SONUÇLAR", title: "Önce büyük resim, sonra ayrıntılar.", text: "Tip kodu ve harf açıklamaları ilk bakışta okunuyor. Devamındaki içerik, uzun bir metin duvarı yerine başlıklarla ayrılıyor. Mobilde de bu okuma sırası korunuyor. Buradaki ekranlar, örnek yanıtlarla tamamlanan bir testin gerçek sonuç görünümünü gösteriyor.", screens: [ desktop("result", "MBTI sonucunun masaüstü düzeni", "1440 / 1000"), phone("mobile-result", "Sonuçların mobil görünümü") ] }
      ]
    },
    {
      id: "kesif", nav: "Keşfe Devam",
      blocks: [
        { type: "intro", label: "KARAKTER REHBERİ", title: "“Benimle aynı tipte kimler var?”", paragraphs: [
          "Karakter rehberi, kişilik kavramlarını daha tanıdık bir yerden keşfetmeye imkân veriyor. Analistler, Diplomatlar, Koruyucular ve Kâşifler grupları arasından bir grup, ardından bir tip seçiliyor. O tiple ilişkilendirilen isimler ve kısa açıklamaları aynı alanda listeleniyor.",
          "Kişilik Tipleri sayfası ise MBTI’nin 16 tipini ve Enneagram’ın 9 tipini incelemek için ayrı bir giriş sunuyor. Kaynaklar bölümünde kuramsal açıklamalar ve sık sorulan sorular yer alıyor. Böylece test çözmeden de içerikler arasında dolaşılabiliyor."
        ] },
        { type: "showcase", tone: "sage", label: "TANIDIK İSİMLER, YENİ BAĞLANTILAR", title: "Merakın götürdüğü yere.", text: "Grup sekmeleri ve tip seçenekleri uzun bir listeyi parçalara ayırıyor. Küçük portreler taramayı kolaylaştırırken mobilde daha kısa satırlar kullanılıyor. Bir tip seçildiğinde ayrıntılar aynı sayfada gösteriliyor.", screens: [ desktop("characters", "Gruplardan kişilik tiplerine", "1440 / 1000"), phone("mobile-characters", "Telefonda karakter rehberi") ] }
      ]
    },
    {
      id: "gorsel-dil", nav: "Görsel Dil",
      blocks: [
        { type: "palette", title: "Sakin bir zemin, yerinde renkler.", text: "Indoles’in arayüzü beyaz ve sıcak nötr tonlar üzerine kurulu. MBTI için kullanılan maviyle Enneagram’ın kiremit tonu, iki yaklaşımı birbirinden ayırıyor. Büyük serif başlıklar sayfaya karakter katarken gövde metinleri sade tutuluyor. Bu sunumdaki renkli alanlar da uygulamanın paletinden yola çıkıyor.", colors: [ { hex: "#2F3FBF", name: "MBTI mavisi" }, { hex: "#B4452F", name: "Enneagram kiremiti" }, { hex: "#F7F6F3", name: "Sıcak nötr" }, { hex: "#6B4FA0", name: "Mor vurgu" } ] },
        { type: "split", title: "Davetkâr bir girişten odaklanmış bir deneyime.", text: "Ana sayfanın doğa manzarası, test ekranının sadeliği ve sonuçların başlıklarla ayrılan düzeni farklı ihtiyaçlara karşılık veriyor. **Indoles’i bir arada tutan şey**, her ekranda aynı yoğunluğu kullanmak yerine kullanıcının o an yapmak istediğine yer açmak." }
      ]
    }
  ]
}
