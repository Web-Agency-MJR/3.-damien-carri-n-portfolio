# 3. Damien Carrión Portfolio

Role & Goal: You are a world-class UI/UX Designer and Creative Frontend Developer specializing in high-end art gallery websites. Build a breathtaking, modern, and highly interactive Landing Page & Unified Portfolio system for the Fine Artist "Damien Carrión" (Painter, Sculptor, and Gold-gilding Master).

Tech Stack & Standards:
- Framework: React with TypeScript, Tailwind CSS, Framer Motion, Lucide React, and Shadcn UI components (Dialog, Tabs, Accordion, Sheet/Drawer).
- Performance: Clean, modular, 60 FPS smooth animations, responsive mobile-first design, semantic HTML, and proper SEO structure.

Design Tokens & Art Direction:
- Museum Aesthetic: Background in Off-White (#FBFBFB), subtle ultralight gray accents, and deep charcoal text (#111111).
- Typography: Dual font setup — Luxurious Serif (Playfair Display or Cormorant Garamond) for titles, artist statement, and artwork names; clean, modern Sans-Serif (Inter or Plus Jakarta Sans) for UI, navigation, and technical specifications.
- Spacing: Generous padding (py-20, gap-8) giving ample breathing room for the art pieces.

-------------------------------------------------------------------
1. FLOATING GLASSMORPHIC HEADER & NAVIGATION
-------------------------------------------------------------------
- Header Style: Floating glassmorphic bar (backdrop-blur-md, bg-white/70 border border-white/20, rounded-full) fixed at the top.
- Logo: Minimalist text logo "DAMIEN CARRIÓN".
- Desktop Nav Items: Home, About me, Gallery (2D), Gallery V (GOLD), Gallery (3D), Vídeos, CV, Proyectos. (Set these up with clean React routes/state triggers).
- Mobile Navigation: Responsive hamburger menu opening a vertical drawer/sheet (Shadcn Sheet). When opened, it overlays the screen with a heavy blurred backdrop (backdrop-blur-xl bg-black/40) focusing sharply on the vertical menu links.

-------------------------------------------------------------------
2. HERO SECTION (INTERACTIVE SCULPTURE PARALLAX & PAINT REVEAL)
-------------------------------------------------------------------
- Parallax Concept: Full viewport hero section. The background features a high-resolution, artistic image composition of a broken/fragmented sculpture with pieces scattered around.
- Parallax Scroll Effect: As the user scrolls down, use Framer Motion scroll-driven animation (useScroll, useTransform) to seamlessly move the fragments together, assembling the full sculpture smoothly in place.
- Title Reveal Animation: The main heading "Damien Carrión" enters with a smooth, fluid stroke/handwriting paint reveal effect as if brushed onto the canvas.
- Subtitle: "Compartir emociones a través del Arte...".
- Color Palette: Cream, off-white, subtle earth/stone tones, and deep charcoal/black.

-------------------------------------------------------------------
3. 3-ROW INFINITE MARQUEE CAROUSEL (ARTIST AT WORK)
-------------------------------------------------------------------
- Concept: A dynamic visual showcase replacing old oval grids with 21 high-quality images showcasing the artist sculpting, welding, and painting.
- Layout: 3 horizontal continuous infinite marquee rows, each containing 7 images.
- Aspect Ratio & Styling: 1:1 square ratio for each image with soft rounded corners (rounded-2xl), subtle inner shadow, and greyscale-to-color transition on hover.
- Motion Directions:
  * Row 1: Right to Left infinite smooth scroll.
  * Row 2: Left to Right infinite smooth scroll.
  * Row 3: Right to Left infinite smooth scroll.
- Interactive Behavior: Marquee pauses or slows smoothly on hover, allowing users to inspect photos.

-------------------------------------------------------------------
4. UNIFIED FILTERABLE GALLERY & LIGHTBOX MODAL (SHADCN UI)
-------------------------------------------------------------------
- Unified System: Replace separate multiple gallery pages with a unified, filterable Portfolio section using Shadcn Tabs.
- Categories: "Todas las Obras", "Pintura (2D)", "Escultura (3D)", "Dorado (Gallery V)", "Vídeos", "Obra Disponible".
- Portfolio Grid: Responsive Masonry / Asymmetric Grid (1 column on mobile, 2 on tablet, 3-4 on desktop).
- Hover State: Image scale-[1.02] duration-300 transition with a subtle dark gradient overlay revealing artwork title and year.
- Lightbox Modal (Shadcn Dialog): Clicking any artwork opens a full-screen, clean Lightbox containing:
  * High-res image with smooth zoom preview.
  * Right/Bottom Technical Panel:
    - Title of Artwork
    - Technique & Support (e.g., "Óleo sobre lienzo", "Bronce fundido", "Pan de oro")
    - Dimensions (e.g., "120 x 90 cm")
    - Year of Creation
    - Status Badge: "Disponible" (Green badge), "Colección Privada" (Neutral badge), "En Galería" (Gold badge).
    - CTA Button: "Consultar sobre esta pieza" — clicking this opens/scrolls to the Contact Form and pre-fills the subject line with: "Consulta sobre: [Nombre de la obra]".

-------------------------------------------------------------------
5. MOCK DATA STRUCTURE (artworks.ts)
-------------------------------------------------------------------
Create a structured mock dataset in `src/data/artworks.ts` with the following TypeScript interface:

export interface Artwork {
  id: string;
  title: string;
  year: number;
  technique: string;
  dimensions: string;
  imageUrl: string;
  category: '2D' | '3D' | 'GOLD' | 'Videos';
  status: 'available' | 'sold' | 'gallery';
  description?: string;
}

Provide at least 10 realistic sample artwork entries with high-quality Unsplash art/sculpture placeholders.

-------------------------------------------------------------------
6. BIOGRAPHY, MANIFESTO & ARTIST STATEMENT
-------------------------------------------------------------------
- Layout: Two-column editorial section.
  * Left Column: Sticky portrait photo of Damien Carrión working in his studio.
  * Right Column: Artist Statement / Manifesto ("Manipulador de material artístico... un paseo por las calles de mis adentros") followed by a clean vertical timeline of major career milestones.

-------------------------------------------------------------------
7. EXHIBITIONS & CURRICULUM (ACCORDION)
-------------------------------------------------------------------
- Clean, minimal Shadcn Accordion grouped into:
  * Exposiciones Individuales
  * Exposiciones Colectivas
  * Premios y Menciones

-------------------------------------------------------------------
8. CONTACT & INQUIRY FORM
-------------------------------------------------------------------
- Minimalist, validated contact form (Nombre, Email, Asunto, Mensaje).
- Handles pre-filled subjects from the artwork Lightbox automatically.
- Direct links to Email (damiencarrion13@gmail.com) and Instagram icon.

-------------------------------------------------------------------
9. MICRO-INTERACTIONS & MOTION
-------------------------------------------------------------------
- Scroll animations: Smooth fade-in-up for all sections using Framer Motion.
- Loading States: Skeleton loaders for gallery images while loading.
- Ensure all animations render smoothly at 60 FPS.
- All UI labels, buttons, and content must be in Spanish.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3fd2e2c7-cfcc-4555-a326-fd4c5eaf5216).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
