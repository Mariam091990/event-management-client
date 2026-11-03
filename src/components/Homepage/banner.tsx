
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
    return (
        <section className="relative min-h-105 w-full overflow-hidden rounded-3xl">

            {/* Banner Image */}
            <Image
                src="/socialEvents.png"
                alt="Social Welfare Community Events"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/80 to-transparent" />

            {/* Banner Content */}
            <div className="relative z-10 flex min-h-105 items-center px-6 py-12 md:px-12">

                <div className="max-w-xl">
                    <span className="badge badge-success mb-5">
                        🌱 Together We Can Make a Difference
                    </span>

                    <h1 className="text-4xl font-extrabold text-emerald-950 md:text-5xl">
                        Organize Social Welfare Events
                    </h1>

                    <p className="mt-5 leading-7 text-gray-700">
                        Bring people together for a cleaner, greener,
                        healthier and more caring community.
                    </p>

           {/* <link href="/# allevents">  */}
                  <button className="btn mt-7 rounded-full border-0 bg-emerald-700 px-8 text-white hover:bg-emerald-800">
                        Explore Events →
                    </button>
                  {/* </Link> */}

            <Link href="/create-events">        <button className=" ml-3 btn mt-7 rounded-full border-0 bg-emerald-700 px-8 text-white hover:bg-emerald-800">
                        Create Events →
                    </button></Link>
                </div>

            </div>
        </section>
    );
};

export default Banner;
