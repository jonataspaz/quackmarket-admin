import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*what this file does is it takes the classnames and merges 
them with tailwindcss classes and returns the merged classes as a 
string to be used in the className prop of the component that is using it.*/

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NZD",
});
