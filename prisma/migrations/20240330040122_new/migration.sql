/*
  Warnings:

  - The values [Codex,Mosaic,SpaceAstronomy] on the enum `createEvent_organisingClub` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `createevent` MODIFY `organisingClub` ENUM('SELECT', 'CODEX', 'GDSC', 'CBC', 'ARVR', 'AI', 'MOSAIC', 'WWR', 'TPC', 'SPACEASTRONOMY') NOT NULL DEFAULT 'SELECT';
