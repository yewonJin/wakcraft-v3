import Link from 'next/link'

import Typography from '@/components/atoms/Typography'

export default function ArchitectNotFound() {
  return (
    <div className="flex flex-col gap-6">
      <Typography variants="h1" color="primary" fontSize="28px" lineHeight="36px">
        등록되어 있지 않은 건축가입니다.
      </Typography>
      <div className="flex flex-col gap-4">
        <Typography variants="p" color="tertiary">
          제대로 된 건축가 아이디를 입력해주세요.
        </Typography>
        <Typography variants="p" color="tertiary">
          문제가 있다면{' '}
          <Link className="text-sky-600" target="_blank" href={'https://cafe.naver.com/steamindiegame/11638777'}>
            왁물원
          </Link>
          을 이용해 개발자에게 연락주세요.
        </Typography>
      </div>
    </div>
  )
}
