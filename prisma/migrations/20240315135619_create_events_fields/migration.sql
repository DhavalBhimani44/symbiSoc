/*
  Warnings:

  - Added the required column `eventDate` to the `createEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventPlatform` to the `createEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventTime` to the `createEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventVenue` to the `createEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speakerDescription` to the `createEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speakerDesignation` to the `createEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speakerName` to the `createEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sponsors` to the `createEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `createevent` ADD COLUMN `eventDate` DATETIME(3) NOT NULL,
    ADD COLUMN `eventPlatform` VARCHAR(191) NOT NULL,
    ADD COLUMN `eventTime` DATETIME(3) NOT NULL,
    ADD COLUMN `eventType1` ENUM('ONLINE', 'OFFLINE') NOT NULL DEFAULT 'OFFLINE',
    ADD COLUMN `eventType2` ENUM('CLUBMEMBERS', 'OPENTOALL') NOT NULL DEFAULT 'OPENTOALL',
    ADD COLUMN `eventVenue` VARCHAR(191) NOT NULL,
    ADD COLUMN `speakerDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `speakerDesignation` VARCHAR(191) NOT NULL,
    ADD COLUMN `speakerName` VARCHAR(191) NOT NULL,
    ADD COLUMN `sponsors` VARCHAR(191) NOT NULL;
