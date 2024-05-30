"use server";
import { auth } from "#/auth";
import { redirect } from "next/navigation";

export const CreateBlogAction = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const jsonData = Object.fromEntries(formData);
  const apiurl = process.env.API_URL || "http://127.0.0.1:8000/api/";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + session.token);

  const raw = JSON.stringify({
    title: jsonData.title,
    content: jsonData.content,
    image: jsonData.image,
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
  };

  const res = await fetch(apiurl + "blog-posts", requestOptions).catch((e) => {
    redirect("/addblogs?success=false");
  });

  if (res.ok) {
    const data = await res.json();
    redirect("/addblogs?success=true");
  } else {
    redirect("/addblogs?success=false");
  }
};
