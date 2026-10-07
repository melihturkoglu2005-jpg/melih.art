export type WorkType = "SOCIAL_MEDIA" | "UI/UX"

export type Work = {
  id: string
  title: string
  description: string
  type: WorkType
  // Büyütme penceresinde başlığın altında görünen kısa etiket
  format: string
  alt: string
  image: string
  width: number
  height: number
}

// Filtre düğmelerinin sırası ve yazısı
export const filters: { type: WorkType, label: string }[] = [
  { type: "SOCIAL_MEDIA", label: "Sosyal medya" },
  { type: "UI/UX", label: "UI/UX" }
]

const formats: Record<WorkType, string> = {
  "SOCIAL_MEDIA": "Sosyal medya tasarımı",
  "UI/UX": "Arayüz tasarımı (UI/UX)"
}

// Yeni bir tasarım eklemek için: görseli public/images/works klasörüne koy (webp, 1080 px genişlik),
// sonra works listesinin istediğin yerine bir satır ekle. width ve height, görselin gerçek piksel boyutudur.
// Listedeki sıra, sitedeki sıradır.
const w = (id: string, width: number, height: number, type: WorkType, title: string, description: string): Work => ({
  id,
  title,
  description,
  type,
  format: formats[type],
  alt: title,
  image: `/images/works/${ id }.webp`,
  width,
  height
})

export const works: Work[] = [
  w("food", 1600, 900, "UI/UX", "Yemek Sipariş Uygulaması",
    "Bu kullanıcı arayüzü (UI) çalışmasında, kullanıcı dostu bir deneyim (UX) ile modern estetiği birleştirmeyi hedefledim. Canlı renk paleti ve temiz kart tasarımları sayesinde kullanıcının yemek seçme ve sipariş verme sürecini en akıcı hale getirdim."),
  w("trippica", 1080, 1350, "SOCIAL_MEDIA", "Trippica Yaklaşan Etkinlikler",
    "Gezgin ruhunu ve global erişimi simgeleyen bulut temalı arka plan, net tipografik hiyerarşiyle birleştirilerek etkinlik takvimi içeriği kolayca taranabilir hale getirilmiştir. Alt kısımda kullanılan yırtık kağıt dokusu ve kurumsal CTA (eyleme çağrı) butonları, dijital bir markanın modern ve dinamik sosyal medya estetiğini yansıtmaktadır."),
  w("flux", 1080, 1350, "SOCIAL_MEDIA", "Dijital Finans Kontrolü: Flux",
    "Bu çalışmada karanlık arayüz ve net tipografiyle kontrol duygusunu güçlendirmeyi hedefledim. Akışkan geçişler ve sade hiyerarşi sayesinde tasarımı modern, güven veren ve odaklanmayı kolaylaştıran bir yapıda kurguladım 🌑✨."),
  w("sunify1", 1080, 1350, "SOCIAL_MEDIA", "Sunify Sosyal Medya Tasarımı",
    "Bu çalışmada aracın serin kalmasını sağlarken aynı anda temiz enerji üretme fikrini ön plana çıkarmak için modern mimari çizgileri güneş panelleriyle bütünleştirdim ☀️. Güneşten korunma ve güneşle şarj olma fikrini tek bir yapı altında toplayarak, otopark alanını pasif bir alan olmaktan çıkarıp aktif bir enerji kaynağı olarak konumlandırdım ⚡🚗."),
  w("zey3", 1080, 1350, "SOCIAL_MEDIA", "Zey Glass Nass Hospital",
    "Teknik detayları minimalist bir tipografiyle harmanlayarak, sosyal medya akışında kurumsal prestiji ve modern mimari estetiği ön plana çıkaran bir görsel dil kurgulanmıştır."),
  w("cuzdan", 1600, 900, "UI/UX", "Dijital Cüzdan ve Finans Yönetimi",
    "Bu çalışmada, karmaşık finansal verileri kullanıcı için anlaşılır ve estetik bir arayüze dönüştürmeyi amaçladım. Dark Mode (Karanlık Tema) tercihiyle premium bir his yaratırken, mor ve neon vurgularla modern fintech dünyasının dinamizmini yansıttım."),
  w("matcha", 1000, 1415, "SOCIAL_MEDIA", "Çilekli Matcha: Bir Doğa Masalı",
    "Bu çalışmada, ürünün doğal ve ferahlatıcı içeriğini vurgulamak için 'mikro dünya' konsepti kullanılmıştır. İçecek, masalsı bir bahçenin merkezine yerleştirilerek bir hikaye oluşturulmuştur."),
  w("zey2", 1080, 1350, "SOCIAL_MEDIA", "Zey Glass Nass Hospital",
    "Teknik detayları minimalist bir tipografiyle harmanlayarak, sosyal medya akışında kurumsal prestiji ve modern mimari estetiği ön plana çıkaran bir görsel dil kurgulanmıştır."),
  w("travel", 1600, 900, "UI/UX", "Seyahat Planlama Uygulaması",
    "Kişiye özel seyahat önerilerini keşfetmeyi sağlayan bir mobil uygulama. Popüler turları, yeni rotaları, şehir rehberlerini ve detaylı gezi bilgilerini görüntüleyin. Mesafe, süre, sıcaklık ve kullanıcı puanlarını inceleyin"),
  w("sicak", 1080, 1350, "SOCIAL_MEDIA", "Sıcak Çikolata Kampanyası",
    "Bu çalışmada kış mevsiminin huzurunu ve yılbaşının coşkusunu birleştirmeyi hedefledim. Tasarımda ürünün 'iç ısıtan' etkisini vurgulamak için doğal elementler ile yılbaşı sembollerini harmanladım."),
  w("pizza", 1080, 1350, "SOCIAL_MEDIA", "Pizza Sosyal Medya Tasarımı",
    "Pizza markaları için sosyal medya post tasarımı. 🌿🍕 Bu tasarımda, 'saf İtalyan keyfi' mesajını desteklemek amacıyla ürün, taze içeriklerin doğal ortamıyla birleştirilmiştir."),
  w("oppi", 1080, 1350, "SOCIAL_MEDIA", "Oppi 14 Şubat",
    "Dijital bir finans markasının logosunu duygusal bir hikaye anlatımıyla somutlaştırarak, şık ve kampanya odaklı bir tasarım yapılmıştır."),
  w("zey1", 1080, 1350, "SOCIAL_MEDIA", "Zey Glass Lara Park",
    "Teknik detayları minimalist bir tipografiyle harmanlayarak, sosyal medya akışında kurumsal prestiji ve modern mimari estetiği ön plana çıkaran bir görsel dil kurgulanmıştır."),
  w("sunify2", 1080, 1350, "SOCIAL_MEDIA", "Sunify Sosyal Medya Tasarımı",
    "Bu çalışmada teknik güven duygusunu ve sürdürülebilir hizmet anlayışını vurgulamayı amaçladım. Tasarımda uzman personel figürüyle, sistemin yalnızca kurulum anında değil sonrasında da profesyonel bir şekilde takip edildiğini görsel olarak destekledim 👷‍♂️📋."),
  w("oppi1", 1080, 1350, "SOCIAL_MEDIA", "Oppi Haftalık Haber",
    "Haftalık yoğun bilgi içeriği, kullanıcıyı yormayan temiz bir hiyerarşi ve tematik dokularla zenginleştirilerek kaydırılabilir içerik formatına uygun hale getirilmiştir.")
]

const byId = (id: string): Work => works.find((work) => work.id === id)!

// Lightbox'ta varsayılan gezinme sırası
export const allWorks: Work[] = works

// Ana sayfadaki kayan şeritte görünen işler
export const heroWorks: Work[] = [ "matcha", "flux", "sunify1", "oppi", "sicak", "zey2", "pizza" ].map(byId)
