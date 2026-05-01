import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}

export const ScrollReveal = ({ 
    children, 
    width = "100%", 
    delay = 0,
    direction = "up"
}: ScrollRevealProps) => {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
            x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
        },
    };

    return (
        <div style={{ position: "relative", width, overflow: "visible" }}>
            <motion.div
                variants={variants}
                initial="hidden"
                whileInView="visible"
                transition={{ 
                    duration: 0.6, 
                    delay: delay,
                    ease: "easeOut"
                }}
                viewport={{ once: false, amount: 0.2 }}
            >
                {children}
            </motion.div>
        </div>
    );
};
