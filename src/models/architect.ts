import { Schema, Model, model, models } from 'mongoose'

import { TIER_LIST } from '@/constants/architect'
import { DetailedTier, Architect as TArchitect } from '@/types/architect'

const architectSchema = new Schema<TArchitect>({
  minecraft_id: {
    type: String,
    required: true,
    unique: true,
  },
  wakzoo_id: { type: String, unique: true },
  tier: { type: [String] },
  curTier: { type: String },
  wakzoo_link: { type: String },
  statistics: {
    win: { type: Number, default: 0 },
    hackerWin: { type: Number, default: 0 },
    proWin: { type: Number, default: 0 },
    participation: { type: Number, default: 0 },
  },
  portfolio: {
    noobprohacker: [
      {
        episode: { type: Number, required: true },
        subject: { type: String, required: true },
        line: { type: String, required: true },
        image_url: { type: String, required: true },
        youtube_url: { type: String, required: true },
        ranking: { type: Number, default: 0 },
        date: { type: Date },
      },
    ],
    architectureNoobProHacker: [
      {
        episode: { type: Number, required: true },
        subject: { type: String, required: true },
        line: { type: String, required: true },
        image_url: { type: String, required: true },
        youtube_url: { type: String, required: true },
        ranking: { type: Number, default: 0 },
        date: { type: Date },
      },
    ],
    placementTest: [
      {
        ranking: { type: Number },
        season: { type: Number },
        image_url: { type: String },
        placement_result: { type: String },
        date: { type: Date },
      },
    ],
    eventNoobProHacker: [
      {
        type: { type: String, required: true },
        contentName: { type: String, required: true },
        episode: { type: Number, required: true },
        subject: { type: String, required: true },
        line: { type: String, required: true },
        image_url: { type: String, required: true },
        youtube_url: { type: String, required: true },
        ranking: { type: Number, default: 0 },
        date: { type: Date },
        constructionTime: { type: Number, default: 0 },
      },
    ],
    architectureContest: [
      {
        contentName: { type: String, required: true },
        episode: { type: Number, required: true },
        subject: { type: String, required: true },
        line: { type: String, required: true },
        image_url: { type: String, required: true },
        youtube_url: { type: String, required: true },
        ranking: { type: Number, default: 0 },
        date: { type: Date },
        constructionTime: { type: Number, default: 0 },
      },
    ],
  },
})

interface ArchitectModel extends Model<TArchitect> {
  findAll: () => Promise<TArchitect[]>
  findByMinecraftId: (minecraft_id: string) => Promise<TArchitect>
  findByTier: (tier: '해커' | '국밥' | '프로' | '계륵' | '눕') => Promise<TArchitect[]>
  updateMinecraftId: (beforeId: string, afterId: string) => Promise<TArchitect>
  updateWakzooId: (minecraft_id: string, wakzoo_id: string) => Promise<TArchitect>
  updateCurTier: (minecraft_id: string, curTier: DetailedTier) => Promise<TArchitect>
  pushNoobProHackerToPortfolio: (
    minecraft_id: string,
    payload: TArchitect['portfolio']['noobprohacker'][0],
  ) => Promise<TArchitect>
  pushArchitectureNoobProHackerToPortfolio: (
    minecraft_id: string,
    payload: TArchitect['portfolio']['architectureNoobProHacker'][0],
  ) => Promise<TArchitect>
  pushEventNoobProHackerToPortfolio: (
    minecraft_id: string,
    payload: TArchitect['portfolio']['eventNoobProHacker'][0],
  ) => Promise<TArchitect>
  pushPlacementTestToPortfolio: (
    minecraft_id: string,
    payload: TArchitect['portfolio']['placementTest'][0],
  ) => Promise<void>
  pushArchitectureContestToPortfolio: (
    minecraft_id: string,
    payload: TArchitect['portfolio']['architectureContest'][0],
  ) => Promise<void>
  updateContentYoutubeUrl: (
    minecraft_id: string,
    episode: number,
    contentName: keyof TArchitect['portfolio'],
    youtube_url: string,
  ) => Promise<void>
  updateAllToUnranked: () => Promise<void>
  updateSeasonTier: (minecraft_id: string, curSeason: number, tier: DetailedTier) => Promise<void>
  updateWakzooLink: (minecraft_id: string, wakzoo_link: string) => Promise<void>
}

architectSchema.statics.create = function (payload: Exclude<keyof TArchitect, 'portfolio'>) {
  const architect = new this(payload)
  return architect.save()
}

architectSchema.statics.findAll = function () {
  return this.find({})
}

architectSchema.statics.findByTier = function (tier: '해커' | '국밥' | '프로' | '계륵' | '눕') {
  return this.find({ curTier: { $in: TIER_LIST[tier] } })
}

architectSchema.statics.findByMinecraftId = function (minecraft_id: string) {
  return this.findOne({ minecraft_id })
}

architectSchema.statics.updateMinecraftId = function (beforeId: string, afterId: string) {
  return this.findOneAndUpdate(
    {
      minecraft_id: beforeId,
    },
    {
      $set: {
        minecraft_id: afterId,
      },
    },
  )
}

architectSchema.statics.updateWakzooId = function (minecraft_id: string, wakzoo_id: string) {
  return this.findOneAndUpdate(
    {
      minecraft_id,
    },
    {
      $set: {
        wakzoo_id: wakzoo_id,
      },
    },
  )
}

architectSchema.statics.updateCurTier = function (minecraft_id: string, curTier: DetailedTier) {
  return this.findOneAndUpdate(
    {
      minecraft_id,
    },
    {
      $set: {
        curTier: curTier,
      },
    },
  )
}

architectSchema.statics.pushNoobProHackerToPortfolio = function (
  minecraft_id: string,
  payload: TArchitect['portfolio']['noobprohacker'][0],
) {
  if (payload.ranking == 1 && payload.line === '해커') {
    return this.findOneAndUpdate(
      { minecraft_id },
      {
        $push: { 'portfolio.noobprohacker': payload },
        $inc: {
          'statistics.win': 1,
          'statistics.hackerWin': 1,
          'statistics.participation': 1,
        },
      },
    )
  }

  if (payload.ranking == 1 && payload.line === '프로') {
    return this.findOneAndUpdate(
      { minecraft_id },
      {
        $push: { 'portfolio.noobprohacker': payload },
        $inc: {
          'statistics.win': 1,
          'statistics.proWin': 1,
          'statistics.participation': 1,
        },
      },
    )
  }

  return this.findOneAndUpdate(
    { minecraft_id },
    {
      $push: { 'portfolio.noobprohacker': payload },
      $inc: { 'statistics.participation': 1 },
    },
  )
}

architectSchema.statics.pushArchitectureNoobProHackerToPortfolio = function (
  minecraft_id: string,
  payload: TArchitect['portfolio']['architectureNoobProHacker'][0],
) {
  if (payload.ranking == 1 && payload.line === '해커') {
    return this.findOneAndUpdate(
      { minecraft_id },
      {
        $push: { 'portfolio.architectureNoobProHacker': payload },
        $inc: {
          'statistics.win': 1,
          'statistics.hackerWin': 1,
          'statistics.participation': 1,
        },
      },
    )
  }

  if (payload.ranking == 1 && payload.line === '프로') {
    return this.findOneAndUpdate(
      { minecraft_id },
      {
        $push: { 'portfolio.architectureNoobProHacker': payload },
        $inc: {
          'statistics.win': 1,
          'statistics.proWin': 1,
          'statistics.participation': 1,
        },
      },
    )
  }

  return this.findOneAndUpdate(
    { minecraft_id },
    {
      $push: { 'portfolio.architectureNoobProHacker': payload },
      $inc: { 'statistics.participation': 1 },
    },
  )
}

architectSchema.statics.pushEventNoobProHackerToPortfolio = function (
  minecraft_id: string,
  payload: TArchitect['portfolio']['eventNoobProHacker'][0],
) {
  if (payload.ranking == 1) {
    return this.findOneAndUpdate(
      { minecraft_id },
      {
        $push: { 'portfolio.eventNoobProHacker': payload },
        $inc: { 'statistics.win': 1, 'statistics.participation': 1 },
      },
    )
  } else {
    return this.findOneAndUpdate(
      { minecraft_id },
      {
        $push: { 'portfolio.eventNoobProHacker': payload },
        $inc: { 'statistics.participation': 1 },
      },
    )
  }
}

architectSchema.statics.pushArchitectureContestToPortfolio = function (
  minecraft_id: string,
  payload: TArchitect['portfolio']['architectureContest'][0],
) {
  if (payload.ranking == 1) {
    return this.findOneAndUpdate(
      { minecraft_id },
      {
        $push: { 'portfolio.architectureContest': payload },
        $inc: { 'statistics.win': 1, 'statistics.participation': 1 },
      },
    )
  } else {
    return this.findOneAndUpdate(
      { minecraft_id },
      {
        $push: { 'portfolio.architectureContest': payload },
        $inc: { 'statistics.participation': 1 },
      },
    )
  }
}

architectSchema.statics.pushPlacementTestToPortfolio = function (
  minecraft_id: string,
  payload: TArchitect['portfolio']['placementTest'][0],
) {
  if (payload.ranking == 1) {
    return this.findOneAndUpdate(
      { minecraft_id },
      {
        $push: { 'portfolio.placementTest': payload },
        $inc: {
          'statistics.win': 1,
          'statistics.participation': 1,
        },
      },
    )
  }

  return this.findOneAndUpdate(
    { minecraft_id },
    {
      $push: { 'portfolio.placementTest': payload },
      $inc: {
        'statistics.participation': 1,
      },
    },
  )
}

architectSchema.statics.updateWakzooLink = function (minecraft_id: string, wakzoo_link: string) {
  return this.findOneAndUpdate(
    { minecraft_id },
    {
      $set: { wakzoo_link: wakzoo_link },
    },
  )
}

architectSchema.statics.updateContentYoutubeUrl = function (
  minecraft_id: string,
  episode: number,
  contentName: keyof TArchitect['portfolio'],
  youtube_url: string,
) {
  return this.findOneAndUpdate(
    { minecraft_id },
    {
      $set: { [`portfolio.${contentName}.$[elem].youtube_url`]: youtube_url },
    },
    {
      arrayFilters: [
        {
          'elem.episode': episode,
        },
      ],
    },
  )
}

architectSchema.statics.updateAllToUnranked = function () {
  return this.updateMany(
    {},
    {
      $push: { tier: '언랭' },
      $set: { curTier: '언랭' },
    },
  )
}

architectSchema.statics.updateSeasonTier = function (minecraft_id: string, curSeason: number, tier: DetailedTier) {
  return this.updateOne(
    { minecraft_id },
    {
      $set: { [`tier.${curSeason - 1}`]: tier },
    },
  )
}

const Architect =
  (models['Architect'] as ArchitectModel) || model<TArchitect, ArchitectModel>('Architect', architectSchema)

export default Architect
