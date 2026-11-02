# ParogluMedia V14 — GitHub'a yükleme ve 404 çözümü

Bu paket **mevcut siteyi değiştirmeyen** ayrı bir önizleme içerir. `v14-preview/` adlı klasör, mevcut `paroglumedia` deposunun köküne eklenmelidir.

## Yayınlama: GitHub web arayüzü

1. Bu ZIP dosyasını **çıkart**. ZIP'i tek dosya olarak GitHub'a yüklemek siteyi açmaz.
2. Bilgisayardan `https://github.com/paroglu/paroglumedia` adresini aç.
3. `main` dalı seçiliyken `Add file` → `Upload files` seç.
4. Çıkartılan `v14-preview` klasörünü sürükleyip bırak. Dosyaların yolunun `v14-preview/index.html`, `v14-preview/styles.css`, `v14-preview/app.js` ve `v14-preview/README.md` olarak göründüğünü denetle.
5. `Commit changes` seçeneğine bas.
6. `Settings` → `Pages` içinde `Build and deployment` → `Deploy from a branch`, `main` ve `/(root)` olarak yapılandır. Mevcut Pages ayarın doğruysa değiştirme.
7. GitHub Pages yayını tamamlandıktan sonra: `https://paroglu.github.io/paroglumedia/v14-preview/` adresini dene. Eğer mevcut depo için özel alan adı bağlıysa `https://paroglumedia.com/v14-preview/` adresi de çalışabilir. Alan adının Pages'e bağlılığı ayrıca doğrulanmalıdır.

**ÖNEMLİ:** Yukarıdaki adresler dosyalar yüklenmeden çalışmaz; mevcut durumda yayında olduğunu varsayma. `main` dalındaki kök `index.html`, `styles.css`, `app.js`, `admin*.js`, `backend-config.js` ve mevcut medya varlıklarını **silme / üzerine yazma**.

## Sık görülen 404 nedenleri

- Klasör yüklenmedi ya da `v14-preview/` yerine başka yere yüklendi.
- Dosyaların tam yolu `v14-preview/index.html` yerine iki katlı `v14-preview/v14-preview/index.html` oldu.
- Repo'nun Pages kaynağı `main / (root)` olarak seçilmedi.
- URL yanlış; `/paroglumedia/v14-preview/` yolunun tamamını kullan.
- GitHub Pages henüz dağıtımı tamamlamadı; repo `Actions` ve `Settings → Pages` durumunu kontrol et.
- Özel alan adı GitHub Pages'e yönlendirilmemiş olabilir; önce GitHub'ın verdiği `github.io` adresini dene.

## Neden bütün JPG/MP4 dosyaları bu ZIP'te yok?

`v14-preview/` içindeki HTML ve JavaScript, medya dosyalarını mevcut repo kökünden (`../concert-gokhan-turkmen-02.jpg` vb.) okur. Medyaları ikinci kez yüklemeye gerek yoktur. **ZIP'i tek başına farklı bir depoya koyarsan** görsellerin bir kısmı genel GitHub deposundan yüklenebilir ama tam film dosyaları çalışmaz. En doğru yol mevcut depoya alt klasör olarak eklemektir.

## Yayına almadan önce kontrol listesi

- [ ] Masaüstünde 1440px ve mobilde 390px/360px görünümü kontrol et
- [ ] Karabük İY, Sefo, Gökhan Türkmen ve drone görselleri açılıyor mu?
- [ ] Video sessiz önizleme ve tıklayınca tam film açılıyor mu?
- [ ] Tümü / Konser / Spor / Film / Tasarım / Drone filtreleri çalışıyor mu?
- [ ] Mobil menü açılıp kapanıyor mu?
- [ ] Projeni konuşalım / Teklif al düğmesi `teklif-al.html` sayfasına gidiyor mu?
- [ ] Telefon ve tablet üzerinde yatay kaydırma (istenmeyen overflow) var mı?
- [ ] Lighthouse performans ve erişilebilirlik raporlarını al

## Ana siteye sonradan geçirme

Bu paket ana sayfayı otomatik değiştirmez. Önce V14 önizlemeyi onayla, ardından ana sayfanın yedeği ile birlikte kontrollü geçiş yap. `v14-preview` içeriği mevcut admin ve Supabase yapılandırmasını yeniden uygulamaz.
