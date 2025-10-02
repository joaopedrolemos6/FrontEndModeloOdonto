// src/pages/Agendamento.tsx

import { PersonalInfoSection } from "@/components/appointment/PersonalInfoSection";
import ServiceSelectionSection from "@/components/appointment/ServiceSelectionSection";
import { DateTimeSection } from "@/components/appointment/DateTimeSection";
import { SuccessPage } from "@/components/appointment/SuccessPage";
import { useState } from "react";
import { api } from "@/services/api";
import { toast } from "sonner";

export default function Agendamento() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceId: null as number | null,
    dentistId: null as number | null,
    date: null as string | null,
    time: null as string | null,
    name: '',
    email: '',
    phone: ''
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    try {
        const payload = {
            dentist_id: formData.dentistId,
            service_id: formData.serviceId,
            appointment_date: formData.date,
            appointment_time: `${formData.time}:00`,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
        };
        await api.post('/appointments', payload);
        nextStep(); // Avança para a página de sucesso
    } catch (error: any) {
        console.error("Erro ao criar agendamento:", error);
        toast.error("Erro ao criar agendamento", {
            description: error.response?.data?.error || "Verifique os dados e tente novamente.",
        });
    }
  };

  // As verificações de 'isLoading' e 'isAuthenticated' foram removidas daqui.

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ServiceSelectionSection onNext={nextStep} updateFormData={updateFormData} />;
      case 2:
        // CORREÇÃO APLICADA AQUI
        return <DateTimeSection onNext={nextStep} onBack={prevStep} updateFormData={updateFormData} formData={formData} />;
      case 3:
        // CORREÇÃO PROATIVA APLICADA AQUI
        return <PersonalInfoSection onBack={prevStep} onSubmit={handleSubmit} updateFormData={updateFormData} formData={formData} />;
      case 4:
        return <SuccessPage formData={formData} />; // Também passei os dados para a página de sucesso
      default:
        return <div>Etapa desconhecida</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Faça seu Agendamento</h1>
      {renderStep()}
    </div>
  );
}