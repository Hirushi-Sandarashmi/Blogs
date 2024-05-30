"use client";
import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

const SumbitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      color="primary"
      isLoading={pending}
      disabled={pending}
    >
      Create
    </Button>
  );
};

export default SumbitButton;
