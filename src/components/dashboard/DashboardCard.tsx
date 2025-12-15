import React, { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  recommendation: React.ReactNode;
  explanation?: string;
  children?: React.ReactNode;
  variant?: "default" | "highlight";
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  title,
  recommendation,
  explanation,
  children,
  variant = "default",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-5 transition-all duration-300",
        variant === "highlight" && "border-chelsea-blue/30 bg-chelsea-blue/5"
      )}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                variant === "highlight"
                  ? "bg-chelsea-blue/20 text-chelsea-blue"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            {explanation && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      {icon}
                      <span>Explicação: {title}</span>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {explanation}
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>

        {/* Main Recommendation */}
        <div className="mt-4">{recommendation}</div>

        {/* Expandable Content */}
        <CollapsibleContent className="mt-4">
          <div className="border-t border-border/50 pt-4">{children}</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default DashboardCard;
