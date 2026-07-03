/**
 * StoryHandoff card content.
 *
 * Layout & positions are driven using percentages measured against the
 * 3840×2160 final frame (`frame_21.jpg`), so the live DOM tracks the canvas
 * pixel-for-pixel at any viewport size.
 */

export interface CardContent {
  id: string;
  image: string;
  imageAspect?: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export interface CardLayout {
  id: string;
  left: string;   // % of stage width
  top: string;    // % of stage height
  width: string;  // % of stage width
  height: string; // % of stage height
}

export const cardLayout: CardLayout[] = [
  // Left card: left 23.0%, top 43.1%, width 20.1%, height 29.7%
  { id: 'left',  left: '23.0%', top: '43.1%', width: '20.1%', height: '29.7%' },
  // Right card: left 45.9%, top 41.6%, width 36.7%, height 30.1%
  { id: 'right', left: '45.9%', top: '41.6%', width: '36.7%', height: '30.1%' },
];

export const cards: CardContent[] = [
  {
    id: 'left',
    image: '/cards/card-left.jpg',
    imageAspect: '4 / 5',
    eyebrow: 'Strategy',
    title: 'Institutional Strategy',
    description:
      'Long-range planning, governance and organisational design tailored for educational institutions.',
    href: '/about',
    cta: 'Explore',
  },
  {
    id: 'right',
    image: '/cards/card-right.jpg',
    imageAspect: '16 / 10',
    eyebrow: 'Operations',
    title: 'Integrated Operations',
    description:
      'HR, finance, infrastructure, technology, student development and operations — unified under one consultancy.',
    href: '/about',
    cta: 'Explore',
  },
];
