import { Model, Schema, model, models } from 'mongoose'

import { Worldcup as TWorldCup } from '@/types/worldcup'

interface WorldcupModel extends Model<TWorldCup> {
  findAllByGameName: (game: string) => Promise<TWorldCup[]>
  increaseNumberOfWin: (subject: string) => Promise<void>
  increaseNumberOfParticipation: () => Promise<void>
  updateYoutubeURL: (subject: string, youtube_url: string) => Promise<void>
  updateMinecraftId: (beforeId: string, afterId: string) => Promise<void>
}

const worldcupSchema = new Schema<TWorldCup, WorldcupModel>({
  game: { type: String },
  workInfo: {
    minecraft_id: { type: String },
    episode: { type: Number },
    subject: { type: String },
    image_url: { type: String },
    youtube_url: { type: String },
  },
  numberOfWin: { type: Number },
  numberOfParticipation: { type: Number },
})

worldcupSchema.statics.create = function (payload) {
  const worldcup = new this(payload)
  return worldcup.save()
}

worldcupSchema.statics.findAllByGameName = function (game: string) {
  return this.find({ game: game }).sort({ 'workInfo.episode': -1 }).limit(128)
}

worldcupSchema.statics.increaseNumberOfWin = function (subject: string) {
  return this.updateOne(
    { 'workInfo.subject': subject },
    {
      $inc: { numberOfWin: 1 },
    },
  )
}

worldcupSchema.statics.increaseNumberOfParticipation = function () {
  return this.aggregate([
    {
      $sort: {
        'workInfo.episode': -1,
      },
    },
    {
      $limit: 128,
    },
  ])
    .exec()
    .then((results) => {
      const updatePromises = results.map((doc) => {
        // 각 문서에 대한 업데이트 수행
        return this.updateOne(
          { _id: doc._id }, // 유일한 필드를 사용하여 문서 식별
          {
            $inc: {
              numberOfParticipation: 1,
            },
          },
        )
      })

      return Promise.all(updatePromises)
    })
}

worldcupSchema.statics.updateYoutubeURL = function (subject: string, youtube_url: string) {
  return this.updateOne(
    { 'workInfo.subject': subject },
    {
      $set: { 'workInfo.youtube_url': youtube_url },
    },
  )
}

worldcupSchema.statics.updateMinecraftId = function (beforeId: string, afterId: string) {
  return this.updateMany(
    { 'workInfo.minecraft_id': beforeId },
    {
      $set: { 'workInfo.minecraft_id': afterId },
    },
  )
}

const Worldcup = (models['Worldcup'] as WorldcupModel) || model<TWorldCup, WorldcupModel>('Worldcup', worldcupSchema)

export default Worldcup
