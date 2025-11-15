import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAvailableTasks, updateTask, currentUser, mockTasks } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, Check, Wallet, TrendingUp } from "lucide-react";

const Employee = () => {
  const [tasks, setTasks] = useState(getAvailableTasks());
  const { toast } = useToast();
  
  const employeeTasks = mockTasks.filter(t => t.employeeId === currentUser.id);
  const completedTasks = employeeTasks.filter(t => t.status === 'completed');
  const totalEarnings = completedTasks.reduce((sum, t) => sum + t.reward, 0);

  const handleTakeTask = (taskId: string) => {
    updateTask(taskId, { 
      employeeId: currentUser.id,
      status: 'assigned'
    });
    setTasks(getAvailableTasks());
    toast({
      title: "Tâche acceptée",
      description: "Complétez la tâche pour recevoir votre récompense",
    });
  };

  const handleCompleteTask = (taskId: string) => {
    updateTask(taskId, { 
      status: 'completed',
      completedAt: new Date()
    });
    setTasks(getAvailableTasks());
    toast({
      title: "Tâche terminée !",
      description: "La récompense a été ajoutée à votre solde",
    });
  };

  const stats = [
    {
      title: "Solde actuel",
      value: `${totalEarnings.toFixed(2)}€`,
      icon: Wallet,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Tâches complétées",
      value: completedTasks.length,
      icon: Check,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Taux de réussite",
      value: "98%",
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Espace <span className="bg-gradient-hero bg-clip-text text-transparent">Employé</span>
          </h1>
          <p className="text-muted-foreground">Complétez des tâches et gagnez de l'argent</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-card transition-all">
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
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tâches disponibles</CardTitle>
              <CardDescription>Acceptez des tâches pour commencer à gagner</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tasks.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Aucune tâche disponible pour le moment
                </p>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{task.platform}</Badge>
                      <span className="font-semibold text-primary">+{task.reward.toFixed(2)}€</span>
                    </div>
                    <p className="text-sm mb-3 capitalize">{task.type}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(task.link, '_blank')}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Voir
                      </Button>
                      <Button
                        variant="hero"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleTakeTask(task.id)}
                      >
                        Accepter
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mes tâches en cours</CardTitle>
              <CardDescription>Terminez vos tâches assignées</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {employeeTasks.filter(t => t.status === 'assigned').length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Aucune tâche en cours
                </p>
              ) : (
                employeeTasks
                  .filter(t => t.status === 'assigned')
                  .map((task) => (
                    <div key={task.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge>{task.platform}</Badge>
                        <span className="font-semibold text-primary">+{task.reward.toFixed(2)}€</span>
                      </div>
                      <p className="text-sm mb-3 capitalize">{task.type}</p>
                      <Button
                        className="w-full"
                        onClick={() => handleCompleteTask(task.id)}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Marquer comme terminé
                      </Button>
                    </div>
                  ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Employee;
