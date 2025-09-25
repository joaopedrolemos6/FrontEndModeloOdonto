import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, AlertCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface DateTimeSectionProps {
  selectedDate: Date | undefined;
  selectedTime: string;
  errors: Partial<{
    date: string;
    time: string;
  }>;
  onDateSelect: (date: Date | undefined) => void;
  onTimeSelect: (time: string) => void;
}

const availableTimes = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", 
  "16:00", "16:30", "17:00", "17:30"
];

export function DateTimeSection({ 
  selectedDate, 
  selectedTime, 
  errors, 
  onDateSelect, 
  onTimeSelect 
}: DateTimeSectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-primary text-sm font-semibold">3</span>
        </div>
        <h2 className="text-lg font-medium text-foreground">Data e Horário</h2>
        <p className="text-sm text-muted-foreground font-light">Escolha quando quer ser atendido</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Data da consulta</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-0 bg-secondary/30 h-12",
                  !selectedDate && "text-muted-foreground",
                  errors.date && "border border-destructive"
                )}
              >
                <CalendarIcon className="mr-3 h-4 w-4 text-muted-foreground" />
                {selectedDate ? (
                  format(selectedDate, "dd 'de' MMMM", { locale: ptBR })
                ) : (
                  "Selecione a data"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-0 shadow-lg" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={onDateSelect}
                disabled={(date) => 
                  date < new Date() || date.getDay() === 0 || date.getDay() === 6
                }
                initialFocus
                className="rounded-xl"
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.date}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Atendemos de segunda a sexta-feira
          </p>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Horário disponível</Label>
          <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
            {availableTimes.map((time) => (
              <Button
                key={time}
                type="button"
                variant={selectedTime === time ? "default" : "outline"}
                size="sm"
                onClick={() => onTimeSelect(time)}
                className={cn(
                  "text-xs font-medium h-10",
                  selectedTime === time 
                    ? "bg-primary text-primary-foreground" 
                    : "border-0 bg-secondary/30 hover:bg-secondary/50"
                )}
              >
                <Clock className="mr-1 h-3 w-3" />
                {time}
              </Button>
            ))}
          </div>
          {errors.time && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.time}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}