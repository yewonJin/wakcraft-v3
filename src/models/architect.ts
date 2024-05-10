import { Schema, Model, model, models } from 'mongoose'

import { TIER_LIST } from '@/constants/architect'
import { DetailedTier, Architect as TArchitect } from '@/types/architect'
import { getKORTierName } from '@/utils/architect'

// Define Schemes
const architectSchema = new Schema<TArchitect>({
  minecraft_id: {
    type: String,
    required: true,
    unique: true,
  },
  wakzoo_id: { type: String, unique: true },
  tier: { type: [String] },
  curTier: { type: String },
  placementTest_link: { type: String },
  noobprohackerInfo: {
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
        contentName: { type: String, required: true },
        episode: { type: Number, required: true },
        subject: { type: String, required: true },
        line: { type: String, required: true },
        image_url: { type: String, required: true },
        youtube_url: { type: String, required: true },
        ranking: { type: Number, default: 0 },
        date: { type: Date },
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
      },
    ],
  },
})

interface ArchitectModel extends Model<TArchitect> {
  findAll: () => Promise<TArchitect[]>
  findByMinecraftId: (minecraft_id: string) => Promise<TArchitect>
  findByTier: (tier: 'hacker' | 'gukbap' | 'pro' | 'gyeruik' | 'noob') => Promise<TArchitect[]>
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
  updateNoobProHackerYoutubeURL: (minecraft_id: string, episode: number, youtube_url: string) => Promise<TArchitect>
  updateArchitectureNoobProHackerYoutubeURL: (
    minecraft_id: string,
    episode: number,
    youtube_url: string,
  ) => Promise<TArchitect>
  updateEventNoobProHackerYoutubeURL: (
    minecraft_id: string,
    episode: number,
    youtube_url: string,
  ) => Promise<TArchitect>
  updateAllToUnranked: () => Promise<void>
  updateSeasonTier: (minecraft_id: string, curSeason: number, tier: DetailedTier) => Promise<void>
  updatePlacementTestLink: (minecraft_id: string, placementTest_link: string) => Promise<void>
}

architectSchema.statics.create = function (payload: Exclude<keyof TArchitect, 'portfolio'>) {
  const architect = new this(payload)
  return architect.save()
}

architectSchema.statics.findAll = function () {
  return this.find({})
}

architectSchema.statics.findByTier = function (tier: 'hacker' | 'gukbap' | 'pro' | 'gyeruik' | 'noob') {
  return this.find({ curTier: { $in: TIER_LIST[getKORTierName(tier)] } })
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
          'noobprohackerInfo.win': 1,
          'noobprohackerInfo.hackerWin': 1,
          'noobprohackerInfo.participation': 1,
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
          'noobprohackerInfo.win': 1,
          'noobprohackerInfo.proWin': 1,
          'noobprohackerInfo.participation': 1,
        },
      },
    )
  }

  return this.findOneAndUpdate(
    { minecraft_id },
    {
      $push: { 'portfolio.noobprohacker': payload },
      $inc: { 'noobprohackerInfo.participation': 1 },
    },
  )
}

architectSchema.statics.pushArchitectureNoobProHackerToPortfolio = function (
  minecraft_id: string,
  payload: TArchitect['portfolio']['architectureNoobProHacker'][0],
) {
  if (payload.ranking == 1 && payload.line === 'hacker') {
    return this.findOneAndUpdate(
      { minecraft_id },
      {
        $push: { 'portfolio.architectureNoobProHacker': payload },
        $inc: {
          'noobprohackerInfo.win': 1,
          'noobprohackerInfo.hackerWin': 1,
          'noobprohackerInfo.participation': 1,
        },
      },
    )
  }

  if (payload.ranking == 1 && payload.line === 'pro') {
    return this.findOneAndUpdate(
      { minecraft_id },
      {
        $push: { 'portfolio.architectureNoobProHacker': payload },
        $inc: {
          'noobprohackerInfo.win': 1,
          'noobprohackerInfo.proWin': 1,
          'noobprohackerInfo.participation': 1,
        },
      },
    )
  }

  return this.findOneAndUpdate(
    { minecraft_id },
    {
      $push: { 'portfolio.architectureNoobProHacker': payload },
      $inc: { 'noobprohackerInfo.participation': 1 },
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
        $inc: { 'noobprohackerInfo.win': 1, 'noobprohackerInfo.participation': 1 },
      },
    )
  } else {
    return this.findOneAndUpdate(
      { minecraft_id },
      {
        $push: { 'portfolio.eventNoobProHacker': payload },
        $inc: { 'noobprohackerInfo.participation': 1 },
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
          'noobprohackerInfo.win': 1,
          'noobprohackerInfo.participation': 1,
        },
      },
    )
  }

  return this.findOneAndUpdate(
    { minecraft_id },
    {
      $push: { 'portfolio.placementTest': payload },
      $inc: {
        'noobprohackerInfo.participation': 1,
      },
    },
  )
}

architectSchema.statics.updatePlacementTestLink = function (minecraft_id: string, placementTest_link: string) {
  return this.findOneAndUpdate(
    { minecraft_id },
    {
      $set: { placementTest_link: placementTest_link },
    },
  )
}

architectSchema.statics.updateNoobProHackerYoutubeURL = function (
  minecraft_id: string,
  episode: number,
  youtube_url: string,
) {
  return this.findOneAndUpdate(
    { minecraft_id },
    {
      $set: { 'portfolio.noobprohacker.$[elem].youtube_url': youtube_url },
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

architectSchema.statics.updateArchitectureNoobProHackerYoutubeURL = function (
  minecraft_id: string,
  episode: number,
  youtube_url: string,
) {
  return this.findOneAndUpdate(
    { minecraft_id },
    {
      $set: {
        'portfolio.architectureNoobProHacker.$[elem].youtube_url': youtube_url,
      },
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

architectSchema.statics.updateEventNoobProHackerYoutubeURL = function (
  minecraft_id: string,
  episode: number,
  youtube_url: string,
) {
  return this.findOneAndUpdate(
    { minecraft_id },
    {
      $set: { 'portfolio.eventNoobProHacker.$[elem].youtube_url': youtube_url },
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
