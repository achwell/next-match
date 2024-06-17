"use client"

import {NextUIProvider} from "@nextui-org/react";
import {ReactNode} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Providers = ({children}: {children: ReactNode}) => {
    return <NextUIProvider>
        <ToastContainer position='bottom-right' hideProgressBar className='z-50' />
        {children}
    </NextUIProvider>
}
export default Providers;