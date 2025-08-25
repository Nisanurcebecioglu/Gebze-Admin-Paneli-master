# Gebze Admin Panel - TypeScript Version

Bu proje, Gebze Belediyesi Admin Panel'inin TypeScript'e dönüştürülmüş versiyonudur. Modern JavaScript geliştirme pratikleri ve tip güvenliği ile geliştirilmiştir.

## 🚀 Özellikler

- **TypeScript**: Tam tip güvenliği ve modern JavaScript özellikleri
- **Modüler Yapı**: Yeniden kullanılabilir bileşenler ve servisler
- **Modern Build Sistemi**: TypeScript compiler ve otomatik build
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu arayüz
- **Component-Based Architecture**: Yeniden kullanılabilir UI bileşenleri

## 📁 Proje Yapısı

```
src/
├── components/          # UI Bileşenleri
│   ├── news-table.ts   # Haber tablosu bileşeni
│   └── ...
├── services/            # İş mantığı servisleri
│   ├── news-service.ts # Haber yönetimi servisi
│   └── ...
├── types/               # TypeScript tip tanımları
│   ├── global.d.ts     # Global tip tanımları
│   ├── news.types.ts   # Haber ile ilgili tipler
│   └── ...
├── utils/               # Yardımcı fonksiyonlar
│   ├── html-include.ts # HTML include utility
│   └── ...
└── main.ts             # Ana uygulama giriş noktası

dist/                   # Derlenmiş çıktılar
assets/                 # Statik dosyalar (CSS, JS, resimler)
ltr/                    # HTML sayfaları
```

## 🛠️ Kurulum

### Gereksinimler

- Node.js 16+ 
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd Gebze-Admin-Paneli-master
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **TypeScript'i derleyin**
```bash
npm run build
```

4. **Geliştirme modunda çalıştırın**
```bash
npm run dev
```

## 📜 NPM Scripts

```json
{
  "build": "tsc",                    // TypeScript derleme
  "build:watch": "tsc --watch",     // Watch modunda derleme
  "dev": "tsc && gulp",             // Geliştirme build + gulp
  "clean": "rm -rf dist"            // Çıktı dizinini temizleme
}
```

## 🔧 Geliştirme

### TypeScript Derleme

```bash
# Tek seferlik derleme
npm run build

# Watch modunda derleme (otomatik yeniden derleme)
npm run build:watch
```

### Yeni Bileşen Ekleme

1. **Tip tanımlarını oluşturun** (`src/types/`)
2. **Servisi oluşturun** (`src/services/`)
3. **Bileşeni oluşturun** (`src/components/`)
4. **Ana uygulamaya ekleyin** (`src/main.ts`)

### Örnek Bileşen

```typescript
export class MyComponent {
  private container: HTMLElement;
  
  constructor(container: HTMLElement) {
    this.container = container;
    this.initialize();
  }
  
  private initialize(): void {
    // Bileşen başlatma kodu
  }
  
  public destroy(): void {
    // Temizlik kodu
  }
}
```

## 🏗️ Mimari

### Singleton Pattern
Ana uygulama ve servisler singleton pattern kullanır:

```typescript
export class NewsService {
  private static instance: NewsService;
  
  public static getInstance(): NewsService {
    if (!NewsService.instance) {
      NewsService.instance = new NewsService();
    }
    return NewsService.instance;
  }
}
```

### Component Lifecycle
Her bileşen standart yaşam döngüsüne sahiptir:

1. **Constructor**: Bileşen oluşturulur
2. **Initialize**: DOM ve event'ler hazırlanır
3. **Render**: HTML içeriği oluşturulur
4. **Bind Events**: Event listener'lar eklenir
5. **Destroy**: Temizlik yapılır

### Event Handling
Merkezi event yönetimi:

```typescript
// Global event handler
window.addEventListener('error', (event) => {
  app.handleError(event.error || new Error(event.message), 'Global');
});
```

## 📱 Responsive Tasarım

Proje Bootstrap 5 kullanarak responsive tasarım sağlar:

- **Mobile First**: Mobil öncelikli tasarım
- **Breakpoints**: xs, sm, md, lg, xl
- **Grid System**: 12 sütunlu grid sistemi
- **Components**: Responsive bileşenler

## 🔒 Güvenlik

- **Input Validation**: Kullanıcı girdisi doğrulama
- **XSS Prevention**: Cross-site scripting koruması
- **CSRF Protection**: Cross-site request forgery koruması
- **Secure Headers**: Güvenli HTTP başlıkları

## 📊 Performans

- **Lazy Loading**: Gerektiğinde yükleme
- **Code Splitting**: Kod bölme
- **Caching**: Akıllı önbellekleme
- **Minification**: Kod küçültme

## 🧪 Test

```bash
# Test çalıştırma
npm test

# Coverage raporu
npm run test:coverage

# E2E testler
npm run test:e2e
```

## 📦 Build ve Deployment

### Production Build

```bash
npm run build:prod
```

### Development Build

```bash
npm run build:dev
```

### Docker Deployment

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔄 Migration Guide

### JavaScript'ten TypeScript'e

1. **Dosya uzantısını değiştirin**: `.js` → `.ts`
2. **Tip tanımlarını ekleyin**
3. **Import/export syntax'ını güncelleyin**
4. **Type annotations ekleyin**

### Örnek Migration

**Önceki (JavaScript):**
```javascript
function addNews(title, category) {
  return newsService.createNews({ title, category });
}
```

**Sonrası (TypeScript):**
```typescript
function addNews(title: string, category: Category): NewsItem {
  return newsService.createNews({ title, category });
}
```

## 🐛 Hata Ayıklama

### TypeScript Hataları

```bash
# Tip hatalarını kontrol et
npx tsc --noEmit

# Strict mode'da derle
npx tsc --strict
```

### Runtime Hataları

```typescript
// Global error handler
window.addEventListener('error', (event) => {
  console.error('Runtime Error:', event.error);
});
```

## 📚 API Dokümantasyonu

### NewsService

```typescript
interface NewsService {
  getAllNews(): NewsItem[];
  getNewsById(id: string): NewsItem | undefined;
  createNews(data: NewsCreateData): NewsItem;
  updateNews(data: NewsUpdateData): NewsItem | null;
  deleteNews(id: string): boolean;
  filterNews(filter: NewsFilter): NewsItem[];
}
```

### NewsTable Component

```typescript
interface NewsTableOptions {
  enableSearch?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  itemsPerPage?: number;
}
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Proje Sahibi**: Gebze Belediyesi
- **Geliştirici**: [Your Name]
- **Email**: [your.email@example.com]

## 🙏 Teşekkürler

- TypeScript ekibi
- Bootstrap ekibi
- Tüm katkıda bulunanlara

---

**Not**: Bu proje geliştirme aşamasındadır. Production kullanımı için ek test ve güvenlik önlemleri gerekebilir. 