"use client";

export function CompanyLogo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
        <span className="text-xl font-bold">M</span>
      </div>
      <span className={`font-headline font-bold ${className}`}>Mewing</span>
    </div>
  );
}


