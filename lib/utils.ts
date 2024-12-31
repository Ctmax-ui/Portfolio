import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Bounce, toast } from "react-toastify";

export function cn (...inputs: ClassValue[]){
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }

export const sendToast = (message: string, type?: "success" | "error" | "info" | "warning") => {
  const bodyTheme = document.body.classList.contains('dark')? 'dark':'light'
    if (type) {
      toast[type](message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: bodyTheme || "light",
        transition: Bounce,
      });
    } else {
      toast(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: bodyTheme || "light",
        transition: Bounce,
      });
    }
  };