import { auth } from "@/auth";
import PublishForm from "@/components/PublishForm";
import { redirect } from "next/navigation";

export default async function Publish() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return <PublishForm />;
}
