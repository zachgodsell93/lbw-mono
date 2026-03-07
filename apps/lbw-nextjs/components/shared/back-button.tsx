"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Home } from "lucide-react";

type Props = {};

export default function BackButton({}: Props) {
  const router = useRouter();
  return (
    <div className="flex flex-row gap-x-2">
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft size={18} className="mr-2" />
        Back
      </Button>
      <Button variant="outline" onClick={() => router.push("/")}>
        <Home size={18} className="" />
      </Button>
    </div>
  );
}
