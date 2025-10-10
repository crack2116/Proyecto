import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

  const faqs = [
    {
      question: "¿Cómo puedo solicitar un nuevo servicio de transporte?",
      answer: "Puedes solicitar un nuevo servicio navegando a la sección 'Solicitudes de Servicio' y haciendo clic en el botón 'Crear Nueva Solicitud'. Rellena el formulario y se añadirá a la lista para ser gestionado.",
    },
    {
      question: "¿Puedo ver el estado de mi servicio en tiempo real?",
      answer: "Sí. En la sección 'Seguimiento en Tiempo Real', podrás ver la ubicación actual de los vehículos asignados a los servicios que están en progreso.",
    },
    {
      question: "¿Qué tipo de reportes puedo generar?",
      answer: "El sistema permite generar reportes sobre el rendimiento de los servicios, la utilización de los vehículos y la actividad de los conductores. Puedes encontrarlos en la sección 'Reportes'.",
    },
    {
      question: "¿Es posible gestionar clientes y conductores desde la plataforma?",
      answer: "¡Por supuesto! En la página de 'Gestión', encontrarás secciones para añadir, editar y eliminar clientes, conductores y vehículos de tu flota.",
    },
    {
        question: "¿Qué hace el asistente virtual?",
        answer: "El asistente virtual está diseñado para responder preguntas frecuentes y proporcionar soporte básico sobre el uso de la plataforma. Puedes interactuar con él en la sección de 'Soporte'."
    }
  ];
  
  export function Faq() {
    return (
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="font-semibold text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }