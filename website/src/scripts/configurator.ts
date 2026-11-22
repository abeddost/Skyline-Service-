// Three-step quote configurator. State is kept in localStorage so a visitor
// can leave and come back. The finished request opens WhatsApp with a readable
// summary; nothing is sent to our own server.

const STORE = 'skyline-angebot-v1';
const PLZ = /^\d{5}$/;
// German landline or mobile, with or without +49 / 0049, spaces, dashes, slashes.
const PHONE = /^(\+49|0049|0)[1-9][\d\s\-/()]{5,16}$/;

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function track(event: string, data: Record<string, unknown> = {}) {
  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer?.push({ event, ...data });
}

export function initConfigurator() {
  const root = document.querySelector<HTMLElement>('[data-cfg]');
  const form = root?.querySelector<HTMLFormElement>('[data-cfg-form]');
  if (!root || !form) return;

  const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
  const bar = root.querySelector<HTMLElement>('[data-cfg-bar]')!;
  const info = root.querySelector<HTMLElement>('[data-cfg-info]')!;
  const msg = root.querySelector<HTMLElement>('[data-cfg-msg]')!;
  const back = root.querySelector<HTMLButtonElement>('[data-cfg-back]')!;
  const next = root.querySelector<HTMLButtonElement>('[data-cfg-next]')!;
  const send = root.querySelector<HTMLButtonElement>('[data-cfg-send]')!;
  const serviceBoxes = Array.from(form.querySelectorAll<HTMLInputElement>('input[name="leistung"]'));
  const groups = Array.from(form.querySelectorAll<HTMLElement>('.cfg__group[data-group]'));
  const fields = () => Array.from(form.querySelectorAll<Field>('input[name], select[name], textarea[name]'));
  let step = 0;
  let started = false;

  // ----- persistence -----
  const save = () => {
    const data: Record<string, string | string[] | boolean> = {};
    for (const f of fields()) {
      if (f instanceof HTMLInputElement && f.type === 'checkbox') {
        if (f.name === 'leistung') {
          const list = (data.leistung as string[] | undefined) ?? [];
          if (f.checked) list.push(f.value);
          data.leistung = list;
        }
        // consent is never stored: it has to be given each time
      } else if (f instanceof HTMLInputElement && f.type === 'radio') {
        if (f.checked) data[f.name] = f.value;
      } else if (f.value) {
        data[f.name] = f.value;
      }
    }
    try {
      localStorage.setItem(STORE, JSON.stringify(data));
    } catch {
      /* private mode: carry on without saving */
    }
  };

  const restore = () => {
    let data: Record<string, unknown> = {};
    try {
      data = JSON.parse(localStorage.getItem(STORE) ?? '{}');
    } catch {
      data = {};
    }
    for (const f of fields()) {
      const v = data[f.name];
      if (v === undefined) continue;
      if (f instanceof HTMLInputElement && f.type === 'checkbox') {
        if (Array.isArray(v)) f.checked = v.includes(f.value);
      } else if (f instanceof HTMLInputElement && f.type === 'radio') {
        f.checked = f.value === v;
      } else if (typeof v === 'string') {
        f.value = v;
      }
    }
    const pre = root.dataset.preselect;
    if (pre && !serviceBoxes.some((b) => b.checked)) {
      const box = serviceBoxes.find((b) => b.dataset.key === pre);
      if (box) box.checked = true;
    }
  };

  // ----- step 2 groups -----
  const updateGroups = () => {
    const active = new Set(serviceBoxes.filter((b) => b.checked).map((b) => b.dataset.group));
    for (const g of groups) {
      if (g.dataset.group === 'kontakt') continue;
      g.hidden = !active.has(g.dataset.group);
    }
  };

  // ----- range <-> number -----
  form.querySelectorAll<HTMLInputElement>('[data-range-for]').forEach((range) => {
    const num = form.querySelector<HTMLInputElement>(`#${range.dataset.rangeFor}`);
    if (!num) return;
    if (num.value) range.value = num.value;
    range.addEventListener('input', () => {
      num.value = range.value;
      save();
    });
    num.addEventListener('input', () => {
      if (num.value) range.value = num.value;
    });
  });

  // ----- validation -----
  const setError = (f: HTMLElement, text: string) => {
    const wrap = f.closest('.field');
    const out = wrap?.querySelector<HTMLElement>('.field__error');
    wrap?.classList.toggle('has-error', Boolean(text));
    if (out) out.textContent = text;
    if (f instanceof HTMLInputElement) f.setAttribute('aria-invalid', text ? 'true' : 'false');
    return !text;
  };

  const validate = (index: number) => {
    msg.textContent = '';
    if (index === 0) {
      if (!serviceBoxes.some((b) => b.checked)) {
        msg.textContent = 'Bitte wählen Sie mindestens eine Leistung aus.';
        return false;
      }
      return true;
    }
    const scope = steps[index];
    let ok = true;
    let first: HTMLElement | null = null;
    const check = (f: HTMLInputElement, text: string) => {
      if (!setError(f, text)) {
        ok = false;
        first ??= f;
      }
    };
    scope.querySelectorAll<HTMLInputElement>('input[data-plz]').forEach((f) => {
      if (f.closest('[hidden]')) return;
      const v = f.value.trim();
      if (f.required && !v) check(f, 'Bitte geben Sie Ihre Postleitzahl an.');
      else if (v && !PLZ.test(v)) check(f, 'Die Postleitzahl hat fünf Ziffern.');
      else setError(f, '');
    });
    if (index === 2) {
      const name = form.querySelector<HTMLInputElement>('[name="name"]')!;
      check(name, name.value.trim().length < 2 ? 'Bitte geben Sie Ihren Namen an.' : '');
      const tel = form.querySelector<HTMLInputElement>('[name="telefon"]')!;
      const t = tel.value.trim();
      check(tel, t && !PHONE.test(t) ? 'Bitte prüfen Sie die Telefonnummer, z. B. 0176 1234567.' : '');
      const mail = form.querySelector<HTMLInputElement>('[name="email"]')!;
      const m = mail.value.trim();
      check(mail, m && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m) ? 'Bitte prüfen Sie die E-Mail-Adresse.' : '');
      const consent = form.querySelector<HTMLInputElement>('[data-consent]')!;
      const cErr = form.querySelector<HTMLElement>('[data-consent-error]')!;
      cErr.textContent = consent.checked ? '' : 'Bitte stimmen Sie der Datenschutzerklärung zu.';
      if (!consent.checked) {
        ok = false;
        first ??= consent;
      }
    }
    (first as HTMLElement | null)?.focus();
    return ok;
  };

  // ----- summary -----
  const valueOf = (group: HTMLElement) => {
    const lines: string[] = [];
    const done = new Set<string>();
    group.querySelectorAll<Field>('[data-label]').forEach((f) => {
      if (done.has(f.name)) return;
      let v = '';
      if (f instanceof HTMLInputElement && f.type === 'radio') {
        v = form.querySelector<HTMLInputElement>(`input[name="${f.name}"]:checked`)?.value ?? '';
      } else if (f instanceof HTMLInputElement && f.type === 'date') {
        v = f.value ? f.value.split('-').reverse().join('.') : '';
      } else {
        v = f.value.trim();
      }
      done.add(f.name);
      if (v) lines.push(`• ${f.dataset.label}: ${v}${f.dataset.unit ?? ''}`);
    });
    return lines;
  };

  const summary = () => {
    const chosen = serviceBoxes.filter((b) => b.checked).map((b) => b.value);
    const out = ['Hallo Skyline Service, ich möchte ein unverbindliches Angebot.', '', `Leistungen: ${chosen.join(', ')}`];
    for (const g of groups) {
      if (g.hidden) continue;
      const lines = valueOf(g);
      if (lines.length) out.push('', `${g.dataset.title}:`, ...lines);
    }
    out.push('', `Seite: ${location.pathname}`);
    return out.join('\n');
  };

  // ----- navigation -----
  const show = (index: number, focus = true) => {
    step = index;
    steps.forEach((s, i) => (s.hidden = i !== index));
    bar.style.width = `${((index + 1) / steps.length) * 100}%`;
    info.textContent = `Schritt ${index + 1} von ${steps.length}`;
    back.hidden = index === 0;
    next.hidden = index === steps.length - 1;
    send.hidden = index !== steps.length - 1;
    msg.textContent = '';
    if (focus) {
      steps[index].querySelector<HTMLElement>('h3')?.focus({ preventScroll: true });
      const top = root.getBoundingClientRect().top;
      if (top < 70 || top > window.innerHeight * 0.6) {
        window.scrollTo({ top: window.scrollY + top - 90, behavior: 'smooth' });
      }
    }
  };

  next.addEventListener('click', () => {
    if (!validate(step)) return;
    if (step === 0) updateGroups();
    track('form_step', { step: step + 2 });
    show(step + 1);
  });
  back.addEventListener('click', () => show(step - 1));

  form.addEventListener('input', (e) => {
    // An error message disappears as soon as the visitor starts correcting it.
    const field = (e.target as HTMLElement).closest('.field.has-error');
    if (field) setError(e.target as HTMLElement, '');
    if (!started) {
      started = true;
      track('form_start');
    }
    save();
  });
  form.addEventListener('change', (e) => {
    if ((e.target as HTMLElement).matches('input[name="leistung"]')) {
      updateGroups();
      msg.textContent = '';
    }
    save();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (step !== steps.length - 1) {
      next.click();
      return;
    }
    if (!validate(2)) return;
    const url = `https://wa.me/${root.dataset.wa}?text=${encodeURIComponent(summary())}`;
    track('generate_lead', { method: 'whatsapp' });
    window.open(url, '_blank', 'noopener');
    msg.style.color = 'var(--gold-1)';
    msg.textContent = 'WhatsApp wurde geöffnet. Bitte senden Sie die Nachricht dort ab. Fotos können Sie direkt im Chat anhängen.';
  });

  restore();
  updateGroups();
  show(0, false);
}
