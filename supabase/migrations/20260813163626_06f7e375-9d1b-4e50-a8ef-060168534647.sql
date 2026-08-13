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

CREATE TABLE public.purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  product TEXT NOT NULL CHECK (product IN ('book','bundle')),
  lang TEXT NOT NULL DEFAULT 'ar' CHECK (lang IN ('ar','en')),
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','failed')),
  provider_payment_id TEXT,
  access_token UUID NOT NULL DEFAULT gen_random_uuid(),
  email_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  paid_at TIMESTAMP WITH TIME ZONE
);

CREATE UNIQUE INDEX purchases_access_token_idx ON public.purchases (access_token);
CREATE INDEX purchases_payment_id_idx ON public.purchases (provider_payment_id);
CREATE INDEX purchases_email_idx ON public.purchases (email);

GRANT ALL ON public.purchases TO service_role;

ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;