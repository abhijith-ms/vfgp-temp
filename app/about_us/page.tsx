import { Rocket, Eye, BadgeCheck, Gavel, Handshake, Lightbulb, Compass, Microscope, Sliders } from 'lucide-react'
import React from 'react'

export default function page() {
    return (
        <div>
            <section className="relative h-[350px] md:h-[400px] w-full flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('about/about_hero.png')" }}
                />
                <div className="absolute inset-0 bg-[#1b2a52]/85" />
                <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-[56px] font-black text-white mb-4 tracking-tight">
                        About Us
                    </h1>
                    <div className="w-16 h-1.5 bg-[#F27A22] mx-auto rounded-full mb-6" />
                    <p className="text-gray-200 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-medium">
                        Pioneering the future of industrial manufacturing with superior fiber-reinforced plastic solutions for over 30 years.
                    </p>
                </div>

            </section>

            <section className="w-full bg-white py-20">
                <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="w-full">
                            <img
                                src="about/collage.png"
                                alt="Two Decades of Excellence Collage"
                                className="w-full h-auto object-cover shadow-sm border border-gray-100"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-3xl md:text-[38px] font-bold text-[#1b2a52] mb-6 leading-tight">
                                Two Decades of Excellence
                            </h2>

                            <p className="text-gray-700 text-base leading-relaxed mb-6">
                                VFGP delivers world-class FRP composites for automobiles and other
                                applications from Zaheerabad's industrial hub. Founded in 2003 as a
                                small-scale unit, we have grown steadily by staying true to our vision of
                                consistent quality and timely delivery, guided by first-generation
                                entrepreneurs committed to innovation and reliability.
                            </p>

                            <p className="text-gray-700 text-base leading-relaxed mb-10">
                                Today, our facility spans over 100,000 square feet, housing the most
                                advanced moulding and tooling technology in the industry. We don't
                                just manufacture products; we engineer solutions that stand the test
                                of time in the harshest environments.
                            </p>
                            <div>
                                <button className="border border-[#1b2a52] text-[#1b2a52] px-8 py-3 rounded-md font-semibold hover:bg-[#1b2a52] hover:text-white transition-colors">
                                    View Our Timeline
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="w-full bg-[#30335A] py-16">
                <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 text-center">

                        <div className="flex flex-col items-center">
                            <span className="text-5xl md:text-[56px] font-black text-white mb-3">20+</span>
                            <span className="text-[#DE8A5C] text-sm font-bold tracking-widest uppercase">
                                Years Experience
                            </span>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="text-5xl md:text-[56px] font-black text-white mb-3">150+</span>
                            <span className="text-[#DE8A5C] text-sm font-bold tracking-widest uppercase">
                                Employees
                            </span>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="text-5xl md:text-[56px] font-black text-white mb-3">500+</span>
                            <span className="text-[#DE8A5C] text-sm font-bold tracking-widest uppercase">
                                Projects Completed
                            </span>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="text-5xl md:text-[56px] font-black text-white mb-3">100+</span>
                            <span className="text-[#DE8A5C] text-sm font-bold tracking-widest uppercase">
                                Global Clients
                            </span>
                        </div>

                    </div>
                </div>
            </section>

            <section className="w-full bg-white py-20">
                <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#24242A] rounded-xl p-10 md:p-12">
                            <div className="w-14 h-14 bg-[#DCE8F5] rounded-xl flex items-center justify-center mb-8">
                                <Rocket className="w-6 h-6 text-[#1b2a52]" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-6">
                                Our Mission
                            </h3>
                            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                                To empower global infrastructure and industry through innovative
                                composite solutions that provide unmatched durability,
                                sustainability, and performance.
                            </p>
                        </div>
                        <div className="bg-[#24242A] rounded-xl p-10 md:p-12">
                            <div className="w-14 h-14 bg-[#DCE8F5] rounded-xl flex items-center justify-center mb-8">
                                <Eye className="w-6 h-6 text-[#1b2a52]" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-6">
                                Our Vision
                            </h3>
                            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                                To be the most trusted name in composite engineering worldwide,
                                setting the standard for quality and technological advancement in
                                FRP manufacturing.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <section className="w-full bg-white py-24">
                <div className="max-w-[1280px] mx-auto px-6 md:px-12">

                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-[46px] font-black text-[#1b2a52] mb-6">
                            Our Core Values
                        </h2>
                        <div className="w-32 h-1.5 bg-[#C47D34] mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">

                        <div className="flex flex-col items-center">
                            <div className="w-[88px] h-[88px] bg-[#282F5A] rounded-full flex items-center justify-center mb-6">
                                <BadgeCheck className="w-10 h-10 text-white" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-[22px] font-bold text-[#1b2a52] mb-4">Quality</h3>
                            <p className="text-black text-[15px] leading-relaxed px-4">
                                Unyielding commitment to precision in every layer.
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-[88px] h-[88px] bg-[#282F5A] rounded-full flex items-center justify-center mb-6">
                                <Gavel className="w-10 h-10 text-white" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-[22px] font-bold text-[#1b2a52] mb-4">Integrity</h3>
                            <p className="text-black text-[15px] leading-relaxed px-2">
                                Honest engineering and transparent partnerships.
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-[88px] h-[88px] bg-[#282F5A] rounded-full flex items-center justify-center mb-6">
                                <Lightbulb className="w-10 h-10 text-white" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-[22px] font-bold text-[#1b2a52] mb-4">Innovation</h3>
                            <p className="text-black text-[15px] leading-relaxed px-2">
                                Pushing the boundaries of material science.
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-[88px] h-[88px] bg-[#282F5A] rounded-full flex items-center justify-center mb-6">
                                <Handshake className="w-10 h-10 text-white" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-[22px] font-bold text-[#1b2a52] mb-4">Commitment</h3>
                            <p className="text-black text-[15px] leading-relaxed px-2">
                                Dedicated to the success of our clients' projects.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <section className="w-full bg-white py-20">
                <div className="max-w-[1280px] mx-auto px-6 md:px-12">

                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-[42px] font-black text-[#1b2a52] mb-4">
                            Leadership Team
                        </h2>
                        <div className="w-16 h-1.5 bg-[#C47D34] mx-auto" />
                    </div>

                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-[280px] h-[340px] rounded-2xl overflow-hidden mb-6">
                            <img
                                src="/about/chandu_ch.png"
                                alt="Chandu CH"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-2xl font-bold text-[#1b2a52] mb-1">
                            Chandu CH
                        </h3>
                        <p className="text-[#1b2a52] font-medium text-base">
                            Founder & President
                        </p>
                    </div>

                </div>
            </section>

            <section className="w-full bg-white py-20">
                <div className="max-w-[1280px] mx-auto px-6 md:px-12">

                    <div className="flex flex-col lg:flex-row bg-[#2A2E5B] rounded-2xl overflow-hidden shadow-2xl">
                        <div className="lg:w-[55%] min-h-[350px] lg:min-h-full relative">
                            <img
                                src="/about/production.jpg"
                                alt="State-of-the-Art Production"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="lg:w-[45%] p-10 lg:p-14 border-l-0 lg:border-l-[10px] border-t-[10px] lg:border-t-0 border-[#C47D34] flex flex-col justify-center">

                            <h2 className="text-3xl md:text-[42px] font-black text-[#D98C21] mb-6 leading-tight">
                                State-of-the-Art<br />
                                Production
                            </h2>

                            <p className="text-[#E8AB75] text-base leading-relaxed mb-10">
                                Our advanced facility features temperature-controlled environments for precise moulding, custom tooling workshops, and automated production lines that guarantee consistency across high-volume orders.
                            </p>

                            <ul className="space-y-6">
                                <li className="flex items-center gap-4">
                                    <Sliders className="w-6 h-6 text-white shrink-0" />
                                    <span className="text-white font-medium text-[15px]">
                                        Precision Custom Tooling
                                    </span>
                                </li>

                                <li className="flex items-center gap-4">
                                    <Compass className="w-6 h-6 text-white shrink-0" />
                                    <span className="text-white font-medium text-[15px]">
                                        Advanced Vacuum Infusion
                                    </span>
                                </li>

                                <li className="flex items-center gap-4">
                                    <Microscope className="w-6 h-6 text-white shrink-0" />
                                    <span className="text-white font-medium text-[15px]">
                                        In-house Quality Testing Lab
                                    </span>
                                </li>
                            </ul>

                        </div>
                    </div>

                </div>
            </section>

            <section className="w-full bg-[#DCE8F6] py-20">
                <div className="max-w-[1280px] mx-auto px-6 md:px-12 text-center">

                    <h2 className="text-3xl md:text-[42px] font-black text-[#282F5A] mb-6">
                        Partner with us for advanced composite manufacturing
                    </h2>

                    <p className="text-[#282F5A]/80 text-base md:text-[18px] max-w-3xl mx-auto mb-10">
                        Let's discuss how our FRP expertise can bring durability and efficiency to your<br className="hidden md:block" /> next project.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="bg-[#282F5A] text-white px-8 py-3.5 rounded-md font-bold hover:bg-[#1b2a52] transition-colors w-full sm:w-auto">
                            Contact Us Today
                        </button>

                        <button className="bg-white border border-[#282F5A]/40 text-[#282F5A] px-8 py-3.5 rounded-md font-bold hover:bg-gray-50 transition-colors shadow-sm w-full sm:w-auto">
                            View Product Catalog
                        </button>
                    </div>

                </div>
            </section>
        </div>
    )
}
