import CardInnerWrapper from "@/components/CardInnerWrapper";
import {getAuthUserId} from "@/app/actions/authActions";
import {getMessageThread} from '@/app/actions/messageActions'
import ChatForm from './ChatForm'
import MessageList from "@/app/members/[userId]/chat/MessageList";
import {createChatId} from "@/lib/util";

const ChatPage = async ({params}: { params: { userId: string } }) => {
    const userId = await getAuthUserId();
    const messages = await getMessageThread(params.userId);
    const chatId = createChatId(userId, params.userId);


    return <CardInnerWrapper header="Chat"
                             body={<MessageList initialMessages={messages} currentUserId={userId} chatId={chatId}/>}
                             footer={<ChatForm/>}/>
}
export default ChatPage;
