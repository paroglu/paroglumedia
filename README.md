# ParogluMedia V14 — Beyond the Frame

Bu klasör ParogluMedia için hazırlanmış **çalışan bir tek sayfalık V14 tasarım önizlemesidir**. Batuhan Edits'ten ilham alan, ancak onun görsel kimliğini, yazılarını veya kodunu kopyalamayan bağımsız sinematik bir sunumdur.

## Nasıl yayınlanır? (Mevcut siteni bozmadan)

1. ZIP dosyasını **önce çıkart**. GitHub, yüklediğin ZIP dosyasını otomatik açıp siteye dönüştürmez. Ardından `https://github.com/paroglu/paroglumedia` deposunu aç.
2. **Add file → Upload files** yolunu seç.
3. Bu ZIP içindeki `v14-preview` klasörünü tüm içeriğiyle repo köküne ekle. Yüklemede dizin yapısını koru. Kök dizindeki eski `index.html`, `styles.css`, `app.js`, admin dosyaları ve görseller **silinmemeli / değiştirilmemeli**.
4. **Commit changes** seç.
5. **Settings → Pages** bölümünde daha önce yapılandırılan Pages yayınının `main` + `/(root)` olduğundan emin ol; değilse buradan etkinleştir.
6. Özel alan adın aynı depodan yayın yapıyorsa: `https://paroglumedia.com/v14-preview/`. GitHub Pages'in varsayılan proje URL'sini kullanıyorsan: `https://paroglu.github.io/paroglumedia/v14-preview/`.

**Önemli:** ZIP içinde `v14-preview/` klasörü ve iki rehber belge vardır; GitHub deposuna yalnızca `v14-preview/` klasörünü eklersen yeterlidir. Mevcut V13 siteyi değiştirmez. Doğrudan bağımsız bir depoya yüklersen video dosyaları da orada bulunmadığı için tam film oynatılmaz. Görsellerin ise genel GitHub deposundan yüklenmesi için yedek kaynak tanımlıdır. En doğru kullanım mevcut repoya alt klasör olarak eklemektir.

## Dosyalar

- `index.html` — semantik HTML, SEO meta etiketleri, bölümler ve video dialogu.
- `styles.css` — masaüstü/mobil tasarım, geçişler, animasyonlar ve `prefers-reduced-motion`.
- `app.js` — mobil menü, filtreler, görünme animasyonları, scroll progress ve video oynatıcı.
- `README.md` — kurulum ve kullanım.

## Gerçek portföyden kullanılan medya

`../concert-gokhan-turkmen-02.jpg`, `../concert-sefo-01.jpg`, `../cover-karabuk.jpg`, `../cover-design.jpg`, `../cover-drone.jpg`, `../ack-bicak-poster.jpg`, `../ack-bicak-preview.mp4`, `../ack-bicak-film.mp4`.

Görseller ve videolar **mevcut repo kökünden** çağrılır; böylece iki kez yüklemene gerek kalmaz. Görseller için, klasör ayrı bir yerde açılırsa, public GitHub raw adresine otomatik yedek geçiş bulunur. Tam film mevcut repo içindeki dosyaya ihtiyaç duyar.

## Mevcut siteye geçiş (yalnızca onaydan sonra)

1. İlk olarak V14'ü `v14-preview/` adresinde mobil ve masaüstünde test et.
2. Mevcut dosyaların yedeğini al veya GitHub'da `v13-backup` adlı bir branch/tag oluştur.
3. V14 `index.html`, `styles.css`, `app.js` dosyalarını kök dizine taşırken mevcut isimlerle çakışmamak için önce köke `v14.css` ve `v14.js` olarak kopyala, HTML bağlantılarını da bu adlarla güncelle.
4. Kökteki `index.html` için kontrollü değişiklik yap. **Mevcut diğer sayfaları, admin panelini, veri bağlantılarını veya var olan varlıkları silme.**
5. Önizlemedeki `<meta name="robots" content="noindex, nofollow">` etiketini yayına alırken kaldır; gerçek canonical/OG URL'lerini ayarla.
6. V14 ana sayfa tek sayfalık bir deneyimdir. Eski menüler ve admin paneliyle veri/route entegrasyonu sonraki adımda ayrıca yapılmalıdır.

## Mevcut durum / dürüst teknik notlar

- Kullanılabilir demo: HTML + CSS + vanilla JavaScript, **npm/build gerektirmez**, GitHub Pages ile uyumlu.
- Sayfa navigasyonu, kategori filtreleri, video dialogu, mobil menü ve etkileşimler kodlandı.
- Backend, Supabase admin entegrasyonu ve aktif çalışan teklif formu **bu önizlemede yeniden geliştirilmedi**; teklif bağlantısı `../teklif-al.html` yoluyla mevcut sayfaya gider; böylece özel alan adı tanımlı olmasa da aynı GitHub Pages yayını içinde çalışır.
- Gösterilen 6 proje, mevcut portföy dosyalarına dayanır. Kendi işlerin dışındaki referans görseller kullanılmadı.
- Videonun sesi kullanıcı etkileşimi olmadan çalmaz; önizleme sessiz.
- Animasyonlar azaltılmış hareket ayarına duyarlıdır. Gerçek cihaz, ağ ve Lighthouse testleri yayından önce ayrıca yapılmalıdır.

## Sorun giderme

- **404:** GitHub Pages adresi ancak dosyaları yükleyip yayın tamamlandıktan sonra açılır. Alt klasörün adı tam olarak `v14-preview` ve içinde `index.html` var mı? GitHub Pages kaynak ayarı `main / (root)` mu? URL'nin sonuna `/` ekle.
- **Görsel yok:** Repo'nun ana dalında ilgili medya dosyaları duruyor mu? Public repository raw bağlantıları çalışıyor mu?
- **Film açılmıyor:** `ack-bicak-film.mp4` mevcut repo kökünde mi? GitHub Pages büyük dosyalar için ideal değildir; daha sonra optimize edilip CDN ile sunulabilir.
- **Yeni sürüm yansımadı:** Actions/Pages yayın durumunu kontrol et, tarayıcıyı sert yenile.

Hazırlanan sürüm: V14 Preview / 2026-11-03
