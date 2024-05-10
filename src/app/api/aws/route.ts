import { NextRequest, NextResponse } from 'next/server'
import { ListObjectsCommand } from '@aws-sdk/client-s3'

import { Content, hideFolder, hideWebp, listObjectsBucketParams, s3 } from '@/utils/aws'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const episode = searchParams.get('episode')
  const content = searchParams.get('content')

  if (!content || !episode) {
    return NextResponse.json('query parameter error', { status: 400 })
  }

  try {
    const data = await s3.send(new ListObjectsCommand(listObjectsBucketParams(content as Content, episode as string)))

    if (!data.Contents) return NextResponse.json('해당 오브젝트가 없습니다', { status: 400 })

    return NextResponse.json(
      hideWebp(hideFolder(data.Contents)).map((item) => item.Key),
      { status: 200 },
    )
  } catch (e) {
    console.log(e)
  }
}
