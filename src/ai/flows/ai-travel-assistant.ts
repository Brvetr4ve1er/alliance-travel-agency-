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
import { TRIP_CONFIG } from '@/lib/trip-config';

const AiTravelAssistantInputSchema = z.object({
  query: z.string().describe('The user\'s question about the Egypt tour package.'),
});
export type AiTravelAssistantInput = z.infer<typeof AiTravelAssistantInputSchema>;

const AiTravelAssistantOutputSchema = z.object({
  answer: z.string().describe('The AI assistant\'s answer to the user\'s query.'),
});
export type AiTravelAssistantOutput = z.infer<typeof AiTravelAssistantOutputSchema>;

// Generate tourInformation from TRIP_CONFIG to ensure AI always has accurate data
const tourInformation = `
Voici les informations détaillées sur l'offre de voyage "${TRIP_CONFIG.name} - Alliance Travel" :

**Titre de l'offre**: ${TRIP_CONFIG.tagline}
**Description**: ${TRIP_CONFIG.duration.label} inoubliables — entre les merveilles du Caire antique et les eaux cristallines de Sharm El Sheikh. Vol Egyptair, hôtels All Inclusive, excursions incluses.
**Durée**: ${TRIP_CONFIG.duration.label}
**Formule d'hébergement à Sharm El Sheikh**: All Inclusive Soft
**Prix de départ**: À partir de ${TRIP_CONFIG.basePrice}
**Dates de départ**: ${TRIP_CONFIG.departureDates.length} dates disponibles
**Visa**: ${TRIP_CONFIG.visaFee} à l'arrivée

**Dates de départ depuis Alger (Retour inclus)**:
${TRIP_CONFIG.departureDates.map(d => `- ${d.label} (Retour ${d.return})`).join('\n')}

**Ce qui est inclus dans le forfait**:
${TRIP_CONFIG.inclusions.map(i => `- ${i}`).join('\n')}

**Ce qui n'est pas inclus**:
${TRIP_CONFIG.exclusions.map(e => `- ${e}`).join('\n')}

**Hôtels à Sharm El Sheikh — Formule All Inclusive Soft (tarifs par personne en chambre double)**:
${TRIP_CONFIG.hotels.map(h => `- **${h.name}** (${h.stars}★): ${h.price}. 1er enfant : ${h.pricingGrid.child1} · Bébé : ${h.pricingGrid.baby}.`).join('\n')}

**Hébergement au Caire**:
- **Marwa Palace Hotel** (★★★★): Formule Petit Déjeuner, ${TRIP_CONFIG.cairoNights} nuits. Compris dans le forfait.

**Informations pratiques**:
- **Visa Égypte**: Lettre de garantie fournie par l'agence. Le visa est obtenu à l'arrivée au Caire. Coût : ${TRIP_CONFIG.visaFee} payés sur place.
- **Check-in hôtels**: Le check-in est toujours à 14h.
- **Chambres familiales**: Capacité max chambre standard : 2 adultes + 2 enfants.
- **Réservation & renseignements (Contacts WhatsApp)**: ${TRIP_CONFIG.mainWhatsApp}
- **Agence Alliance Travel**: 05 Rue des Frères Habbache, Sétif.
`;

const aiTravelAssistantPrompt = ai.definePrompt({
  name: 'aiTravelAssistantPrompt',
  input: { schema: AiTravelAssistantInputSchema },
  output: { schema: AiTravelAssistantOutputSchema },
  prompt: `You are an AI travel assistant providing information about the "${TRIP_CONFIG.name} - Alliance Travel" tour package.
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
