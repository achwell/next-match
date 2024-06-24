'use client';

import useMessageStore from '@/hooks/useMessageStore';
import Link from "next/link";
import {NavbarItem} from "@nextui-org/react";
import {usePathname} from "next/navigation";

type Props = {
    href:string
    label:string
}

const NavLink = ({href, label}:Props) => {
    const pathname = usePathname();
    const {unreadCount} = useMessageStore(state => ({
        unreadCount: state.unreadCount
    }))
    return <NavbarItem isActive={pathname === href} as={Link} href={href}>
        <span>{label}</span>
        {href === '/messages' && (
            <span className='ml-1'>({unreadCount})</span>
        )}
    </NavbarItem>
}
export default NavLink
