import { Suspense } from "react";
import DonNfuE from "./donNfuE";


export default function DoneNFutureEvents() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen bg-[#f2f7f2] px-4 py-10">
                    <div className="mx-auto max-w-7xl">
                        <p className="text-center text-gray-500">
                            All Events are Loading ...
                        </p>
                    </div>
                </main>
            }
        >
       
            <DonNfuE/>
        </Suspense>
    );
}