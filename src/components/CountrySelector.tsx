import { useGetCountriesQuery } from "@/store/api/digisegApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CountrySelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

export function CountrySelector({
  value,
  onValueChange,
  placeholder = "Select a country",
}: CountrySelectorProps) {
  // Fetch countries from the API
  const { data, isLoading, error, isFetching } = useGetCountriesQuery(
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
          <SelectValue placeholder="Loading countries..." />
        </SelectTrigger>
      </Select>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Select disabled>
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Error loading countries" />
        </SelectTrigger>
      </Select>
    );
  }

  // Sort countries by display name
  const sortedCountries = data?.data
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
        {sortedCountries.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            {country.display_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
