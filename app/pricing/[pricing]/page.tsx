import { tools } from "@/data/tools"
import ToolCard from "@/components/ToolCard"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Tool } from "@/data/tools"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  const pricingTypes: Tool["pricing"][] = ["Free", "Freemium", "Paid", "Free Trial"]
  return pricingTypes.map((pricing) => ({
    pricing: encodeURIComponent(pricing),
  }))
}

export function generateMetadata({ params }: { params: { pricing: string } }) {
  const pricing = decodeURIComponent(params.pricing)
  const pricingTools = tools.filter((t) => t.pricing === pricing)

  return {
    title: `${pricing} AI Tools | AI Tools Catalog 2025`,
    description: `Explore ${pricingTools.length} ${pricing} AI tools in our catalog.`,
  }
}

export default function PricingPage({ params }: { params: { pricing: string } }) {
  const pricing = decodeURIComponent(params.pricing) as Tool["pricing"]
  const pricingTools = tools.filter((t) => t.pricing === pricing)

  if (pricingTools.length === 0) {
    notFound()
  }

  const pricingDescriptions: Record<Tool["pricing"], string> = {
    Free: "Completely free tools with no cost or limitations",
    Freemium: "Free to start with optional premium features",
    Paid: "Premium tools with paid subscription or one-time purchase",
    "Free Trial": "Tools offering a free trial period before payment",
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

      {/* Pricing Content */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3">{pricing} Tools</h1>
            <p className="text-lg text-muted-foreground">{pricingDescriptions[pricing]}</p>
            <p className="text-muted-foreground mt-2">
              Found {pricingTools.length} {pricing} tools in our catalog
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
