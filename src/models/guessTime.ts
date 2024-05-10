import { Schema, Model, model, models } from 'mongoose'

import { GuessTime as TGuessTime } from '@/types/content'

interface GuessTimeModel extends Model<TGuessTime> {
  findAll: () => Promise<TGuessTime[]>
  findByEpisode: (episode: number) => Promise<TGuessTime>
  updateArchitectId: (episode: number, beforeId: string, afterId: string) => Promise<void>
}

const guessTimeSchema = new Schema<TGuessTime>({
  contentInfo: {
    subject: { type: String },
    episode: { type: Number },
    date: { type: Date, default: Date.now },
    youtube_url: { type: String },
  },
  participants: [
    {
      order: { type: Number },
      expectedTime: { type: Number },
      time: { type: Number },
      minecraft_id: { type: String },
      image_url: { type: String },
      youtube_url: { type: String },
    },
  ],
})

guessTimeSchema.statics.create = function (payload) {
  const guessTime = new this(payload)
  return guessTime.save()
}

guessTimeSchema.statics.findAll = function () {
  return this.find({})
}

guessTimeSchema.statics.findByEpisode = function (episode: number) {
  return this.findOne({ 'contentInfo.episode': episode })
}

guessTimeSchema.statics.updateArchitectId = function (episode: number, beforeId: string, afterId: string) {
  return this.updateOne(
    {
      'contentInfo.episode': episode,
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

const GuessTime =
  (models['GuessTime'] as GuessTimeModel) || model<TGuessTime, GuessTimeModel>('GuessTime', guessTimeSchema)

export default GuessTime
