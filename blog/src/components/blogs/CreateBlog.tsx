"use client";
import { CreateBlogAction } from "#/actions/blogsAction";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import SumbitButton from "./submitButton";
import { useSearchParams } from "next/navigation";
import NotificationComp from "./notify";
import { useEffect } from "react";

const CreateBlog = () => {
  const searchParams = useSearchParams();
  const modalSuccess = useDisclosure();
  const modalError = useDisclosure();

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      modalSuccess.onOpen();
    } else if (searchParams.get("success") === "false") {
      modalError.onOpen();
    } else {
      modalError.onClose();
      modalSuccess.onClose();
    }
  }, [modalError, modalSuccess, searchParams]);

  return (
    <Card className="w-full">
      <NotificationComp
        isOpen={modalSuccess.isOpen}
        onOpenChange={modalSuccess.onOpenChange}
        title={"Success!"}
        content={"Blog post created successfully!"}
        redirect={"/"}
        error={false}
      />
      <NotificationComp
        isOpen={modalError.isOpen}
        onOpenChange={modalError.onOpenChange}
        title={"Error!"}
        content={"There was an error creating the blog post. Please try again."}
        redirect={"/addblogs"}
        error={true}
      />
      <CardHeader className="flex justify-center">
        <div>Add new Blog Post</div>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col items-center justify-center gap-5"
          action={CreateBlogAction}
        >
          <Input name="title" type="text" label="Title" />
          <Input name="content" type="text" label="Content" />
          <Input name="image" type="text" label="Image (direct url)" />
          <SumbitButton />
        </form>
      </CardBody>
    </Card>
  );
};

export default CreateBlog;
