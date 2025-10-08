import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState, useMemo, useEffect } from "react";
import { isToday } from "date-fns";

interface Props {
  onNext: () => void;
  onBack: () => void;
  updateFormData: (data: { date: string, time: string }) => void;
  formData: {
    date: string | null;
    time: string | null;
  }
}

// Horários base de funcionamento com intervalos de 30 minutos
const baseAvailableTimes = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

export function DateTimeSection({ onNext, onBack, updateFormData, formData }: Props) {
  // Inicializa a data de forma segura, evitando problemas de fuso horário na UI
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    formData.date ? new Date(`${formData.date}T00:00:00`) : undefined
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(formData.time);

  // Filtra os horários disponíveis com base na data selecionada e hora atual
  const availableTimes = useMemo(() => {
    if (!selectedDate) {
      return [];
    }

    const now = new Date();
    
    // Se a data selecionada for hoje, filtre os horários que já passaram
    if (isToday(selectedDate)) {
      return baseAvailableTimes.filter(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const slotTime = new Date(selectedDate);
        slotTime.setHours(hours, minutes, 0, 0);
        // Retorna verdadeiro apenas se o horário do slot for no futuro
        return slotTime > now;
      });
    }

    // Se for uma data futura, mostra todos os horários
    return baseAvailableTimes;
  }, [selectedDate]);

  // Efeito para limpar a hora selecionada se ela se tornar inválida ao mudar a data
  useEffect(() => {
    if (selectedTime && !availableTimes.includes(selectedTime)) {
      setSelectedTime(null);
    }
  }, [availableTimes, selectedTime]);

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      updateFormData({ date: selectedDate.toISOString().split('T')[0], time: selectedTime });
      onNext();
    } else {
      alert("Por favor, selecione uma data e um horário.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>2. Escolha a Data e o Horário</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            // Impede a seleção de dias passados
            disabled={(date) => date < new Date(new Date().toDateString())}
          />
          {/* Aumentado para 4 colunas para melhor visualização */}
          <div className="grid grid-cols-4 gap-2 content-start">
            {availableTimes.length > 0 ? (
              availableTimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))
            ) : (
              <p className="col-span-4 text-center text-muted-foreground mt-4">
                {selectedDate ? "Não há mais horários disponíveis para hoje." : "Selecione uma data para ver os horários."}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>Voltar</Button>
          <Button onClick={handleNext} disabled={!selectedDate || !selectedTime}>Próximo</Button>
        </div>
      </CardContent>
    </Card>
  );
}