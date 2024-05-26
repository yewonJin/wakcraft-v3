import { revalidatePath } from 'next/cache'

export const revalidateArchitectPage = async () => {
  'use server'

  revalidatePath('/architect', 'page')
}

export const revalidateContentPage = async () => {
  'use server'

  revalidatePath('/content', 'page')
}

export const revalidateNoobProHackerPage = async () => {
  'use server'

  revalidatePath('/noobprohacker', 'page')
}

export const revalidateHomePage = async () => {
  'use server'

  revalidatePath('/', 'page')
}
