// src/pages-admin/Admin.tsx

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
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
  Plus
} from "lucide-react";
import { api } from "@/services/api";
import { UserPublic } from "@/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Tipagem para resposta paginada de usuários
interface PaginatedUsersResponse {
  success: boolean;
  data: UserPublic[];
  pagination: object;
}

// Tipagem de agendamentos (mock)
interface Appointment {
  id: string;
  patient: string;
  email: string;
  phone: string;
  service: string;
  date: Date;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
}

export default function Admin() {
  // ==== USUÁRIOS ====
  const [users, setUsers] = useState<UserPublic[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoadingUsers(true);
        setErrorUsers(null);

        const response = await api.get<PaginatedUsersResponse>('/users');
        if (response.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          console.error("A API não retornou o formato esperado.");
          setUsers([]);
        }

      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
        setErrorUsers("Não foi possível carregar os usuários.");
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // ==== AGENDAMENTOS (mock) ====
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      patient: "Maria Silva",
      email: "maria@email.com",
      phone: "(11) 99999-9999",
      service: "Limpeza Dental",
      date: new Date(2024, 11, 20),
      time: "09:00",
      status: "confirmed",
      notes: "Primeira consulta"
    },
    {
      id: "2", 
      patient: "João Santos",
      email: "joao@email.com",
      phone: "(11) 88888-8888",
      service: "Implante Dentário",
      date: new Date(2024, 11, 20),
      time: "10:30",
      status: "pending"
    },
    {
      id: "3",
      patient: "Ana Costa",
      email: "ana@email.com", 
      phone: "(11) 77777-7777",
      service: "Ortodontia",
      date: new Date(2024, 11, 21),
      time: "14:00",
      status: "completed"
    },
    {
      id: "4",
      patient: "Pedro Oliveira",
      email: "pedro@email.com",
      phone: "(11) 66666-6666", 
      service: "Clareamento",
      date: new Date(2024, 11, 22),
      time: "16:00",
      status: "cancelled",
      notes: "Cancelado pelo paciente"
    }
  ]);

  const getStatusBadge = (status: Appointment["status"]) => {
    const statusConfig = {
      pending: { label: "Pendente", variant: "secondary" as const, icon: Clock },
      confirmed: { label: "Confirmado", variant: "default" as const, icon: CheckCircle },
      completed: { label: "Concluído", variant: "outline" as const, icon: CheckCircle },
      cancelled: { label: "Cancelado", variant: "destructive" as const, icon: XCircle }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || appointment.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === "pending").length,
    confirmed: appointments.filter(a => a.status === "confirmed").length,
    completed: appointments.filter(a => a.status === "completed").length,
    cancelled: appointments.filter(a => a.status === "cancelled").length
  };

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

        {/* Abas principais */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="analytics">Relatórios</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          {/* === ABA DE AGENDAMENTOS === */}
          <TabsContent value="appointments" className="space-y-6">
            {/* Estatísticas */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <Card className="text-center p-4">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </Card>
              <Card className="text-center p-4">
                <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.pending}</div>
                <div className="text-sm text-muted-foreground">Pendentes</div>
              </Card>
              <Card className="text-center p-4">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.confirmed}</div>
                <div className="text-sm text-muted-foreground">Confirmados</div>
              </Card>
              <Card className="text-center p-4">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.completed}</div>
                <div className="text-sm text-muted-foreground">Concluídos</div>
              </Card>
              <Card className="text-center p-4">
                <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.cancelled}</div>
                <div className="text-sm text-muted-foreground">Cancelados</div>
              </Card>
            </div>

            {/* Filtros */}
            <Card className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por paciente ou serviço..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-full md:w-64"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    <option value="all">Todos</option>
                    <option value="pending">Pendente</option>
                    <option value="confirmed">Confirmado</option>
                    <option value="completed">Concluído</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>
              </div>

              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Agendamento
              </Button>
            </Card>

            {/* Lista de Agendamentos */}
            <div className="space-y-4">
              {filteredAppointments.length === 0 ? (
                <Card className="text-center p-12">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Nenhum agendamento encontrado</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || selectedStatus !== "all"
                      ? "Tente ajustar os filtros de busca"
                      : "Nenhum agendamento cadastrado ainda"}
                  </p>
                </Card>
              ) : (
                filteredAppointments.map((appointment) => (
                  <Card key={appointment.id} className="p-4 hover:shadow-md">
                    <div className="grid md:grid-cols-6 gap-4 items-center">
                      <div className="md:col-span-2">
                        <h3 className="font-semibold text-lg">{appointment.patient}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Mail className="h-3 w-3 mr-1" />
                          {appointment.email}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="h-3 w-3 mr-1" />
                          {appointment.phone}
                        </div>
                      </div>

                      <div>
                        <p className="font-medium">{appointment.service}</p>
                        {appointment.notes && (
                          <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                        )}
                      </div>

                      <div>
                        <p className="font-medium">
                          {format(appointment.date, "dd/MM/yyyy", { locale: ptBR })}
                        </p>
                        <p className="text-sm text-muted-foreground">{appointment.time}</p>
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
          </TabsContent>

          {/* === ABA DE USUÁRIOS === */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingUsers ? (
                  <div>Carregando usuários...</div>
                ) : errorUsers ? (
                  <div className="text-red-500">{errorUsers}</div>
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

          {/* === ABA RELATÓRIOS === */}
          <TabsContent value="analytics">
            <Card className="text-center p-12">
              <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Relatórios e Analytics</h3>
              <p className="text-muted-foreground">
                Em breve você poderá visualizar estatísticas detalhadas de agendamentos e usuários.
              </p>
            </Card>
          </TabsContent>

          {/* === ABA CONFIGURAÇÕES === */}
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
