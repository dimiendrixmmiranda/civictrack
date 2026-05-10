/*
  Warnings:

  - Added the required column `prioridade` to the `Denuncia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `risco` to the `Denuncia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Denuncia" ADD COLUMN     "prioridade" TEXT NOT NULL,
ADD COLUMN     "risco" TEXT NOT NULL;
