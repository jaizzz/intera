import { Head } from "@inertiajs/react";

import AppLayout from "@/Layouts/AppLayout";

import AppFooter from "@/Components/app/AppFooter";
import FloatingChat from "@/Components/ui/FloatingChat";
import HeroSection from "./Landing/HeroSection";
import DestinationSection from "./Landing/DestinationSection";
import FAQSection from "./Landing/FAQSection";
import TravelAgencySection from "./Landing/TravelAgencySection";
import CTASection from "./Landing/CTASection";
import TestimonialSection from "./Landing/TestimonialSection";
import { ScrollReveal } from "@/Components/ui/ScrollReveal";


export default function Home() {
    return (
        <AppLayout>
            <Head title="Intera" />
            <HeroSection />

            <ScrollReveal>
                <DestinationSection />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
                <TravelAgencySection />
            </ScrollReveal>

            <ScrollReveal>
                <TestimonialSection />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
                <FAQSection />
            </ScrollReveal>

            <ScrollReveal direction="down">
                <CTASection />
            </ScrollReveal>

            <AppFooter />
            <FloatingChat isAuthenticated={true} />
        </AppLayout>
    );
}
