import { Schema, Model, model, models } from 'mongoose'

import { PlacementTest as TPlacementTest } from '@/types/content'

interface PlacementTestModel extends Model<TPlacementTest> {
  findAll: () => Promise<TPlacementTest[]>
  findBySeason: (season: number) => Promise<TPlacementTest>
  findLastestOne: () => Promise<TPlacementTest>
  updateArchitectId: (season: number, beforeId: string, afterId: string) => Promise<void>
}

const placementTestSchema = new Schema<TPlacementTest>({
  season: Number,
  date: Date,
  youtube_url: String,
  participants: [
    {
      minecraft_id: String,
      order: Number,
      image_url: String,
      placement_result: String,
      ranking: Number,
    },
  ],
})

placementTestSchema.statics.create = function (payload) {
  const placementTest = new this(payload)
  return placementTest.save()
}

placementTestSchema.statics.findAll = function () {
  return this.find({})
}

placementTestSchema.statics.findLastestOne = function () {
  return this.findOne().sort({ season: -1 })
}

placementTestSchema.statics.findBySeason = function (season: number) {
  return this.findOne({ season: season })
}

placementTestSchema.statics.updateArchitectId = function (season: number, beforeId: string, afterId: string) {
  return this.updateOne(
    {
      season: season,
      participants: {
        $elemMatch: {
          minecraft_id: beforeId,
        },
      },
    },
    {
      $set: {
        'participants.$.minecraft_id': afterId,
      },
    },
  )
}

const PlacementTest =
  (models['PlacementTest'] as PlacementTestModel) ||
  model<TPlacementTest, PlacementTestModel>('PlacementTest', placementTestSchema)

export default PlacementTest
