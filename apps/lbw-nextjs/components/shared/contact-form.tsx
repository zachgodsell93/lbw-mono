"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
type Props = {};

export default function ContactForm({}: Props) {
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [messageSent, setMessageSent] = React.useState(false);

  const handleSubmit = () => {
    axios
      .post("/api/email", {
        from: form.email,
        name: `${form.firstName} ${form.lastName}`,
        emailContent: form.message,
      })
      .then((res) => {
        if (res.status === 200) {
          setMessageSent(true);
        }
      });
  };

  return (
    <Card className="w-full max-w-md pt-4">
      {/* <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>
          Fill out the form below and well get back to you as soon as possible.
        </CardDescription>
      </CardHeader> */}
      {!messageSent ? (
        <>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter your email"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                className="min-h-[100px]"
                id="message"
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Enter your message"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="w-full">
              Send Message
            </Button>
          </CardFooter>
        </>
      ) : (
        <>
          <CardContent className="space-y-4">
            <div className="flex flex-col w-full">
              <div className="flex flex-col space-y-10 text-center">
                <span className="text-2xl font-extrabold">
                  Message sent successfully
                </span>
                <span className="font-bold">
                  We will get back to you as soon as possible
                </span>
              </div>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
