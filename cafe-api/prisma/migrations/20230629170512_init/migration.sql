-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "cafeId" TEXT NOT NULL,
    "work_start_date" DATETIME NOT NULL,
    CONSTRAINT "Employee_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cafe" (
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY
);
