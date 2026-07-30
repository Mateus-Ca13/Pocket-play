-- CreateEnum
CREATE TYPE "ConsoleSessionStatus" AS ENUM ('LOBBY', 'GAME_SETUP', 'IN_GAME');

-- CreateEnum
CREATE TYPE "PlayerRole" AS ENUM ('HOST', 'GUEST');

-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "GameSessionStatus" AS ENUM ('SETUP', 'ACTIVE', 'FINISHED', 'CANCELLED');

-- CreateTable
CREATE TABLE "ConsoleDevice" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsoleDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsoleSession" (
    "id" TEXT NOT NULL,
    "consoleDeviceId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "status" "ConsoleSessionStatus" NOT NULL DEFAULT 'LOBBY',

    CONSTRAINT "ConsoleSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatarKey" TEXT NOT NULL,
    "consoleDeviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerSession" (
    "id" TEXT NOT NULL,
    "playerProfileId" TEXT NOT NULL,
    "consoleSessionId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "connected" BOOLEAN NOT NULL DEFAULT true,
    "role" "PlayerRole" NOT NULL DEFAULT 'GUEST',

    CONSTRAINT "PlayerSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageKey" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "GameStatus" NOT NULL DEFAULT 'UNAVAILABLE',

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSession" (
    "id" TEXT NOT NULL,
    "consoleSessionId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "status" "GameSessionStatus" NOT NULL DEFAULT 'SETUP',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamePlayerScore" (
    "id" TEXT NOT NULL,
    "gameSessionId" TEXT NOT NULL,
    "playerProfileId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GamePlayerScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConsoleSession_code_key" ON "ConsoleSession"("code");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerSession_consoleSessionId_playerProfileId_key" ON "PlayerSession"("consoleSessionId", "playerProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "GamePlayerScore_gameSessionId_playerProfileId_key" ON "GamePlayerScore"("gameSessionId", "playerProfileId");

-- AddForeignKey
ALTER TABLE "ConsoleSession" ADD CONSTRAINT "ConsoleSession_consoleDeviceId_fkey" FOREIGN KEY ("consoleDeviceId") REFERENCES "ConsoleDevice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerProfile" ADD CONSTRAINT "PlayerProfile_consoleDeviceId_fkey" FOREIGN KEY ("consoleDeviceId") REFERENCES "ConsoleDevice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerSession" ADD CONSTRAINT "PlayerSession_playerProfileId_fkey" FOREIGN KEY ("playerProfileId") REFERENCES "PlayerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerSession" ADD CONSTRAINT "PlayerSession_consoleSessionId_fkey" FOREIGN KEY ("consoleSessionId") REFERENCES "ConsoleSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_consoleSessionId_fkey" FOREIGN KEY ("consoleSessionId") REFERENCES "ConsoleSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePlayerScore" ADD CONSTRAINT "GamePlayerScore_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamePlayerScore" ADD CONSTRAINT "GamePlayerScore_playerProfileId_fkey" FOREIGN KEY ("playerProfileId") REFERENCES "PlayerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
