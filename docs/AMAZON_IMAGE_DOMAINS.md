# Amazon Image Domains Configuration

This document lists the Amazon image domains that need to be configured in Next.js for product images.

---

## 🖼️ **Common Amazon Image Domains**

### **Primary Domains:**
- `m.media-amazon.com` - Main media domain (most common)
- `images-amazon.com` - General images domain
- `images-na.ssl-images-amazon.com` - North America SSL images
- `images-eu.ssl-images-amazon.com` - Europe SSL images  
- `images-fe.ssl-images-amazon.com` - Far East SSL images
- `ecx.images-amazon.com` - Extended content images

### **Regional Variations:**
- `images-amazon.com` - Global
- `m.media-amazon.com` - Mobile optimized (most common)
- `images.amazon.com` - Alternative format

### **Legacy Domains:**
- `ec1.images-amazon.com` - Legacy domain 1
- `ec2.images-amazon.com` - Legacy domain 2
- `g-ec4.images-amazon.com` - Legacy domain 3

---

## ⚙️ **Next.js Configuration**

### **Current Configuration:**
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'm.media-amazon.com',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'images-amazon.com',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'images-na.ssl-images-amazon.com',
      pathname: '/images/**',
    },
    {
      protocol: 'https',
      hostname: 'images-eu.ssl-images-amazon.com',
      pathname: '/images/**',
    },
    {
      protocol: 'https',
      hostname: 'images-fe.ssl-images-amazon.com',
      pathname: '/images/**',
    },
    {
      protocol: 'https',
      hostname: 'ecx.images-amazon.com',
      pathname: '/images/**',
    },
  ],
}
```

---

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **"hostname not configured" Error**
   - Add the specific hostname to `remotePatterns`
   - Restart the development server after config changes

2. **Images Not Loading**
   - Check browser network tab for the actual image URL
   - Verify the hostname matches the configuration
   - Ensure HTTPS protocol is used

3. **Performance Issues**
   - Consider using `unoptimized={true}` for Amazon images
   - Amazon images are already optimized
   - Next.js optimization might add unnecessary overhead

### **Debugging Steps:**

1. **Check Image URL Format**
   ```javascript
   console.log('Image URL:', imageUrl);
   // Should be: https://m.media-amazon.com/images/I/...
   ```

2. **Test Image Accessibility**
   ```bash
   curl -I "https://m.media-amazon.com/images/I/example.jpg"
   # Should return 200 OK
   ```

3. **Verify Next.js Config**
   ```bash
   # Restart dev server after config changes
   npm run dev
   ```

---

## 🛡️ **Fallback Strategy**

### **Image Error Handling:**
```typescript
<Image
  src={imageUrl}
  alt={productName}
  width={160}
  height={160}
  unoptimized={imageUrl.includes('amazon')}
  onError={(e) => {
    // Hide broken image and show fallback
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
    const fallback = target.nextElementSibling as HTMLElement;
    if (fallback) fallback.style.display = 'flex';
  }}
/>
<div className="fallback-placeholder" style={{ display: 'none' }}>
  <Package size={32} className="text-gray-400" />
</div>
```

### **Progressive Enhancement:**
1. **Try Amazon Image** - Load from Amazon CDN
2. **Fallback to Placeholder** - Show generic product icon
3. **Graceful Degradation** - UI works without images

---

## 📊 **Performance Considerations**

### **Image Optimization:**
- **Amazon Images**: Already optimized, consider `unoptimized={true}`
- **Caching**: Amazon images have good cache headers
- **Loading**: Use `loading="lazy"` for images below the fold

### **Bandwidth Optimization:**
- **Responsive Images**: Use appropriate sizes for different viewports
- **Format Selection**: Let Next.js choose optimal format (WebP, AVIF)
- **Compression**: Amazon handles compression automatically

---

## 🔄 **Future Considerations**

### **Additional Domains:**
If new Amazon image domains are encountered:
1. Add to `remotePatterns` in `next.config.ts`
2. Test with actual product images
3. Update this documentation

### **CDN Integration:**
Consider proxying Amazon images through your own CDN for:
- Better caching control
- Image transformations
- Analytics tracking
- Consistent domain policy

---

This configuration should handle all common Amazon image domains and provide robust fallback mechanisms.