import Swal from "sweetalert2";
import "animate.css";

export const success = (message) => {
  Swal.fire({
    title: `${message}`,
    showConfirmButton: true,
    confirmButtonText: "Ok",
    confirmButtonColor: "#f76928",
    showClass: {
      popup: "animate__animated animate__zoomIn", 
    },
    hideClass: {
      popup: "animate__animated animate__zoomOut",
    },
    timer: 3000,
  });
};

export const error = (message) => {
  Swal.fire({
    icon: "error",
    title: `${message}`,
    showConfirmButton: true,
    confirmButtonText: "Ok",
    confirmButtonColor: "#f76928",
    showClass: {
      popup: "animate__animated animate__zoomIn",
    },
    hideClass: {
      popup: "animate__animated animate__zoomOut",
    },
    timer: 3000,
  });
};

export const confirmDelete = () => {
  return Swal.fire({
    text: "Are you sure you want to delete?",
    showClass: {
      popup: "animate__animated animate__zoomIn",
    },
    hideClass: {
      popup: "animate__animated animate__zoomOut",
    },
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "Yes, delete it",
    confirmButtonColor: "#f76928",
    cancelButtonColor: "#555",
  });
};
