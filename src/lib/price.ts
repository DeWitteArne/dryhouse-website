import { VAT_RENOVATION } from '@/data/pricing';
import type { Lang } from '@/i18n';

/** Incl. 6 % btw from an amount excl. btw. */
export const withVat = (excl: number) => excl * (1 + VAT_RENOVATION);

/** Amounts from € 50 in whole euros, smaller ones with cents (€ 10,60). */
export function euro(amount: number, lang: Lang) {
  const small = amount < 50 && !Number.isInteger(amount);
  const n = (small ? amount : Math.round(amount)).toLocaleString(lang === 'fr' ? 'fr-BE' : 'nl-BE', {
    minimumFractionDigits: small ? 2 : 0,
    maximumFractionDigits: small ? 2 : 0,
  });
  return lang === 'fr' ? `${n} €` : `€ ${n}`;
}

/** Totals in examples and calculators: rounded to € 50, so they don't look more exact than they are. */
export const round50 = (amount: number) => Math.round(amount / 50) * 50;

export const range = (from: number, to: number | undefined, lang: Lang) => (to ? `${euro(from, lang)} – ${euro(to, lang)}` : euro(from, lang));
