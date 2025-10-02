import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Train, Clock, ArrowRight, Users, DollarSign, MapPin, SlidersHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const origin = searchParams.get("origin") || "Jakarta";
  const destination = searchParams.get("destination") || "Surabaya";
  const date = searchParams.get("date") || "2025-10-15";
  const passengers = searchParams.get("passengers") || "1";

  const [trainClass, setTrainClass] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 500000]);

  // Mock train data
  const trains = [
    {
      id: 1,
      name: "Argo Bromo Anggrek",
      type: "Executive",
      departure: "08:00",
      arrival: "16:30",
      duration: "8h 30m",
      price: 350000,
      seats: 24,
      isRecommended: true,
    },
    {
      id: 2,
      name: "Bima",
      type: "Executive",
      departure: "10:30",
      arrival: "19:00",
      duration: "8h 30m",
      price: 320000,
      seats: 18,
      isRecommended: false,
    },
    {
      id: 3,
      name: "Turangga",
      type: "Business",
      departure: "14:00",
      arrival: "22:30",
      duration: "8h 30m",
      price: 250000,
      seats: 32,
      isRecommended: false,
    },
  ];

  // Filter trains based on class and price
  const filteredTrains = trains.filter((train) => {
    const classMatch = trainClass === "all" || train.type === trainClass;
    const priceMatch = train.price >= priceRange[0] && train.price <= priceRange[1];
    return classMatch && priceMatch;
  });

  // Mock alternative routes
  const alternativeRoutes = [
    {
      route: `${origin} → Semarang → ${destination}`,
      trains: ["Argo Muria", "Mutiara Selatan"],
      totalDuration: "10h 15m",
      transfers: 1,
      estimatedPrice: 280000,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Search Summary */}
        <Card className="p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-semibold">{origin}</span>
              <ArrowRight className="h-4 w-4" />
              <span className="font-semibold">{destination}</span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>{new Date(date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>{passengers} {parseInt(passengers) === 1 ? "passenger" : "passengers"}</span>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">Filters</h2>
              </div>

              <div className="space-y-6">
                {/* Train Class Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Train Class</Label>
                  <Select value={trainClass} onValueChange={setTrainClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Classes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="Executive">Executive</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Economy">Economy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Price Range Filter */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Price Range</Label>
                  <div className="pt-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={500000}
                      step={10000}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Rp {priceRange[0].toLocaleString()}</span>
                      <span>Rp {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setTrainClass("all");
                    setPriceRange([0, 500000]);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Results */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Available Trains</h2>
              <p className="text-sm text-muted-foreground">
                {filteredTrains.length} train{filteredTrains.length !== 1 ? "s" : ""} found
              </p>
            </div>
            {filteredTrains.map((train) => (
              <Card key={train.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Train className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{train.name}</h3>
                      <p className="text-sm text-muted-foreground">{train.type} Class</p>
                    </div>
                  </div>
                  {train.isRecommended && (
                    <Badge className="bg-success text-success-foreground">Recommended</Badge>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Departure</p>
                    <p className="text-xl font-bold">{train.departure}</p>
                    <p className="text-xs text-muted-foreground">{origin}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <div className="flex items-center justify-center gap-2 my-1">
                      <div className="h-1 flex-1 bg-primary/20 rounded" />
                      <Clock className="h-4 w-4 text-primary" />
                      <div className="h-1 flex-1 bg-primary/20 rounded" />
                    </div>
                    <p className="text-sm font-semibold">{train.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Arrival</p>
                    <p className="text-xl font-bold">{train.arrival}</p>
                    <p className="text-xs text-muted-foreground">{destination}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-2xl font-bold text-accent">
                        Rp {train.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{train.seats} seats left</span>
                    </div>
                  </div>
                  <Link to={`/booking?train=${train.id}&origin=${origin}&destination=${destination}&date=${date}&passengers=${passengers}`}>
                    <Button variant="hero">Book Now</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {/* Alternative Routes Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Alternative Routes</h3>
              {alternativeRoutes.map((alt, index) => (
                <div key={index} className="space-y-3">
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <p className="font-semibold text-sm mb-2">{alt.route}</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>Trains: {alt.trains.join(" + ")}</p>
                      <p>Total Time: {alt.totalDuration}</p>
                      <p>Transfers: {alt.transfers}</p>
                      <p className="text-accent font-semibold">
                        Est. Price: Rp {alt.estimatedPrice.toLocaleString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-4">
                Alternative routes may save you time or money. Explore options above!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
