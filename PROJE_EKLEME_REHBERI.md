# Proje Ekleme ve Filtreleme Rehberi

## 📋 İçindekiler
1. [Yeni Proje Kartı Ekleme](#yeni-proje-kartı-ekleme)
2. [Proje Tipi Atama](#proje-tipi-atama)
3. [Filtre Mantığı](#filtre-mantığı)
4. [Yeni Kategori Ekleme](#yeni-kategori-ekleme)

---

## 🆕 Yeni Proje Kartı Ekleme

### Adım 1: `src/data/works.json` Dosyasını Açın

Bu dosya tüm projelerin bilgilerini içerir. Yeni bir proje eklemek için `works` dizisine yeni bir obje ekleyin.

### Adım 2: Proje Bilgilerini Ekleyin

```json
{
  "works": [
    {
      "title": "Proje Başlığı",
      "description": "Proje açıklaması buraya gelecek...",
      "image": "/images/works/proje-resmi.png",
      "link": "https://ornek-link.com",
      "type": "UI/UX"
    }
  ]
}
```

**Alanlar:**
- `title`: Projenin başlığı (görünen isim)
- `description`: Projenin açıklaması (kartın altında görünecek)
- `image`: Proje görselinin yolu (`public/images/works/` klasöründen)
- `link`: Projenin linki (isteğe bağlı, şu an kullanılmıyor)
- `type`: Proje tipi - **ÖNEMLİ:** Bu alan filtrelenme için kullanılır

### Adım 3: Görseli Ekleyin

Proje görselinizi `public/images/works/` klasörüne ekleyin ve `image` alanında doğru yolu belirtin.

**Örnek:**
```json
{
  "title": "Yeni Mobil Uygulama",
  "description": "Modern ve kullanıcı dostu bir mobil uygulama tasarımı.",
  "image": "/images/works/yeni-uygulama.png",
  "link": "https://melih.work",
  "type": "UI/UX"
}
```

---

## 🏷️ Proje Tipi Atama

### Mevcut Tipler

1. **`"UI/UX"`** - Kullanıcı arayüzü ve deneyim tasarımları
   - Görsel oranı: 4:3 (yatay)
   - Örnekler: Mobil uygulamalar, web arayüzleri, dashboard tasarımları

2. **`"SOCIAL_MEDIA"`** - Sosyal medya içerik tasarımları
   - Görsel oranı: 4:5 (dikey)
   - Örnekler: Instagram postları, kampanya görselleri, marka içerikleri

### Tip Atama

Proje tipini belirlerken `type` alanına doğru değeri yazın:

```json
{
  "type": "UI/UX"        // UI/UX projeleri için
}
```

veya

```json
{
  "type": "SOCIAL_MEDIA" // Sosyal medya projeleri için
}
```

**⚠️ Dikkat:** Tip isimleri tam olarak eşleşmeli:
- ✅ Doğru: `"UI/UX"` veya `"SOCIAL_MEDIA"`
- ❌ Yanlış: `"ui/ux"`, `"UI-UX"`, `"social media"`

---

## 🔍 Filtre Mantığı

### Filtreleme Nasıl Çalışır?

Filtreleme mantığı `src/components/Works.tsx` dosyasında bulunur.

### 1. State Yönetimi

```typescript
const [activeFilter, setActiveFilter] = useState<ProjectType>("UI/UX")
```

- `activeFilter`: Aktif olan filtreyi tutar (varsayılan: `"UI/UX"`)
- `setActiveFilter`: Filtreyi değiştirmek için kullanılır

### 2. Filtreleme İşlemi

```typescript
const filteredWorks = worksData.works.filter((work) => work.type === activeFilter)
```

Bu satır, `works.json` dosyasındaki tüm projeleri filtreler ve sadece aktif filtreye uyan projeleri gösterir.

**Nasıl Çalışır:**
1. `worksData.works` dizisindeki her proje kontrol edilir
2. Projenin `type` değeri `activeFilter` ile karşılaştırılır
3. Eşleşen projeler `filteredWorks` dizisine eklenir
4. Sadece bu projeler ekranda gösterilir

### 3. Filtre Butonları

```typescript
<button onClick={() => setActiveFilter("UI/UX")}>
  {t("works_filter_uiux")}
</button>
<button onClick={() => setActiveFilter("SOCIAL_MEDIA")}>
  {t("works_filter_social")}
</button>
```

Butonlara tıklandığında:
- `setActiveFilter` fonksiyonu çağrılır
- `activeFilter` state'i güncellenir
- Component yeniden render edilir
- `filteredWorks` yeniden hesaplanır
- Sadece seçili tipteki projeler gösterilir

### 4. Görsel Oranları

Filtreleme mantığı aynı zamanda görsel oranlarını da kontrol eder:

```typescript
const aspectRatio = work.type === "SOCIAL_MEDIA" ? "aspect-[4/5]" : "aspect-[4/3]"
```

- `SOCIAL_MEDIA` projeleri: 4:5 oranı (dikey)
- `UI/UX` projeleri: 4:3 oranı (yatay)

---

## ➕ Yeni Kategori Ekleme

Yeni bir kategori eklemek için aşağıdaki adımları izleyin:

### Adım 1: Type Tanımını Güncelleyin

`src/components/Works.tsx` dosyasında `ProjectType` tanımını güncelleyin:

```typescript
type ProjectType = "UI/UX" | "SOCIAL_MEDIA" | "YENİ_KATEGORİ"
```

### Adım 2: Filtre Butonu Ekleyin

Filtre butonları bölümüne yeni butonu ekleyin:

```typescript
<button
  onClick={() => setActiveFilter("YENİ_KATEGORİ")}
  className={`px-6 py-3 rounded-full ... ${
    activeFilter === "YENİ_KATEGORİ"
      ? "bg-neutral-900 dark:bg-neutral-100 ..."
      : "bg-neutral-100 dark:bg-neutral-900 ..."
  }`}
>
  {t("works_filter_yeni")}
</button>
```

### Adım 3: Yerelleştirme Ekleyin

`src/locales/en.json` dosyasına yeni buton metnini ekleyin:

```json
{
  "works_filter_uiux": "UI/UX",
  "works_filter_social": "SOCIAL MEDIA",
  "works_filter_yeni": "YENİ KATEGORİ"
}
```

### Adım 4: Görsel Oranını Belirleyin

Eğer yeni kategori için farklı bir görsel oranı istiyorsanız, `aspectRatio` mantığını güncelleyin:

```typescript
const aspectRatio = 
  work.type === "SOCIAL_MEDIA" ? "aspect-[4/5]" :
  work.type === "YENİ_KATEGORİ" ? "aspect-[16/9]" :
  "aspect-[4/3]"
```

### Adım 5: Varsayılan Filtreyi Güncelleyin (İsteğe Bağlı)

Eğer yeni kategori varsayılan olarak açık olsun istiyorsanız:

```typescript
const [activeFilter, setActiveFilter] = useState<ProjectType>("YENİ_KATEGORİ")
```

### Örnek: "BRANDING" Kategorisi Ekleme

```typescript
// 1. Type tanımı
type ProjectType = "UI/UX" | "SOCIAL_MEDIA" | "BRANDING"

// 2. Filtre butonu
<button onClick={() => setActiveFilter("BRANDING")}>
  {t("works_filter_branding")}
</button>

// 3. Yerelleştirme
"works_filter_branding": "BRANDING"

// 4. Görsel oranı (isteğe bağlı)
const aspectRatio = 
  work.type === "SOCIAL_MEDIA" ? "aspect-[4/5]" :
  work.type === "BRANDING" ? "aspect-[1/1]" : // Kare format
  "aspect-[4/3]"
```

---

## 📝 Özet

### Hızlı Referans

| İşlem | Dosya | Konum |
|-------|-------|-------|
| Proje ekleme | `src/data/works.json` | `works` dizisi |
| Tip atama | `src/data/works.json` | Her projenin `type` alanı |
| Filtre mantığı | `src/components/Works.tsx` | `filteredWorks` değişkeni |
| Buton metinleri | `src/locales/en.json` | `works_filter_*` anahtarları |
| Görsel oranları | `src/components/Works.tsx` | `aspectRatio` değişkeni |

### Önemli Notlar

1. ✅ Proje tipleri **büyük/küçük harf duyarlıdır**
2. ✅ Görsel yolları `public/images/works/` klasöründen başlamalı
3. ✅ Yeni kategori eklerken tüm adımları tamamlayın
4. ✅ Filtre butonları otomatik olarak aktif durumu gösterir
5. ✅ Geçiş animasyonları otomatik olarak çalışır

---

## 🎨 Ek Özellikler

### Hover Efektleri

Kartların üzerine geldiğinizde:
- Kart hafifçe büyür (`scale-[1.02]`)
- Gölge efekti eklenir
- Görsel zoom yapar (`scale-110`)

### Geçiş Animasyonları

Filtre değiştirildiğinde:
- Eski kartlar fade-out yapar
- Yeni kartlar fade-in yapar
- Her kart sırayla görünür (staggered animation)

### Responsive Davranış

- **Mobil:** 1 sütun
- **Tablet:** 2 sütun
- **Masaüstü:** 3 sütun

Bu davranış `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` sınıfları ile kontrol edilir.
