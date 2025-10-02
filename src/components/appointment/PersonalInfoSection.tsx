import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  onBack: () => void;
  onSubmit: () => void;
  updateFormData: (data: { name: string, email: string, phone: string }) => void;
  formData: {
    name: string;
    email: string;
    phone: string;
  }
}

export function PersonalInfoSection({ onBack, onSubmit, updateFormData, formData }: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>3. Suas Informações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Nome Completo</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>Voltar</Button>
          <Button onClick={onSubmit}>Finalizar Agendamento</Button>
        </div>
      </CardContent>
    </Card>
  );
}