import { Schema, Model, model, models } from 'mongoose'

import { EventNoobProHacker as TEventNoobProHacker } from '@/types/content'

interface EventNoobProHackerModel extends Model<TEventNoobProHacker> {
  findAll: () => Promise<TEventNoobProHacker[]>
  findByEpisode: (episode: number) => Promise<TEventNoobProHacker>
  pullArchitectId: (episode: number, subject: string, line: string, beforeId: string) => Promise<void>
  pushArchitectId: (episode: number, subject: string, line: string, afterId: string) => Promise<void>
}

const eventNoobProHackerSchema = new Schema({
  contentInfo: {
    contentName: { type: String, required: true },
    episode: { type: Number },
    date: { type: Date, default: Date.now },
    youtube_url: { type: String },
    isInFiniteTime: { type: Boolean },
  },
  lineInfo: [
    {
      subject: { type: String, required: true },
      youtube_url: { type: String, required: true },
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

eventNoobProHackerSchema.statics.create = function (payload) {
  const noobProHacker = new this(payload)
  return noobProHacker.save()
}

eventNoobProHackerSchema.statics.findAll = function () {
  return this.find({})
}

eventNoobProHackerSchema.statics.findByEpisode = function (episode: number) {
  return this.findOne({ 'contentInfo.episode': episode })
}

eventNoobProHackerSchema.statics.pullArchitectId = function (
  episode: number,
  subject: string,
  line: string,
  beforeId: string,
) {
  return this.updateOne(
    {
      'contentInfo.episode': episode,
    },
    {
      $pull: {
        'lineInfo.$[element].line_details.$[detail].minecraft_id': beforeId,
      },
    },
    {
      arrayFilters: [
        {
          'element.subject': subject,
        },
        {
          'detail.line': line,
        },
      ],
    },
  )
}

eventNoobProHackerSchema.statics.pushArchitectId = function (
  episode: number,
  subject: string,
  line: string,
  afterId: string,
) {
  return this.updateOne(
    {
      'contentInfo.episode': episode,
    },
    {
      $push: {
        'lineInfo.$[element].line_details.$[detail].minecraft_id': afterId,
      },
    },
    {
      arrayFilters: [
        {
          'element.subject': subject,
        },
        {
          'detail.line': line,
        },
      ],
    },
  )
}

const EventNoobProHacker =
  (models['EventNoobProHacker'] as EventNoobProHackerModel) ||
  model<TEventNoobProHacker, EventNoobProHackerModel>('EventNoobProHacker', eventNoobProHackerSchema)

export default EventNoobProHacker
