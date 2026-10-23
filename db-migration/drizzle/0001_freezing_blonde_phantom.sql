ALTER TABLE "bills" ALTER COLUMN "amount" SET DATA TYPE numeric(30, 0) USING "amount"::numeric;
