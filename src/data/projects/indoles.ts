import type { Project } from "./types"

const img = (name: string, alt: string, ratio = "16 / 10") => ({ src: `/images/projects/indoles/${ name }-2026.png`, alt, ratio })
const phone = (name: string, caption: string) => ({ image: img(name, `Indoles mobil görünümü: ${ caption }`, "390 / 844"), device: "phone" as const, caption })
const desktop = (name: string, caption: string, ratio = "16 / 10") => ({ image: img(name, `Indoles masaüstü görünümü: ${ caption }`, ratio), device: "browser" as const, caption })

export const indoles: Project = {
  slug: "indoles",
  title: "Indoles",
  headline: "Kendini tanımanın tek bir yolu yok.",
  cardTitle: "Indoles — Kendini tanımanın tek bir yolu yok.",
  summary: "Indoles; düşünme biçimine ve motivasyonlarına iki farklı yerden bakmanı sağlayan bir keşif deneyimi. Kaydırmalı bir girişin ardından MBTI ve Enneagram testlerine, kişilik tiplerine, karakter rehberine ve kaynaklara kendi yolunu seçerek ulaşabiliyorsun.",
  kicker: "Indoles · Kişilik keşif deneyimi",
  mark: "I",
  name: "Indoles",
  tags: [ "Geliştirmeye devam ediyorum" ],
  meta: "MBTI · Enneagram · Keşif rotası",
  role: "Arayüz tasarımı",
  tools: [ "React Native", "Expo", "React Native Web" ],
  cover: img("home", "Indoles ana sayfası: kendini tanımanın tek bir yolu yok başlığı ve manzara sahnesi"),
  tint: "#e8ecdf",
  sections: [
    {
      id: "genel-bakis", nav: "Genel Bakış",
      blocks: [
        { type: "intro", label: "FİKİR", title: "İki test, tek bir sonuca sıkışmayan bir keşif.", paragraphs: [
          "Indoles’te MBTI düşünme ve karar verme biçimlerine, Enneagram ise davranışların ardındaki motivasyonlara bakıyor. Kullanıcı birini seçebiliyor veya ikisini de tamamlayıp sonuçlarını birlikte değerlendirebiliyor. Testler psikolojik tanı olarak değil, kendine yeni sorular sormak için bir başlangıç olarak sunuluyor.",
          "Yeni ana sayfa bu fikri bir yolculuğa dönüştürüyor. Manzara sahnesi kaydırdıkça açılıyor; MBTI ve Enneagram ayrı bölümlerde tanıtılıyor. Ardından gelen keşif rotası, testlere ek olarak kişilik tiplerini, karakter rehberini ve kaynakları da görünür kılıyor."
        ] },
        { type: "showcase", tone: "sage", label: "YENİ ANA SAYFA", title: "Manzaradan başlayan bir anlatı.", text: "Geniş ekranda metin ve manzara yan yana; telefonda görsel önce geliyor. İki düzen de kullanıcıyı aynı soruyla karşılıyor: Kendini tanımanın tek bir yolu var mı?", screens: [ desktop("home", "Kaydırmalı hikâyenin başlangıcı"), phone("mobile-home", "Mobil giriş düzeni") ] }
      ]
    },
    {
      id: "yaklasim", nav: "Tasarım Yaklaşımı",
      blocks: [
        { type: "intro", label: "TASARIM YAKLAŞIMI", title: "Kullanıcı rotasını kendisi seçiyor.", paragraphs: [
          "Ana sayfadaki kaydırmalı hikâye önce düşünme biçimlerine, sonra motivasyonlara odaklanıyor. Son bölümde tek bir sonuçla yetinmek yerine testler, kişilik tipleri, karakter rehberi ve kaynaklar arasında seçim yapılabilen bir rota açılıyor. Hareket azaltma tercihi olan kullanıcılar için sahneler sadeleşiyor.",
          "Testler sayfasında iki yaklaşımın amacı, soru sayısı ve sonuçta neler görüleceği başlamadan önce açıklanıyor. MBTI 50 soru ve 16 kişilik tipi; Enneagram 45 soru ve 9 tip içeriyor. Üyelik adımı olmadan başlanabiliyor, fakat sonuçların tanı olmadığına ilişkin kısa bilgilendirme önce onaylanıyor."
        ] },
        { type: "journey", label: "KEŞİF ROTASI", title: "Bir sonuçtan sonra da devam eden yol.", items: [
          { title: "İki mercekten birini seç", text: "MBTI bilişsel tercihlere, Enneagram temel motivasyonlara odaklanıyor. Kullanıcı dilediği yerden başlayabiliyor." },
          { title: "Kendi hızında yanıtla", text: "Beş seçenekli soru akışında önceki yanıta dönmek, soru haritasını kullanmak ve otomatik ilerlemeyi açmak mümkün." },
          { title: "Merak ettiğin yere geç", text: "Sonuçtan diğer teste, kişilik tiplerine, karakter rehberine ve kaynaklara uzanan yollar açık kalıyor." }
        ] },
        { type: "showcase", tone: "peach", label: "TEST SEÇİMİ", title: "Farkı başlamadan önce göster.", text: "Masaüstünde iki test kendi renk ve diyagramlarıyla yan yana duruyor; telefonda kartlar alt alta akıyor. Her kart, testin neye baktığını ve uzunluğunu açıkça belirtiyor.", screens: [ desktop("tests", "MBTI ve Enneagram seçenekleri"), phone("mobile-tests", "Mobil test seçimi") ] }
      ]
    },
    {
      id: "test-deneyimi", nav: "Test Deneyimi",
      blocks: [
        { type: "intro", label: "SORU AKIŞI", title: "Ekranda tek bir soru, karar vermek için yeterince alan.", paragraphs: [
          "Soru ekranında uzun açıklamalar yerine bir ifade ve katılmama–katılma arasında beş seçenek var. Seçilen yanıtın adı da görünür hâle geliyor; seçim yalnızca renkle anlatılmıyor. Kullanıcı isterse cevap seçtikten sonra otomatik ilerlemeyi açabiliyor.",
          "Sayaç ve ilerleme çizgisi testin neresinde olunduğunu gösteriyor. Masaüstünde cevaplanan soru sayısı, soru haritası ve kısa yanıt önerileri sağ panelde bulunuyor. Telefonda bu bilgiler ana soruyu daraltmamak için daha küçük bir düzene taşınıyor."
        ] },
        { type: "showcase", tone: "blue", label: "MASAÜSTÜNDEN TELEFONA", title: "Aynı soru, ekranına göre farklı düzen.", text: "Masaüstünde soru haritası ve durum paneli soruya eşlik ediyor. Telefonda tek sütunlu akış, soruyu ve beş yanıtı öne çıkarıyor; ilerleme bilgisi başlıkta kalıyor.", screens: [ desktop("question", "Soru haritası ve durum paneli"), phone("mobile-question", "Mobilde odaklı soru ekranı") ] },
        { type: "split", title: "İlerlemenin kontrolü kullanıcıda.", text: "**Cevaba dokununca ilerle** açıkken seçimden sonra sıradaki soruya geçiliyor; kapalıyken Sonraki düğmesi kullanılıyor. Önceki soruya dönmek ve masaüstünde soru haritasından belirli bir soruyu açmak da mümkün." }
      ]
    },
    {
      id: "sonuclar", nav: "Sonuçları Anlamak",
      blocks: [
        { type: "intro", label: "SONUÇ EKRANI", title: "Dört harfin arkasında bir açıklama olmalı.", paragraphs: [
          "MBTI sonuç sayfası tip kodunu dört harfin Türkçe karşılıklarıyla birlikte gösteriyor. Tip açıklamasını enerji yönelimi, güçlü yönler ve kariyer önerileri izliyor. Aynı tiple ilişkilendirilen tanınmış isimlere geçiş de sonuçtan doğrudan yapılabiliyor.",
          "Enneagram sonucunda tip, kanat, stres ve güvenlik yönleri ayrı bir şemayla açıklanıyor. İki test tamamlandığında sonuçlar aynı sayfadan seçilerek okunabiliyor. Arayüz, bunların psikolojik tanı olmadığını sonuç başlığının hemen altında tekrar hatırlatıyor."
        ] },
        { type: "showcase", tone: "lavender", label: "OKUNABİLİR SONUÇLAR", title: "Önce tip, sonra yorum.", text: "Büyük tip kodu ilk bakışta okunuyor; açıklamalar ve öneriler daha sonra geliyor. Görseller, yeni sürümde örnek yanıtlarla tamamlanan bir MBTI testinin sonucunu gösteriyor.", screens: [ desktop("result", "MBTI sonucunun masaüstü düzeni"), phone("mobile-result", "Sonuçların mobil okuma düzeni") ] }
      ]
    },
    {
      id: "kesif", nav: "Keşfe Devam",
      blocks: [
        { type: "intro", label: "KEŞFE DEVAM", title: "Tip kodundan sonraki merak.", paragraphs: [
          "Kişilik Tipleri sayfasında MBTI’nin 16 tipi ve Enneagram’ın 9 tipi ayrı sekmelerde inceleniyor. MBTI tarafında Analistler, Diplomatlar, Koruyucular ve Kâşifler grupları arasında geçiş yapılabiliyor; her tipin kısa açıklaması listede okunuyor.",
          "Karakter rehberi, 16 MBTI tipiyle ilişkilendirilen 96 tanınmış ismi gruplara ayırıyor. Grup ve tip seçimi aynı sayfada kalıyor; portreler bir başka keşif kapısı açıyor. Kaynaklar bölümü ise kişilik literatürünü ve testlerin sınırlarını ayrıca açıklıyor."
        ] },
        { type: "showcase", tone: "sage", label: "KİŞİLİK TİPLERİ", title: "Önce sistemi, sonra grubu seç.", text: "Tip listeleri büyük kodlar, kısa açıklamalar ve grup sekmeleriyle taranıyor. Dar ekranda aynı içerik tek sütuna dönüşüyor.", screens: [ desktop("types", "MBTI tipleri ve grup seçimi"), phone("mobile-types", "Mobil tip listesi") ] },
        { type: "showcase", tone: "peach", label: "KARAKTER REHBERİ", title: "Tanıdık isimlerle yeni bağlantılar.", text: "Tipe göre düzenlenen portreler ve kısa açıklamalar, sonuç ekranından başlayan merakı aynı arayüz içinde sürdürüyor. Eşleştirmeler yorum niteliğinde; kesin kişilik tanısı olarak sunulmuyor.", screens: [ desktop("characters", "Gruplara ayrılan karakter rehberi"), phone("mobile-characters", "Mobil karakter rehberi") ] }
      ]
    },
    {
      id: "gorsel-dil", nav: "Görsel Dil",
      blocks: [
        { type: "palette", title: "Kâğıt beyazı, mürekkep siyahı, iki vurgu.", text: "Yeni sürümün zemini beyaz ve sıcak nötr tonlar. MBTI için ultramarin mavi, Enneagram için kökboya kırmızısı kullanılıyor. Instrument Serif başlıklar keşif hissini taşırken Inter uzun metinleri ve kontrolleri okunur tutuyor.", colors: [ { hex: "#FFFFFF", name: "Kâğıt beyazı" }, { hex: "#000000", name: "Mürekkep siyahı" }, { hex: "#2F3FBF", name: "MBTI ultramarini" }, { hex: "#B4452F", name: "Enneagram kırmızısı" } ] },
        { type: "split", title: "Anlatımda hareket, soruda sakinlik.", text: "Ana sayfanın manzara ve kaydırma hareketi merak uyandırıyor. Test ekranına geçildiğinde arayüz sadeleşiyor; sonuçlarda ise tip kodu ve metinler okunabilir bir sıraya yerleşiyor. **Indoles’i bir arada tutan yaklaşım**, her ekranda aynı yoğunluğu kullanmamak." }
      ]
    }
  ]
}
