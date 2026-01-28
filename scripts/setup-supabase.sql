-- Create telesales_applications table
CREATE TABLE IF NOT EXISTS public.telesales_applications (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  telesales_experience TEXT NOT NULL,
  years_of_experience TEXT NOT NULL,
  previous_roles TEXT,
  languages TEXT,
  communication_skills TEXT NOT NULL,
  important_skills TEXT,
  full_time_availability TEXT NOT NULL,
  start_date TEXT NOT NULL,
  motivation TEXT,
  sales_motivation TEXT,
  cv_file_url TEXT,
  additional_files_urls TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_telesales_applications_email ON public.telesales_applications(email);

-- Create index on submitted_at for sorting
CREATE INDEX IF NOT EXISTS idx_telesales_applications_submitted_at ON public.telesales_applications(submitted_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.telesales_applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (anyone can submit an application)
CREATE POLICY "Allow inserts on telesales_applications" ON public.telesales_applications
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow selects (anyone can read applications)
CREATE POLICY "Allow selects on telesales_applications" ON public.telesales_applications
  FOR SELECT
  USING (true);
