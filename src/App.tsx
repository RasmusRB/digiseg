import { useState } from "react";
import { CountrySelector } from "./components/CountrySelector";
import { PlatformSelector } from "./components/PlatformSelector";
import { AudienceList } from "./components/AudienceList";
import { Label } from "./components/ui/label";

function App() {
  // State for selected country and platform
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-6">Digiseg Audiences</h1>

          <div className="flex gap-4 items-center">
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
            {/* TODO: Add search functionality */}
          </div>
        </div>

        <div className="border-t pt-6">
          <AudienceList country={selectedCountry} platform={selectedPlatform} />
        </div>
      </div>
    </div>
  );
}

export default App;
