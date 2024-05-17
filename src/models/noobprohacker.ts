import { Schema, Model, model, models } from 'mongoose'

import { NoobProHacker as TNoobProHacker } from '@/types/content'

interface NoobProHackerModel extends Model<TNoobProHacker> {
  findAll: () => Promise<TNoobProHacker[]>
  findByEpisode: (episode: number) => Promise<TNoobProHacker>
  findAllWithSweepLine: () => Promise<TNoobProHacker[]>
  findLastestOne: () => Promise<TNoobProHacker>
  findAllWithoutYoutubeLink: () => Promise<TNoobProHacker[]>
  updateNoobProHacker: (payload: TNoobProHacker) => Promise<TNoobProHacker>
  updateArchitectId: (
    episode: number,
    subject: string,
    before_minecraft_id: string,
    minecraft_id: string,
  ) => Promise<void>
}

const noobprohackerSchema = new Schema<TNoobProHacker>({
  contentInfo: {
    episode: { type: Number, required: true, unique: true },
    subject: { type: String },
    date: { type: Date, default: Date.now },
    youtube_url: { type: String },
  },
  lineInfo: [
    {
      subject: { type: String, required: true },
      line_ranking: { type: Number, default: 0 },
      line_details: [
        {
          line: { type: String },
          minecraft_id: { type: [String] },
          image_url: { type: String },
          youtube_url: { type: String },
          ranking: { type: Number },
        },
      ],
    },
  ],
})

noobprohackerSchema.statics.create = function (payload) {
  const noobProHacker = new this(payload)
  return noobProHacker.save()
}

noobprohackerSchema.statics.findAll = function () {
  return this.find({})
}

noobprohackerSchema.statics.findByEpisode = function (episode: number) {
  return this.findOne({ 'contentInfo.episode': episode })
}

noobprohackerSchema.statics.findAllWithSweepLine = function () {
  return this.aggregate([
    {
      $unwind: '$lineInfo',
    },
    {
      $match: {
        $and: [
          {
            'lineInfo.line_details.1.ranking': 1,
          },
          {
            'lineInfo.line_details.2.ranking': 1,
          },
          {
            'lineInfo.line_ranking': 1,
          },
        ],
      },
    },
  ])
}

noobprohackerSchema.statics.findLastestOne = function () {
  return this.findOne().sort({ 'contentInfo.episode': -1 })
}

noobprohackerSchema.statics.findAllWithoutYoutubeLink = function () {
  return this.aggregate([
    {
      $match: {
        'contentInfo.youtube_url': 'null',
      },
    },
  ])
}

noobprohackerSchema.statics.updateNoobProHacker = function (payload: TNoobProHacker) {
  return this.updateOne(
    {
      'contentInfo.episode': payload.contentInfo.episode,
    },
    {
      $set: {
        contentInfo: payload.contentInfo,
        lineInfo: payload.lineInfo,
      },
    },
  )
}

noobprohackerSchema.statics.updateArchitectId = function (
  episode: number,
  subject: string,
  before_minecraft_id: string,
  minecraft_id: string,
) {
  return this.updateOne(
    {
      'contentInfo.episode': episode,
    },
    {
      $set: {
        [`lineInfo.$[line].line_details.$[detail].minecraft_id`]: minecraft_id,
      },
    },
    {
      arrayFilters: [
        {
          'line.subject': subject,
        },
        {
          'detail.minecraft_id': before_minecraft_id,
        },
      ],
    },
  )
}

const NoobProHacker =
  (models['NoobProHacker'] as NoobProHackerModel) ||
  model<TNoobProHacker, NoobProHackerModel>('NoobProHacker', noobprohackerSchema)

export default NoobProHacker
