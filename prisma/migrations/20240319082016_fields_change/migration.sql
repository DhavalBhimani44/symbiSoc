-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userType` ENUM('STUDENT', 'FACULTY', 'CLUBINCHARGE', 'ADMIN') NOT NULL DEFAULT 'STUDENT',

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `createEvent` (
    `eventId` INTEGER NOT NULL AUTO_INCREMENT,
    `eventName` VARCHAR(191) NOT NULL,
    `eventDescription` VARCHAR(191) NOT NULL,
    `eventDate` DATETIME(3) NOT NULL,
    `eventTime` DATETIME(3) NOT NULL,
    `eventVenue` VARCHAR(191) NOT NULL,
    `eventPlatform` VARCHAR(191) NOT NULL,
    `sponsors` VARCHAR(191) NOT NULL,
    `speakerName` VARCHAR(191) NOT NULL,
    `speakerDesignation` VARCHAR(191) NOT NULL,
    `speakerDescription` VARCHAR(191) NOT NULL,
    `eventType1` ENUM('ONLINE', 'OFFLINE') NOT NULL DEFAULT 'OFFLINE',
    `eventType2` ENUM('CLUBMEMBERS', 'OPENTOALL') NOT NULL DEFAULT 'OPENTOALL',
    `organisingClub` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`eventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
