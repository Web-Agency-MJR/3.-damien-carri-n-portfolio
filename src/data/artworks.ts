import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art3 from "@/assets/art-3.jpg";
import art4 from "@/assets/art-4.jpg";
import art5 from "@/assets/art-5.jpg";
import art6 from "@/assets/art-6.jpg";
import process1 from "@/assets/process-1.jpg";
import process2 from "@/assets/process-2.jpg";
import process3 from "@/assets/process-3.jpg";
import process4 from "@/assets/process-4.jpg";
import process5 from "@/assets/process-5.jpg";
import process6 from "@/assets/process-6.jpg";
import process7 from "@/assets/process-7.jpg";

export interface Artwork {
  id: string;
  title: string;
  year: number;
  technique: string;
  dimensions: string;
  imageUrl: string;
  category: "2D" | "3D" | "GOLD" | "Videos";
  status: "available" | "sold" | "gallery";
  description?: string;
}

export const artworks: Artwork[] = [
  {
    id: "obr-01",
    title: "Paseo por mis adentros",
    year: 2023,
    technique: "Óleo sobre lienzo",
    dimensions: "146 x 114 cm",
    imageUrl: art1,
    category: "2D",
    status: "available",
    description:
      "Capas de ocre y carbón levantadas a espátula. El gesto vertical rompe la calma del fondo como una calle que se abre en la memoria.",
  },
  {
    id: "obr-02",
    title: "Silencio de cal",
    year: 2022,
    technique: "Técnica mixta y gesso sobre lino",
    dimensions: "180 x 140 cm",
    imageUrl: art2,
    category: "2D",
    status: "gallery",
    description:
      "Un único trazo de carbón sobre un campo de blancos. La obra respira en el vacío que la rodea.",
  },
  {
    id: "obr-03",
    title: "Vertical del deseo",
    year: 2021,
    technique: "Bronce fundido a la cera perdida",
    dimensions: "182 x 44 x 38 cm",
    imageUrl: art3,
    category: "3D",
    status: "sold",
    description:
      "Figura estirada hasta el límite de su propia materia. Pátina oscura pulida a mano durante semanas.",
  },
  {
    id: "obr-04",
    title: "Ola detenida",
    year: 2024,
    technique: "Mármol de Carrara tallado a mano",
    dimensions: "62 x 58 x 30 cm",
    imageUrl: art4,
    category: "3D",
    status: "available",
    description:
      "El movimiento del agua congelado en piedra. Superficie satinada sin pulir para conservar la huella del cincel.",
  },
  {
    id: "obr-05",
    title: "Reliquia I",
    year: 2023,
    technique: "Pan de oro de 23,75 quilates sobre resina",
    dimensions: "95 x 58 x 55 cm",
    imageUrl: art5,
    category: "GOLD",
    status: "gallery",
    description:
      "Dorado al agua con bol armenio. Las grietas del oro son deliberadas: la herida convertida en luz.",
  },
  {
    id: "obr-06",
    title: "Cartografía dorada",
    year: 2024,
    technique: "Pan de oro y estuco sobre tabla",
    dimensions: "120 x 90 cm",
    imageUrl: art6,
    category: "GOLD",
    status: "available",
    description:
      "Un mapa imaginario trazado en oro sobre estuco tradicional, bruñido con piedra de ágata.",
  },
  {
    id: "obr-07",
    title: "Estudio de materia n.º 4",
    year: 2020,
    technique: "Óleo y arena sobre tabla",
    dimensions: "80 x 80 cm",
    imageUrl: process3,
    category: "2D",
    status: "available",
    description: "Serie de ensayos matéricos donde el pigmento se mezcla con áridos de cantera.",
  },
  {
    id: "obr-08",
    title: "Forja nocturna",
    year: 2019,
    technique: "Acero corten soldado",
    dimensions: "210 x 90 x 90 cm",
    imageUrl: process2,
    category: "3D",
    status: "sold",
    description: "Pieza construida a partir de recortes industriales soldados en caliente.",
  },
  {
    id: "obr-09",
    title: "El taller (documental)",
    year: 2024,
    technique: "Vídeo HD, 6 min",
    dimensions: "1920 x 1080 px",
    imageUrl: process6,
    category: "Videos",
    status: "gallery",
    description: "Recorrido filmado por el estudio del artista durante un ciclo completo de trabajo.",
  },
  {
    id: "obr-10",
    title: "Dorar el tiempo (proceso)",
    year: 2023,
    technique: "Vídeo HD, 3 min",
    dimensions: "1920 x 1080 px",
    imageUrl: process4,
    category: "Videos",
    status: "available",
    description: "Registro en detalle de la aplicación del pan de oro sobre talla de madera.",
  },
  {
    id: "obr-11",
    title: "Torso en barro",
    year: 2022,
    technique: "Barro de modelado sobre armadura",
    dimensions: "70 x 40 x 35 cm",
    imageUrl: process1,
    category: "3D",
    status: "gallery",
    description: "Modelo original previo al vaciado en bronce, conservado en el estudio.",
  },
  {
    id: "obr-12",
    title: "Polvo de mármol",
    year: 2021,
    technique: "Mármol y polvo de cantera",
    dimensions: "45 x 45 x 22 cm",
    imageUrl: process5,
    category: "3D",
    status: "available",
    description: "Talla directa donde el resto del material se integra como parte de la obra.",
  },
];

export const processImages: string[] = [
  process1,
  process2,
  process3,
  process4,
  process5,
  process6,
  process7,
];

export const statusLabels: Record<Artwork["status"], string> = {
  available: "Disponible",
  sold: "Colección Privada",
  gallery: "En Galería",
};
