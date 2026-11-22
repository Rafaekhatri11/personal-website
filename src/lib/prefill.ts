import type { ServiceTopic } from "@/content/site";

export type Prefill = { topic: ServiceTopic; message?: string };
export const PREFILL_EVENT = "rk:prefill";

export function prefillContact(detail: Prefill) {
  window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail }));
}
