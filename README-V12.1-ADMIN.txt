PAROGLU MEDIA V12.1 — SUPABASE ADMIN

Bu paket V12 Motion System + Supabase yönetim panelini içerir.

YENİ DOSYALAR
- admin.html
- admin.css
- admin.js
- backend-config.js
- data-store.js

PANEL
- Giriş: Supabase Authentication kullanıcısı
- Adres: /admin.html
- Site metinlerini düzenleme
- Portfolyo ekleme / silme / düzenleme
- Marka yönetimi
- Supabase Storage medya yükleme
- Web sitesi brief / taleplerini görüntüleme ve durum değiştirme

İLK GİRİŞ
Panel, tablolar boşsa mevcut Paroglu Media portfolyosu, markaları ve düzenlenebilir site metinlerini başlangıç verisi olarak otomatik ekler.

GÜVENLİK
- backend-config.js yalnızca browser'da kullanılabilen Supabase publishable key içerir.
- service_role / secret key kesinlikle site dosyalarına eklenmemelidir.
- Veritabanı yazma yetkileri RLS ile sadece umutparoglu87@gmail.com hesabına açıktır.

YAPAY ZEKA
Bu sürümde OpenAI henüz bağlanmadı. Önce admin paneli tamamlandı. AI entegrasyonu bir sonraki aşamadır.
