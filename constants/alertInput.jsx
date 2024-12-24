import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);


export function alertInput(title, type, confirmButtonText) {

  return MySwal.fire({
    title: <p>{title}</p>,
    input: type,
    inputAttributes: {
      autocapitalize: "off"
    },
    showCancelButton: true,
    confirmButtonText,
    showLoaderOnConfirm: true,
    preConfirm: async (value) => {
      console.log(value);
      return value;
    }
  }).then((result) => {
    if (result.isDismissed) {
      return "cancel";
    }
    return result.value;
  });

}