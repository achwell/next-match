"use client";

import MessageBox from "@/app/members/[userId]/chat/MessageBox";
import {MessageDto} from "@/types";
import {useCallback, useEffect, useRef, useState} from "react";
import {pusherClient} from "@/lib/pusher";
import {MESSAGE_NEW, MESSAGE_READ} from "@/types/constants";
import {formatShortDateTime} from "@/lib/util";
import {Channel} from "pusher-js";

interface Props {
    initialMessages: {
        messages: MessageDto[]
        readCount: number
    }
    currentUserId: string
    chatId: string
}

const MessageList = ({initialMessages, currentUserId, chatId}: Props) => {

    const setReadCount = useRef(false)
    const channelRef = useRef<Channel | null>(null)

    const [messages, setMessages] = useState(initialMessages.messages);

    const handleNewMessage = useCallback((message: MessageDto) => {
        setMessages(prevState => {
            return [...prevState, message]
        })
    }, [])

    const handleReadMessages = useCallback((messageIds: string[]) => {
        setMessages(prevState => prevState.map(message => messageIds.includes(message.id)
            ? {...message, dateRead: formatShortDateTime(new Date())}
            : message
        ))
    }, []);

    useEffect(() => {
        if (channelRef.current) {
            channelRef.current = pusherClient.subscribe(chatId);

            channelRef.current.bind(MESSAGE_NEW, handleNewMessage);
            channelRef.current.bind(MESSAGE_READ, handleReadMessages);
        }

        return () => {
            if (channelRef.current && channelRef.current.subscribed) {
                channelRef.current.unsubscribe();
                channelRef.current.unbind(MESSAGE_NEW, handleNewMessage);
                channelRef.current.unbind(MESSAGE_READ, handleReadMessages);
            }
        }
    }, [chatId, handleNewMessage, handleReadMessages]);

    return <div>
        {messages.length === 0 ? 'No messages to display' : (<div>
                {messages.map(message => (<MessageBox
                        key={message.id}
                        message={message}
                        currentUserId={currentUserId}/>))}
            </div>)}
    </div>
}
export default MessageList;
