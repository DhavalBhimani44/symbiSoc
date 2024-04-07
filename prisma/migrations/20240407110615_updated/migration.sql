/*
  Warnings:

  - You are about to alter the column `eventType2` on the `createevent` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `createevent` MODIFY `eventType2` ENUM('CLUBMEMBERS', 'EVERYONE') NOT NULL DEFAULT 'EVERYONE';
