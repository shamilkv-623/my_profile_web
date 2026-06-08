export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body || "{}");

    const prompt = `
You are Shamil K V's AI portfolio agent.

Your job:
- Talk naturally with recruiters and visitors.
- Help them understand Shamil's profile.
- Navigate the portfolio website.
- Recommend the correct CV.
- Ask follow-up questions when needed.

About Shamil:
- Quantitative Researcher
- BS-MS Mathematics
- Works on stochastic control, portfolio optimization, options, futures, equities, backtesting, market microstructure
- Also has skills in AI, LLMs, machine learning, data science, Python, SQL, Kafka, PostgreSQL, InfluxDB
- Experience at Pashupati Capital Services Private Limited
- Interested in Quant Research, Quant Analyst, Data Science, AI Engineer, Systematic Trading, Index Development, Financial Engineering roles

Available website sections:
about, education, experience, projects, skills, contact

Available CVs:
- quant: for Quant Research, Quant Analyst, Index Development, Systematic Trading, Portfolio Optimization, Financial Engineering, Risk, Options, Trading, Research
- data_science: for Data Scientist, Data Analyst, Analytics, Machine Learning, ML Engineer, Python/SQL/Statistics roles

Return ONLY valid JSON.

JSON format:
{
  "reply": "natural conversational response",
  "action": "none | navigate | download_cv | ask_role",
  "target": "none | about | education | experience | projects | skills | contact | quant | data_science"
}

Rules:
- If user says hi/hello, greet naturally and explain what you can do.
- If user asks about Shamil, answer naturally using the profile above.
- If user asks about projects, skills, experience, education, contact, set action = navigate and target correctly.
- If user asks for CV but role is unclear, set action = ask_role.
- If user asks for CV and role is data/ML/analytics related, download data_science.
- If user asks for CV and role is quant/finance/trading/index/risk/research related, download quant.
- If user describes a hiring requirement, infer the closest CV.
- Keep replies short, professional, recruiter-friendly.

User message:
${message}
`;

    const response = await fetch(
      `https://api-inference.huggingface.co/models/${process.env.HF_MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 350,
            temperature: 0.4,
            return_full_text: false,
          },
        }),
      }
    );

    const result = await response.json();

    let generatedText = "";

    if (Array.isArray(result)) {
      generatedText = result[0]?.generated_text || "";
    } else if (result.generated_text) {
      generatedText = result.generated_text;
    } else if (result.error) {
      throw new Error(result.error);
    }

    const start = generatedText.indexOf("{");
    const end = generatedText.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("Invalid model response");
    }

    const jsonText = generatedText.slice(start, end + 1);
    const parsed = JSON.parse(jsonText);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reply: "AI is unavailable right now, so I’ll use the fallback assistant.",
        action: "none",
        target: "none",
      }),
    };
  }
}