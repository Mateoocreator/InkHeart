
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";

const WriteLetter = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const category = categories.find((c) => c.id === categoryId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!category) {
      navigate("/");
      return;
    }
    setProgress(
      ((currentQuestionIndex + 1) / category.questions.length) * 100
    );
  }, [currentQuestionIndex, category, navigate]);

  const handleNext = () => {
    if (!currentAnswer.trim()) {
      toast({
        title: "Respuesta requerida",
        description: "Por favor, comparte tus pensamientos antes de continuar",
        variant: "destructive",
      });
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(newAnswers);

    if (currentQuestionIndex < (category?.questions.length ?? 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer("");
      toast({
        title: "¡Excelente respuesta!",
        description: "Continuemos escribiendo...",
      });
    } else {
      navigate(`/preview/${categoryId}`, { state: { answers: newAnswers } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentAnswer(answers[currentQuestionIndex - 1] || "");
    }
  };

  if (!category) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/20 py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Progress value={progress} className="mb-4" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Pregunta {currentQuestionIndex + 1} de {category.questions.length}</span>
            <span>{Math.round(progress)}% completado</span>
          </div>
        </motion.div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl mb-4 font-medium">
                {category.questions[currentQuestionIndex]}
              </h2>
              <Textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
                className="min-h-[150px] mb-4"
              />
            </motion.div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between"
        >
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </Button>
          <Button
            onClick={handleNext}
            className={`flex items-center gap-2 ${category.color}`}
          >
            {currentQuestionIndex === category.questions.length - 1 ? (
              <>
                Finalizar
                <Send className="w-4 h-4" />
              </>
            ) : (
              <>
                Siguiente
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default WriteLetter;
