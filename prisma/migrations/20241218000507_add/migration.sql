-- AlterTable
ALTER TABLE "Presentation" ADD COLUMN     "created_by_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Presentation" ADD CONSTRAINT "Presentation_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
