# ai-tools-catalog1
AI Tools Catalog 2025: Modern AI Discovery PlatformA comprehensive catalog for discovering, filtering, and exploring the latest AI tools across 20+ categories, built with Next.js, React, and Tailwind CSS.✨ Key Features50+ AI Tools Database: Detailed metadata including pricing, categories, and descriptions.Intelligent Search & Filtering:Advanced Search: Fuzzy search using Fuse.js.Dynamic Filtering: Filter by category, pricing tier (free, freemium, paid).Sorting: By Popularity, Newest, or Alphabetically.Performance & SEO:Fast Performance: Static generation with generateStaticParams for zero-JS rendering.SEO Optimized: Proper metadata, Open Graph tags, and structured data.Modern UI/UX: Responsive Design, Built-in Dark Mode (next-themes), Beautiful UI with custom shadcn/ui patterns.🚀 Tech StackCategoryTechnologyPurposeFrameworkNext.js 16 (App Router)Modern, full-stack React frameworkStylingTailwind CSS v4Utility-first CSS frameworkSearchFuse.jsClient-side fuzzy search functionalityThemenext-themesDark/light mode managementDeploymentVercelRecommended hosting🛠️ Getting StartedPrerequisitesNode.js 18+npm or yarnInstallation & RunBash# 1. Clone and navigate
git clone https://github.com/YOUR_USERNAME/ai-tools-catalog.git
cd ai-tools-catalog

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open in browser
# Navigate to http://localhost:3000
📂 Project Structure (Key Files)ai-tools-catalog/
├── app/
│   ├── page.tsx             # Home page (Featured tools)
│   ├── tools/page.tsx       # All tools with filters and search
│   └── categories/page.tsx   # Categories showcase page
├── components/
│   ├── ToolCard.tsx         # Individual tool card component
│   ├── SearchBar.tsx        # Search functionality
│   └── Filters.tsx          # Category and price filters
└── data/
    └── tools.ts             # Complete AI tools database (50+)
