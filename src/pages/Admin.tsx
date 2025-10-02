// src/pages/Admin.tsx

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar as CalendarIcon,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Settings,
  BarChart3,
  Phone,
  Mail,
  Plus,
  LayoutGrid
} from "lucide-react";
import { api, ApiResponse } from "@/services/api";
import { UserPublic } from "@/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AppointmentCalendar } from "@/components/admin/AppointmentCalendar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Tipagem para resposta paginada
interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination?: object;
}

// Tipagem que corresponde à view `appointments_detailed` do backend
interface Appointment {
  id: number;
  patient_name: string;
  patient_email: string;
  patient_phone?: string;
  service_name: string;
  appointment_date: string; // Vem como string YYYY-MM-DD
  appointment_time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
  notes?: string;
}

export default function Admin() {
  // ==== USUÁRIOS ====
  const [users, setUsers] = useState<UserPublic[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState<string | null>(null);

  // ==== AGENDAMENTOS ====
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);
  const [errorAppointments, setErrorAppointments] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Busca usuários e agendamentos
  useEffect(() => {
    const fetchData = async () => {
      // Resetar estados antes de buscar
      setIsLoadingUsers(true);
      setIsLoadingAppointments(true);
      setErrorUsers(null);
      setErrorAppointments(null);
      
      try {
        const [usersResponse, appointmentsResponse] = await Promise.all([
          api.get<PaginatedResponse<UserPublic>>('/users'),
          api.get<ApiResponse<Appointment[]>>('/appointments')
        ]);

        setUsers(usersResponse.data.data);
        setAppointments(appointmentsResponse.data.data);

      } catch (err) {
        console.error("Erro ao buscar dados do admin:", err);
        setErrorUsers("Falha ao carregar dados do painel.");
        setErrorAppointments("Falha ao carregar dados do painel.");
      } finally {
        setIsLoadingUsers(false);
        setIsLoadingAppointments(false);
      }
    };

    fetchData();
  }, []);

  const getStatusBadge = (status: Appointment["status"]) => {
    const statusConfig = {
      pending: { label: "Pendente", variant: "secondary" as const, icon: Clock },
      confirmed: { label: "Confirmado", variant: "default" as const, icon: CheckCircle },
      completed: { label: "Concluído", variant: "outline" as const, icon: CheckCircle },
      cancelled: { label: "Cancelado", variant: "destructive" as const, icon: XCircle },
      no_show: { label: "Não Compareceu", variant: "destructive" as const, icon: XCircle },
    };
    const config = statusConfig[status];
    if (!config) return null; // Fallback para status desconhecido
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const filteredAppointments = appointments.filter(appointment => {
    const patientName = appointment.patient_name || '';
    const serviceName = appointment.service_name || '';
    const matchesSearch = patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || appointment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  if (isLoadingUsers || isLoadingAppointments) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Painel Administrativo</h1>
              <p className="text-muted-foreground">Gerencie usuários e agendamentos do sistema</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
             <Card className="text-center p-12">
              <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
              <p className="text-muted-foreground">
                Em breve você poderá visualizar estatísticas gerais aqui.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Filtros */}
            </Card>

            {errorAppointments ? (
              <div className="text-center p-12 text-destructive">{errorAppointments}</div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.length === 0 ? (
                  <Card className="text-center p-12">
                    <CalendarIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Nenhum agendamento encontrado</h3>
                  </Card>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <Card key={appointment.id} className="p-4 hover:shadow-md">
                      <div className="grid md:grid-cols-6 gap-4 items-center">
                        <div className="md:col-span-2">
                          <h3 className="font-semibold text-lg">{appointment.patient_name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Mail className="h-3 w-3 mr-1" />
                            {appointment.patient_email}
                          </div>
                          {appointment.patient_phone && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Phone className="h-3 w-3 mr-1" />
                              {appointment.patient_phone}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{appointment.service_name}</p>
                          {appointment.notes && (
                            <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {/* CORREÇÃO APLICADA AQUI */}
                            {appointment.appointment_date 
                              ? format(new Date(`${appointment.appointment_date}T00:00:00`), "dd/MM/yyyy", { locale: ptBR })
                              : 'Data inválida'
                            }
                          </p>
                          <p className="text-sm text-muted-foreground">{appointment.appointment_time?.substring(0, 5)}</p>
                        </div>
                        <div>{getStatusBadge(appointment.status)}</div>
                        <div className="flex gap-2">
                          {appointment.status === "pending" && (
                            <>
                              <Button size="sm" variant="default">Confirmar</Button>
                              <Button size="sm" variant="destructive">Cancelar</Button>
                            </>
                          )}
                          {appointment.status === "confirmed" && (
                            <Button size="sm" variant="outline">Concluir</Button>
                          )}
                          <Button size="sm" variant="ghost">Editar</Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader><CardTitle>Calendário de Agendamentos</CardTitle></CardHeader>
              <CardContent><AppointmentCalendar /></CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                {errorUsers ? (
                  <div className="text-red-500 text-center p-12">{errorUsers}</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Função</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.length > 0 ? (
                        users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={user.is_active ? 'default' : 'destructive'}
                                className={user.is_active ? 'bg-green-500' : ''}
                              >
                                {user.is_active ? 'Ativo' : 'Inativo'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            Nenhum usuário encontrado.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="text-center p-12">
              <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Configurações</h3>
              <p className="text-muted-foreground">
                Personalize horários, serviços e preferências do sistema.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}