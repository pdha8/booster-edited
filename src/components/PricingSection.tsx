import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "29",
      description: "Parfait pour débuter",
      features: [
        "1000 vues",
        "500 likes",
        "50 commentaires",
        "Support email",
        "Livraison en 48h",
      ],
      cta: "Commencer",
      popular: false,
    },
    {
      name: "Professionnel",
      price: "99",
      description: "Pour les créateurs sérieux",
      features: [
        "5000 vues",
        "2500 likes",
        "250 commentaires",
        "Support prioritaire",
        "Livraison en 24h",
        "Garantie de qualité",
      ],
      cta: "Choisir Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "299",
      description: "Pour les grandes marques",
      features: [
        "20000 vues",
        "10000 likes",
        "1000 commentaires",
        "Support dédié 24/7",
        "Livraison immédiate",
        "Garantie premium",
        "Statistiques avancées",
      ],
      cta: "Contacter",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-hero bg-clip-text text-transparent">Tarifs</span> transparents
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choisissez le plan qui correspond à vos objectifs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative hover:shadow-elevated transition-all duration-300 ${
                plan.popular ? "border-primary shadow-card scale-105" : "hover:-translate-y-1"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-gradient-hero text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Plus populaire
                  </span>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}€</span>
                  <span className="text-muted-foreground">/mois</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="bg-secondary/20 rounded-full p-1">
                        <Check className="h-4 w-4 text-secondary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/dashboard" className="block">
                  <Button
                    variant={plan.popular ? "hero" : "outline"}
                    className="w-full mt-4"
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
