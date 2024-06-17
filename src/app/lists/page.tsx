import ListsTab from "@/app/lists/ListsTab";
import {fetchCurrentUserLikeIds, fetchLikedMembers} from "@/app/actions/likeActions";

const ListsPage = async ({searchParams}: {searchParams: {type: string}}) => {

    const likeIds = await fetchCurrentUserLikeIds();
    const members = await fetchLikedMembers(searchParams.type);

    return <div>
        <ListsTab members={members} likeIds={likeIds}/>
    </div>
}
export default ListsPage;
