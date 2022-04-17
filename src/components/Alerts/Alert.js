// import React from "react";
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

// export const alert = (props) =>
//   Swal.fire({
//     icon: "error",
//     title: `${props.message}`,
//     showConfirmButton: true,
//     confirmButtonText: "Ok",
//     confirmButtonColor: "#f76928",
//     showClass: {
//       popup: "animate__animated animate__zoomIn",
//     },
//     hideClass: {
//       popup: "animate__animated animate__zoomOut",
//     },
//     timer: 3000,
//   });
