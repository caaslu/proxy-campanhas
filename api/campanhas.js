export default async function handler(req, res) {
  const scriptURL = "https://script.google.com/macros/s/AKfycbzrAqRel710HArCvHfLt_Tupwf3UQqIX79QBrJkUjnWesIk01wkdI-H7gOnzAJ3uoQ1SQ/exec";
  try {
    const response = await fetch(scriptURL);
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar dados: " + error.message });
  }
}
