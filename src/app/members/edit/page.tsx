import {CardBody, CardHeader, Divider} from "@nextui-org/react";
import React from "react";
import {getMemberByUserId} from "@/app/actions/memberActions";
import {notFound} from "next/navigation";
import {getAuthUserId} from "@/app/actions/authActions";
import EditForm from "@/app/members/edit/EditForm";

const MemberEditPage = async () => {
    const userId = await getAuthUserId();

    console.log({userId})

    const member = await getMemberByUserId(userId);

    console.log({member})

    if (!member) return notFound();    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Edit Profile
            </CardHeader>
            <Divider />
            <CardBody>
                <EditForm member={member} />
            </CardBody>
        </>
    )
}
export default MemberEditPage;
