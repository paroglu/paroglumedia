# ParogluMedia V14 / Yapay zekâ ile geliştirme rehberi

## En verimli görev dağılımı

**ChatGPT — Kreatif direktör ve teknik denetim:** Site hikâyesi, kullanıcı akışı, metin, erişilebilirlik, mimari kararlar ve kalite kontrol.

**Claude — Frontend uygulama / kod revizyonu:** Verilen `v14-preview` kaynaklarını bölüm bölüm geliştir; CSS responsive kusurlarını ve JavaScript hatalarını düzelt; dosyaların tamamını kontrol et.

**Gemini — Görsel storyboard / içerik planı:** Konser, spor ve reklam çekimleri için reel/hero seçimi, görsel sıra, renk derecelendirme ve hareket ritmi üzerine alternatifler oluştur.

Üç modele birden her şeyi sıfırdan yaptırmak yerine **tek bir GitHub deposu, tek kod kaynağı** üzerinden ilerle. Aynı dosyayı eşzamanlı değiştirmeyin.

## Claude için kopyala-yapıştır geliştirici talimatı

> ParogluMedia projesinin `v14-preview/` içindeki V14 — Beyond the Frame sayfasını geliştir. Mevcut repo dosyalarını silme. Sadece `v14-preview/` üzerinde çalış. Premium sinematik editorial estetik; zemin #08070b, vurgu #9d6bfa, kuvvetli tipografi ve gerçek medya. Yeni bağımlılık eklemeden önce sebebini açıkla. Bölümleri koru: hero, featured film, selected work, manifesto, services, about, contact. Mobilde 360, 390, 768, 1024 ve 1440 piksel genişliklerde test et. Kaydırma ve hover animasyonlarının mobil karşılıklarını düşün; performans ve `prefers-reduced-motion` kurallarını uygula. Filtreler, menü, video dialogu ve iletişim yönlendirmeleri gerçekten çalışmalı. İlgili değişikliklerin yalnızca diff/patch'ini ve test adımlarını ver. Başka sayfalara, Supabase yapılandırmasına ve admin panellerine dokunma.

## Gemini için görsel yönetmen talimatı

> ParogluMedia V14 — Beyond the Frame web sitesinin görsel yönetmeni gibi düşün. Kullanıcının gerçek konser, spor, film ve tasarım çalışmalarından oluşan portföyü var. Batuhan Edits'in meslek odaklı hikâye anlatımından ilham al fakat tasarımını taklit etme. 5 bölümlük storyboard yaz: açılış, film, seçili işler, yaklaşım, iletişim. Her bölüm için kullanılacak medya türünü, kadrajı, geçişi, ışık ve renk kararını, maksimum hareket yoğunluğunu ve mobil kırpma notlarını belirt. Rastgele stok görseller önerme; gerçek projeleri merkezde tut.

## Sonraki sürüm önerileri (V14.1)

1. Seçili proje kartlarına ayrı detay / vaka sayfaları.
2. `video` varlıklarını AV1/WebM/H.264 uyumlu farklı kalitelere taşıyıp poster ve preload kontrolü.
3. Mevcut teklif formu ve Supabase içerik yönetim sistemine bağlanma.
4. Lighthouse mobil performans, Core Web Vitals ve klavye/screen-reader testleri.
5. Ana sayfa onayından sonra mevcut V13 ile kontrollü birleştirme.
