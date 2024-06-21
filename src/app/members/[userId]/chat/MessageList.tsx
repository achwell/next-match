"use client";

import MessageBox from "@/app/members/[userId]/chat/MessageBox";
import {MessageDto} from "@/types";
import {useEffect, useState} from "react";
import {pusherClient} from "@/lib/pusher";
import {MESSAGE_NEW} from "@/types/constants";

interface Props {
    initialMessages: MessageDto[]
    currentUserId: string
    chatId: string
}

const MessageList = ({initialMessages, currentUserId, chatId}: Props) => {

    console.log({initialMessages, currentUserId, chatId})

    const [messages, setMessages] = useState(initialMessages);

    useEffect(() => {
        const channel = pusherClient.subscribe(chatId)
         channel.bind(MESSAGE_NEW, () => {});
        return () => {
            channel.unsubscribe();
             channel.unbind(MESSAGE_NEW, () => {});
        }
    }, [chatId]);

    return <div>
        {messages.length === 0 ? 'No messages to display' : (
            <div>
                {messages.map(message => (
                    <MessageBox
                        key={message.id}
                        message={message}
                        currentUserId={currentUserId}/>
                ))}
            </div>
        )}
    </div>
}
export default MessageList;
