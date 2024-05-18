import { Schema, Model, model, models } from 'mongoose'

import { ArchitectureContest as TArchitectureContest } from '@/types/content'

interface ArchitectureContestModel extends Model<TArchitectureContest> {
  findAll: () => Promise<TArchitectureContest[]>
  findByEpisode: (episode: number) => Promise<TArchitectureContest>
  findLastestOne: () => Promise<TArchitectureContest>
  updateArchitectId: (episode: number, line: string, beforeId: string, afterId: string) => Promise<void>
  updateArchitectureContest: (payload: TArchitectureContest) => Promise<TArchitectureContest>
}

const architectureContestSchema = new Schema<TArchitectureContest>({
  contentInfo: {
    subject: { type: String },
    episode: { type: Number },
    date: { type: Date, default: Date.now },
    youtube_url: { type: String },
  },
  lineInfo: [
    {
      line: { type: String },
      line_details: [
        {
          topText: { type: String },
          bottomText: { type: String },
          line: { type: String },
          minecraft_id: { type: String },
          image_url: { type: String },
          youtube_url: { type: String },
          ranking: { type: Number },
        },
      ],
    },
  ],
})

architectureContestSchema.statics.create = function (payload) {
  const noobProHacker = new this(payload)
  return noobProHacker.save()
}

architectureContestSchema.statics.findAll = function () {
  return this.find({})
}

architectureContestSchema.statics.findByEpisode = function (episode: number) {
  return this.findOne({ 'contentInfo.episode': episode })
}

architectureContestSchema.statics.findLastestOne = function () {
  return this.findOne().sort({ 'contentInfo.episode': -1 })
}

architectureContestSchema.statics.updateArchitectId = function (
  episode: number,
  line: string,
  beforeId: string,
  afterId: string,
) {
  return this.updateOne(
    { 'contentInfo.episode': episode },

    {
      $set: {
        'lineInfo.$[element].line_details.$[detail].minecraft_id': afterId,
      },
    },
    {
      arrayFilters: [
        {
          'element.line': line,
        },
        { 'detail.minecraft_id': beforeId },
      ],
    },
  )
}

architectureContestSchema.statics.updateArchitectureContest = function (payload: TArchitectureContest) {
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

const ArchitectureContest =
  (models['ArchitectureContest'] as ArchitectureContestModel) ||
  model<TArchitectureContest, ArchitectureContestModel>('ArchitectureContest', architectureContestSchema)

export default ArchitectureContest
