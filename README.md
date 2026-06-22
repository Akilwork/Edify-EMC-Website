# Edify EMC Website

Official website for **Edify Management Consultancy** — built with Next.js 15, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (home)/             # Home route group
│   ├── about/              # About page
│   ├── services/           # Services page
│   ├── case-studies/       # Case Studies page
│   ├── contact/            # Contact page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── layout/             # Navbar, Footer, etc.
│   ├── sections/           # Page-specific sections
│   │   ├── home/
│   │   ├── about/
│   │   ├── services/
│   │   ├── case-studies/
│   │   └── contact/
│   └── ui/                 # Reusable UI primitives
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities & helpers
├── types/                  # TypeScript type definitions
└── data/                   # Static data / content
public/
├── images/                 # Static images
├── videos/                 # Video assets
└── fonts/                  # Custom fonts
```
