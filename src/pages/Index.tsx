
import { useState } from "react";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    toast({
      title: "Categoría seleccionada",
      description: "Presiona 'Comenzar' para iniciar tu carta",
    });
  };

  const handleStart = () => {
    if (selectedCategory) {
      navigate(`/write/${selectedCategory}`);
    } else {
      toast({
        title: "Selecciona una categoría",
        description: "Por favor elige el tipo de carta que deseas escribir",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/20">
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-serif mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-foreground to-secondary">
            InkHeart
          </h1>
          <p className="text-lg text-muted-foreground">
            Crea cartas emotivas y únicas para tus seres queridos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? "ring-2 ring-primary shadow-lg"
                    : ""
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <CardContent className="p-6 flex flex-col items-center">
                  <category.icon className="w-12 h-12 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Button
            size="lg"
            className={`${
              selectedCategory ? "bg-primary" : "bg-muted"
            } text-primary-foreground hover:bg-primary/90 transition-all duration-300`}
            onClick={handleStart}
          >
            Comenzar
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
