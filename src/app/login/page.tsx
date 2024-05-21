'use client'

import useLogin from '@/hooks/Admin/useLogin'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import { medium } from '@/providers/FontProvider'

export default function Page() {
  const { input, handleButtonClick, handleInputChange } = useLogin()

  return (
    <div className="mx-auto flex max-w-[1200px] justify-center pt-40">
      <title>왁크래프트 | 로그인</title>
      <div className="flex-col items-center sm:bg-background-secondary sm:p-20">
        <h2 className={`text-3xl text-text-primary ${medium.className}`}>로그인</h2>
        <form
          className="mt-8 flex w-[300px] flex-col gap-6 [&>input]:h-[48px] [&>button]:bg-background-primary"
          onSubmit={handleButtonClick}
        >
          <Input
            autoComplete="on"
            placeholder="아이디"
            id="id"
            name="id"
            handleInputChange={handleInputChange}
            value={input.id}
          />
          <Input
            autoComplete="on"
            placeholder="비밀번호"
            id="password"
            name="password"
            type="password"
            handleInputChange={handleInputChange}
            value={input.password}
          />
          <Button text="로그인"></Button>
        </form>
      </div>
    </div>
  )
}
