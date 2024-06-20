import {getMemberByUserId} from "@/app/actions/memberActions";
import {notFound} from "next/navigation";
import {getAuthUserId} from "@/app/actions/authActions";
import EditForm from "@/app/members/edit/EditForm";
import CardInnerWrapper from "@/components/CardInnerWrapper";

const MemberEditPage = async () => {
    const userId = await getAuthUserId();

    const member = await getMemberByUserId(userId);

    return !member ? notFound() : <CardInnerWrapper header=" Edit Profile" body={<EditForm member={member} />}/>;
}
export default MemberEditPage;
