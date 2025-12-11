import { tools } from "@/data/tools"
import ToolCard from "@/components/ToolCard"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  const categories = Array.from(new Set(tools.flatMap((tool) => tool.categories)))
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }))
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category)
  const categoryTools = tools.filter((t) => t.categories.includes(category))

  return {
    title: `${category} Tools | AI Tools Catalog 2025`,
    description: `Explore ${categoryTools.length} AI tools in the ${category} category.`,
  }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category)
  const categoryTools = tools.filter((t) => t.categories.includes(category))

  if (categoryTools.length === 0) {
    notFound()
  }

  return (
    <div className="flex-1">
      {/* Breadcrumb */}
      <div className="border-b border-border/40 sticky top-16 bg-background/95 backdrop-blur z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/tools" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
        </div>
      </div>

      {/* Category Content */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3">{category}</h1>
            <p className="text-lg text-muted-foreground">
              Discover {categoryTools.length} AI tools in the {category} category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
