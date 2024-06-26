// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";

const UiProvider = ({ children }: { children: React.ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default UiProvider;
