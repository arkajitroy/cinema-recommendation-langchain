import axios from 'axios'
import type {
  RecommendationRequest,
  RecommendationResponse,
} from '../types/recommendation'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchMovieRecommendations = async (
  payload: RecommendationRequest
): Promise<RecommendationResponse> => {
  const { data } = await api.post<RecommendationResponse>(
    '/api/v1/recommendations',
    payload
  )
  return data
}
