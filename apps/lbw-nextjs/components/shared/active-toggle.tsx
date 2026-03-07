import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useUser } from "../../providers/user-provider";
import { cn } from "@/lib/utils";

type Props = {};

export default function ActiveToggle({}: Props) {
  const [active, setActive] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { user } = useUser();
  useEffect(() => {}, [user]);
  return (
    <Button
      variant="outline"
      onClick={() => setLoading(true)}
      className={cn(
        "hidden md:block",
        user?.tbb4_bot === true
          ? "bg-green-700 hover:bg-red-500"
          : "bg-red-500 hover:bg-green-700"
      )}
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <span className="">
          {user?.tbb4_bot === true ? "Active" : "Inactive"}
        </span>
      )}
    </Button>
  );
}
