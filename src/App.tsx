import { useState } from "react";
import { CountrySelector } from "./components/CountrySelector";
import { PlatformSelector } from "./components/PlatformSelector";
import { AudienceList } from "./components/AudienceList";
import { Label } from "./components/ui/label";
import { SearchAudienceList } from "./components/SearchAudienceList";

function App() {
  // State for selected country and platform
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-6">Digiseg Audiences</h1>

          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Country</Label>
              <CountrySelector
                value={selectedCountry}
                onValueChange={setSelectedCountry}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Platform</Label>
              <PlatformSelector
                value={selectedPlatform}
                onValueChange={setSelectedPlatform}
              />
            </div>
            <div className="space-y-2 md:flex-1">
              <Label className="text-sm font-medium">Search Audience</Label>
              <SearchAudienceList
                searchTerm={searchTerm}
                handleSearchChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <AudienceList
            country={selectedCountry}
            platform={selectedPlatform}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
