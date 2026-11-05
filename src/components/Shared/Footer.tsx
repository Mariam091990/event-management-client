
import Link from "next/link";
import {
    Heart,
    Mail,
    MapPin,
   
    ArrowRight,
    HandHeart,
} from "lucide-react";
import CurrentYear from "./currentYear";

const Footer = () => {
    return (
        <footer className="mt-20 bg-[#073b32] text-white">

            {/* Main Footer */}
            <div className="mx-auto max-w-xl px-6 py-5 lg:px-10">

                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand Section */}
                    <div>
                        <Link href="/" className="inline-flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl">
                                <HandHeart className="text-emerald-700" size={28} />
                            </div>

                            <div>
                                <h2 className="text-xl font-extrabold tracking-wide">
                                    Social Welfare
                                </h2>
                                <p className="text-sm text-emerald-300">
                                    Events
                                </p>
                            </div>
                        </Link>

                        <p className="mt-5 max-w-xs text-sm leading-7 text-emerald-100/75">
                            Bringing people together to create positive change.
                            Join our community and make a meaningful difference
                            through kindness, volunteering, and social action.
                        </p>

                        {/* Social Links */}
                        <div className="mt-6 flex gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="rounded-full bg-white/10 p-3 transition hover:bg-emerald-500"
                            >
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    className="h-4.5 w-4.5fill-current"
                                >
                                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.098 4.388 23.093 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.698 4.533-4.698 1.312 0 2.686.236 2.686.236v2.973h-1.513c-1.491 0-1.956.931-1.956 1.886v2.263h3.328l-.532 3.49h-2.796V24C19.612 23.093 24 18.098 24 12.073Z" />
                                </svg>
                            </a>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="rounded-full bg-white/10 p-3 transition hover:bg-emerald-500"
                            >
                                
                            </a>

                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="rounded-full bg-white/10 p-3 transition hover:bg-emerald-500"
                            >
                                
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-6 text-lg font-bold">
                            Quick Links
                        </h3>

                        <ul className="space-y-4 text-sm text-emerald-100/75">
                            <li>
                                <Link href="/" className="transition hover:text-white">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/upcoming-events"
                                    className="transition hover:text-white"
                                >
                                    Upcoming Events
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/doneNFutureEvents"
                                    className="transition hover:text-white"
                                >
                                    Past & Future Events
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/create-events"
                                    className="transition hover:text-white"
                                >
                                    Create an Event
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/profile"
                                    className="transition hover:text-white"
                                >
                                    My Profile
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Event Categories */}
                    <div>
                        <h3 className="mb-6 text-lg font-bold">
                            Our Initiatives
                        </h3>

                        <ul className="space-y-4 text-sm text-emerald-100/75">
                            <li>Food Distribution</li>
                            <li>Community Cleanup</li>
                            <li>Tree Plantation</li>
                            <li>Winter Relief</li>
                            <li>Education Support</li>
                            <li>Health Camps</li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="mb-6 text-lg font-bold">
                            Get in Touch
                        </h3>

                        <div className="space-y-5 text-sm text-emerald-100/75">

                            <div className="flex items-start gap-3">
                                <Mail size={19} className="mt-1 shrink-0 text-emerald-400" />
                                <a
                                    href="mailto:support@socialwelfare.com"
                                    className="transition hover:text-white"
                                >
                                    support@socialwelfare.com
                                </a>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin size={19} className="mt-1 shrink-0 text-emerald-400" />
                                <p>
                                    Bangladesh
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <Heart size={19} className="mt-1 shrink-0 text-emerald-400" />
                                <p>
                                    Together for a better community.
                                </p>
                            </div>

                        </div>

                        {/* CTA */}
                        <Link
                            href="/upcoming-events"
                            className="mt-7 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
                        >
                            Join Our Community
                            <ArrowRight size={17} />
                        </Link>
                    </div>

                </div>

                {/* Bottom Divider */}
                <div className="mt-14 border-t border-white/15 pt-7">

                    <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-emerald-100/60 md:flex-row md:text-left">

                        {/* <p>
                            © {new Date().getFullYear()} Social Welfare Events.
                            All rights reserved.
                        </p> */}
                        <CurrentYear/>

                        <p className="flex items-center gap-2">
                            Made with
                            <Heart size={15} className="fill-rose-400 text-rose-400" />
                            for a better world.
                        </p>

                        <div className="flex gap-5">
                            <Link href="/" className="transition hover:text-white">
                                Privacy
                            </Link>

                            <Link href="/" className="transition hover:text-white">
                                Terms
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
