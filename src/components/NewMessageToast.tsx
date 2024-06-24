import {MessageDto} from "@/types";
import Link from "next/link";
import {Image} from "@nextui-org/react";
import {transformImageUrl} from "@/lib/util";

interface Props {
    message: MessageDto
}

const NewMessageToast = ({message}: Props) => {
    return (
        <Link href={`/members/${message.senderId}/chat`} className='flex items-center'>
            <div className='mr-2'>
                <Image
                    src={transformImageUrl(message.senderImage) || '/images/user.png'}
                    height={50}
                    width={50}
                    alt='Sender image'
                />
            </div>
            <div className='flex flex-grow flex-col justify-center'>
                <div className='font-semibold'>{message.senderName} sent you a message</div>
                <div className='text-sm'>Click to view</div>
            </div>
        </Link>
    )
}
export default NewMessageToast;


// export const newMessageToast = (message: MessageDto) => {
//     toast(<NewMessageToast message={message} />)
// }
