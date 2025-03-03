import { Schema, Model, model, models } from 'mongoose'

import { EventNoobProHacker as TEventNoobProHacker } from '@/types/content'

interface EventNoobProHackerModel extends Model<TEventNoobProHacker> {
  findAll: () => Promise<TEventNoobProHacker[]>
  findByEpisode: (episode: number) => Promise<TEventNoobProHacker>
  findLastestOne: () => Promise<TEventNoobProHacker>
  pullArchitectIdByLine: (episode: number, imageUrl: string, beforeId: string) => Promise<void>
  pushArchitectIdByLine: (episode: number, imageUrl: string, afterId: string) => Promise<void>
  pullArchitectIdByGrid: (episode: number, imageUrl: string, beforeId: string) => Promise<void>
  pushArchitectIdByGrid: (episode: number, imageUrl: string, afterId: string) => Promise<void>
  updateEventNoobProHacker: (payload: TEventNoobProHacker) => Promise<TEventNoobProHacker>
}

const eventNoobProHackerSchema = new Schema<TEventNoobProHacker>({
  type: { type: String },
  contentInfo: {
    subject: { type: String, required: true },
    episode: { type: Number },
    date: { type: Date, default: Date.now },
    youtube_url: { type: String },
    isContributedContent: { type: Boolean },
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
          constructionTime: { type: Number },
        },
      ],
    },
  ],
  participants: [
    {
      order: { type: Number },
      topText: { type: String },
      bottomText: { type: String },
      minecraft_id: { type: [String] },
      image_url: { type: String },
      youtube_url: { type: String },
      ranking: { type: Number },
    },
  ],
})

eventNoobProHackerSchema.statics.create = function (payload) {
  const eventNoobProHacker = new this(payload)
  return eventNoobProHacker.save()
}

eventNoobProHackerSchema.statics.findAll = function () {
  return this.find({})
}

eventNoobProHackerSchema.statics.findByEpisode = function (episode: number) {
  return this.findOne({ 'contentInfo.episode': episode })
}

eventNoobProHackerSchema.statics.findLastestOne = function () {
  return this.findOne().sort({ 'contentInfo.episode': -1 })
}
eventNoobProHackerSchema.statics.pullArchitectIdByLine = function (
  episode: number,
  imageUrl: string,
  beforeId: string,
) {
  return this.updateOne(
    {
      'contentInfo.episode': episode,
    },
    {
      $pull: {
        'lineInfo.$[].line_details.$[detail].minecraft_id': beforeId,
      },
    },
    {
      arrayFilters: [
        {
          'detail.image_url': imageUrl,
        },
      ],
    },
  )
}

eventNoobProHackerSchema.statics.pullArchitectIdByGrid = function (
  episode: number,
  imageUrl: string,
  beforeId: string,
) {
  return this.updateOne(
    {
      'contentInfo.episode': episode,
      type: 'grid',
    },
    {
      $pull: {
        'participants.$[element].minecraft_id': beforeId,
      },
    },
    {
      arrayFilters: [
        {
          'element.image_url': imageUrl,
        },
      ],
    },
  )
}

eventNoobProHackerSchema.statics.pushArchitectIdByGrid = function (episode: number, imageUrl: string, afterId: string) {
  return this.updateOne(
    {
      'contentInfo.episode': episode,
      type: 'grid',
    },
    {
      $push: {
        'participants.$[element].minecraft_id': afterId,
      },
    },
    {
      arrayFilters: [
        {
          'element.image_url': imageUrl,
        },
      ],
    },
  )
}

eventNoobProHackerSchema.statics.pushArchitectIdByLine = function (episode: number, imageUrl: string, afterId: string) {
  return this.updateOne(
    {
      'contentInfo.episode': episode,
    },
    {
      $push: {
        'lineInfo.$[].line_details.$[detail].minecraft_id': afterId,
      },
    },
    {
      arrayFilters: [
        {
          'detail.image_url': imageUrl,
        },
      ],
    },
  )
}

eventNoobProHackerSchema.statics.updateEventNoobProHacker = function (payload: TEventNoobProHacker) {
  if (payload.type === 'grid') {
    return this.updateOne(
      {
        'contentInfo.episode': payload.contentInfo.episode,
      },
      {
        $set: {
          type: 'grid',
          contentInfo: payload.contentInfo,
          participants: payload.participants,
        },
      },
    )
  } else {
    return this.updateOne(
      {
        'contentInfo.episode': payload.contentInfo.episode,
      },
      {
        $set: {
          type: 'list',
          contentInfo: payload.contentInfo,
          lineInfo: payload.lineInfo,
        },
      },
    )
  }
}

const EventNoobProHacker =
  (models['EventNoobProHacker'] as EventNoobProHackerModel) ||
  model<TEventNoobProHacker, EventNoobProHackerModel>('EventNoobProHacker', eventNoobProHackerSchema)

export default EventNoobProHacker
