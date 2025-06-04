import { Router, Request, Response } from 'express'
import { GoogleGenAI, Type } from '@google/genai'
import { nanoid } from 'nanoid'

export type Recipe = {
    id: string
    name: string
    ingredients: string[]
    steps: string[]
    selected: boolean
}

type GetRecipesApiResponse = {
    recipes: Recipe[]
}

const router = Router()
const geminiApiKey = process.env.GEMINI_API_KEY as string

router.get('/recipes', async (req: Request, res: Response) => {
    const ai = new GoogleGenAI({
        apiKey: geminiApiKey,
    })

    const cuisines = req.query.cuisines as string
    const prompt =
        cuisines.length > 0
            ? 'Generate 5 recipes based on the following cuisines: ' +
              cuisines +
              '. Include a list of ingredients.'
            : 'Generate 5 recipes from random cuisines and include the amounts of ingredients.'

    const contents = prompt
    const model = 'gemini-1.5-flash'

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
                    propertyOrdering: ['name', 'ingredients', 'steps'],
                },
            },
        },
    }

    const response = await ai.models.generateContent({
        model,
        config,
        contents,
    })

    const parsedRecipes = response.text
        ? (JSON.parse(response.text) as GetRecipesApiResponse)
        : { recipes: [] }

    const recipesResponse = parsedRecipes.recipes.map((recipe: Recipe) => ({
        ...recipe,
        id: nanoid(),
    }))

    res.json(recipesResponse)
})

export default router
