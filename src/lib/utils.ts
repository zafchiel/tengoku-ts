import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function slugify(str: string) {
  let slug = str.trim().toLowerCase();

  const accents = "àáäâèéëêìíïîòóöôùúüûñç";
  const nonAccents = "aaaaeeeeiiiioooouuuunc";

  for (let i = 0; i < accents.length; i++) {
    slug = slug.replace(new RegExp(accents[i], "g"), nonAccents[i]);
  }

  slug = slug
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return slug;
}

export const debounce = (fn: Function, delay: number) => {
  let timerId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
};