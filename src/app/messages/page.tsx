import {getMessagesByContainer} from "@/app/actions/messageActions";
import MessageSidebar from "@/app/messages/MessageSidebar";
import MessageTable from "@/app/messages/MessageTable";

const MessagesPage = async ({searchParams}: {searchParams: {container: string}}) => {
    const {messages, nextCursor} = await getMessagesByContainer(searchParams.container);
    return <div className='grid grid-cols-12 gap-5 h-[80vh] mt-10'>
        <div className='col-span-2'>
            <MessageSidebar/>
        </div>
        <div className='col-span-10'>
            <MessageTable initialMessages={messages} nextCursor={nextCursor}/>
        </div>
    </div>
}
export default MessagesPage;
