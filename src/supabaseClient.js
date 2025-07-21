// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kviswunyjmbhwlrhdeza.supabase.co'; // Replace this
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2aXN3dW55am1iaHdscmhkZXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODM4NTIsImV4cCI6MjA2ODY1OTg1Mn0.y9d8Y3llpRTLSFrvsio4_B-C2zsWWwVfRm1VhynMYVE'; // Replace this

export const supabase = createClient(supabaseUrl, supabaseKey);
