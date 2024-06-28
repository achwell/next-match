import { useCallback, useEffect, useRef } from 'react'
import usePresenceStore from './usePresenceStore'
import { Channel, Members } from 'pusher-js';
import { pusherClient } from '@/lib/pusher';
import {updateLastActive} from "@/app/actions/memberActions";

const pusherSubscriptionSucceeded = 'pusher:subscription_succeeded';
const pusherMemberAdded = 'pusher:member_added';
const pusherMemberRemoved = 'pusher:member_removed';

export const usePresenceChannel = () => {
    const {set, add, remove} = usePresenceStore(state => ({
        set: state.set,
        add: state.add,
        remove: state.remove
    }));
    const channelRef = useRef<Channel | null>(null);

    const handleSetMembers = useCallback((memberIds: string[]) => {
        set(memberIds);
    }, [set]);

    const handleAddMember = useCallback((memberId: string) => {
        add(memberId);
    }, [add]);

    const handleRemoveMember = useCallback((memberId: string) => {
        remove(memberId);
    }, [remove])

    useEffect(() => {
        if (!channelRef.current) {
            channelRef.current = pusherClient.subscribe('presence-nm');

            channelRef.current.bind(pusherSubscriptionSucceeded, async (members: Members) => {
                handleSetMembers(Object.keys(members.members));
                await updateLastActive()
            })

            channelRef.current.bind(pusherMemberAdded, (member: Record<string, any>) => {
                handleAddMember(member.id);
            })

            channelRef.current.bind(pusherMemberRemoved, (member: Record<string, any>) => {
                handleRemoveMember(member.id);
            });
        }

        return () => {
            if (channelRef.current && channelRef.current.subscribed) {
                channelRef.current.unsubscribe();
                channelRef.current.unbind(pusherSubscriptionSucceeded, handleSetMembers);
                channelRef.current.unbind(pusherMemberAdded, handleAddMember);
                channelRef.current.unbind(pusherMemberRemoved, handleRemoveMember);
            }
        }
    }, [handleAddMember, handleRemoveMember, handleSetMembers])
}
