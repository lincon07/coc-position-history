import { createClient } from "@supabase/supabase-js";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export const supabase = createClient('https://sermwxknthscfmbyvasf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcm13eGtudGhzY2ZtYnl2YXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MTY4NzgsImV4cCI6MjA2MjI5Mjg3OH0.7cwZEy-35XEUUNOSCO3wIjFU6IMfuRtr6iM4TNJjBks')
