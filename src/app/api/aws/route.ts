import { NextRequest, NextResponse } from 'next/server'
import { ListObjectsCommand } from '@aws-sdk/client-s3'

import { Content, hideFolder, hideWebp, listObjectsBucketParams, s3 } from '@/utils/aws'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const episode = searchParams.get('episode')
  const content = searchParams.get('content')

  if (!content || !episode) {
    return NextResponse.json(
      { serviceCode: 400200, message: '에피소드 혹은 컨텐츠명을 입력하지 않았습니다.' },
      { status: 400 },
    )
  }

  try {
    const data = await s3.send(new ListObjectsCommand(listObjectsBucketParams(content as Content, episode as string)))

    if (!data.Contents) {
      return NextResponse.json({ serviceCode: 400100, message: 'S3 오브젝트가 존재하지 않습니다' }, { status: 400 })
    }

    return NextResponse.json(
      {
        serviceCode: 200101,
        data: hideWebp(hideFolder(data.Contents)).map((item) => item.Key),
        message: '건축 이미지 찾기 성공',
      },
      { status: 200 },
    )
  } catch (e) {
    return NextResponse.json({ serviceCode: 400100, message: 'S3 오브젝트 찾기 실패', error: e }, { status: 400 })
  }
}
