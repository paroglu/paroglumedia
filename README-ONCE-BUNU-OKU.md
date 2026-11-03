# ParogluMedia — Studio Cut (V14.2)

Bu klasör, Batuhan Edits'in **sahnelere bölünmüş ve interaktif kurgu ekranı içeren** anlatımından ilham alan, ParogluMedia için **özgün** bir web sitesi prototipidir. Batuhan'ın tasarım dosyaları veya telifli kaynakları kullanılmamıştır.

## İçerik

- `v14-studio-cut/index.html` — bütün sayfanın HTML'i.
- `v14-studio-cut/style.css` — tema, animasyonlar, responsive tasarım.
- `v14-studio-cut/script.js` — çalışan proje timeline'ı, seçili proje monitörü, oynat/duraklat, proje filtrelemek yerine klip seçimi, yöntem defteri, film şeridi ve proje penceresi.
- `v14-studio-cut/assets/` — site mevcut GitHub fotoğraflarına ulaşamazsa görünen **yerel grafik yedekler**.

## GitHub'a yükleme (eski siteyi silmeden)

1. `github.com/paroglu/paroglumedia` deposunu aç.
2. ZIP'i **bilgisayarda** aç. `v14-studio-cut/` klasörünü içindeki bütün dosyalarla birlikte **repo ana dizinine** yükle. Klasör yapısı korunmalı.
3. `Commit changes` de. **Mevcut kök `index.html`, admin paneli veya başka dosyaları değiştirme.**
4. `Settings → Pages` bölümünde yayın kaynağının `main / (root)` olduğundan emin ol. Yayın sürüyorsa tamamlanmasını bekle.
5. Önizleme adresi: `https://paroglu.github.io/paroglumedia/v14-studio-cut/`

Bu adres site yüklenmeden canlı değildir. GitHub Pages ayarları başka branch'te ise, yayın branch'i farklı olabilir.

## Önemli

- **Önizleme**, mevcut siteye otomatik kurulmaz ve bağlı Supabase/admin panelini değiştirmez.
- Gerçek fotoğraflar, depoda zaten var olan görsel dosyalarının `../` yollarından yüklenir. Dosya yoksa `raw.githubusercontent.com/paroglu/paroglumedia/main/` üzerinden denenir; o da yoksa yerel yedek SVG görünür. Müşteri fotoğrafları bu ZIP'e kopyalanmamıştır.
- Projeye tıklayınca açılan pencere bu demo içinde çalışır. Film şeridi içindeki fotoğraflar gerçek dosya adlarına bağlanmıştır.
- Açılış ses düğmesi **ACK Bıçak önizleme videosunun** sesini açmayı dener. Video dosyası yoksa sessiz kalır. Sahte ses çalmaz.
- Görsellerin, müşteri logolarının ve istatistiklerin yayın izinlerini kontrol et. Sayıların açıklamasında bunların ajans deneyimini kapsadığı belirtilmiştir; kişisel ajans başarısı gibi sunulmaz.
- Nihai yayın öncesi masaüstü/iPhone/iPad'de Chrome/Safari kontrolü, video optimizasyonu, gerçek proje detay sayfaları, SEO ve form entegrasyonu gerekiyor.

## Tasarım kıyaslaması

| Önceki sürüm | Yeni Studio Cut |
| --- | --- |
| Sadece büyük kahraman başlığı | Hareketli portre/kare kolajı ve tanışma sahnesi |
| Standart proje kartları | 4 video track içeren oynatılabilir kurgu timeline'ı |
| Düz hizmet listesi | 4 sekmeli interaktif yöntem defteri |
| Grid portföy | Film şeridi / yatay kaydırma / projeye tıklayınca detay |
| Düz CTA | Büyük tipografili açık renk final sahnesi |

## İleride özelleştirme

- Açılış görseline Umut'un gerçek portre çekimi ekle.
- Timeline'daki gerçek proje fotoğraflarını ve proje adlarını düzenle.
- Gerçek proje sayfaları veya videolar ile interaktif klipleri ilişkilendir.
- Kullanıcının yönettiği CMS/Supabase içerikleriyle veri bağlantısı kur.
- `noindex,nofollow` yalnızca önizleme için; ana siteye taşınınca SEO stratejisine göre düzenle.
