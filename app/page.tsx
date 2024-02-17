import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
    const { user } = await validateRequest();

    if (!user) {
      return redirect("/login");
    }

    return (
      <div>
        <h1>Logged in as {user.username}</h1>
        <p>User type: {user.role}</p>
        <form action={logout}>
          <button>Sign out</button>
        </form>
      </div>
    )
}

async function logout(): Promise<ActionResult> {
  "use server";
  const { session } = await validateRequest();

  if (!session) {
		return {
			error: "Unauthorized"
		};
	}

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect("/login");
}

interface ActionResult {
	error: string | null;
}