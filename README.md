# Melih Türkoğlu, portfolyo

Next.js 15 (App Router) + TypeScript. Bağımlılıklar: `next`, `react`, `react-dom` (+ Vercel Analytics).

## Çalıştırma

Node.js 18.18 veya üzeri gerekir.

```bash
npm install
npm run dev
```

Sonra tarayıcıda http://localhost:3000/beta adresini aç. Canlıya almak için `npm run build` ve `npm start` (ya da Vercel'e bağla).

## Sayfalar

| Adres                       | Ne                                                        |
| --------------------------- | --------------------------------------------------------- |
| `/`                         | İçeriksiz siyah ekran                                    |
| `/beta`                     | Giriş, kayan çalışmalar şeridi ve "Projelerim" kartları   |
| `/beta/hakkimda`             | Hakkımda sayfası                                          |
| `/beta/projeler/<proje-adı>` | Her proje için ayrıntılı, Behance tarzı anlatım sayfası   |

Üst menü, iletişim bölümü ve alt bilgi `/beta` altındaki sayfalarda ortaktır (`src/components/Shell.tsx`).

## Yeni proje nasıl eklenir

Her proje, `src/data/projects/` içinde **tek bir dosyadır**. Kod yazman gerekmez, sadece metin ve görsel yolları değişir.

1. `src/data/projects/indoles.ts` dosyasını kopyala, adını projene göre değiştir (ör. `groovy.ts`).
2. Dosyanın içindeki `slug`, başlıklar, metinler ve görsel adlarını kendi projene göre düzenle. Dosyanın başındaki açıklamalar neyin ne işe yaradığını anlatır.
3. Görsellerini `public/images/projects/<proje-adı>/` klasörüne koy (webp önerilir, genişlik 1200 px yeterli; geniş görseller için 1800 px).
4. `src/data/projects/index.ts` dosyasında yeni projeyi listeye ekle:

   ```ts
   import { groovy } from "./groovy"
   export const projects: Project[] = [ indoles, groovy ]
   ```

Ana sayfadaki kart ve proje sayfası kendiliğinden oluşur. Soldaki bölüm menüsü de `sections` listesinden üretilir.

### Proje sayfası blokları

Her bölüm (`section`) birkaç "blok"tan oluşur. Kullanabileceğin bloklar:

| `type`      | Görünümü                                                               |
| ----------- | ---------------------------------------------------------------------- |
| `intro`     | Küçük etiket, büyük başlık ve iki sütun paragraf                       |
| `cards`     | Başlık ve üç kart (görsel, başlık, açıklama)                           |
| `features`  | Üç ikonlu madde ve altında üç görsel                                   |
| `picker`    | Tıklanabilir üç kart; seçilene göre büyük önizleme açılır              |
| `split`     | Solda kalın başlık, sağda açıklama (`**kalın**` yazabilirsin)          |
| `figure`    | Tam genişlikte büyük görsel ve alt yazı                                |
| `takeaways` | Numaralı kısa maddeler ("Öğrendiklerim" gibi)                          |

Bloğu silmek, çoğaltmak veya yerini değiştirmek için `sections` içindeki sırayı değiştirmen yeterli. Tüm görseller tıklanınca büyür, ok tuşlarıyla gezilir.

### Indoles

Indoles içeriği, kullanıcının sağladığı PersonalityApp kaynak koduna dayanır. `public/images/projects/indoles/` içindeki ekran görüntüleri kaynak kodun web derlemesinden alınmıştır. Doğrulanmamış araştırma, süre veya başarı metrikleri kullanılmaz.

Projeler liste sırasıyla alt alta gösterilir. Yeni projeyi `projects` dizisinin sonuna eklemen yeterli; boş veya “yakında” kartı oluşturulmaz.

### Özel belgeler

CV PDF dosyası `public` dışındaki, Git tarafından hariç tutulan `private/` klasöründedir. Sitede PDF bağlantısı yoktur. Bu klasörü yayınlanacak statik dosyalara ekleme.

## Diğer içerik

| Ne                                    | Nerede                              |
| ------------------------------------- | ----------------------------------- |
| İsim, e-posta, başlık, hakkımda   | `src/data/profile.ts`               |
| Okul adı ve sınıf (İGÜ kartı)         | `src/data/profile.ts` (`school`)    |
| Kayan şeritteki çalışmalar            | `src/data/works.ts` (`heroWorks`)   |
| Renkler, animasyonlar, yerleşim       | `src/app/globals.css`               |
| Giriş bölümündeki çizimler            | `src/components/HeroArt.tsx`        |
| Küçük çizimler (alt çizgi, kalp, uçak)| `src/components/Doodles.tsx`        |

Kayan şeride bir tasarım eklemek için görseli `public/images/works/` klasörüne koy (webp, 1080 px genişlik), sonra `works.ts` içine bir satır ekle ve `heroWorks` listesine yaz.

Şerit, `public/images/works/previews/` içindeki 360 ve 640 px önizlemeleri kullanır. Yeni görsel ekledikten sonra Sharp kurulu bir Node.js ortamında `node tools/create-work-previews.cjs` çalıştır. Görsele tıklanınca tam boy dosya açılır.

## Tasarım dili

- Sıcak krem zemin, kahverengi mürekkep rengi, tek aksan turuncu. Site yalnızca açık tema kullanır.
- Başlıklar serif (Fraunces), gövde metni sans, logo ve imza el yazısı (Caveat Brush). Yazı tipleri Google Fonts'tan gelir; internet yoksa sistem yazı tiplerine düşer.
- Başlıkların altında el çizimi turuncu vurgu çizgisi, ayraçlarda elle çizilmiş hafif titrek çizgiler var. Küçük çizimler ekrana girince kendini çizer.
- **Giriş:** üstte el yazısı logo ve menü, ortada işe alım durumu, serif başlık ve iletişim/hakkımda düğmeleri. Kesikli uçuş yolundaki çizimlerde İGÜ mührü, tasarım araçları ve üretken yapay zekâ simgeleri bulunur. İGÜ mührünün üzerine gelince (telefonda dokununca) okul ve sınıf bilgisi kartı açılır. Solda karakter MacBook başında kahve içer, sağda kedi uyur; zemin hafif tepelidir.
- **Hakkımda:** profil çizimi ve başlıkla başlayan ayrı bir giriş alanı, okul bilgisi, deneyim, tasarım araçları ve yetkinlikler. Bilgiler elle çizilmiş hafif ayraçlarla bölünür.
- **İletişim:** iki sütunlu sade düzen; solda davet metni, sağda e-posta adresi, gönderme ve kopyalama düğmeleri.
- **Alt bilgi:** el yazısı imza, işe alım durumu, iletişim bağlantısı, site ve sosyal profil menüsü, telif bilgisi ve "Yukarı dön".
- Telefonda ve dar ekranlarda her şey tek sütuna iner. Bilgisayarında "hareketi azalt" ayarı açıksa animasyonlar kapanır.

## Çizimleri yeniden üretmek

Giriş bölümündeki sahne ve küçük çizimler Python betikleriyle üretilir (ek paket gerekmez):

```bash
python3 tools/doodles/assemble.py   # karakter, kedi, zemin, ikon kuşağı → HeroArt.tsx
python3 tools/doodles/icons.py      # küçük çizimler → Doodles.tsx
```

Renkler `globals.css` başındaki `--doodle`, `--c-orange`, `--c-blue`, `--c-green` ve ikon renkleri `--app-*` değişkenlerinden değişir.
