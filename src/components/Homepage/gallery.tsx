"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface GalleryEvent {
    thumbnail: string;
    title: string;
    eventType: string;
    description: string;
    location: string;
    eventDate: string;
    organizerName: string;
}

const Gallery = () => {
    const [gallery, setGallery] = useState<GalleryEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGallery = async () => {
            try {
                const response = await fetch("/data/gallery.json");

                if (!response.ok) {
                    throw new Error("Failed to load gallery");
                }


                const data = await response.json();

                const sortedGallery = data.sort(
                    (a: GalleryEvent, b: GalleryEvent) =>
                        new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
                );

                setGallery(sortedGallery);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadGallery();
    }, []);

    if (loading) {
        return (
            <p className="text-center py-10">Loading gallery...</p>
        );
    }

    return (
        <section id="allEvents" className="px-4 md:px-8 py-16 md:py-24">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                        Our Memories
                    </span>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-3">
                        Moments of <span className="text-primary">Kindness</span>
                    </h2>

                    <p className="text-gray-500 mt-4">
                        Explore the moments when people came together to
                        support communities and create positive change.
                    </p>
                </div>

                {/* Gallery Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                    {gallery.map((event, index) => (
                        <div
                            key={index}
                            className="group bg-stale-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-60 overflow-hidden">
                                <Image
                                    src={event.thumbnail}
                                    alt={event.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                <span className="absolute top-4 left-4 badge badge-primary font-medium">
                                    {event.eventType}
                                </span>
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">
                                    {event.title}
                                </h3>

                                <p className="text-gray-500 text-sm leading-7 line-clamp-3">
                                    {event.description}
                                </p>

                                <div className="mt-5 pt-4 border-t border-base-200 space-y-2">
                                    <p className="text-sm text-gray-500">
                                        📍 {event.location}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        📅 {new Date(event.eventDate).toLocaleDateString(
                                            "en-GB",
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                                timeZone: "UTC",
                                            }
                                        )}
                                    </p>
                                </div>

                                <p className="text-sm font-semibold text-primary mt-4">
                                    Organized by {event.organizerName}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Gallery;