import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { api, ApiResponse } from "@/services/api";
import { Service, Dentist } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";

interface Props {
  onNext: () => void;
  updateFormData: (data: { serviceId: number, dentistId: number }) => void;
}

export default function ServiceSelectionSection({ onNext, updateFormData }: Props) {
  const [services, setServices] = useState<Service[]>([]);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDentist, setSelectedDentist] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, dentistsRes] = await Promise.all([
          api.get<ApiResponse<Service[]>>('/services'),
          api.get<ApiResponse<Dentist[]>>('/dentists'),
        ]);
        setServices(servicesRes.data.data);
        setDentists(dentistsRes.data.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  const handleNext = () => {
    if (selectedService && selectedDentist) {
      updateFormData({ serviceId: selectedService, dentistId: selectedDentist });
      onNext();
    } else {
      alert("Por favor, selecione um serviço e um dentista.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>1. Selecione o Serviço e o Profissional</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Serviço Desejado</Label>
           <Select onValueChange={(value) => setSelectedService(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um serviço..." />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={String(service.id)}>
                    {service.name} - R$ {service.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
        </div>
        <div>
          <Label>Profissional</Label>
           <Select onValueChange={(value) => setSelectedDentist(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um profissional..." />
              </SelectTrigger>
              <SelectContent>
                {dentists.map((dentist) => (
                  <SelectItem key={dentist.id} value={String(dentist.id)}>
                    {dentist.name} - CRO: {dentist.cro}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
        </div>
        <Button onClick={handleNext} disabled={!selectedService || !selectedDentist}>Próximo</Button>
      </CardContent>
    </Card>
  );
}