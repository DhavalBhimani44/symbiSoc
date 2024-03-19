-- CreateTable
CREATE TABLE `EventRegistration` (
    `registrationId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `eventId` INTEGER NOT NULL,
    `eventName` VARCHAR(191) NOT NULL,
    `registration` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`registrationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EventRegistration` ADD CONSTRAINT `EventRegistration_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventRegistration` ADD CONSTRAINT `EventRegistration_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `createEvent`(`eventId`) ON DELETE RESTRICT ON UPDATE CASCADE;
