# Image Optimization Guide

## Problem
Your How It Works page has very large images that cause rendering delays:
- `et-dashboard.png`: 2.9MB
- `et-topup.png`: 1.8MB
- `et-payout.png`: 1.8MB
- `et-convert.png`: 2.0MB

**Total: ~8.5MB** - This causes significant delays when loading over the network.

## What's Been Fixed (Code)
✅ Added lazy loading to section images (below the fold)
✅ Added loading skeleton for hero image
✅ Added preload hint for critical hero image
✅ Added fade-in transition for smoother UX

## What You Need to Do (Images)

### Option 1: Use Online Tools (Easiest)
1. Go to https://squoosh.app/ or https://tinypng.com/
2. Upload each image one by one
3. For Squoosh:
   - Select "WebP" format (best compression)
   - Or use "MozJPEG" with quality ~75-80
   - Target file size: Under 200KB per image
4. Download and replace the original files

### Option 2: Use Sharp (Automated - Recommended)
Install Sharp:
```bash
npm install -D sharp
```

Create a script `scripts/optimize-images.js`:
```javascript
import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const imagesToOptimize = [
  'public/images/et-dashboard.png',
  'public/images/et-topup.png',
  'public/images/et-payout.png',
  'public/images/et-convert.png',
];

async function optimizeImages() {
  for (const imagePath of imagesToOptimize) {
    console.log(`Optimizing ${imagePath}...`);

    // Create WebP version (best compression)
    await sharp(imagePath)
      .webp({ quality: 80 })
      .toFile(imagePath.replace('.png', '.webp'));

    // Also create optimized PNG as fallback
    await sharp(imagePath)
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(imagePath.replace('.png', '-optimized.png'));

    console.log(`✓ Created WebP and optimized PNG for ${imagePath}`);
  }
}

optimizeImages().catch(console.error);
```

Add to `package.json` scripts:
```json
"optimize-images": "node scripts/optimize-images.js"
```

Run:
```bash
npm run optimize-images
```

Then replace the original files with the optimized versions.

### Option 3: Use ImageMagick
If you have ImageMagick installed:
```bash
cd public/images
magick et-dashboard.png -quality 80 -strip et-dashboard-opt.png
magick et-topup.png -quality 80 -strip et-topup-opt.png
magick et-payout.png -quality 80 -strip et-payout-opt.png
magick et-convert.png -quality 80 -strip et-convert-opt.png
```

## Target File Sizes
Aim for these sizes after optimization:
- Each image: **100-200KB** (instead of 1.8-2.9MB)
- Total: **400-800KB** (instead of 8.5MB)

This will reduce load time by **90%**!

## Using WebP Format (Optional but Recommended)
WebP provides ~30% better compression than PNG/JPEG. To use WebP with fallback:

1. Generate WebP versions of your images
2. Update the image sources in your code to use WebP with PNG fallback
3. Modern browsers will automatically use WebP

## Verification
After optimization, check:
1. File sizes in `public/images/`
2. Visual quality (should look identical to users)
3. Test on deployed server - delay should be gone!
