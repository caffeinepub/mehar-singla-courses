# Design Brief

## Direction

Premium Educational — E-learning platform conveying professionalism, expertise, and approachability.

## Tone

Modern, refined, trustworthy minimalism with subtle depth.

## Differentiation

Course cards with background images, instructor hero profile, clean dashboard typography, and warm accent CTAs elevate standard course platforms.

## Color Palette

| Token      | OKLCH           | Role                                   |
| ---------- | --------------- | -------------------------------------- |
| background | 0.99 0.005 280  | Clean light backdrop, trustworthy      |
| foreground | 0.18 0.02 280   | Deep indigo text, high contrast        |
| primary    | 0.45 0.2 265    | Deep indigo — professionalism, trust   |
| accent     | 0.65 0.18 55    | Warm amber-orange — engagement, CTAs   |
| muted      | 0.94 0.02 280   | Light secondary surfaces               |
| destructive| 0.55 0.22 25    | Red — warnings, removals               |

## Typography

- Display: Lora — elegant serif headings, instructor hero, course titles
- Body: Plus Jakarta Sans — modern sans-serif, UI labels, descriptions
- Scale: hero `text-5xl font-bold tracking-tight`, h2 `text-3xl font-bold`, label `text-sm font-semibold`, body `text-base`

## Elevation & Depth

Card-based surfaces with subtle shadows; header has light border-b, content sections alternate background tints, footer has border-t.

## Structural Zones

| Zone    | Background           | Border    | Notes                         |
| ------- | -------------------- | --------- | ----------------------------- |
| Header  | bg-card with border-b| border    | Navigation, instructor profile|
| Content | bg-background        | —         | Course grid, dashboard        |
| Cards   | bg-card              | border    | Course, profile, form fields  |
| Footer  | bg-muted/5 border-t | border    | Links, copyright              |

## Spacing & Rhythm

Gap 2rem between major sections; card grid gap 1.5rem; micro-spacing (p-4, gap-2) for internal card content.

## Component Patterns

- Buttons: Primary indigo `bg-primary text-primary-foreground`, rounded-lg, hover elevation
- Cards: `bg-card border rounded-lg shadow-card`, 12px radius, optional image top
- Badges: Small, rounded-full, `bg-accent/10 text-accent` for level/status

## Motion

- Entrance: Fade-in on page load, stagger courses
- Hover: Button/card elevation shift, 0.3s smooth transition
- Decorative: Subtle opacity transitions

## Constraints

- No gradients on text or backgrounds — use pure OKLCH colors
- Image cards must have consistent aspect ratio (4:3 for courses)
- Maintain AA+ contrast in light and dark modes
- Dark mode: indigo primary becomes cyan (0.75 0.15 190), accent shifts to golden (0.75 0.15 85)

## Signature Detail

Instructor hero section with large Lora headings, warm accent underline, and course count badge — establishes authority and warmth on landing page.
