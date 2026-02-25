'use client'

import { useActionState } from 'react'
import { useTranslations } from 'next-intl'
import { sendContactEmail } from '@/app/[locale]/contact/action'

const situationKeys = [
  'situation1',
  'situation2',
  'situation3',
  'situation4',
  'situation5',
  'situation6',
] as const

const inputClass =
  'border-border bg-bg focus:border-fg w-full border px-4 py-3 text-sm outline-none'
const labelClass = 'mb-2 block text-xs font-bold tracking-widest uppercase'

export function ContactForm() {
  const t = useTranslations('contact')
  const [state, action, pending] = useActionState(sendContactEmail, {
    success: false,
    errorCode: null,
  })

  if (state.success) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-sm font-bold tracking-widest uppercase">
          {t('formSuccess')}
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-6">
      {state.errorCode && (
        <p className="border-fg bg-accent/20 border px-4 py-3 text-xs">
          {t(state.errorCode)}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            {t('formName')}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            {t('formEmail')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          {t('formCompany')}
        </label>
        <input id="company" name="company" type="text" className={inputClass} />
      </div>

      <div>
        <label htmlFor="situation" className={labelClass}>
          {t('formSituation')}
        </label>
        <select
          id="situation"
          name="situation"
          className={`${inputClass} cursor-pointer`}
        >
          <option value="">{t('formSelect')}</option>
          {situationKeys.map((key) => (
            <option key={key} value={t(key)}>
              {t(key)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t('formMessage')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="bg-accent text-bg hover:bg-bg hover:text-accent border-accent cursor-pointer border px-8 py-3 text-xs font-bold tracking-widest uppercase transition-colors disabled:opacity-50"
      >
        {pending ? t('formSending') : t('formSubmit')}
      </button>
    </form>
  )
}
