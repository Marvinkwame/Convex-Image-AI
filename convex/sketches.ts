import { mutation, query } from "./_generated/server"

export const sketch = mutation(
    async ({ db }, { prompt }: { prompt: string }) => {
        await db.insert("sketches", {
            prompt
        });

        console.log(prompt)

        return {
            message: 'success'
        }
    }
)


export const getSketches = query(
    async ({ db }) => {
        const sketches = await db.query("sketches").collect()
        console.log(sketches)

        return sketches
    }
)