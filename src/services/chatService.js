import Groq from "groq-sdk";

// Usamos la API Key recuperada de los archivos del bot de Telegram
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true // Necesario para ejecución directa en el frontend
});

export const askStrategaChat = async (question, logs) => {
  // Construimos el contexto basado en las llamadas reales
  const callContext = logs.map(log => 
    `- Cliente: ${log.caller}, Fecha: ${log.date}, Notas: ${log.snippet}, Miembro: ${log.member || 'N/A'}`
  ).join('\n');

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Eres el Asistente Inteligente de Stratega Registros. 
          Tu objetivo es analizar los datos de llamadas y responder preguntas de los socios de forma profesional.
          Aquí tienes el contexto actual de las llamadas registradas:\n${callContext}\n
          Responde siempre en español, de forma concisa y basada ÚNICAMENTE en los datos proporcionados.`
        },
        {
          role: "user",
          content: question
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq Chat Error:", error);
    return "Lo siento, he tenido un problema conectando con mi cerebro de IA. ¿Podrías repetirlo?";
  }
};
