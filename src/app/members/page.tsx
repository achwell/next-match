import {getMembers} from "@/app/actions/memberActions";
import MemberCard from "@/app/members/MemberCard";
import {fetchCurrentUserLikeIds} from "@/app/actions/likeActions";

const MembersPage = async () => {
    const members = await getMembers()
    const likeIds = await fetchCurrentUserLikeIds();

    console.log({members, likeIds})

    return <div className='mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8'>
        {members && members.map(member => (
            <MemberCard member={member} key={member.id} likeIds={likeIds}/>
        ))}
    </div>
}
export default MembersPage;
