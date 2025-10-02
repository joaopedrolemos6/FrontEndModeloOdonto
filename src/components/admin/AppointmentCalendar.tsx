// src/components/admin/AppointmentCalendar.tsx

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { EventInput, EventClickArg } from '@fullcalendar/core';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { api } from '@/services/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { User, Stethoscope, Clock, StickyNote } from 'lucide-react';

// Componente de Calendário de Agendamentos
export function AppointmentCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<EventClickArg | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Busca os eventos da API
  const fetchEvents = (fetchInfo: any, successCallback: any, failureCallback: any) => {
    api.get('/admin/calendar', {
      params: {
        start: fetchInfo.startStr,
        end: fetchInfo.endStr,
      },
    })
    .then(response => successCallback(response.data))
    .catch(error => failureCallback(error));
  };

  // Lida com o clique em um evento
  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent(clickInfo);
    setIsModalOpen(true);
  };

  // Retorna a variante do badge com base no status
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      case 'pending': return 'secondary';
      default: return 'secondary';
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
        height="auto" // Ajusta a altura ao contêiner
        contentHeight="auto"
      />

      {/* Modal para exibir detalhes do agendamento */}
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
                <span className="font-medium">{selectedEvent.event.extendedProps.patientName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Stethoscope className="h-4 w-4 text-muted-foreground" />
                <span>{selectedEvent.event.extendedProps.serviceName}</span>
              </div>
               <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{selectedEvent.event.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {selectedEvent.event.end?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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