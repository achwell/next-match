import { getMemberByUserId } from '@/app/actions/memberActions'
import { notFound } from 'next/navigation';
import React from 'react'
import CardInnerWrapper from "@/components/CardInnerWrapper";

const MemberDetailedPage = async ({ params }: { params: { userId: string } }) => {
    const member = await getMemberByUserId(params.userId);

    return !member ? notFound() : <CardInnerWrapper header="Profile" body={<div>{member.description}</div>}/>;
}
export default MemberDetailedPage;
