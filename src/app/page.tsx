"use client";

import { useMutation } from "convex/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../../convex/_generated/api";

type Inputs = {
  prompt: string;
  exampleRequired: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data); // watch input value by passing the name of it

  const saveSketchMutation = useMutation(api.sketches.sketch)
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(async (formData) => {
        const results = await saveSketchMutation(formData);
        console.log(results)
      })}
    >
      {/* register your input into the hook by invoking the "register" function */}
      <input
        className="text-black font-semibold"
        defaultValue="test"
        {...register("prompt", { required: true })}
      />

      {/* errors will return when field validation fails  */}
      {errors.prompt && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
