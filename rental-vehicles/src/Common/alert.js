import Swal from 'sweetalert2';


export const alert = {
    unknownError: (text = 'Something went wrong!') =>{
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text,
        })
    }
}