import { CreateBlogAction } from "#/actions/blogsAction";
import { auth } from "#/auth";
import CreateBlog from "#/components/blogs/CreateBlog";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Link,
} from "@nextui-org/react";
import { redirect } from "next/navigation";

const AddBlogsPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex justify-center pt-10">
      <CreateBlog />
    </div>
  );
};

export default AddBlogsPage;
