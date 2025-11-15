import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { addOrder, currentUser, addPayment } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, CreditCard } from "lucide-react";

const Order = () => {
  const [service, setService] = useState("");
  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState(100);
  const { toast } = useToast();
  const navigate = useNavigate();

  const services = [
    { value: "views", label: "Vues", price: 0.03 },
    { value: "likes", label: "Likes", price: 0.04 },
    { value: "comments", label: "Commentaires", price: 0.15 },
    { value: "followers", label: "Abonnés", price: 0.25 },
  ];

  const platforms = [
    { value: "instagram", label: "Instagram" },
    { value: "facebook", label: "Facebook" },
    { value: "youtube", label: "YouTube" },
    { value: "tiktok", label: "TikTok" },
    { value: "twitter", label: "Twitter" },
  ];

  const calculatePrice = () => {
    const selectedService = services.find(s => s.value === service);
    if (!selectedService) return "0.00";
    return (selectedService.price * quantity).toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!service || !platform || !link || quantity < 1) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    const serviceLabel = services.find(s => s.value === service)?.label;
    const orderId = `ORD${Date.now()}`;
    const price = parseFloat(calculatePrice());

    addOrder({
      id: orderId,
      clientId: currentUser.id,
      service: `${quantity} ${serviceLabel} ${platform}`,
      platform,
      link,
      quantity,
      price,
      status: 'pending',
      progress: 0,
      createdAt: new Date(),
    });

    addPayment({
      id: `PAY${Date.now()}`,
      userId: currentUser.id,
      type: 'order',
      amount: price,
      status: 'completed',
      createdAt: new Date(),
    });

    toast({
      title: "Commande créée !",
      description: `Votre commande ${orderId} a été créée avec succès.`,
    });

    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Nouvelle <span className="bg-gradient-hero bg-clip-text text-transparent">commande</span>
            </h1>
            <p className="text-muted-foreground">Boostez votre présence en ligne</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Détails de la commande
              </CardTitle>
              <CardDescription>
                Sélectionnez le service et la quantité désirée
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="service">Service</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label} - {s.price}€ / unité
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform">Plateforme</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une plateforme" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link">Lien du contenu</Label>
                  <Input
                    id="link"
                    type="url"
                    placeholder="https://..."
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantité</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    step="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 100)}
                  />
                </div>

                {service && (
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Prix total</span>
                        <span className="text-primary">{calculatePrice()}€</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button type="submit" className="w-full" size="lg" variant="hero">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Passer la commande
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Order;
