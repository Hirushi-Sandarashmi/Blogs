import BlogCard from "#/components/blogs/blogCard";

export const revalidate = 0;
export default async function Home() {
  const apiurl = process.env.API_URL || "http://127.0.0.1:8000/api/";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  try {
    const res = await fetch(apiurl + "blog-posts", requestOptions);

    if (!res.ok) {
      return (
        <div>
          <h1>There was an error fetching the blog posts.</h1>
          <p>Please try again later.</p>
        </div>
      );
    }

    const dataSet = await res.json();

    const data = dataSet?.data;

    return (
      <div className="grid-container -ml-24">
        {data.length > 0 ? (
          data?.map((blog: any, id: number) => <BlogCard key={id} {...blog} />)
        ) : (
          <h1>No blogs available.</h1>
        )}
      </div>
    );
  } catch (e) {
    return (
      <div className="h-[80vh] flex flex-col justify-center items-center">
        <h1>Blogs API is not available.</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
}
