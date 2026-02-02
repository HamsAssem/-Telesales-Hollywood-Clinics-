-- Fix country column to be nullable
-- Run this in your Supabase SQL Editor

ALTER TABLE public.telesales_applications
ALTER COLUMN country DROP NOT NULL;

-- If you want to keep it as a combined field, you can also update existing records
-- UPDATE public.telesales_applications SET country = city WHERE country IS NULL;
