'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type State = {
  success: boolean
  errorCode: string | null
}

export async function sendContactEmail(
  _prev: State,
  formData: FormData,
): Promise<State> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const company = formData.get('company') as string
  const situation = formData.get('situation') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return {
      success: false,
      errorCode: 'errorRequired',
    }
  }

  const { error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'hello@dimitribourreau.dev',
    replyTo: email,
    subject: `Nouveau message de ${name} — ${company}`,
    text: [
      `Nom : ${name}`,
      `Email : ${email}`,
      `Entreprise : ${company || 'Non précisée'}`,
      `Situation : ${situation || 'Non précisée'}`,
      `\nMessage :\n${message}`,
    ].join('\n'),
  })

  if (error) {
    return {
      success: false,
      errorCode: 'errorSend',
    }
  }

  return { success: true, errorCode: null }
}
