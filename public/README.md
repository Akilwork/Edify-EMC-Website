# Public Assets

This folder contains all static assets served at the root URL.

## Structure

```
public/
├── images/
│   ├── hero/            ← Hero background images (e.g. Landing.jpg)
│   ├── about/           ← About page images (e.g. Who We Are.png)
│   ├── services/        ← Service imagery (e.g. Services Overview.png)
│   ├── team/            ← Team member portrait photos
│   └── case-studies/    ← Case study thumbnail images
├── videos/
│   └── *.mp4            ← Video files (e.g. pindown.io_1781004854.mp4)
└── fonts/               ← Self-hosted fonts (if not using Google Fonts)
```

## Usage in Code

```tsx
// Next.js Image component (optimised)
import Image from "next/image";
<Image src="/images/hero/Landing.jpg" alt="Hero" fill />

// HTML video tag
<video src="/videos/pindown.io_1781004854.mp4" autoPlay muted loop />
```
