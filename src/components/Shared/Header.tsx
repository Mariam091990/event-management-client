


import { Button } from "@base-ui/react";
import Image from "next/image";
import Link from "next/link";
import UserInfo from "./userInfo";



export default function Navbar() {



    return (
        // <header className="w-full border-b border-gray-200 bg-white">


        //     <div className=" flex h-15.5 max-w-450 justify-around px-4 mt-5 mb-5">




        //         {/* Upcoming Events */}




        //         {/* <div> <Link href="/upcoming-events">
        //             <Button className="hover-3d rounded">
        //                 <h1 className="text-[15px] font-bold  ">Upcomming Events</h1>
        //             </Button></Link>
        //         </div> */}


        //         <UserInfo />
        //     </div>

        // </header>


        <div className="navbar mt-6 px-13 shadow-sm min-w-/6 mx-auto">
         
            <div className="navbar-start">

                <div className="flex items-center gap-2">



                    <div >
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

                    <div className=" ">

                        <Link href="/">
                            <Button className=" hover-3d rounded">
                                <h1 className="text-md font-bold p-4">
                                    Social walfare <br /> Events
                                </h1>
                            </Button>
                        </Link>

                    </div>
                </div>

            </div>
            <div className="navbar-center">
                <div className="flex justify-center md:justify-end">

                    <Link
                        href="/upcoming-events"
                        className="hover-3d inline-flex w-full items-center justify-center rounded-lg bg-blue-50 px-1 py-2 text-md font-bold text-blue-700 transition-colors hover:bg-blue-100 sm:w-auto"
                    >
                        Upcoming Events
                    </Link>

                </div>
            </div>
            <div className="navbar-end">

                <div>
                    <UserInfo />

                </div>
            </div>
        </div>

    );
}