
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Home } from "lucide-react";
import { enhanceLetter } from "@/utils/letterEnhancer";
import { useToast } from "@/components/ui/use-toast";

const PreviewLetter = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const answers = location.state?.answers || [];
  const category = categories.find((c) => c.id === categoryId);
  const [enhancedContent, setEnhancedContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateEnhancedLetter = async () => {
      if (!category || !answers.length) {
        navigate("/");
        return;
      }

      try {
        const enhanced = await enhanceLetter(answers, category.id);
        setEnhancedContent(enhanced);
      } catch (error) {
        console.error("Error enhancing letter:", error);
        toast({
          title: "Error al generar la carta",
          description: "Hubo un problema al mejorar tu carta. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    generateEnhancedLetter();
  }, [category, answers, navigate, toast]);

  if (!category || !answers.length) return null;

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([enhancedContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `carta_${category.id}_${new Date().toISOString()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/20 py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-serif mb-2">¡Tu carta está lista! 💌</h1>
          <p className="text-muted-foreground">
            Hemos mejorado tu mensaje con frases inspiradoras
          </p>
        </motion.div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Generando tu carta...</p>
                </div>
              ) : (
                <div className="whitespace-pre-wrap font-serif leading-relaxed">
                  {enhancedContent}
                </div>
              )}
            </motion.div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Inicio
          </Button>
          <Button
            onClick={handleDownload}
            className={`flex items-center gap-2 ${category.color}`}
            disabled={isLoading}
          >
            <Download className="w-4 h-4" />
            Descargar Carta
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PreviewLetter;

