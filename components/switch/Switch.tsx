type SwitchProps = {
    checked: boolean
    onChange: () => void
}

export default function Switch({
    checked,
    onChange
}: SwitchProps) {

    return (
        <button
            onClick={onChange}
            className={`
                relative
                w-14
                h-8
                rounded-full
                transition-all
                duration-300
                ${checked
                    ? 'bg-verde'
                    : 'bg-zinc-600'
                }
            `}
        >

            <div
                className={`
                    absolute
                    top-1
                    w-6
                    h-6
                    rounded-full
                    bg-white
                    transition-all
                    duration-300
                    ${checked
                        ? 'translate-x-7'
                        : 'translate-x-1'
                    }
                `}
            />

        </button>
    )
}