import { Schema, Model, model, models } from 'mongoose'

import { WhoseWork as TWhoseWork, Difficulty, NumberOfArchitecture } from '@/types/whoseWork'

const whoseWorkSchema = new Schema<TWhoseWork>({
  difficulty: String,
  numberOfArchitecture: Number,
  correctAnswerCountDistribution: [Number],
})

interface WhoseWorkModel extends Model<TWhoseWork> {
  findByDifficultyAndNumberOfArchitecture: (
    difficulty: Difficulty,
    numberOfArchitecture: NumberOfArchitecture,
  ) => Promise<TWhoseWork>
  increaseCorrectAnswerCount: (
    difficulty: String,
    numberOfArchitecture: Number,
    correctCount: number,
  ) => Promise<TWhoseWork>
}

whoseWorkSchema.statics.findByDifficultyAndNumberOfArchitecture = function (
  difficulty: Difficulty,
  numberOfArchitecture: NumberOfArchitecture,
) {
  return this.find({
    $and: [{ difficulty: difficulty }, { numberOfArchitecture: numberOfArchitecture }],
  })
}

whoseWorkSchema.statics.increaseCorrectAnswerCount = function (
  difficulty: String,
  numberOfArchitecture: Number,
  correctCount: number,
) {
  return this.findOneAndUpdate(
    {
      $and: [{ difficulty: difficulty }, { numberOfArchitecture: numberOfArchitecture }],
    },
    {
      $inc: { [`correctAnswerCountDistribution.${correctCount}`]: 1 },
    },

    { returnOriginal: false },
  )
}

const WhoseWork =
  (models['WhoseWork'] as WhoseWorkModel) || model<TWhoseWork, WhoseWorkModel>('WhoseWork', whoseWorkSchema)

export default WhoseWork
