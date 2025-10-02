import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

interface Props {
  onNext: () => void;
  onBack: () => void;
  updateFormData: (data: { date: string, time: string }) => void;
  formData: {
    date: string | null;
    time: string | null;
  }
}

const availableTimes = [
  "08:00", "09:00", "10:00", "11:00",
  "14:00", "15:00", "16:00", "17:00"
];

export function DateTimeSection({ onNext, onBack, updateFormData, formData }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    formData.date ? new Date(formData.date) : undefined
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(formData.time);

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
            disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
          />
          <div className="grid grid-cols-2 gap-2">
            {availableTimes.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
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