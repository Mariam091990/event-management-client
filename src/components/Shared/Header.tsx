


import { Button } from "@base-ui/react";
import Image from "next/image";
import Link from "next/link";

// import NavLinks from "./NavLinks";
// import UserInfo from "./UserInfo";
// import BanglaDate from "./BanglaDate";






export default function Navbar() {



    return (
        <header className="w-full border-b border-gray-200 bg-white">

            {/* ================= TOP ROW ================= */}
            <div className="mx-auto flex h-15.5 max-w-225 justify-around items-center  px-4 mt-5 mb-5">

                <div className="flex items-center gap-2">
                    {/* Logo */}


                    <div className="">
                        <Link href="/">
                            <Image className="hover-3d"
                                src="/images.png"
                                alt="events"
                                width={90}
                                height={90}
                                loading="eager"
                            />
                        </Link>

                    </div>

                    <div>

                        <Link href="/">
                            <Button className=" hover-3d rounded">
                                <h1 className="text-[15px] font-bold p-4">
                                    Social walfare <br /> Events
                                </h1>
                            </Button>
                        </Link>


                        {/* <BanglaDate /> */}



                    </div>
                </div>

                <div> <Link href="/upcoming-events">
                    <Button className="hover-3d rounded">
                        <h1 className="text-[15px] font-bold  ">Upcomming Events</h1>
                    </Button></Link>
                </div>

                <div>user info</div>
                {/* <UserInfo /> */}
            </div>


            {/* ================= CATEGORY NAV ================= */}

            {/* <NavLinks /> */}


        </header>
    );
}