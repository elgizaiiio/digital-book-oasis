CREATE TABLE public.library_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  sent BOOLEAN NOT NULL DEFAULT false,
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX library_requests_email_idx ON public.library_requests (email);

GRANT ALL ON public.library_requests TO service_role;

ALTER TABLE public.library_requests ENABLE ROW LEVEL SECURITY;