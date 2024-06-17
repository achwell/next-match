import {Button} from "@nextui-org/react";
import {FaRegSmile} from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <div>
        <h1 className="text-3xl text-red-500 font-bold">Hello app!</h1>
        <Button
            color="primary"
            variant="bordered"
            startContent={<FaRegSmile size={20}/>}
            as={Link}
            href="/members"
        >Click Me!</Button>
    </div>
  );
}
