import Swal from "sweetalert2";

export const createToast = (position = "top-end", timer = 3000, timerProgressBar = true ) => {
    return Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: timerProgressBar,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  }
 