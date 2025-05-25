import {isAxiosError} from "axios";
import {enqueueSnackbar} from "notistack";


export const throwListErrors = (error: Error) => {
    if (isAxiosError(error) && error.response && error.response.data && error!.response.data && error.response.data.length > 0) {
        error.response.data.forEach((error: any) => {
            enqueueSnackbar({message: error, variant: "error", autoHideDuration: 1000});
        })
    }
}