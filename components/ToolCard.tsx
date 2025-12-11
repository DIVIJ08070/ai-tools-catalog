"use client"

import Link from "next/link"
import type { Tool } from "@/data/tools"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

interface ToolCardProps {
  tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
  const pricingColors: Record<Tool["pricing"], string> = {
    Free: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900",
    Freemium: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900",
    Paid: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-900",
    "Free Trial": "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-900",
  }

  return (
    <Link href={`/tools/${tool.slug}`}>
<div
  className="group card-hover relative bg-card border rounded-xl p-6 h-full flex flex-col
             border-border/30 dark:border-gray-700"
>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="relative w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
            <Image
              src={tool.logo || "/placeholder.svg"}
              alt={tool.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/ai-tool-icon.jpg"
              }}
            />
          </div>
          <Badge variant="outline" className={pricingColors[tool.pricing]}>
            {tool.pricing}
          </Badge>
        </div>

        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {tool.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">{tool.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tool.categories.slice(0, 2).map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
          {tool.categories.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{tool.categories.length - 2}
            </Badge>
          )}
        </div>

       <Button
  size="sm"
  className="w-full gap-2 mt-auto"
>
  View Tool <ExternalLink className="w-3 h-3" />
</Button>
      </div>
    </Link>
  )
}
