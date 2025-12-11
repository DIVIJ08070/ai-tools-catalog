"use client"

import { useMemo, useState, useCallback, useEffect } from "react"
import Fuse from "fuse.js"
import { tools } from "@/data/tools"
import ToolCard from "@/components/ToolCard"
import SearchBar from "@/components/SearchBar"
import Filters from "@/components/Filters"
import { useSearchParams } from "next/navigation"

export default function ToolsPage() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPricing, setSelectedPricing] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc">("name-asc")

  // Load filters from URL on mount
  useEffect(() => {
    const categories = searchParams.get("categories")?.split(",").filter(Boolean) || []
    const pricing = searchParams.get("pricing")?.split(",").filter(Boolean) || []
    const sort = (searchParams.get("sort") as "name-asc" | "name-desc") || "name-asc"

    setSelectedCategories(categories)
    setSelectedPricing(pricing)
    setSortBy(sort)
    setSearchTerm(searchParams.get("search") || "")
  }, [searchParams])

  const allCategories = useMemo(() => Array.from(new Set(tools.flatMap((tool) => tool.categories))).sort(), [])

  // Fuse.js setup for fuzzy search
  const fuse = useMemo(
    () =>
      new Fuse(tools, {
        keys: ["name", "description", "categories"],
        threshold: 0.3,
        ignoreLocation: true,
      }),
    [],
  )

  // Filter and search logic
  const filteredTools = useMemo(() => {
    let result = tools

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((tool) => selectedCategories.some((cat) => tool.categories.includes(cat)))
    }

    // Pricing filter
    if (selectedPricing.length > 0) {
      result = result.filter((tool) => selectedPricing.includes(tool.pricing))
    }

    // Search
    if (searchTerm) {
      const searchResults = fuse.search(searchTerm)
      result = searchResults.map((r) => r.item)
    }

    // Sort
    if (sortBy === "name-asc") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "name-desc") {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name))
    }

    return result
  }, [searchTerm, selectedCategories, selectedPricing, sortBy, fuse])

  const updateURL = useCallback(
    (newSearch: string, newCategories: string[], newPricing: string[], newSort: "name-asc" | "name-desc") => {
      const params = new URLSearchParams()
      if (newSearch) params.set("search", newSearch)
      if (newCategories.length > 0) params.set("categories", newCategories.join(","))
      if (newPricing.length > 0) params.set("pricing", newPricing.join(","))
      if (newSort !== "name-asc") params.set("sort", newSort)

      const queryString = params.toString()
      const newUrl = queryString ? `/tools?${queryString}` : "/tools"
      window.history.replaceState({}, "", newUrl)
    },
    [],
  )

  const handleSearchChange = useCallback(
    (term: string) => {
      setSearchTerm(term)
      updateURL(term, selectedCategories, selectedPricing, sortBy)
    },
    [selectedCategories, selectedPricing, sortBy, updateURL],
  )

  const handleCategoriesChange = useCallback(
    (cats: string[]) => {
      setSelectedCategories(cats)
      updateURL(searchTerm, cats, selectedPricing, sortBy)
    },
    [searchTerm, selectedPricing, sortBy, updateURL],
  )

  const handlePricingChange = useCallback(
    (pricing: string[]) => {
      setSelectedPricing(pricing)
      updateURL(searchTerm, selectedCategories, pricing, sortBy)
    },
    [searchTerm, selectedCategories, sortBy, updateURL],
  )

  const handleSortChange = useCallback(
    (sort: "name-asc" | "name-desc") => {
      setSortBy(sort)
      updateURL(searchTerm, selectedCategories, selectedPricing, sort)
    },
    [searchTerm, selectedCategories, selectedPricing, updateURL],
  )

  return (
    <div className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">All AI Tools</h1>
          <p className="text-muted-foreground">Explore {tools.length} AI tools with powerful search and filtering</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Filters
            categories={allCategories}
            selectedCategories={selectedCategories}
            onCategoriesChange={handleCategoriesChange}
            selectedPricing={selectedPricing}
            onPricingChange={handlePricingChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
        </div>

        {/* Results */}
        {filteredTools.length > 0 ? (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredTools.length} of {tools.length} tools
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No tools found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategories([])
                setSelectedPricing([])
                setSortBy("name-asc")
              }}
              className="mt-4 text-primary hover:underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
