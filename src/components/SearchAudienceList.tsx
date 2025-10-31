import React from "react";
import { Input } from "./ui/input";

export function SearchAudienceList({
  searchTerm,
  handleSearchChange,
}: {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Input
      placeholder="Search audience..."
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
}
