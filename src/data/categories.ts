
import { Heart, Star, Handshake, Smile } from "lucide-react";

export const categories = [
  {
    id: "love",
    title: "Amor",
    icon: Heart,
    description: "Expresa tus sentimientos más profundos",
    color: "bg-secondary hover:bg-secondary/90",
    questions: [
      "¿Qué es lo primero que pensaste cuando viste a esa persona por primera vez?",
      "¿Cómo describirías su sonrisa en pocas palabras?",
      "¿Cuál es el recuerdo más hermoso que tienen juntos?",
      "Si tuvieras que elegir una canción que los represente, ¿cuál sería y por qué?",
      "¿Qué es algo pequeño pero especial que hace esa persona por ti?",
      "¿Cómo te imaginas el futuro a su lado?",
    ],
  },
  {
    id: "gratitude",
    title: "Agradecimiento",
    icon: Star,
    description: "Demuestra tu gratitud con palabras sinceras",
    color: "bg-primary hover:bg-primary/90",
    questions: [
      "¿Qué fue lo último que esa persona hizo por ti que te llenó de gratitud?",
      "¿Cómo describirías el impacto de esa persona en tu vida?",
      "¿Qué palabras te gustaría decirle pero no has tenido la oportunidad?",
      "¿Qué es lo que más valoras de su personalidad?",
      "¿Cuál fue un momento donde esa persona te apoyó sin que se lo pidieras?",
    ],
  },
  {
    id: "reconciliation",
    title: "Reconciliación",
    icon: Handshake,
    description: "Reconstruye puentes con sinceridad",
    color: "bg-accent hover:bg-accent/90",
    questions: [
      "¿Qué es lo que más extrañas de esa persona?",
      "¿Qué crees que podrías haber hecho mejor?",
      "¿Qué le dirías si estuvieras frente a él/ella ahora mismo?",
      "¿Cuál es el recuerdo que siempre te hace sonreír?",
      "¿Qué prometes hacer para mejorar la relación?",
    ],
  },
  {
    id: "friendship",
    title: "Amistad",
    icon: Smile,
    description: "Celebra los lazos especiales",
    color: "bg-muted hover:bg-muted/90",
    questions: [
      "¿Cuándo fue la primera vez que te diste cuenta de que eran buenos amigos?",
      "¿Qué es lo que más admiras de esa persona como amigo?",
      "¿Cuál es el mejor recuerdo que tienes con él/ella?",
      "¿Qué te gustaría agradecerle?",
      "¿Cómo describirías su amistad en una frase?",
    ],
  },
];
