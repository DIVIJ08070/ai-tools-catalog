"use client"

import type { Tool } from "@/data/tools"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface FiltersProps {
  categories: string[]
  selectedCategories: string[]
  onCategoriesChange: (categories: string[]) => void
  selectedPricing: string[]
  onPricingChange: (pricing: string[]) => void
  sortBy: "name-asc" | "name-desc"
  onSortChange: (sort: "name-asc" | "name-desc") => void
}

export default function Filters({
  categories,
  selectedCategories,
  onCategoriesChange,
  selectedPricing,
  onPricingChange,
  sortBy,
  onSortChange,
}: FiltersProps) {
  const [showCategories, setShowCategories] = useState(false)
  const [showPricing, setShowPricing] = useState(false)

  const pricingOptions: Tool["pricing"][] = ["Free", "Freemium", "Paid", "Free Trial"]

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== category))
    } else {
      onCategoriesChange([...selectedCategories, category])
    }
  }

  const togglePricing = (pricing: string) => {
    if (selectedPricing.includes(pricing)) {
      onPricingChange(selectedPricing.filter((p) => p !== pricing))
    } else {
      onPricingChange([...selectedPricing, pricing])
    }
  }

  const handleReset = () => {
    onCategoriesChange([])
    onPricingChange([])
    onSortChange("name-asc")
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedPricing.length > 0

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        {/* Sort */}
        <div className="flex gap-2">
          <Button
            variant={sortBy === "name-asc" ? "default" : "outline"}
            size="sm"
            onClick={() => onSortChange("name-asc")}
          >
            A-Z
          </Button>
          <Button
            variant={sortBy === "name-desc" ? "default" : "outline"}
            size="sm"
            onClick={() => onSortChange("name-desc")}
          >
            Z-A
          </Button>
        </div>

        {/* Category Filter */}
        <div className="relative">
          <Button variant="outline" size="sm" onClick={() => setShowCategories(!showCategories)} className="gap-2">
            Categories {selectedCategories.length > 0 && `(${selectedCategories.length})`}
            <ChevronDown className="w-4 h-4" />
          </Button>
          {showCategories && (
            <div className="absolute top-full mt-2 left-0 bg-card border border-border rounded-lg shadow-lg z-20 min-w-56 p-3 space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategories.includes(category) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pricing Filter */}
        <div className="relative">
          <Button variant="outline" size="sm" onClick={() => setShowPricing(!showPricing)} className="gap-2">
            Pricing {selectedPricing.length > 0 && `(${selectedPricing.length})`}
            <ChevronDown className="w-4 h-4" />
          </Button>
          {showPricing && (
            <div className="absolute top-full mt-2 left-0 bg-card border border-border rounded-lg shadow-lg z-20 min-w-48 p-3 space-y-2">
              {pricingOptions.map((pricing) => (
                <button
                  key={pricing}
                  onClick={() => togglePricing(pricing)}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedPricing.includes(pricing) ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  {pricing}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Reset
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {(selectedCategories.length > 0 || selectedPricing.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((category) => (
            <Badge key={category} variant="default" className="cursor-pointer" onClick={() => toggleCategory(category)}>
              {category} ×
            </Badge>
          ))}
          {selectedPricing.map((pricing) => (
            <Badge key={pricing} variant="default" className="cursor-pointer" onClick={() => togglePricing(pricing)}>
              {pricing} ×
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
