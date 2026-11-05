const Newsletter = () => {
    return (
        <section className="px-4 md:px-8  md:py-15">
            <div className="max-w-md mx-auto">
                <div className="relative overflow-hidden rounded-3xl bg-stone-100 border border-stone-200 px-6 py-14 md:py-12 md:px-12">

                    {/* Decorative Background */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-stone-200/60 blur-3xl" />
                    <div className="absolute -bottom-24 -left-20 w-64 h-64 rounded-full bg-stone-200/60 blur-3xl" />

                    {/* Content */}
                    <div className="relative z-10 max-w-2xl mx-auto text-center">

                        <span className="inline-block rounded-full bg-white border border-stone-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-600">
                            Stay Connected
                        </span>

                        <h2 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight text-slate-800">
                            Be Part of Something
                            <span className="block text-stone-500 mt-2">
                                Meaningful
                            </span>
                        </h2>

                        <p className="mt-5 text-sm md:text-base leading-7 text-slate-500 max-w-lg mx-auto">
                            Stay connected with our community! Get updates about upcoming
                            events, volunteer opportunities, and inspiring stories of
                            positive change happening around you.
                        </p>

                        {/* Subscription Form - Static UI */}
                        <div className="mt-9 max-w-lg mx-auto">
                            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white border border-stone-200 rounded-2xl shadow-sm">

                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="flex-1 min-w-0 px-4 py-3 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                                />

                                <button
                                    type="button"
                                    className="rounded-xl bg-slate-800 hover:bg-slate-700 text-white px-7 py-3 text-sm font-semibold transition-colors duration-300"
                                >
                                    Subscribe →
                                </button>

                            </div>

                            <p className="mt-4 text-xs text-stone-500">
                                Join our community and be the reason for a positive change.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;