import React from 'react';
import { Shield, Image as ImageIcon, FileText, Download, LayoutDashboard, Wrench, Cloud, UserCircle, Facebook, Twitter, Instagram, Quote } from 'lucide-react';
import right_image from '../../images/image.png';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import TemplateChooser from './TemplateChooser.jsx';

const HeroSection = () => ( // Include the TemplateChooser
    <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
                <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                    Craft Your Future.<br />
                    Build Your Perfect Resume
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Create stunning, professional resumes in minutes with our easy-to-use builder and customizable templates.
                </p>
                
                <button className="bg-teal-500 text-white font-semibold py-3 px-8 rounded-3xl shadow-xl hover:bg-teal-600 transition duration-300 transform hover:scale-105  cursor-pointer">
                              <Link to="/choosetemplate">Create Your Free Resume</Link> 
                </button>
            </div>
            {/* Right Image Mockup */}
            <div className="flex justify-center md:justify-end">
                {/* Placeholder for the monitor image  */}
                    <div className='perspective-[1000px] bg-gray-200  rounded-xl shadow-2xl'>
                    <img src={right_image} className='transform rotate-y-[-25deg] rotate-x-[10deg] transition-transform duration-500 hover:rotate-y-[0deg] hover:rotate-x-[0deg]' height={300} width={300}   />
                    </div>
            </div>
        </div>
    </section>
);

const StepsSection = () => {
    const steps = [
        { icon: ImageIcon, title: "Choose a Template" },
        { icon: FileText, title: "Fill Your Details" },
        { icon: Download, title: "Download & Apply" },
    ];

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Simple Steps to Your Success</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                    {steps.map((step, index) => (
                        <div key={index} className="p-6 flex flex-col items-center">
                            <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-4 shadow-lg">
                                <step.icon className="w-8 h-8 text-green-600" />
                            </div>
                            <p className="text-lg font-semibold text-gray-800 mb-2">{index + 1}. {step.title}</p>
                            <p className="text-sm text-gray-500">
                                {index === 0 && "Select from our vast collection of professionally designed templates."}
                                {index === 1 && "Easily input your education, experience, and skills in minutes."}
                                {index === 2 && "Instantly get your resume in PDF format and start applying today."}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FeaturesAndTestimonials = () => {
    const features = [
        { icon: LayoutDashboard, title: "Modern Templates" },
        { icon: Wrench, title: "Easy Customization" },
        { icon: Cloud, title: "Cloud Storage" },
    ];

    const testimonials = [
        {
            name: "User A",
            quote: "The platform's ease of use and professional templates allowed me to truly shine. I landed my dream job quickly!",
            avatar: "https://placehold.co/40x40/FFD700/000000?text=A",
        },
        {
            name: "User B",
            quote: "I loved the variety. It took the tediousness out of resume building and gave me back my time.",
            avatar: "https://placehold.co/40x40/ADD8E6/000000?text=B",
        }
    ];

    const TestimonialCard = ({ quote, avatar }) => (
        <div className="flex space-x-4 p-4 rounded-xl">
            <img src={avatar} alt="User Avatar" className="w-10 h-10 rounded-full object-cover shadow-md" />
            <div className="flex flex-col relative">
                <Quote className="w-6 h-6 text-gray-200 absolute -top-2 -left-8 transform scale-x-[-1]" />
                <p className="italic text-gray-700 leading-relaxed">"{quote}"</p>
            </div>
        </div>
    );

    return (
        <section className="hidden py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16 items-start">
                {/* Left Side: Testimonials */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">What Our Users Are Saying</h3>
                    <div className="space-y-8">
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard key={index} quote={testimonial.quote} avatar={testimonial.avatar} />
                        ))}
                    </div>
                </div>

                {/* Right Side: Features and Second CTA */}
                <div>
                    {/* Features */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Resume Builder Is Your Best Choice</h3>
                    <div className="grid grid-cols-3 gap-4 mb-12">
                        {features.map((feature, index) => (
                            <div key={index} className="p-4 border border-gray-200 rounded-xl flex flex-col items-center text-center transition duration-300 hover:shadow-lg">
                                <feature.icon className="w-8 h-8 text-orange-500 mb-2" />
                                <p className="text-sm font-medium text-gray-700">{feature.title}</p>
                            </div>
                        ))}
                    </div>

                    {/* Second CTA */}
                    <div className=" hidden p-8 bg-gray-50 rounded-xl border border-gray-200 text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">What Our Users Do Next?</h3>
                        <button className="w-full bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105 mb-4">
                            Build My Resume Now
                        </button>
                        <p className="text-sm text-gray-500 italic">
                            "Ready to take the next step? Get started on your path to success today."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <p className="text-sm mb-4">
                {new Date().getFullYear()} Resume Builder
            </p>
            {/* <div className="flex justify-center space-x-6 mb-4 text-sm">
                <a href="#" className="hover:text-white transition duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-white transition duration-300">Terms of Service</a>
                <a href="#" className="hover:text-white transition duration-300">Contact</a>
            </div>
            <div className="flex justify-center space-x-6">
                <a href="#" aria-label="Facebook" className="hover:text-white transition duration-300">
                    <Facebook className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-white transition duration-300">
                    <Twitter className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-white transition duration-300">
                    <Instagram className="w-5 h-5" />
                </a>
            </div> */}
        </div>
    </footer>
);


const HomePage = () => {
    return (
        <div className="min-h-screen bg-white font-inter">
            {/* Tailwind CSS CDN is assumed to be available in the React environment */}
            <main>
                <HeroSection />
                <StepsSection />
                <FeaturesAndTestimonials />
            </main>
            <Footer />
        </div>
    )
}

export default HomePage
