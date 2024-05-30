import { loginAction } from "#/actions/loginAction";
import { auth, signIn } from "#/auth";
import LoginButton from "#/components/auth/login";
import LoginError from "#/components/auth/loginError";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  button,
} from "@nextui-org/react";
import Link from "next/link";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <Card className="w-full max-w-96">
      <CardHeader className="flex justify-center">
        <div>Login to your account</div>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col items-center justify-center gap-5"
          action={loginAction}
        >
          <Input name="email" type="text" label="Email" />
          <Input name="password" type="password" label="Password" />
          <LoginButton />
        </form>
        <LoginError />
      </CardBody>
      <CardFooter className="text-white/50 text-sm">
        or create new account&nbsp;{" "}
        <Link href="/signup" className="text-primary-400">
          signup
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
