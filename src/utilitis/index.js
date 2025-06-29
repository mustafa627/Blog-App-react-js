import { Bounce, toast } from "react-toastify"

 
const ToastAlert = (obj) => {
switch (obj.type) {
    case "success":
         return toast.success(obj.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })
            case "error":
        return toast.error(obj.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            })

}
}

export default ToastAlert;


//  "dependencies": {
//     "@cloudinary/react": "^1.14.3",
//     "@cloudinary/url-gen": "^1.21.0",
//     "@emotion/react": "^11.14.0",
//     "@emotion/styled": "^11.14.0",
//     "@mui/icons-material": "^7.1.2",
//     "@mui/material": "^7.1.2",
//     "axios": "^1.10.0",
//     "firebase": "^11.9.1",
//     "react": "^19.1.0",
//     "react-dom": "^19.1.0",
//     "react-router-dom": "^7.6.2",
//     "react-toastify": "^11.0.5"
//   },