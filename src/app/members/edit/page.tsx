import React from "react";
import {getMemberByUserId} from "@/app/actions/memberActions";
import {notFound} from "next/navigation";
import {getAuthUserId} from "@/app/actions/authActions";
import EditForm from "@/app/members/edit/EditForm";
import CardInnerWrapper from "@/components/CardInnerWrapper";

const MemberEditPage = async () => {
    const userId = await getAuthUserId();

    console.log({userId})

    const member = await getMemberByUserId(userId);

    console.log({member})

    return !member ? notFound() : <CardInnerWrapper header=" Edit Profile" body={<EditForm member={member} />}/>;
}
export default MemberEditPage;
