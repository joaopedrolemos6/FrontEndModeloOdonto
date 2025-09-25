import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonalInfoSectionProps {
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  errors: Partial<{
    name: string;
    email: string;
    phone: string;
  }>;
  onInputChange: (field: string, value: string) => void;
}

export function PersonalInfoSection({ formData, errors, onInputChange }: PersonalInfoSectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-primary text-sm font-semibold">1</span>
        </div>
        <h2 className="text-lg font-medium text-foreground">Dados Pessoais</h2>
        <p className="text-sm text-muted-foreground font-light">Para entrarmos em contato</p>
      </div>
      
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Nome completo
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            placeholder="Digite seu nome completo"
            className={cn(
              "border-0 bg-secondary/30 focus:bg-secondary/50 transition-colors h-12",
              errors.name && "border border-destructive"
            )}
          />
          {errors.name && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            placeholder="seu@email.com"
            className={cn(
              "border-0 bg-secondary/30 focus:bg-secondary/50 transition-colors h-12",
              errors.email && "border border-destructive"
            )}
          />
          {errors.email && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-foreground">
            Telefone
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => onInputChange("phone", e.target.value)}
            placeholder="(11) 99999-9999"
            className={cn(
              "border-0 bg-secondary/30 focus:bg-secondary/50 transition-colors h-12",
              errors.phone && "border border-destructive"
            )}
          />
          {errors.phone && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.phone}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}