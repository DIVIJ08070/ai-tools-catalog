import Link from "next/link"
import { Button } from "@/components/ui/button"
import { tools } from "@/data/tools"
import ToolCard from "@/components/ToolCard"
import { ArrowRight } from "lucide-react"
import Prism from "@/components/Prism"
import TextType from "@/components/TextType"

export const metadata = {
  title: "AI Tools Catalog 2025 | Discover Best AI Tools",
  description:
    "Explore 50+ top AI tools including ChatGPT, Claude, Midjourney, and more. Find the perfect tool for your needs.",
}

export default function Home() {
  const featuredTools = tools.filter((tool) => tool.featured).slice(0, 6)
  const allCategories = Array.from(new Set(tools.flatMap((tool) => tool.categories))).slice(0, 6)

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      {/* Prism Background */}
<div className="absolute inset-0 -z-10 overflow-hidden">
  <div className="w-full h-[600px] relative">
    <Prism
      animationType="rotate"
      timeScale={0.5}
      height={3.5}
      baseWidth={5.5}
      scale={3.6}
      hueShift={0}
      colorFrequency={1}
      noise={0}
      glow={1}
    />
  </div>
</div>
<section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-card/50">
  <div className="max-w-4xl mx-auto text-center">
    
    {/* Badge */}
    <div className="inline-block mb-4">
      <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
        Discover the Best AI Tools
      </span>
    </div>

    {/* Heading */}
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
      AI Tools Catalog <span className="text-primary">2025</span>
    </h1>

    {/* Description */}
    <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
      Explore a curated collection of 50+ top-rated AI tools. From chatbots to image generation, find everything
      you need to supercharge your productivity.
    </p>

    {/* Typing section: side by side */}
<div className="flex justify-center items-baseline gap-2 text-lg sm:text-xl font-semibold mb-10">
  {/* Static text */}
  <span className="text-accent">Search best AI tool for</span>

  {/* Typing text */}
  <span className="text-primary text-2xl sm:text-3xl inline-block w-[300px] text-left">
    <TextType
      text={[
        "Chatbots",
        "Image Generation",
        "Coding",
        "Video Creation",
        "Productivity",
        "Marketing",
      ]}
      typingSpeed={70}
      pauseDuration={1200}
      showCursor={true}
      cursorCharacter="|"
    />
  </span>
</div>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button size="lg" asChild>
        <Link href="/tools" className="flex items-center gap-2">
          Explore All Tools <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
      <Button size="lg" variant="outline" asChild>
        <a href="#featured">See Featured Tools</a>
      </Button>
    </div>

  </div>
</section>
      {/* Featured Tools Section */}
      <section id="featured" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked AI tools that are transforming the industry in 2025
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/tools">View All {tools.length} Tools</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Find tools by their primary use case</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {allCategories.map((category) => {
              const count = tools.filter((t) => t.categories.includes(category)).length
              return (
                <Link
                  key={category}
                  href={`/category/${encodeURIComponent(category)}`}
                  className="group card-hover bg-background border border-border/50 rounded-lg p-4 text-center hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{category}</h3>
                  <p className="text-sm text-muted-foreground">{count} tools</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{tools.length}+</div>
              <p className="text-muted-foreground">AI Tools</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                {Array.from(new Set(tools.flatMap((t) => t.categories))).length}+
              </div>
              <p className="text-muted-foreground">Categories</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                {tools.filter((t) => t.pricing === "Free").length}
              </div>
              <p className="text-muted-foreground">Free Tools</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">2025</div>
              <p className="text-muted-foreground">Latest Edition</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
