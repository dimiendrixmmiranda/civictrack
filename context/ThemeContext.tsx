'use client'

import {
    createContext,
    useContext,
    useState
} from "react"

type Theme = 'light' | 'dark'

type ThemeContextType = {

    theme: Theme

    toggleTheme: () => void
}

const ThemeContext = createContext({} as ThemeContextType)

export function ThemeProvider({
    children
}: {
    children: React.ReactNode
}) {

    const [theme, setTheme] = useState<Theme>('dark')

    function toggleTheme() {

        if (theme === 'dark') {

            setTheme('light')

            document.documentElement.classList.remove('dark')

        } else {

            setTheme('dark')

            document.documentElement.classList.add('dark')
        }
    }

    return (

        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme
            }}
        >

            {children}

        </ThemeContext.Provider>
    )
}

export function useTheme() {

    return useContext(ThemeContext)
}