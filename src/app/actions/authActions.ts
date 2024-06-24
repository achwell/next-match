"use server"

import {prisma} from "@/lib/prisma";
import {auth, signIn, signOut} from "@/auth";
import {registerSchema, RegisterSchema} from "@/lib/schemas/registerSchema";
import {ActionResult} from "@/types";
import {Prisma, User} from "@prisma/client";
import bcrypt from 'bcryptjs';
import {AuthError} from "next-auth";
import {LoginSchema} from "@/lib/schemas/loginSchema";
import MemberCreateInput = Prisma.MemberCreateInput;

export async function signInUser(data: LoginSchema): Promise<ActionResult<string>> {
    try {
        const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        });
        return {status: 'success', data: 'Logged in'}
    } catch (error) {
        console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {status: 'error', error: 'Invalid credentials'}
                default:
                    return {status: 'error', error: 'Something went wrong'}
            }
        } else {
            return {status: 'error', error: 'Something else went wrong'}
        }
    }
}

export async function signOutUser() {
    await signOut({redirectTo: '/'});
}

export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
    try {
        const validated = registerSchema.safeParse(data);
        if (!validated.success) {
            return {status: 'error', error: validated.error.errors }
        }

        const { name, email, password } = validated.data;

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) return {status: 'error', error: 'User already exists' };

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
                emailVerified: new Date()
            }
        })
        const member: MemberCreateInput = {
            city: "unknown",
            country: "unknown",
            dateOfBirth: new Date(),
            description: "unknown",
            gender: "unknown",
            name,
            user: {connect: {id: user.id}}}
        const newMember = await prisma.member.create({
            data: member
        });

        return {status: 'success', data: user}
    } catch (error) {
        console.log(error);
        return {status: 'error', error: 'Something went wrong'}
    }

}

export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({where: {email}});
}

export async function getUserById(id: string) {
    return prisma.user.findUnique({where: {id}});
}

export async function getAuthUserId() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) throw new Error('Unauthorised');

    return userId;
}
