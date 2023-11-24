import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://onoflmatvcpnxclatzqt.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ub2ZsbWF0dmNwbnhjbGF0enF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3NTMwMzIsImV4cCI6MjAxNjMyOTAzMn0.Lg60PFb4j3JRhzKl2y9DYZ4M9OipZ_i-EB3vAIflPrI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
