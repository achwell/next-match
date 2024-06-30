'use client';

import {useRouter} from "next/navigation";
import CardWrapper from "@/components/CardWrapper";
import {FaCheckCircle} from "react-icons/fa";

const RegisterSuccessPage = () => {
    const router = useRouter();

    return (
        <CardWrapper
            headerText='You have successfully registered'
            subHeaderText='You can now login to the app'
            action={() => router.push('/login')}
            actionLabel='Go to login'
            headerIcon={FaCheckCircle}
        />
    )
}
export default RegisterSuccessPage
