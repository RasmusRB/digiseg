import { useGetPlatformsQuery } from "@/store/api/digisegApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlatformSelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

export function PlatformSelector({
  value,
  onValueChange,
  placeholder = "Select a platform",
}: PlatformSelectorProps) {
  const { data, isLoading, error, isFetching } = useGetPlatformsQuery(
    undefined,
    { refetchOnMountOrArgChange: true }
  );

  // Combine loading states
  const isLoadingState = isLoading || isFetching;

  // Handle loading state
  if (isLoadingState) {
    return (
      <Select disabled>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Loading platforms..." />
        </SelectTrigger>
      </Select>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Select disabled>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Error loading platforms" />
        </SelectTrigger>
      </Select>
    );
  }

  // Sort platforms by display name
  const sortedPlatforms = data?.data
    ? [...data.data].sort((a, b) =>
        a.display_name.localeCompare(b.display_name)
      )
    : [];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-60">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {sortedPlatforms.map((platform) => (
          <SelectItem key={platform.code} value={platform.code}>
            {platform.display_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
