
"use client";


import { authClient } from "../../lib/auth-client";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { redirect } from "next/navigation";

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    // const [name, setName] = useState("");

    const handleUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newUserData = Object.fromEntries(formData.entries()) as { name: string };


        const { error } = await authClient.updateUser({
            ...newUserData,
        });

        if (error) {
            toast.error("Update is not done!!");
            return;
        }

        toast.success("Profile updated successfully");

    };

    const handleSignOut = async () => {
        await authClient.signOut();
        redirect("/signin");
    };

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f0f5f0]">
                Your Profile is Loading...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f0f5f0]">
                <p>To see your profile Sign in first</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-12 text-[#253129]">
            <div className="mx-auto max-w-139">
                <header className="mb-5">
                    <h1 className="text-xl font-bold">Your Profile</h1>
                    
                </header>

                {/* User information card */}
                <section className="flex items-center gap-3 rounded-xl border border-[#e1e9e1] bg-[#fbfdfb] p-4 sm:gap-4">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || "Profile"}
                            referrerPolicy="no-referrer"
                            className="shrink-0 rounded-xl object-cover"
                            width={60}
                            height={52}
                        />
                    ) : (
                        <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-[#dceade] text-xl font-bold text-green-800">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                    )}

                    <div className="min-w-0 flex-1">
                        <h2 className="truncate text-sm font-semibold sm:text-base">
                            {user.name || "user"}
                        </h2>
                        <p className="mt-1 truncate text-xs text-[#707970] sm:text-sm">
                            {user.email}
                        </p>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="shrink-0 rounded-md border border-red-400 px-2 py-2 text-[10px] text-red-600 transition hover:bg-red-50 sm:px-3 sm:text-xs"
                    >
                        ↪ Sign out
                    </button>
                </section>

                {/* Edit profile card */}
                <section className="mt-4.5 rounded-xl border border-[#e1e9e1] bg-[#fbfdfb] p-4 sm:p-3.75">
                    <h2 className="text-sm font-semibold">Information</h2>

                    <form onSubmit={handleUpdate} className="mt-7 px-0 sm:px-4.5 flex flex-col gap-3">
                        <label
                            htmlFor="name"
                            className="mb-1 block text-xs"
                        >
                           Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            name="name"

                            placeholder={user.name || "Your name"}
                            className="h-7.75 w-full rounded-lg border border-[#e0e8e0] bg-transparent px-3 text-sm outline-none transition focus:border-green-600"
                        />

                        <button
                            type="submit"
                            className="mt-3 h-8 w-full rounded-md bg-[#07883e] text-xs font-medium text-white shadow-[0_2px_3px_#0003] transition hover:bg-[#067334]"
                        >
                           Update
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
};

export default ProfilePage;

