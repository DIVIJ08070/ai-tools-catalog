export interface Tool {
  slug: string
  name: string
  description: string
  categories: string[]
  pricing: "Free" | "Freemium" | "Paid" | "Free Trial"
  url: string
  logo: string
  featured?: boolean
}

export type PricingType = Tool["pricing"]
