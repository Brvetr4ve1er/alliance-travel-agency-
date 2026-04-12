
'use server';
/**
 * @fileOverview An AI assistant flow that answers questions about the Egypt tour package.
 *
 * - aiTravelAssistant - A function that handles user queries regarding the Egypt tour.
 * - AiTravelAssistantInput - The input type for the aiTravelAssistant function.
 * - AiTravelAssistantOutput - The return type for the aiTravelAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiTravelAssistantInputSchema = z.object({
  query: z.string().describe('The user\'s question about the Egypt tour package.'),
});
export type AiTravelAssistantInput = z.infer<typeof AiTravelAssistantInputSchema>;

const AiTravelAssistantOutputSchema = z.object({
  answer: z.string().describe('The AI assistant\'s answer to the user\'s query.'),
});
export type AiTravelAssistantOutput = z.infer<typeof AiTravelAssistantOutputSchema>;

const tourInformation = `
Voici les informations détaillées sur l'offre de voyage "Égypte 2026 - Alliance Travel" :

**Titre de l'offre**: Les Pyramides & la Mer Rouge
**Description**: Sept nuits inoubliables — entre les merveilles du Caire antique et les eaux cristallines de Sharm El Sheikh. Vol Egyptair, hôtels All Inclusive, excursions incluses.
**Durée**: 7 nuits / 8 jours
**Formule d'hébergement à Sharm El Sheikh**: All Inclusive Soft
**Prix de départ**: À partir de 180 000 DA
**Dates de départ**: 4 dates disponibles
**Visa**: 25$ à l'arrivée

**Dates de départ depuis Alger (Retour inclus)**:
- 05 Avril 2026 (Retour 12 Avril)
- 19 Avril 2026 (Retour 26 Avril)
- 01 Mai 2026 (Retour 08 Mai)
- 09 Mai 2026 (Retour 16 Mai)

**Ce qui est inclus dans le forfait**:
- **Vol international & domestique**: Alger ↔ Caire ↔ Sharm El Sheikh avec Egyptair.
- **Hébergement Sharm El Sheikh**: 5 nuits dans un hôtel au choix parmi 7 options (4★ à 5★) en formule All Inclusive Soft.
- **Hébergement Caire**: 2 nuits au Marwa Palace Hotel, Caire, en formule Petit déjeuner.
- **Transferts**: Aéroport ↔ Hôtel à l'arrivée et au départ, inclus.
- **Excursions Caire**: Pyramides, Sphinx, Khan Khalili, Mosquée Al-Azhar, Croisière dîner sur le Nil.
- **Excursions Sharm El Sheikh**: Naama Bay, Old Market, Sahaba Mosque, Soho Square.
- **Lettre de garantie visa**: Visa obtenu à l'arrivée au Caire — 25 USD payés sur place par le client.
- **Accompagnateur**: Accompagnateur Alliance Travel pour une prise en charge complète du départ au retour.

**Option supplémentaire (non incluse par défaut)**:
- Le nouveau Musée Égyptien (Grand Egyptian Museum) est disponible en option payante sur place.

**Programme détaillé Sharm El Sheikh (5 nuits)**:
- **Naama Bay**: Balade sur le front de mer, boutiques, restaurants et la plage emblématique de Sharm.
- **Sahaba Mosque**: L'une des plus grandes mosquées d'Égypte, architecture impressionnante.
- **Old Market (Sharm El Maya)**: Marché traditionnel, artisanat et ambiance locale authentique.
- **Soho Square**: Complexe de divertissement, fontaines musicales, restaurants et shows nocturnes.
- **Mer Rouge**: Plongée snorkeling optionnelle dans les récifs coralliens (excursion en option sur place).

**Programme détaillé Le Caire (2 nuits)**:
- **Pyramides de Gizeh & Sphinx**: L'une des 7 merveilles du monde antique.
- **Khan El Khalili**: Grand bazar historique du Caire islamique depuis le XIVe siècle.
- **Mosquée Al-Azhar & Hussein**: Centre spirituel de l'islam depuis plus de 1000 ans.
- **Croisière dîner sur le Nil**: Spectacle de danse orientale, musique traditionnelle & dîner à bord.
- **Grand Egyptian Museum (option)**: Le plus grand musée archéologique du monde, trésor de Toutânkhamon.

**Hôtels à Sharm El Sheikh — Formule All Inclusive Soft (tarifs par personne en chambre double)**:
- **Verginia Aqua Park** (★★★★, Parc aquatique): 180 000 DA. 1er enfant : 115 000 DA · Bébé : 25 000 DA.
- **Tivoli Aqua Park** (★★★★, Parc aquatique): 185 000 DA. 1er enfant : 115 000 DA · Bébé : 25 000 DA.
- **Rehana Aqua Park** (★★★★, Parc aquatique): 202 000 DA. 1er enfant : 115 000 DA · Bébé : 25 000 DA.
- **Rehana Royal Beach** (★★★★★, Vue mer): 227 000 DA. 1er enfant : 115 000 DA · Bébé : 25 000 DA.
- **Charmillion Club Aqua Park** (★★★★★, Parc aquatique 5★): 245 000 DA. 1er enfant : 115 000 DA · Bébé : 25 000 DA.
- **Cleopatra Luxury Resort** (★★★★★, Complexe de luxe): 250 000 DA. 1er enfant : 115 000 DA · Bébé : 25 000 DA.
- **Pickalbatros — Laguna Vista / Royal Moderna** (★★★★★, Chaîne Pickalbatros): 265 000 DA. 1er enfant : 115 000 DA · Bébé : 25 000 DA.

**Hébergement au Caire**:
- **Marwa Palace Hotel** (★★★★): Formule Petit Déjeuner, 2 nuits. Compris dans le forfait.

**Informations pratiques**:
- **Visa Égypte**: Lettre de garantie fournie par l'agence. Le visa est obtenu à l'arrivée au Caire. Coût : 25 USD payés sur place par le client.
- **Check-in hôtels**: Le check-in est toujours à 14h, quelle que soit l'heure d'arrivée.
- **Chambres familiales**: Capacité max chambre standard : 2 adultes + 2 enfants (1 extra bed). Pour 3 adultes : 2 chambres (ou Family Room sous réserve disponibilité).
- **Calcul du tarif (exemple famille)**: Configuration type famille : (Double + 1er enfant) + (Single + 1er enfant). Calculé par configuration.
- **Réservation & renseignements (Contacts WhatsApp)**: 0550 737 434 · 0672 021 651 · 0770 545 737 · 0770 311 099
- **Agence Alliance Travel**: 05 Rue des Frères Habbache, Sétif — Face à Park Mall.
`;

const aiTravelAssistantPrompt = ai.definePrompt({
  name: 'aiTravelAssistantPrompt',
  input: { schema: AiTravelAssistantInputSchema },
  output: { schema: AiTravelAssistantOutputSchema },
  prompt: `You are an AI travel assistant providing information about the "Egypt 2026 - Alliance Travel" tour package.
Your task is to answer user questions based *only* on the provided tour information.
Answer in the same language as the user's question (French, Arabic, or English).
If the information required to answer a question is not available in the provided context, please state that you don't have that information.
Do not make up any information. Be concise and helpful.

Here is the detailed tour information:
${tourInformation}

User's question: {{{query}}}
`,
});

const aiTravelAssistantFlow = ai.defineFlow(
  {
    name: 'aiTravelAssistantFlow',
    inputSchema: AiTravelAssistantInputSchema,
    outputSchema: AiTravelAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await aiTravelAssistantPrompt(input);
    return output!;
  }
);

export async function aiTravelAssistant(input: AiTravelAssistantInput): Promise<AiTravelAssistantOutput> {
  return aiTravelAssistantFlow(input);
}
