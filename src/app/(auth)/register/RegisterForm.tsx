'use client';

import { registerUser } from "@/app/actions/authActions";
import { Button, Card, CardHeader, CardBody, Input } from "@nextui-org/react";
import { GiPadlock } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import {toast} from "react-toastify";
import { handleFormServerErrors } from "@/lib/util";

const RegisterForm = () => {

    const {register, handleSubmit, formState: {errors, isValid, isSubmitting}, setError} = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onTouched"
    });

    const onSubmit = async (data: RegisterSchema) => {
        const result = await registerUser(data);
        if (result.status === 'success') {
            toast.info('User registered successfully');
        } else {
            handleFormServerErrors(result, setError);
        }
    }

    return <Card className="w-s/5 mx-auto">
        <CardHeader className="flex flex-col items-center justify-center">
            <div className="flex flex-col gap-2 items-center text-secondary">
                <div className="flex flex-row gap-3">
                    <GiPadlock size={30}/>
                    <h1 className="text-3xl font-semibold">Register</h1>
                </div>
                <p className="text-neutral-500">Welcome to NextMatch</p>
            </div>
        </CardHeader>
        <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <Input
                        defaultValue=''
                        label='Name'
                        variant='bordered'
                        {...register('name')}
                        isInvalid={!!errors.name}
                        errorMessage={errors.name?.message}
                    />
                    <Input
                        type="email"
                        defaultValue=''
                        label='Email'
                        variant='bordered'
                        {...register('email')}
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                    />
                    <Input
                        defaultValue=''
                        label='Password'
                        variant='bordered'
                        type='password'
                        {...register('password')}
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message}
                    />
                    {errors.root?.serverError && (
                        <p className='text-danger text-sm'>{errors.root.serverError.message}</p>
                    )}
                    <Button isLoading={isSubmitting} isDisabled={!isValid} fullWidth color='secondary' type='submit'>
                        Register
                    </Button>
                </div>
            </form>
        </CardBody>
    </Card>;
}
export default RegisterForm;
