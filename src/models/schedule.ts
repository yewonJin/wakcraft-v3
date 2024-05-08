import { Schema, Model, model, models } from 'mongoose'

import { Schedule as TSchedule } from '@/types/schedule'

const scheduleSchema = new Schema<TSchedule>({
  status: String,
  date: String,
  isTributeContent: Boolean,
  content: String,
  title: String,
  episode: Number,
  participants: [String],
  announcement_link: String,
  youtube_link: String,
})

interface ScheduleModel extends Model<TSchedule> {
  findAllWithoutAfterContent: () => Promise<TSchedule[]>
}

scheduleSchema.statics.findAllWithoutAfterContent = function () {
  return this.find({
    $or: [{ status: 'before_announcement' }, { status: 'after_announcement' }],
  })
}

const Schedule = (models['Schedule'] as ScheduleModel) || model<TSchedule, ScheduleModel>('Schedule', scheduleSchema)

export default Schedule
