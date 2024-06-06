import { internalMutation, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";


export const saveSketch = mutation({
  args: { prompt: v.string(), image: v.string() },
  handler: async (ctx, { prompt, image }) => {
    const sketch = await ctx.db.insert("sketches", {
      prompt,
    });

    await ctx.scheduler.runAfter(0, internal.generate.generateImg, {
      sketchId: sketch,
      prompt,
      image,
    });

    return sketch;
  },
});


export const getSketch = query({
    args: { sketchId: v.id('sketches') },
    handler: async (ctx, {sketchId}) => {
        if (!sketchId) return null;
        return ctx.db.get(sketchId)
    }
})

export const getSketches = query({
  handler: async (ctx) => {
    const sketches = await ctx.db.query("sketches").collect();
    return sketches;
  },
});

export const updateSketchResult = internalMutation({
  args: { sketchId: v.id("sketches"), result: v.string() },
  handler: async (ctx, { sketchId, result }) => {
    await ctx.db.patch(sketchId, {
      result,
    });
  },
});
