import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Heart, MessageCircle, UserPlus, TrendingUp, Star } from "lucide-react";

export const Services = () => {
  const services = [
    {
      icon: Eye,
      title: "Vues",
      description: "Augmentez la visibilité de vos contenus avec des vues organiques et authentiques.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Heart,
      title: "Likes",
      description: "Obtenez des likes réels pour améliorer l'engagement de vos publications.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: MessageCircle,
      title: "Commentaires",
      description: "Des commentaires pertinents et positifs pour dynamiser vos posts.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: UserPlus,
      title: "Abonnés",
      description: "Développez votre communauté avec des abonnés actifs et engagés.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: TrendingUp,
      title: "Croissance",
      description: "Stratégies complètes pour une croissance durable et organique.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Star,
      title: "Premium",
      description: "Services premium avec support prioritaire et résultats garantis.",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nos <span className="bg-gradient-hero bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des solutions adaptées à tous vos besoins de croissance sociale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-border/50"
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${service.bgColor} flex items-center justify-center mb-4`}>
                  <service.icon className={`h-6 w-6 ${service.color}`} />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
