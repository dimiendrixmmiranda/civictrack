/*
  Warnings:

  - A unique constraint covering the columns `[enderecoId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imagem` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexo` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "enderecoId" TEXT,
ADD COLUMN     "imagem" TEXT NOT NULL,
ADD COLUMN     "sexo" TEXT NOT NULL,
ADD COLUMN     "telefone" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Endereco" (
    "id" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_enderecoId_key" ON "User"("enderecoId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco"("id") ON DELETE SET NULL ON UPDATE CASCADE;
