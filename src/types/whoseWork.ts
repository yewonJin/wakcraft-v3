export type Difficulty = null | 'LOW' | 'MEDIUM' | 'HIGH'
export type NumberOfArchitecture = null | 20 | 30 | 50

export type WhoseWork = {
  difficulty: string
  numberOfArchitecture: number
  correctAnswerCountDistribution: number[]
}

export type Question = {
  minecraft_id: string
  image_url: string
}
