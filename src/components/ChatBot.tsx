import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Message {
  text: string;
  isBot: boolean;
}

const SUGGESTIONS = [
  "Quels sont vos tarifs ?",
  "Comment suivre ma commande ?",
  "Quels services proposez-vous ?",
  "Combien de temps pour la livraison ?",
];

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?", isBot: true },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const { toast } = useToast();

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    setShowSuggestions(false);
    const userMessage: Message = { text: textToSend, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((msg) => ({
              role: msg.isBot ? "assistant" : "user",
              content: msg.text,
            })),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur de communication");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { text: data.message, isBot: true },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      });
      setMessages((prev) => [
        ...prev,
        {
          text: "Désolé, je rencontre un problème technique. Veuillez réessayer.",
          isBot: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-elevated z-50"
          variant="hero"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[80vh] shadow-elevated z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-b py-3 px-4">
            <CardTitle className="text-base sm:text-lg">Support en ligne</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] p-2.5 sm:p-3 rounded-lg text-sm ${
                    msg.isBot
                      ? "bg-muted text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {showSuggestions && messages.length === 1 && (
              <div className="space-y-2 pt-2">
                <p className="text-xs text-muted-foreground text-center">Suggestions :</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((suggestion, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary/20 transition-colors text-xs px-2 py-1"
                      onClick={() => handleSend(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <div className="p-3 sm:p-4 border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
              placeholder="Tapez votre message..."
              disabled={isLoading}
              className="text-sm"
            />
            <Button 
              onClick={() => handleSend()} 
              size="icon" 
              variant="hero"
              disabled={isLoading}
              className="h-9 w-9 sm:h-10 sm:w-10"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};
