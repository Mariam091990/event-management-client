
import { Heart, Leaf, Users } from "lucide-react";
import Image from "next/image";

const features = [
    {
        title: "Go Green, Plant a Tree",
        description:
            "Make the earth greener. Join hands with passionate volunteers to plant trees and create a healthier environment for future generations.",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
        icon: Leaf,
        label: "Environmental Care",
    },
    {
        title: "Spread Kindness & Care",
        description:
            "A little kindness can change someone's life. Support underprivileged communities through food distribution, donations, and helping hands.",
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800",
        icon: Heart,
        label: "Community Support",
    },
    {
        title: "Together We Are Stronger",
        description:
            "Connect with like-minded people, participate in meaningful initiatives, and build a stronger community through collective action.",
        image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
        icon: Users,
        label: "Volunteer Community",
    },
];

export default function VolunteerFeatures() {
    return (
        <section className="bg-[#f6f9f5] px-4 py-16 md:px-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-10 text-center">
                    <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-green-700">
                        What We Stand For
                    </p>

                    <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
                        Be The Change You Want To See
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                        Every helping hand matters. Discover how you can
                        make a meaningful difference in the world around you.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                className="group overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                {/* Photo */}
                                <div className="relative h-60 overflow-hidden">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        height={300}
                                        width={700}
                                        loading="eager"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-green-800 backdrop-blur-sm">
                                        {feature.label}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition-colors group-hover:bg-green-600 group-hover:text-white">
                                        <Icon size={24} />
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-800">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-gray-500">
                                        {feature.description}
                                    </p>

                                    <div className="mt-5 h-1 w-12 rounded-full bg-green-500 transition-all duration-300 group-hover:w-24" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
