import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                messages: [
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();

        // 🔥 DEBUG LOG (IMPORTANT)
        console.log("API RESPONSE:", data);

        // ❌ handle error safely
        if (!data.choices || !data.choices.length) {
            throw new Error("Invalid API response");
        }

        return data.choices[0].message.content;

    } catch (err) {
        console.log("OpenRouter Error:", err.message);
        return "Sorry, AI is not responding right now.";
    }
};

export default getOpenAIAPIResponse;