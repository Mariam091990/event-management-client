
import { Suspense } from "react";

import UpcommingEventsPage from "./upcommingEvent";

export default function ProductsPage() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen bg-[#f2f7f2] px-4 py-10">
                    <div className="mx-auto max-w-7xl">
                        <p className="text-center text-gray-500">
                            Events are Loading ...
                        </p>
                    </div>
                </main>
            }
        >
            <UpcommingEventsPage/>
        </Suspense>
    );
}
