"use client"

import { motion } from "framer-motion"

const technologies = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Prisma",
    "PostgreSQL",
    "Leaflet",
    "Cloudinary",
    "JWT",
]

export default function CarrosselTecnologico() {

    const repeatedTechs = [...technologies, ...technologies]

    return (
        <section className="relative overflow-hidden w-full py-8">

            {/* Fade esquerda */}
            {/* <div className="absolute left-0 top-0 z-10 h-full w-5 bg-gradient-to-r from-[#020817] to-transparent" /> */}

            {/* Fade direita */}
            {/* <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#020817] to-transparent rounded-xl" /> */}

            <motion.div
                className="flex gap-6 w-max"
                animate={{
                    x: ["0%", "-50%"],
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
                    ease: "linear",
                }}
            >
                {repeatedTechs.map((tech, index) => (
                    <div
                        key={index}
                        className="
                            min-w-fit
                            px-6
                            py-4
                            rounded-2xl
                            bg-[#081222]
                            border
                            border-white/10
                            backdrop-blur-md
                            flex
                            items-center
                            gap-3
                            hover:border-green-500/40
                            transition-all
                            duration-300
                        "
                    >
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_12px_#22c55e]" />

                        <span className="text-white font-medium whitespace-nowrap">
                            {tech}
                        </span>
                    </div>
                ))}
            </motion.div>
        </section>
    )
}