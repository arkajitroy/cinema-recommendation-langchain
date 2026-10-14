export interface RecommendationRequest {
  userPrompt: string
  genre: string
  language: string
  year: string
  count: number
}

export interface MovieRecommendation {
  title: string
  year: string
  genre: string
  caste: string
  reason: string
  rating: number
}

export interface RecommendationResponse {
  success: boolean
  message: string
  data: {
    recommendations: MovieRecommendation[]
  }
}

export interface ApiErrorResponse {
  success?: boolean
  message?: string
  error?: string
  detail?: string
}
