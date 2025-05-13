-- CreateTable
CREATE TABLE "StudyPreference" (
    "id" SERIAL NOT NULL,
    "style" TEXT NOT NULL,
    "studyDays" TEXT[],
    "sessionsPerDay" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "StudyPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudyPreference_userId_key" ON "StudyPreference"("userId");

-- AddForeignKey
ALTER TABLE "StudyPreference" ADD CONSTRAINT "StudyPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
