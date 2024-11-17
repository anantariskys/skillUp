import { LoaderFunction, redirect } from "@remix-run/node";
import { getSession, destroySession } from "~/utils/session.server";



export const loader: LoaderFunction = async ({ params, request }) => {
    const session = await getSession(request.headers.get("Cookie"));
    return redirect("/", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
    
}