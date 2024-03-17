import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getQuestionById } from "@/lib/actions/Question.action";
import { getUserById } from "@/lib/actions/User.action";

import type { ParamsProps } from "@/types";
import type { Metadata } from "next";
import Question from "@/components/Forms/Question";

export const metadata: Metadata = {
  title: "Edit Question — DevOverflow",
};

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;
  const mongoUser = await getUserById({ userId });
  const result = await getQuestionById({ questionId: params.id });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <Question
          type="Edit"
          mongoUserId={mongoUser._id}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  );
};

export default Page;
