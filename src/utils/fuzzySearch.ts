export const fuzzySearch = (str: string, input: string) => {
  const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  const createFuzzyPattern = (ch: string) => {
    const offset = 44032 // '가'의 코드
    // 한국어 음절
    if (/[가-힣]/.test(ch)) {
      const chCode = ch.charCodeAt(0) - offset
      // 종성이 있으면 문자 그대로를 찾는다.
      if (chCode % 28 > 0) {
        return ch
      }

      // 종성이 없으면 종성이 없는 경우와 종성이 ㄱ ~ ㅎ인 범위를 허용한다.
      const begin = Math.floor(chCode / 28) * 28 + offset // 종성이 없는 코드
      const end = begin + 27 // 종성이 ㅎ인 코드 번호

      // 코드를 16진법으로 변환하여 유니코드로 정규표현식 패턴 반환
      return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`
    }

    // 초성만 입력 받았을 때
    if (/[ㄱ-ㅎ]/.test(ch)) {
      const con2syl: { [name: string]: number } = {
        ㄱ: '가'.charCodeAt(0),
        ㄲ: '까'.charCodeAt(0),
        ㄴ: '나'.charCodeAt(0),
        ㄷ: '다'.charCodeAt(0),
        ㄸ: '따'.charCodeAt(0),
        ㄹ: '라'.charCodeAt(0),
        ㅁ: '마'.charCodeAt(0),
        ㅂ: '바'.charCodeAt(0),
        ㅃ: '빠'.charCodeAt(0),
        ㅅ: '사'.charCodeAt(0),
      }
      const begin = con2syl[ch] || (ch.charCodeAt(0) - 12613) /* 'ㅅ'의 코드 */ * 588 + con2syl['ㅅ']
      const end = begin + 587
      return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`
    }
    // 그 외엔 그대로 내보냄
    return escapeRegExp(ch)
  }

  const createFuzzyMatcher = () => {
    const pattern = input.split('').map(createFuzzyPattern).join('.*?')
    return new RegExp(pattern)
  }

  return createFuzzyMatcher().test(str)
}

export const fuzzySearchRegExp = (input: string) => {
  const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  const createFuzzyPattern = (ch: string) => {
    const offset = 44032 // '가'의 코드
    // 한국어 음절
    if (/[가-힣]/.test(ch)) {
      const chCode = ch.charCodeAt(0) - offset
      // 종성이 있으면 문자 그대로를 찾는다.
      if (chCode % 28 > 0) {
        return ch
      }

      // 종성이 없으면 종성이 없는 경우와 종성이 ㄱ ~ ㅎ인 범위를 허용한다.
      const begin = Math.floor(chCode / 28) * 28 + offset // 종성이 없는 코드
      const end = begin + 27 // 종성이 ㅎ인 코드 번호

      // 코드를 16진법으로 변환하여 유니코드로 정규표현식 패턴 반환
      return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`
    }

    // 초성만 입력 받았을 때
    if (/[ㄱ-ㅎ]/.test(ch)) {
      const con2syl: { [name: string]: number } = {
        ㄱ: '가'.charCodeAt(0),
        ㄲ: '까'.charCodeAt(0),
        ㄴ: '나'.charCodeAt(0),
        ㄷ: '다'.charCodeAt(0),
        ㄸ: '따'.charCodeAt(0),
        ㄹ: '라'.charCodeAt(0),
        ㅁ: '마'.charCodeAt(0),
        ㅂ: '바'.charCodeAt(0),
        ㅃ: '빠'.charCodeAt(0),
        ㅅ: '사'.charCodeAt(0),
      }
      const begin = con2syl[ch] || (ch.charCodeAt(0) - 12613) /* 'ㅅ'의 코드 */ * 588 + con2syl['ㅅ']
      const end = begin + 587
      return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`
    }
    // 그 외엔 그대로 내보냄
    return escapeRegExp(ch)
  }

  const createFuzzyMatcher = () => {
    const pattern = input.split('').map(createFuzzyPattern).join('.*?')
    return new RegExp(pattern)
  }

  return createFuzzyMatcher()
}
