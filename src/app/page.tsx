"use client";

import { useMutation, useQuery } from "convex/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../../convex/_generated/api";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Inputs = {
  prompt: string;
  exampleRequired: string;
};

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

export default function Home() {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const saveSketchMutation = useMutation(api.sketches.saveSketch); //api for creating a new sketch convex
  const promptSketchQuery = useQuery(api.sketches.getSketches); //api for getting all sketches from convex

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data); // watch input value by passing the name of it

  const sortedSketches = (promptSketchQuery ?? []).sort((a, b) => {
    return b._creationTime - a._creationTime;
  });

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <main className="flex min-h-screen flex-col items-center justify-center p-24 ">
       <h2 className="text-white text-3xl mb-6">
        If you are not getting any images back, the free replicate api limits are finished.
      </h2>
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <form
          className="flex flex-col gap-4 w-[40%]"
          onSubmit={handleSubmit(async (formData) => {
            if (!canvasRef.current) return; //if its empty dont submit the form
            const image = await canvasRef.current?.exportImage("jpeg");
            console.log("image", image);
            await saveSketchMutation({ ...formData, image });
          })}
        >
          <Label htmlFor="prompt" className="text-white">
            Prompt
          </Label>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            className="text-black font-semibold p-4"
            {...register("prompt", { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.prompt && (
            <span className="text-red-500 text-xl">This field is required</span>
          )}

          <Label htmlFor="canvas" className="text-white">
            Canvas (Draw Something)
          </Label>
          <ReactSketchCanvas
            ref={canvasRef}
            width="600"
            height="900"
            strokeWidth={4}
            strokeColor="black"
          />

          <Button
            className="bg-white text-black"
            type="button"
            variant={"ghost"}
            onClick={() => canvasRef.current?.clearCanvas()}
          >
            Clear
          </Button>

          <input
            type="submit"
            className="bg-white font-semibold cursor-pointer rounded-md py-2 px-8"
          />
        </form>

        {/* AI Images */}
        <section>
          <h2 className="text-white">Recent Sketches</h2>
          <div className="grid gap-4 grid-cols-4">
            {sortedSketches?.map((sketch) => (
              <img
                key={sketch._id}
                width="300"
                height="300"
                src={sketch.result}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
