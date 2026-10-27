import { site } from '@/data/site';

/**
 * Visitor's country (BE/NL): picks which phone number the switchable phone links
 * show. Belgium unless the visitor chose the Netherlands (toggle or assistant).
 */
export type Land = 'be' | 'nl';

const KEY = 'dh-land';
const phones: Record<Land, { tel: string; display: string }> = {
  be: { tel: site.phone, display: site.phoneDisplay },
  nl: { tel: site.phoneNl, display: site.phoneNlDisplay },
};

export function currentLand(): Land {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(KEY);
  } catch {}
  return stored === 'nl' ? 'nl' : 'be';
}

export const phoneFor = (land: Land) => phones[land];

function apply(land: Land) {
  document.documentElement.dataset.land = land;
  for (const a of document.querySelectorAll<HTMLAnchorElement>('a[data-phone]')) {
    a.href = `tel:${phones[land].tel}`;
    const text = a.querySelector('[data-phone-text]');
    if (text) text.textContent = phones[land].display;
  }
  for (const b of document.querySelectorAll<HTMLElement>('[data-set-land]')) {
    b.setAttribute('aria-pressed', String(b.dataset.setLand === land));
  }
}

export function setLand(land: Land) {
  try {
    localStorage.setItem(KEY, land);
  } catch {}
  apply(land);
  window.dispatchEvent(new CustomEvent('dh:land', { detail: land }));
}

export function initCountry() {
  apply(currentLand());
  document.addEventListener('click', (e) => {
    const button = (e.target as Element).closest<HTMLElement>('[data-set-land]');
    if (button?.dataset.setLand === 'be' || button?.dataset.setLand === 'nl') setLand(button.dataset.setLand);
  });
}
