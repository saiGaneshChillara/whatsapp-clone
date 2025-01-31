import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      This page can only seen by authenticated user
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
