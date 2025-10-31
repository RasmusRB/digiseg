import { useGetAudiencesQuery } from "@/store/api/digisegApi";
import type { AudienceDatum } from "@/store/api/types";

interface AudienceListProps {
  country: string;
  platform: string;
}

export function AudienceList({ country, platform }: AudienceListProps) {
  // Fetch audiences based on selected country and platform
  const { data, isLoading, error, isFetching } = useGetAudiencesQuery(
    { country, platform },
    {
      refetchOnMountOrArgChange: true,
      skip: !country || !platform,
    }
  );

  // Combine loading states
  const isLoadingState = isLoading || isFetching;

  if (!country || !platform) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground">
          Please select a country and platform to view audiences
        </p>
      </div>
    );
  }

  // Handle loading
  if (isLoadingState) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">Loading audiences...</p>
      </div>
    );
  }

  // Handle error
  if (error) {
    return (
      <div className="rounded-lg border border-destructive p-8 text-center">
        <p className="text-destructive">Error loading audiences</p>
      </div>
    );
  }

  // Handle empty data
  if (!data?.data || data.data.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">No audiences found</p>
      </div>
    );
  }

  // Sort audiences by display name
  const sortedAudiences = data?.data
    ? [...data.data].sort((a, b) =>
        a.display_name.localeCompare(b.display_name)
      )
    : [];

  return (
    <div className="space-y-6">
      {sortedAudiences.map((taxonomy: AudienceDatum) => {
        const sortedCategories = [...taxonomy.categories].sort((a, b) =>
          a.display_name.localeCompare(b.display_name)
        );

        return (
          <div key={taxonomy.code} className="space-y-4">
            <div className="border-b pb-2">
              <h2 className="text-lg font-semibold">{taxonomy.display_name}</h2>
              <p className="text-sm text-muted-foreground">
                Code: {taxonomy.code}
              </p>
            </div>

            {sortedCategories.map((category) => {
              const sortedCategoryAudiences = [...category.audiences].sort(
                (a, b) => a.display_name.localeCompare(b.display_name)
              );

              return (
                <div key={category.code} className="ml-4 space-y-2">
                  <h3 className="font-medium text-sm">
                    {category.display_name}
                  </h3>

                  <div className="ml-4 space-y-1">
                    {sortedCategoryAudiences.map((audience) => (
                      <div
                        key={audience.code}
                        className="rounded-md border bg-card p-3 text-sm"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-1">
                            <p className="font-medium">
                              {audience.display_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Code: {audience.code}
                            </p>
                            {audience.description && (
                              <p className="text-xs text-muted-foreground">
                                {audience.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
