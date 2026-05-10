/*
  Warnings:

  - Changed the type of `sexo` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('masculino', 'feminino', 'nao_informado');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sexo",
ADD COLUMN     "sexo" "Sexo" NOT NULL;
