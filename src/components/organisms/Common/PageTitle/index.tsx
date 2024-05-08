import Typography from '@/components/atoms/Typography'

type Props = {
  title: string
  summary: string
}

export default function PageTitle({ title, summary }: Props) {
  return (
    <div className="flex flex-col gap-4 justify-start">
      <Typography variants="h1" color="primary">
        {title}
      </Typography>
      <Typography variants="p" color="tertiary">
        {summary}
      </Typography>
    </div>
  )
}
