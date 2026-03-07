/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Loader2 } from "lucide-react";

export default function ConfirmEmail() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isButtonDisabled && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    }

    if (countdown === 0) {
      setIsButtonDisabled(false);
      setCountdown(120);
    }

    return () => clearInterval(timer);
  }, [isButtonDisabled, countdown]);

  const handleResendEmail = async () => {
    setButtonClicked(true);
    try {
      const res = await axios.post("/api/resend-confirmation-email", {
        email: sessionStorage.getItem("newEmail"),
      });
      console.log("Resending confirmation email...");
      if (res.status === 200) {
        setIsButtonDisabled(true);
        setResendSuccess(true);
        setResendError(false);
        setButtonClicked(false);
      }
    } catch (error) {
      console.error("Error resending email:", error);
      setResendError(true);
      setResendSuccess(false);
      setButtonClicked(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl text-primary font-bold mb-4">
          Thank You for Signing Up!
        </h1>
        <p className="mb-6">
          A confirmation email has been sent to your email address. Please check
          your inbox and follow the instructions to complete your registration.
        </p>
        {resendSuccess && (
          <p className="text-sm text-green-600 mb-4">
            Email sent successfully! If you don't see the email, please check
            your spam folder.
          </p>
        )}
        {resendError && (
          <p className="text-sm text-red-600 mb-4">
            An error occurred while sending the email. Please try again later.
          </p>
        )}
        <Button
          onClick={handleResendEmail}
          disabled={isButtonDisabled}
          className="w-full mb-4"
        >
          {isButtonDisabled ? (
            `Resend in ${countdown}s`
          ) : buttonClicked ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            "Resend Confirmation Email"
          )}
        </Button>
      </Card>
    </div>
  );
}
