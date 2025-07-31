export default async function handler(req, res) {
  // Configura os headers de CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Tratamento para requisições OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    return res.status(204).end(); // Sem conteúdo, apenas aceita o preflight
  }

  // Só aceita requisições POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Envia os dados recebidos no body para o Google Apps Script
    const response = await fetch("https://script.google.com/macros/s/AKfycbzrAqRel710HArCvHfLt_Tupwf3UQqIX79QBrJkUjnWesIk01wkdI-H7gOnzAJ3uoQ1SQ/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao excluir: " + error.message });
  }
}
