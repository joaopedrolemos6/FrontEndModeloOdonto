import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  CalendarCheck, 
  Award, 
  Shield, 
  Clock, 
  Star,
  ArrowRight,
  CheckCircle,
  Heart,
  Smile,
  Zap,
  Users,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      icon: CalendarCheck,
      title: "Agendamento Online",
      description: "Sistema intuitivo de marcação de consultas 24/7"
    },
    {
      icon: Award,
      title: "Excelência Profissional",
      description: "Mais de 15 anos de experiência em odontologia"
    },
    {
      icon: Shield,
      title: "Protocolos de Segurança",
      description: "Esterilização rigorosa e protocolos sanitários"
    },
    {
      icon: Clock,
      title: "Pontualidade",
      description: "Respeito ao seu tempo com consultas pontuais"
    }
  ];

  const services = [
    {
      icon: Smile,
      title: "Limpeza e Prevenção",
      description: "Profilaxia profissional, aplicação de flúor e orientação de higiene bucal para manter sua saúde em dia.",
      features: ["Remoção de tártaro", "Polimento dental", "Aplicação de flúor"]
    },
    {
      icon: Zap,
      title: "Implantes Dentários", 
      description: "Implantes de alta qualidade com tecnologia 3D para restaurar seu sorriso com naturalidade.",
      features: ["Implante unitário", "Prótese sobre implante", "All-on-4"]
    },
    {
      icon: Users,
      title: "Ortodontia",
      description: "Aparelhos tradicionais e alinhadores invisíveis para corrigir o posicionamento dos dentes.",
      features: ["Aparelho fixo", "Aparelho móvel", "Alinhadores invisíveis"]
    },
    {
      icon: Star,
      title: "Clareamento",
      description: "Técnicas seguras e eficazes para um sorriso mais branco e radiante.",
      features: ["Clareamento a laser", "Clareamento caseiro", "Clareamento misto"]
    },
    {
      icon: Shield,
      title: "Próteses",
      description: "Próteses fixas e removíveis com materiais de alta qualidade e acabamento natural.",
      features: ["Coroas", "Pontes", "Próteses totais"]
    },
    {
      icon: FileText,
      title: "Cirurgia Oral",
      description: "Procedimentos cirúrgicos com segurança e conforto para diversas necessidades.",
      features: ["Extração de sisos", "Cirurgia periodontal", "Biópsias"]
    }
  ];

  const faqItems = [
    {
      question: "Como funciona o agendamento online?",
      answer: "Nosso sistema de agendamento é muito simples! Basta acessar a página de agendamento, escolher o serviço desejado, selecionar a data e horário disponível que melhor se adequa à sua agenda. Você receberá uma confirmação por email e SMS."
    },
    {
      question: "Quais formas de pagamento são aceitas?",
      answer: "Aceitamos diversas formas de pagamento: dinheiro, cartão de débito, cartão de crédito (à vista ou parcelado), PIX e também trabalhamos com os principais planos odontológicos."
    },
    {
      question: "Como são os protocolos de segurança?",
      answer: "Seguimos rigorosamente todos os protocolos de biossegurança estabelecidos pela ANVISA e CRO. Todos os instrumentos são esterilizados em autoclave, utilizamos materiais descartáveis quando necessário e mantemos o ambiente sempre higienizado."
    },
    {
      question: "É necessário fazer avaliação antes do tratamento?",
      answer: "Sim, sempre realizamos uma consulta de avaliação inicial para examinar sua condição bucal, entender suas necessidades e elaborar um plano de tratamento personalizado com orçamento detalhado."
    },
    {
      question: "Vocês atendem emergências?",
      answer: "Sim! Para nossos pacientes cadastrados, oferecemos atendimento de emergência. Entre em contato conosco pelo telefone e avaliaremos a urgência do seu caso para providenciar o atendimento mais rápido possível."
    },
    {
      question: "Quanto tempo dura uma consulta?",
      answer: "O tempo varia conforme o procedimento: consultas de avaliação duram cerca de 30 minutos, limpezas aproximadamente 45 minutos, e procedimentos mais complexos podem levar de 1 a 2 horas. Sempre informamos a duração estimada no agendamento."
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      text: "Atendimento excepcional! Equipe muito profissional e ambiente super confortável.",
      rating: 5
    },
    {
      name: "João Santos", 
      text: "Melhor consultório que já visitei. Tecnologia de ponta e cuidado humanizado.",
      rating: 5
    },
    {
      name: "Ana Costa",
      text: "Agendamento online muito prático. Recomendo para toda a família!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Ultra Minimal */}
      <section className="pt-40 pb-32 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge 
              variant="secondary" 
              className="mb-8 px-6 py-2 text-sm font-normal bg-secondary border-0"
            >
              Consultório Premium
            </Badge>
            
            <h1 className="mb-8 animate-fade-in">
              Seu sorriso é nossa
              <br />
              <span className="text-primary">especialidade</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light animate-slide-up">
              Tecnologia de ponta, atendimento humanizado e protocolos de segurança 
              rigorosos para cuidar do seu sorriso com excelência.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/agendamento">
                <Button size="lg" className="btn-primary">
                  Agendar Consulta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="btn-ghost">
                Conhecer Serviços
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Clean Grid */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="mb-4">Por que escolher a DentCare Pro?</h2>
            <p className="text-xl text-muted-foreground font-light">
              Cuidado odontológico de excelência com tecnologia moderna
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-minimal text-center border-0">
                  <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground font-light">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced Cards */}
      <section className="py-32 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="mb-6">Nossos Serviços</h2>
            <p className="text-xl text-muted-foreground mb-16 font-light">
              Oferecemos uma gama completa de tratamentos odontológicos
            </p>
          </div>
            
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="card-minimal border-0 p-8">
                  <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 font-light">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials - Simple Cards */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="mb-4">O que nossos pacientes dizem</h2>
            <p className="text-xl text-muted-foreground font-light">
              Experiências reais de quem confia na DentCare Pro
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-minimal border-0">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 font-light italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary text-sm font-medium">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium">{testimonial.name}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="mb-4">Perguntas Frequentes</h2>
            <p className="text-xl text-muted-foreground font-light">
              Tire suas dúvidas sobre nossos serviços e atendimento
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card rounded-2xl border-0 px-6"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-6">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-light pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section - Ultra Clean */}
      <section className="py-32 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <Heart className="h-12 w-12 text-primary mx-auto mb-8" />
            <h2 className="mb-6">
              Pronto para cuidar do seu sorriso?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 font-light">
              Agende sua consulta hoje mesmo e experimente o melhor em cuidados odontológicos.
            </p>
            <Link to="/agendamento">
              <Button 
                size="lg" 
                className="btn-primary"
              >
                Agendar Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}