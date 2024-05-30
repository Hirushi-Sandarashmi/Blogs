"use client";

import { useSearchParams } from "next/navigation";

const LoginError = () => {
  const searchParams = useSearchParams();
  return (
    <div className="w-full text-center">
      {searchParams.get("error") && (
        <div className="text-red-500/50 pt-5 text-xs">
          Invalid login credentials
        </div>
      )}
    </div>
  );
};

export default LoginError;
