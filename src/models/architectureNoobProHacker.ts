import { Schema, Model, model, models } from 'mongoose'

import { NoobProHacker as TNoobProHacker } from '@/types/content'

interface ArchitectureNoobProHackerModel extends Model<TNoobProHacker[]> {
  findAll: () => Promise<TNoobProHacker[]>
  findByEpisode: (episode: number) => Promise<TNoobProHacker>
  findAllWithSweepLine: () => Promise<TNoobProHacker[]>
  findLastestOne: () => Promise<TNoobProHacker>
  findOneThatHasNotURL: () => Promise<TNoobProHacker[]>
  updateArchitectureNoobProHacker: (payload: TNoobProHacker) => Promise<TNoobProHacker>
  updateArchitectId: (
    episode: number,
    subject: string,
    before_minecraft_id: string,
    minecraft_id: string,
  ) => Promise<void>
}

const architectureNoobProHackerSchema = new Schema<TNoobProHacker>({
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

architectureNoobProHackerSchema.statics.create = function (payload) {
  const noobProHacker = new this(payload)
  return noobProHacker.save()
}

architectureNoobProHackerSchema.statics.findAll = function () {
  return this.find({})
}

architectureNoobProHackerSchema.statics.findByEpisode = function (episode: number) {
  return this.findOne({ 'contentInfo.episode': episode })
}

architectureNoobProHackerSchema.statics.findAllWithSweepLine = function () {
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

architectureNoobProHackerSchema.statics.findLastestOne = function () {
  return this.find({}).sort({ 'contentInfo.episode': -1 }).limit(1)
}

architectureNoobProHackerSchema.statics.findOneThatHasNotURL = function () {
  return this.aggregate([
    {
      $match: {
        'contentInfo.youtube_url': 'null',
      },
    },
  ])
}

architectureNoobProHackerSchema.statics.updateArchitectureNoobProHacker = function (payload: TNoobProHacker) {
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

architectureNoobProHackerSchema.statics.updateArchitectId = function (
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

const ArchitectureNoobProHacker =
  (models['ArchitectureNoobProHacker'] as ArchitectureNoobProHackerModel) ||
  model<TNoobProHacker, ArchitectureNoobProHackerModel>('ArchitectureNoobProHacker', architectureNoobProHackerSchema)

export default ArchitectureNoobProHacker
