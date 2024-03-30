/*
  Warnings:

  - You are about to alter the column `organisingClub` on the `createevent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `createevent` MODIFY `organisingClub` ENUM('SELECT', 'Codex', 'GDSC', 'CBC', 'ARVR', 'AI', 'Mosaic', 'WWR', 'TPC', 'SpaceAstronomy') NOT NULL DEFAULT 'SELECT';
