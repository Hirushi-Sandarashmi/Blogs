"use client";
import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending} disabled={pending}>
      Login
    </Button>
  );
};

export default LoginButton;
