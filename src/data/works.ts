export type WorkType = "SOCIAL_MEDIA" | "UI/UX" | "LOGO"

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

// Filtre düğmelerinin sırası ve yazısı. İşi olmayan kategori galeride görünmez;
// ilk logoyu works listesine type "LOGO" ile eklediğin anda "Logo" düğmesi kendiliğinden belirir.
export const filters: { type: WorkType, label: string, blurb: string }[] = [
  { type: "SOCIAL_MEDIA", label: "Sosyal medya", blurb: "Marka ve kampanya gönderileri" },
  { type: "UI/UX", label: "UI/UX", blurb: "Mobil uygulama arayüzleri" },
  { type: "LOGO", label: "Logo", blurb: "Marka işaretleri ve logo çalışmaları" }
]

const formats: Record<WorkType, string> = {
  "SOCIAL_MEDIA": "Sosyal medya tasarımı",
  "UI/UX": "Arayüz tasarımı (UI/UX)",
  "LOGO": "Logo tasarımı"
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
    "Yemek seçme, ürüne göz atma ve siparişi tamamlama adımlarını üç ekranda topladım. Menünün kolay gezilmesine ve sipariş özetinin açık olmasına odaklandım."),
  w("trippica", 1080, 1350, "SOCIAL_MEDIA", "Trippica · Kripto Etkinlik Takvimi",
    "Üç etkinliğin adını ve şehirlerini bir takvimde topladım. Tarihleri büyük tuttum; bulutlu gökyüzü ve yırtık kâğıt detayını arka planda kullandım."),
  w("flux", 1080, 1350, "SOCIAL_MEDIA", "Flux · Uygulama Tanıtımı",
    "Flux'un finans ekranını merkeze alan bir tanıtım postu. Varlıklar, yaklaşan ödemeler ve son işlemler telefonda bir arada görünüyor."),
  w("sunify1", 1080, 1350, "SOCIAL_MEDIA", "Sunify · Güneş Enerjili Otopark",
    "Güneş enerjili otopark fikrini doğrudan anlatmak istedim: araç gölgede duruyor, paneller de enerji üretiyor."),
  w("zey3", 1080, 1350, "SOCIAL_MEDIA", "Zey Glass · Nass Hospital",
    "Nass Hospital'ın dış cephesini ve projede kullanılan camları aynı tasarımda gösterdim. Yapının görüntüsüne geniş yer bırakıp teknik bilgiyi kısa tuttum."),
  w("cuzdan", 1600, 900, "UI/UX", "Flux · Finans Ekranları",
    "Flux için hazırladığım iki ekran, günlük para takibini ve harcamaların dağılımını gösteriyor. Koyu arayüzde bilgileri küçük kartlara ayırdım."),
  w("matcha", 1000, 1415, "SOCIAL_MEDIA", "Çilekli Matcha",
    "Çilekli matcha'yı küçük bir bahçenin içine taşıdım. Bardağın çevresine çilekler ve minyatür figürler yerleştirerek kendi küçük dünyasını kurdum."),
  w("zey2", 1080, 1350, "SOCIAL_MEDIA", "Zey Glass · Nass Hospital Avlusu",
    "Nass Hospital'ın bu kez avlu ve giriş bölümüne odaklandım. Cam cepheyi gösterirken kullanılan cam türlerini de görsele ekledim."),
  w("travel", 1600, 900, "UI/UX", "Seyahat Planlama Uygulaması",
    "Rota arama ve şehir keşfini bir arada gösteren mobil ekranlar. Fotoğraflara alan açan sade, koyu bir arayüz kullandım."),
  w("sicak", 1080, 1350, "SOCIAL_MEDIA", "Yılbaşı İçin Sıcak Çikolata",
    "Karlı ormanın ortasına, yılbaşı şapkası takmış bir sıcak çikolata yerleştirdim. Soğuk manzara içeceğin sıcaklığını daha belirgin kılıyor."),
  w("pizza", 1080, 1350, "SOCIAL_MEDIA", "Mozzarella Pizza",
    "Mozzarella pizzayı domates ve fesleğenle aynı masaya koydum; arka planda İtalya kırsalını çağrıştıran bir manzara kullandım."),
  w("oppi", 1080, 1350, "SOCIAL_MEDIA", "Oppi · Sevgililer Günü",
    "Oppi logosunu bir yüzük kutusuna taşıdım. Sevgililer Günü fikrini markanın kendi işaretinden kurdum."),
  w("zey1", 1080, 1350, "SOCIAL_MEDIA", "Zey Glass · Lara Park Premium",
    "Lara Park Premium'un mimarisini ana görsel olarak kullandım; cam detaylarını da kısa bir teknik notla ekledim."),
  w("sunify2", 1080, 1350, "SOCIAL_MEDIA", "Sunify · Periyodik Bakım",
    "Güneş paneli kurulduktan sonra verilen bakım desteğini anlatan bir çalışma. Teknik personel görseliyle hizmetin devam ettiğini gösterdim."),
  w("oppi1", 1080, 1350, "SOCIAL_MEDIA", "Oppi · Haftalık Kripto Haberleri",
    "Haftanın kripto başlıklarını küçük bir gazete sayfası gibi düzenledim. Farklı haberleri tek postta toparladım.")
]

const byId = (id: string): Work => works.find((work) => work.id === id)!

// Lightbox'ta varsayılan gezinme sırası
export const allWorks: Work[] = works

// Ana sayfadaki kayan şeritte görünen işler
export const heroWorks: Work[] = [ "matcha", "flux", "sunify1", "oppi", "sicak", "zey2", "pizza" ].map(byId)
