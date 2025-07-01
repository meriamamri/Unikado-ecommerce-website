import { Search, Palette, CreditCard, Package } from "lucide-react";

interface StepIconProps {
  iconName: string;
  color: string;
  stepNumber: number;
}

export function StepIcon({ iconName, color, stepNumber }: StepIconProps) {
  const IconComponent = {
    Search,
    Palette,
    CreditCard,
    Package,
  }[iconName];
  return (
    <div className="relative">
      <div
        className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${color} flex items-center justify-center`}
      >
        {IconComponent && <IconComponent className="h-8 w-8 text-white" />}
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
        {stepNumber}
      </div>
    </div>
  );
}
