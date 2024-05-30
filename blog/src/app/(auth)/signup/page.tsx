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

const SignUpPage = () => {
  return (
    <div>
      <Card className="w-[500px]">
        <CardHeader className="flex justify-center">
          <div>Regsister to blogger</div>
        </CardHeader>
        <CardBody>
          <form
            className="flex flex-col items-center justify-center gap-5"
            action={async (formData) => {
              "use server";
              const jsonData = Object.fromEntries(formData);
              const apiurl =
                process.env.API_URL || "http://127.0.0.1:8000/api/";

              const raw = JSON.stringify({
                name: jsonData.name,
                email: jsonData.email,
                password: jsonData.password,
                password_confirmation: jsonData.password_confirmation,
              });

              const requestOptions = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: raw,
              };

              const res = await fetch(apiurl + "register", requestOptions);
              if (res.ok) {
                const data = await res.json();
                redirect("/login");
              } else {
                console.error("error");
                console.error(await res.json());
              }
            }}
          >
            <Input name="name" type="text" label="Name" />
            <Input name="email" type="text" label="Email" />
            <Input name="password" type="password" label="Password" />
            <Input
              name="password_confirmation"
              type="password"
              label="Password Confirmation"
            />
            <Button type="submit" color="primary">
              Register
            </Button>
          </form>
        </CardBody>
        <CardFooter className="text-white/50 text-sm">
          or already have a account?&nbsp;{" "}
          <Link href="/login" className="text-primary-400">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
