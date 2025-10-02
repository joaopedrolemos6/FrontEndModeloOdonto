import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface Props {
    formData: {
        name: string;
        date: string | null;
        time: string | null;
    }
}

export function SuccessPage({ formData }: Props) {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <CardTitle className="mt-4">Agendamento Confirmado!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Olá, {formData.name}! Sua consulta para o dia{" "}
          {formData.date && new Date(formData.date).toLocaleDateString()} às {formData.time} foi agendada com sucesso.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
            Você receberá um e-mail de confirmação em breve.
        </p>
        <Button className="mt-6" onClick={() => window.location.reload()}>
          Fazer Novo Agendamento
        </Button>
      </CardContent>
    </Card>
  );
}