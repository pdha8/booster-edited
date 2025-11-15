import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { TrendingUp, Eye, Heart, MessageCircle, Plus, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "Vues totales",
      value: "24,503",
      change: "+12.5%",
      icon: Eye,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Likes reçus",
      value: "8,924",
      change: "+8.2%",
      icon: Heart,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Commentaires",
      value: "1,243",
      change: "+15.3%",
      icon: MessageCircle,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Croissance",
      value: "+23%",
      change: "Ce mois",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  const recentOrders = [
    { service: "1000 Vues Instagram", status: "En cours", progress: 65 },
    { service: "500 Likes Facebook", status: "Terminé", progress: 100 },
    { service: "250 Commentaires YouTube", status: "En cours", progress: 40 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Tableau de <span className="bg-gradient-hero bg-clip-text text-transparent">bord</span>
            </h1>
            <p className="text-muted-foreground">Suivez votre croissance et gérez vos commandes</p>
          </div>
          <Link to="/order">
            <Button variant="hero" size="lg" className="mt-4 md:mt-0">
              <Plus className="mr-2 h-5 w-5" />
              Nouvelle commande
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-card transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-secondary">{stat.change}</span> depuis le mois dernier
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Commandes récentes</CardTitle>
                  <CardDescription>Suivi de vos commandes en cours</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Voir tout
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 hover:shadow-card transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{order.service}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "Terminé" 
                          ? "bg-secondary/20 text-secondary" 
                          : "bg-primary/20 text-primary"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-hero h-2 rounded-full transition-all duration-500"
                        style={{ width: `${order.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{order.progress}% complété</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Raccourcis utiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/order" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle commande
                </Button>
              </Link>
              <Link to="/profile" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="mr-2 h-4 w-4" />
                  Voir mon profil
                </Button>
              </Link>
              <Link to="/support" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Support client
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
