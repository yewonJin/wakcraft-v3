export const renameToWebp = (imageUrl: string) => {
  const splitName = imageUrl.split('.')

  return `${splitName.slice(0, splitName.length - 1).join('.')}.webp`
}

export const renameTo1080Webp = (imageUrl: string) => {
  const splitName = imageUrl.split('.')

  return `${splitName.slice(0, splitName.length - 1).join('.')}.1080p.webp`
}

export const getDateString = (date: Date) => {
  return date.toISOString().split('T')[0]
}

export const isMobile = (str: string) => {
  const mobileRegex = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i]

  return mobileRegex.some((regex) => str.match(regex))
}

export const shuffle = (array: any[]) => {
  for (let index = array.length - 1; index > 0; index--) {
    // 무작위 index 값을 만든다. (0 이상의 배열 길이 값)
    const randomPosition = Math.floor(Math.random() * (index + 1))

    // 임시로 원본 값을 저장하고, randomPosition을 사용해 배열 요소를 섞는다.
    const temporary = array[index]
    array[index] = array[randomPosition]
    array[randomPosition] = temporary
  }

  return array
}
