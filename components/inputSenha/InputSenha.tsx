'use client'

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputProps {
    id: string;
    textoLabel: string;
    senha: string
    setSenha: (senha: string) => void
}

export default function InputSenha({ id, textoLabel, senha, setSenha }: InputProps) {
    const [mostrarSenha, setMostrarSenha] = useState(false);

    return (
        <fieldset className="flex flex-col w-full">
            <label htmlFor={id}>{textoLabel}</label>

            <div className="relative w-full">
                <input
                    type={mostrarSenha ? 'text' : 'password'}
                    name={id}
                    id={id}
                    value={senha}
                    placeholder="******"
                    className="border rounded-md border-verde p-1.5 w-full pr-10"
                    onChange={(e) => setSenha(e.target.value)}
                />

                <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                    {mostrarSenha ? <FiEyeOff /> : <FiEye />}
                </button>
            </div>
        </fieldset>
    );
}