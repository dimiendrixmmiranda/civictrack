'use client'

import { motion, AnimatePresence } from "framer-motion"

type DialogProps = {
    open: boolean
    title: string
    description: string
    confirmText?: string
    cancelText?: string
    onClose: () => void
    onConfirm: () => void
    loading?: boolean
}

export default function Dialog({
    open,
    title,
    description,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    onClose,
    onConfirm,
    loading = false
}: DialogProps) {
    return (
        <AnimatePresence>
            {
                open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="
                            fixed
                            inset-0
                            bg-black/60
                            backdrop-blur-sm
                            flex
                            justify-center
                            items-center
                            p-4 text-white
                        "
                        style={{zIndex: '9999'}}
                    >

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.9,
                                y: 20
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                                y: 20
                            }}
                            transition={{
                                duration: 0.2
                            }}
                            className="
                                bg-cinza
                                rounded-2xl
                                p-6
                                w-full
                                max-w-md
                                flex
                                flex-col
                                gap-6
                                shadow-2xl
                            "
                        >

                            <div className="flex flex-col gap-2">

                                <h2 className="
                                    font-bebas
                                    text-4xl
                                    leading-8
                                ">
                                    {title}
                                </h2>

                                <p className="text-zinc-300">
                                    {description}
                                </p>

                            </div>

                            <div className="
                                grid
                                grid-cols-2
                                gap-4
                            ">

                                <button

                                    onClick={onClose}

                                    className="
                                        bg-zinc-700
                                        hover:bg-zinc-600
                                        transition-all
                                        rounded-xl
                                        pt-2
                                        pb-1
                                        font-bebas
                                        text-2xl
                                    "
                                >
                                    {cancelText}
                                </button>

                                <button

                                    onClick={onConfirm}

                                    disabled={loading}

                                    className="
                                        bg-red-600
                                        hover:bg-red-500
                                        transition-all
                                        rounded-xl
                                        pt-2
                                        pb-1
                                        font-bebas
                                        text-2xl
                                        disabled:opacity-50
                                    "
                                >
                                    {
                                        loading
                                            ? 'Carregando...'
                                            : confirmText
                                    }
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}