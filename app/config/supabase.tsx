import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://cmamtkzwkcsylqhgrtyn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtYW10a3p3a2NzeWxxaGdydHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4MDEyMjQsImV4cCI6MjA0NjM3NzIyNH0.7930bBf2cq077thUwHSpvr9JB6DVJLlFCVcwtA6pzZM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);