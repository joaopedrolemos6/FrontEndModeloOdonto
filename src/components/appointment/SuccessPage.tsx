import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Calendar, Clock, User, Stethoscope } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SuccessPageProps {
  formData: {
    name: string;
    service: string;
  };
  selectedDate: Date | undefined;
  selectedTime: string;
  onResetForm: () => void;
}

export function SuccessPage({ formData, selectedDate, selectedTime, onResetForm }: SuccessPageProps) {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-lg">
        <Card className="border-0 bg-gradient-to-br from-card to-secondary/20 p-8 text-center shadow-lg">
          <div className="mb-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-semibold mb-2 text-foreground">
              Agendamento Confirmado!
            </h1>
            <p className="text-muted-foreground font-light">
              Sua consulta foi agendada com sucesso
            </p>
          </div>

          <div className="bg-background/50 rounded-2xl p-6 mb-8 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Paciente</span>
              </div>
              <span className="font-medium">{formData.name}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Stethoscope className="h-4 w-4" />
                <span>Serviço</span>
              </div>
              <span className="font-medium">{formData.service}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Data</span>
              </div>
              <span className="font-medium">
                {selectedDate && format(selectedDate, "dd/MM/yyyy", { locale: ptBR })}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Horário</span>
              </div>
              <span className="font-medium">{selectedTime}</span>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={onResetForm} 
              className="w-full h-12"
            >
              Fazer Novo Agendamento
            </Button>
            
            <div className="text-xs text-muted-foreground font-light space-y-1">
              <p>Você receberá um email de confirmação em breve.</p>
              <p>Para cancelar ou reagendar, entre em contato conosco.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}