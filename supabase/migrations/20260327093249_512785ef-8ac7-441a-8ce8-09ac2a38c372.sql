
-- Drop and recreate the permissive INSERT policy with a more specific check
DROP POLICY "Anyone can submit enquiry" ON public.contact_enquiries;

-- Allow anonymous and authenticated users to insert, but require all fields
CREATE POLICY "Anyone can submit enquiry" ON public.contact_enquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND 
    email IS NOT NULL AND 
    subject IS NOT NULL AND 
    message IS NOT NULL AND
    length(name) > 0 AND 
    length(email) > 0 AND
    length(message) > 0 AND
    length(name) <= 200 AND
    length(email) <= 255 AND
    length(subject) <= 500 AND
    length(message) <= 5000
  );
