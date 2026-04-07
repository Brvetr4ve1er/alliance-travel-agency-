
"use client";

import { useState } from "react";
import { aiTravelAssistant } from "@/ai/flows/ai-travel-assistant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Send, User, Bot, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AIAssistant() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour ! Je suis votre assistant Alliance Travel. Posez-moi vos questions sur notre voyage en Égypte 2026 (visas, hôtels, programme, etc.).",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim() || loading) return;

    const userMessage = query;
    setQuery("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const result = await aiTravelAssistant({ query: userMessage });
      setMessages((prev) => [...prev, { role: "assistant", content: result.answer }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Désolé, j'ai rencontré une erreur. Veuillez réessayer." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-panel border-gold/20 overflow-hidden h-[600px] flex flex-col">
      <CardHeader className="border-b border-gold/10 bg-gold/5">
        <CardTitle className="flex items-center gap-2 text-gold">
          <Sparkles className="h-5 w-5" />
          <span className="font-headline text-2xl">Assistant Voyage IA</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-3 max-w-[85%]",
                  m.role === "user" ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "p-2 rounded-full",
                  m.role === "assistant" ? "bg-gold/20 text-gold" : "bg-white/10 text-white"
                )}>
                  {m.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </div>
                <div className={cn(
                  "p-3 rounded-2xl text-sm leading-relaxed",
                  m.role === "assistant" 
                    ? "bg-white/5 border border-white/10 text-foreground" 
                    : "bg-gold text-gold-foreground font-medium"
                )}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start gap-3">
                <div className="bg-gold/20 text-gold p-2 rounded-full">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
                  <Loader2 className="h-4 w-4 animate-spin text-gold" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-gold/10 bg-gold/5 flex gap-2">
          <Input
            placeholder="Posez votre question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="bg-background/50 border-gold/20 focus-visible:ring-gold"
          />
          <Button 
            onClick={handleSend} 
            disabled={loading}
            className="bg-gold hover:bg-gold/80 text-gold-foreground"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
