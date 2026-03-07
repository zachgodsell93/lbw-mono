"use client";
import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  CreditCard,
  UserX,
  Edit,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, useAdmin } from "@/providers/admin-provider";
import { cn } from "@/lib/utils";
import moment from "moment";
import { on } from "events";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

type Props = {};

export default function UsersTable({}: Props) {
  const { userInformation, handleDeactivate } = useAdmin();
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 10;

  useEffect(() => {
    if (userInformation) {
      const filtered = userInformation.filter((user) =>
        `${user.first_name} ${user.last_name} ${user.email}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
      setCurrentPage(1);
    }
  }, [userInformation, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const packageReference: { [key: string]: string } = {
    "0": "No Package",
    "1": "Members/Starter",
    "2": "Members/Pro",
    "3": "Captains Lounge",
    "4": "Free",
    "5": "Premium",
  };

  if (!userInformation) return <></>;
  return (
    <Card className="max-sm:mx-4 min-w-full max-sm:w-screen ">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Users</CardTitle>
            <CardDescription>All user information below</CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">
            Showing <strong>{(currentPage - 1) * rowsPerPage + 1}</strong> to{" "}
            <strong>
              {Math.min(currentPage * rowsPerPage, filteredUsers.length)}
            </strong>{" "}
            of <strong>{filteredUsers.length}</strong> users
          </div>
        </div>

        <TableControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredUsers={filteredUsers}
          setFilteredUsers={setFilteredUsers}
          userInformation={userInformation}
          packageReference={packageReference}
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead className="">Account Details</TableHead>

              {/* <TableHead className="">Active</TableHead> */}
              <TableHead className="">Staking</TableHead>
              <TableHead className="">Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className=" flex flex-col gap-y-2">
                      <Badge
                        className={cn(
                          "rounded-md text-white border-blue-500 bg-blue-500/20",
                          user.tbb4_package === 2
                            ? " border-gray-500 bg-gray-500/20"
                            : user.tbb4_package === 3
                            ? "bg-yellow-600/20 border- border-yellow-600"
                            : ""
                        )}
                      >
                        {packageReference[user.tbb4_package?.toString() || "0"]}
                      </Badge>
                      <div>{user.email}</div>
                      <div className="text-md text-muted-foreground">
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="text-md text-muted-foreground">
                        {user.banned_until ? (
                          <Badge className="rounded-md text-white border-red-500 bg-red-500/20">
                            Banned
                          </Badge>
                        ) : (
                          <Badge className="rounded-md text-white border-green-500 bg-green-500/20">
                            Not Banned
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className=" flex flex-col gap-y-2">
                      {/* <div>
                        Last Login:{" "}
                        {moment(user.last_sign_in_at).format("DD MMM YYYY")}
                      </div> */}

                      {moment(user.token_last_refresh) >
                        moment().subtract(1, "day") &&
                        user.betfair_access_token && (
                          <Badge className="rounded-md text-white border-purple-500 bg-purple-500/20">
                            Betfair
                          </Badge>
                        )}
                      <Badge
                        className={cn(
                          "border text-primary rounded-md",
                          user.tbb4_bot === true
                            ? "border-green-500 bg-green-500/20"
                            : "border-red-500 bg-red-500/20"
                        )}
                      >
                        {user.tbb4_bot ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className=" flex flex-col gap-y-2">
                      <div>
                        <span className="font-bold">Stake:</span> $
                        {user.tbb4_stake_size?.toFixed(2)}
                      </div>
                      <div>
                        <span className="font-bold">Take Profit: </span>
                        {(user.tbb4_take_profit || 0) /
                          (user.tbb4_stake_size || 0)}
                        <span> Units</span>
                      </div>
                      <div>
                        <span className="font-bold">Stop Loss: </span>
                        {(user.tbb4_stop_loss || 0) /
                          (user.tbb4_stake_size || 0)}
                        <span> Units</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <UserMenu user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{(currentPage - 1) * rowsPerPage + 1}</strong> to{" "}
          <strong>
            {Math.min(currentPage * rowsPerPage, filteredUsers.length)}
          </strong>{" "}
          of <strong>{filteredUsers.length}</strong> users
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

const TableControls = ({
  searchTerm,
  setSearchTerm,
  filteredUsers,
  setFilteredUsers,
  userInformation,
  packageReference,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredUsers: User[];
  setFilteredUsers: React.Dispatch<React.SetStateAction<User[]>>;
  userInformation: User[] | null;
  packageReference: { [key: string]: string };
}) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [packageFilter, setPackageFilter] = useState<string | null>(null);

  const applyFilters = () => {
    if (!userInformation) return;

    let filtered = userInformation.filter((user) =>
      `${user.first_name} ${user.last_name} ${user.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    if (activeFilter) {
      filtered = filtered.filter((user) =>
        activeFilter === "active" ? user.tbb4_bot : !user.tbb4_bot
      );
    }

    if (packageFilter) {
      filtered = filtered.filter(
        (user) => user.tbb4_package?.toString() === packageFilter
      );
    }

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, activeFilter, packageFilter, userInformation]);

  const clearFilters = () => {
    setActiveFilter(null);
    setPackageFilter(null);
    setSearchTerm("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-x-4 items-center">
        <Input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Active Status
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={activeFilter === "active"}
              onCheckedChange={() =>
                setActiveFilter(activeFilter === "active" ? null : "active")
              }
            >
              Active
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilter === "inactive"}
              onCheckedChange={() =>
                setActiveFilter(activeFilter === "inactive" ? null : "inactive")
              }
            >
              Inactive
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Package
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.entries(packageReference).map(([key, value]) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={packageFilter === key}
                onCheckedChange={() =>
                  setPackageFilter(packageFilter === key ? null : key)
                }
              >
                {value}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {(activeFilter || packageFilter || searchTerm) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium">Active Filters:</span>
          {activeFilter && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {activeFilter === "active" ? "Active" : "Inactive"}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setActiveFilter(null)}
              />
            </Badge>
          )}
          {packageFilter && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {packageReference[packageFilter]}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setPackageFilter(null)}
              />
            </Badge>
          )}
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {searchTerm}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSearchTerm("")}
              />
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="ml-2"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

const UserMenu = ({ user }: { user: User }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  return (
    <div className="flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8">
            <span className="">Options</span>
            {/* <MoreHorizontal className="h-4 w-4" /> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit User</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Apply Credit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600"
            onSelect={() => setIsDeactivateDialogOpen(true)}
          >
            <UserX className="mr-2 h-4 w-4" />
            <span>Deactivate User</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <EditUserContent selectedUser={user} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={isDeactivateDialogOpen}
        onOpenChange={setIsDeactivateDialogOpen}
      >
        <DialogContent>
          <DeactivateUserContent selectedUser={user} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const EditUserContent = ({ selectedUser }: { selectedUser: User | null }) => {
  const [user, setUser] = React.useState<User | null>(selectedUser);

  const packages = [
    {
      id: 1,
      name: "Members/Starter",
    },
    {
      id: 2,
      name: "Members/Pro",
    },
    {
      id: 3,
      name: "Captains Lounge",
    },
    {
      id: 4,
      name: "Free",
    },
    {
      id: 5,
      name: "Premium",
    },
  ];

  const { updateStaking } = useAdmin();
  const saveHandler = async () => {
    if (!user) return;
    if (!user.us_id) return;
    if (!user.tbb4_stake_size) return;
    if (!user.tbb4_stop_loss) return;
    if (!user.tbb4_take_profit) return;
    if (!user.tbb4_package) return;
    await updateStaking(
      user.us_id,
      user.tbb4_package,
      user.tbb4_stake_size,
      user.tbb4_stop_loss,
      user.tbb4_take_profit
    );
    window.location.reload();
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit User</DialogTitle>
        <DialogDescription>Editing {selectedUser?.email}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Package
          </Label>

          <Select
            defaultValue={user?.tbb4_package?.toString() || "0"}
            value={user?.tbb4_package?.toString() || "0"}
            onValueChange={(value) => {
              if (user) setUser({ ...user, tbb4_package: parseInt(value) });
            }}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              {packages.map((item) => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Stake
          </Label>
          <Input
            type="number"
            onChange={(e) => {
              if (user)
                setUser({
                  ...user,
                  tbb4_stake_size: parseFloat(e.target.value),
                });
            }}
            defaultValue={user?.tbb4_stake_size?.toString() || "0"}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Take Profit
          </Label>
          <Input
            type="number"
            defaultValue={user?.tbb4_take_profit?.toString() || "0"}
            className="col-span-3"
            onChange={(e) => {
              if (user)
                setUser({
                  ...user,
                  tbb4_take_profit: parseFloat(e.target.value),
                });
            }}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Stop Loss
          </Label>
          <Input
            type="number"
            defaultValue={user?.tbb4_stop_loss?.toString() || "0"}
            className="col-span-3"
            onChange={(e) => {
              if (user)
                setUser({
                  ...user,
                  tbb4_stop_loss: parseFloat(e.target.value),
                });
            }}
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={async () => await saveHandler()} type="submit">
          Save changes
        </Button>
      </DialogFooter>
    </>
  );
};

const DeactivateUserContent = ({
  selectedUser,
}: {
  selectedUser: User | null;
}) => {
  const [deactivationStatus, setDeactivationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const deactivateUser = async () => {
    console.log("Deactivating user", selectedUser);
    try {
      const deac = await axios.post("/api/users/deactivate-user", {
        userId: selectedUser?.auth_id,
        settingsId: selectedUser?.us_id,
      });
      if (deac.status === 200) {
        console.log("User deactivated");
        setDeactivationStatus("success");
      } else {
        console.log("User not deactivated");
        setDeactivationStatus("error");
      }
    } catch (error) {
      console.error("Error deactivating user:", error);
      setDeactivationStatus("error");
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Deactivate User</DialogTitle>
        <DialogDescription>
          Deactivating {selectedUser?.email}
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        {deactivationStatus === "success" && (
          <div className="text-green-600 font-semibold mb-4">
            User successfully deactivated.
          </div>
        )}
        {deactivationStatus === "error" && (
          <div className="text-red-600 font-semibold mb-4">
            Failed to deactivate user. Please try again.
          </div>
        )}
      </div>
      <DialogFooter>
        <Button
          onClick={deactivateUser}
          type="submit"
          disabled={deactivationStatus === "success"}
        >
          {deactivationStatus === "success" ? "Deactivated" : "Deactivate User"}
        </Button>
      </DialogFooter>
    </>
  );
};
