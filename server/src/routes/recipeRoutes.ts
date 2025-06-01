import { Router, Request, Response } from "express";
import {
    GoogleGenAI,
    Type,
} from '@google/genai';

const router = Router();
const geminiApiKey = process.env.GEMINI_API_KEY as string;

router.get("/recipes", async (req: Request, res: Response) => {
    const ai = new GoogleGenAI({
        apiKey: geminiApiKey
    });

    const cuisines = req.query.cuisines as string;
    const prompt = cuisines.length > 0 ?
        'Generate 5 recipes based on the following cuisines and include the amounts of ingredients: ' + cuisines :
        'Generate 5 recipes from random cuisines and include the amounts of ingredients.';

    const contents = prompt;
    const model = 'gemini-2.5-flash-preview-04-17';

    const config = {
        responseMimeType: 'application/json',
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                recipes: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            ingredients: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.STRING,
                                },
                            },
                            steps: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.STRING,
                                },
                            },
                            name: {
                                type: Type.STRING,
                            },
                        },
                    },
                },
            },
        },
    };

    const response = await ai.models.generateContent({
        model,
        config,
        contents,
    });

    const responseJson = response.text ? JSON.parse(response.text) : {};
    res.json(responseJson);
});

export default router;