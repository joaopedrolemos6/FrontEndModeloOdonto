import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { EventClickArg } from '@fullcalendar/core';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { api, ApiResponse } from '@/services/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { User, Stethoscope, Clock, StickyNote } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  extendedProps: {
    patient_name: string;
    service_name: string;
    status: string;
    notes?: string;
  };
}

export function AppointmentCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<EventClickArg | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEvents = (fetchInfo: any, successCallback: (events: CalendarEvent[]) => void, failureCallback: (error: any) => void) => {
    api.get<ApiResponse<CalendarEvent[]>>('/admin/calendar', {
      params: {
        start: fetchInfo.startStr,
        end: fetchInfo.endStr,
      },
    })
    .then(response => {
      // ALTERAÇÃO ASSERTIVA:
      // Agora, o código espera `response.data.data` e verifica se existe
      // para evitar erros e quebrar la interface.
      if (response.data && Array.isArray(response.data.data)) {
        successCallback(response.data.data);
      } else {
        console.warn('Resposta da API do calendário não tem o formato esperado:', response.data);
        successCallback([]); // Envia array vazio se o formato estiver errado
      }
    })
    .catch(error => {
      console.error("Erro ao buscar eventos do calendário:", error);
      failureCallback(error);
    });
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent(clickInfo);
    setIsModalOpen(true);
  };

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      case 'pending': return 'secondary';
      default: 'secondary';
    }
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        initialView="dayGridMonth"
        events={fetchEvents}
        locale={ptBrLocale}
        eventClick={handleEventClick}
        height="auto"
        contentHeight="auto"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Agendamento</DialogTitle>
            <DialogDescription>
              Informações sobre a consulta selecionada.
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{selectedEvent.event.extendedProps.patient_name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Stethoscope className="h-4 w-4 text-muted-foreground" />
                <span>{selectedEvent.event.extendedProps.service_name}</span>
              </div>
               <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  {selectedEvent.event.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {selectedEvent.event.end && ` - ${selectedEvent.event.end?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                </span>
              </div>
              <div className="flex items-center gap-3">
                 <Badge variant={getStatusBadgeVariant(selectedEvent.event.extendedProps.status)}>
                   {selectedEvent.event.extendedProps.status}
                </Badge>
              </div>
              {selectedEvent.event.extendedProps.notes && (
                <div className="flex items-start gap-3">
                  <StickyNote className="h-4 w-4 text-muted-foreground mt-1" />
                  <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md">
                    {selectedEvent.event.extendedProps.notes}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}