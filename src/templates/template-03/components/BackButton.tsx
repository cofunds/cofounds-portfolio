import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  to: string;
  label?: string;
  className?: string;
};

export function BackButton({ to, label = "Back", className }: BackButtonProps) {
  return (
    <Button variant="outline" asChild>
      <Link
        to={to}
        className={cn(
          "inline-flex items-center space-x-2 py-1.5 rounded-lg group",
          className
        )}
      >
        <FaArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
        <span>{label}</span>
      </Link>
    </Button>
  );
}
