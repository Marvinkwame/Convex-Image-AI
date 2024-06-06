import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import Replicate from "replicate";
import { internal } from "./_generated/api";

export const generateImg = internalAction({
  args: { sketchId: v.id("sketches"), prompt: v.string(), image: v.string() },
  handler: async (ctx, { sketchId, prompt, image }) => {
    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

    const output = (await replicate.run(
      "jagilley/controlnet-scribble:435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
      {
        input: {
          image,
          prompt,
          scale: 7,
          image_resolution: "512",
          //negative prompts
          n_prompt:
            "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
        },
      }
    )) as [string, string];
   

    await ctx.runMutation(internal.sketches.updateSketchResult, {
        sketchId,
        result: output[1],
    })
  },
});
