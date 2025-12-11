import { tools } from "@/data/tools"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ToolCard from "@/components/ToolCard"
import { ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {

  const {slug} = await params;

  const tool = tools.find((t) => t.slug === slug)

  if (!tool) {
    return {
      title: "Tool not found",
    }
  }

  return {
    title: `${tool.name} | AI Tools Catalog 2025`,
    description: tool.description,
    openGraph: {
      title: tool.name,
      description: tool.description,
      type: "website",
    },
  }
}

export default async function ToolDetailPage({ params }: { params: { slug: string } }) {
  const {slug} = await params;
  const tool = tools.find((t) => t.slug === slug)

  if (!tool) {
    notFound()
  }

  const pricingColors: Record<typeof tool.pricing, string> = {
    Free: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900",
    Freemium: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900",
    Paid: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-900",
    "Free Trial": "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-900",
  }

  const similarTools = tools
    .filter((t) => t.slug !== tool.slug && t.categories.some((cat) => tool.categories.includes(cat)))
    .slice(0, 3)

  return (
    <div className="flex-1">
      {/* Breadcrumb */}
      <div className="border-b border-border/40 sticky top-16 bg-background/95 backdrop-blur z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/tools" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
        </div>
      </div>

      {/* Tool Details */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
            <div className="relative w-20 h-20 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden border border-border/50">
              <Image
                src={tool.logo || "/ai-tool-icon.jpg"}
                alt={tool.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                // onError={(e) => {
                //   e.currentTarget.src = "/ai-tool-icon.jpg"
                // }}
              />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold mb-3">{tool.name}</h1>
              <div className="flex flex-wrap gap-3 items-center">
                <Badge className={pricingColors[tool.pricing]}>{tool.pricing}</Badge>
                <Button asChild className="gap-2">
                  <a href={tool.url} target="_blank" rel="noopener noreferrer">
                    Visit Tool <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-card border border-border/50 rounded-xl p-6 sm:p-8 mb-8">
            <h2 className="text-lg font-semibold mb-3">About</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{tool.description}</p>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {tool.categories.map((category) => (
                <Link key={category} href={`/category/${encodeURIComponent(category)}`} className="group">
                  <Badge
                    variant="secondary"
                    className="cursor-pointer group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-card border border-border/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Pricing Model</p>
              <p className="font-semibold">{tool.pricing}</p>
            </div>
            <div className="bg-card border border-border/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Categories</p>
              <p className="font-semibold">{tool.categories.length}</p>
            </div>
          </div>

          {/* Similar Tools */}
          {similarTools.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Similar Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarTools.map((similarTool) => (
                  <ToolCard key={similarTool.slug} tool={similarTool} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
