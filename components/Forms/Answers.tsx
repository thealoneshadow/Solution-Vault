"use client";
import React, { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { AnswerValidation } from "@/lib/validations";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "../ui/button";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";

interface Props {
  question: string;
  questionId: string;
  authorId: string;
}

const Answers = ({ question, questionId, authorId }: Props) => {
  const editorRef = useRef(null);
  const { mode } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const pathname = usePathname();

  const form = useForm<z.infer<typeof AnswerValidation>>({
    resolver: zodResolver(AnswerValidation),
    defaultValues: {
      answer: "",
    },
  });

  const handleCreateAnswer = async (
    values: z.infer<typeof AnswerValidation>
  ) => {
    setIsSubmitting(true);
    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });
      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write you answer here
        </h4>

        {/* <Button className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500">
          <Image
            src="/assets/icons/stars.svg"
            alt="star"
            width={12}
            height={12}
            className={`object-contain`}
          />
          Generate AI Answer
        </Button> */}
      </div>
      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    initialValue={""}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | " +
                        "codesample | bold italic forecolor | alignleft aligncenter |" +
                        "alignright alignjustify | bullist numlist outdent indent",
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answers;
