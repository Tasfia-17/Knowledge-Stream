# SwiftRead AI

## Overview

SwiftRead AI is a production-ready AI-powered mobile application built with Expo React Native. It transforms long-form content into speed-readable knowledge streams using AI summaries, RSVP (Rapid Serial Visual Presentation) speed reading, and a beautiful glassmorphism-inspired UI.

## Tagline
"Turn the internet into speed-readable knowledge."

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **Mobile framework**: Expo / React Native (Expo Router file-based routing)
- **API framework**: Express 5 (shared api-server artifact)
- **Database**: PostgreSQL + Drizzle ORM (api-server)
- **State management**: React Context (AppContextProvider) + AsyncStorage for persistence
- **UI animations**: React Native Animated API + expo-linear-gradient
- **Icons**: @expo/vector-icons (Feather, Ionicons, SymbolView)
- **Typography**: Inter (@expo-google-fonts/inter)
- **Navigation**: Tab-based (NativeTabs with liquid glass on iOS 26+, classic Tabs fallback)

## Structure

```text
artifacts/
├── mobile/                    # Expo React Native app
│   ├── app/
│   │   ├── _layout.tsx        # Root layout with providers
│   │   ├── onboarding.tsx     # 3-step onboarding
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx    # 5-tab navigation (NativeTabs + classic fallback)
│   │   │   ├── index.tsx      # Home — dashboard, paste input, trending articles
│   │   │   ├── reader.tsx     # Speed reader settings & article selection
│   │   │   ├── insights.tsx   # Knowledge Vault — saved insights
│   │   │   ├── library.tsx    # Article library with category filters
│   │   │   └── profile.tsx    # Analytics, interests, premium upsell
│   │   ├── article/[id].tsx   # Article detail (summaries, insights, full text)
│   │   └── rsvp/[id].tsx      # RSVP speed reader with ORP highlighting
│   ├── components/
│   │   ├── AnimatedBackground.tsx  # Floating orb animated background
│   │   ├── ArticleCard.tsx         # Article card with category badge, meta
│   │   ├── ErrorBoundary.tsx       # Error boundary (class component)
│   │   ├── ErrorFallback.tsx       # Error fallback UI
│   │   ├── GlassCard.tsx           # Reusable glassmorphism card
│   │   └── InsightCard.tsx         # Insight card with share + delete
│   ├── constants/colors.ts    # Full dark/light theme palette
│   ├── context/AppContext.tsx # Global state (articles, insights, stats)
│   └── data/demoArticles.ts   # 5 high-quality demo articles
├── api-server/                # Express API server (shared backend)
└── mockup-sandbox/            # UI prototyping sandbox
lib/
├── api-spec/                  # OpenAPI spec + Orval codegen config
├── api-client-react/          # Generated React Query hooks
├── api-zod/                   # Generated Zod schemas
└── db/                        # Drizzle ORM schema + DB connection
```

## Key Features

### Speed Reading Engine (RSVP)
- Words appear one by one at center of screen
- ORP (Optimal Recognition Point) letter highlighted in accent blue
- Speeds: 200, 300, 400, 500, 600, 700, 800 WPM
- Controls: Play/Pause, Rewind 10 words, Forward 10 words, Speed selector
- Animated word transitions with fade + spring scale
- Progress bar with time remaining

### AI Processing (Demo Mode)
- One-sentence summary
- 30-second summary
- 2-minute deep dive summary
- 5 key insights (tappable to save)
- "Why this matters" explanation
- Full article text viewer

### Navigation (5 Tabs)
1. **Home** — Animated dashboard, paste-to-add content, stats, daily briefing, trending
2. **Reader** — Speed configuration + continue reading
3. **Insights** — Knowledge Vault with saved insights, share as cards
4. **Library** — All articles with category filters
5. **Profile** — Analytics dashboard, interests personalization, premium upsell

### Onboarding (3 steps)
1. Welcome screen with app features
2. Interest selection (8 categories)
3. Reading speed selection

### Design System
- Dark-first glassmorphism UI with electric blue → deep purple gradient
- Animated floating orb background
- Custom gradient category badges
- iOS liquid glass tab bar support (iOS 26+)
- Smooth micro-animations throughout

## Running

- Mobile: `pnpm --filter @workspace/mobile run dev`
- API: `pnpm --filter @workspace/api-server run dev`
- Codegen: `pnpm --filter @workspace/api-spec run codegen`

## Color Palette

- Primary: `#4F8EF7` (Electric Blue)
- Deep: `#6C3EF7` (Deep Purple)
- Accent: `#00E5FF` (Neon Cyan)
- Violet: `#B06EFF` (Soft Violet)
- Background: `#050810` (Deep Space)
- Surface: `#0D1120`
