import { Slide, toast } from "react-toastify";

const toastType = ["info", "success", "warning", "danger", "dark"];

export function toastAlert(type, toastBody, position, toastId) {
  if (toastId) toast.dismiss(toastId.current);

  if (toastType[type]) {
    toast[type](toastBody, {
      position,
      toastId,
    });
  } else {
    toast(toastBody || "Demo toast", {
      position,
      toastId,
    });
  }
}

// toast config
export function toastConfig() {
  toast.configure({
    transition: Slide,
    autoClose: 3000,
    hideProgressBar: true,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
  });
}