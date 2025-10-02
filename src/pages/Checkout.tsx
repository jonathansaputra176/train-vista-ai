import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { CreditCard, Building, Wallet, Train, MapPin, Users, Receipt } from "lucide-react";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");

  const bookingDetails = {
    train: "Argo Bromo Anggrek",
    origin: searchParams.get("origin") || "Jakarta",
    destination: searchParams.get("destination") || "Surabaya",
    date: searchParams.get("date") || "2025-10-15",
    passengers: parseInt(searchParams.get("passengers") || "1"),
    seatClass: searchParams.get("class") || "Executive",
    seats: searchParams.get("seats") || "1A, 1B",
    basePrice: 350000,
  };

  const tax = bookingDetails.basePrice * bookingDetails.passengers * 0.1;
  const total = bookingDetails.basePrice * bookingDetails.passengers + tax;

  const handlePayment = () => {
    navigate(`/payment-confirmation?success=true&amount=${total}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Method Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-4">
                  {/* Credit/Debit Card */}
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <span>Credit / Debit Card</span>
                    </Label>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="pl-12 space-y-4">
                      <Input placeholder="Card Number" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="MM/YY" />
                        <Input placeholder="CVV" />
                      </div>
                      <Input placeholder="Cardholder Name" />
                    </div>
                  )}

                  {/* Bank Transfer */}
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Building className="h-5 w-5 text-primary" />
                      <span>Bank Transfer</span>
                    </Label>
                  </div>

                  {paymentMethod === "bank" && (
                    <div className="pl-12 space-y-2 text-sm">
                      <p className="font-semibold">Select Bank:</p>
                      <div className="space-y-2">
                        <div className="p-3 border rounded cursor-pointer hover:bg-secondary/50">
                          BCA - Virtual Account
                        </div>
                        <div className="p-3 border rounded cursor-pointer hover:bg-secondary/50">
                          Mandiri - Virtual Account
                        </div>
                        <div className="p-3 border rounded cursor-pointer hover:bg-secondary/50">
                          BNI - Virtual Account
                        </div>
                      </div>
                    </div>
                  )}

                  {/* E-Wallet */}
                  <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-secondary/50">
                    <RadioGroupItem value="ewallet" id="ewallet" />
                    <Label htmlFor="ewallet" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Wallet className="h-5 w-5 text-primary" />
                      <span>E-Wallet</span>
                    </Label>
                  </div>

                  {paymentMethod === "ewallet" && (
                    <div className="pl-12 space-y-2 text-sm">
                      <p className="font-semibold">Select E-Wallet:</p>
                      <div className="space-y-2">
                        <div className="p-3 border rounded cursor-pointer hover:bg-secondary/50">
                          GoPay
                        </div>
                        <div className="p-3 border rounded cursor-pointer hover:bg-secondary/50">
                          OVO
                        </div>
                        <div className="p-3 border rounded cursor-pointer hover:bg-secondary/50">
                          DANA
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </RadioGroup>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <Train className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Train</p>
                    <p className="font-semibold">{bookingDetails.train}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Route</p>
                    <p className="font-semibold">
                      {bookingDetails.origin} → {bookingDetails.destination}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Details</p>
                    <p className="font-semibold">
                      {bookingDetails.passengers} × {bookingDetails.seatClass}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Seats: {bookingDetails.seats}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>
                    Rp {(bookingDetails.basePrice * bookingDetails.passengers).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax & Fees</span>
                  <span>Rp {tax.toLocaleString()}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl text-accent">
                  Rp {total.toLocaleString()}
                </span>
              </div>

              <Button onClick={handlePayment} className="w-full" size="lg">
                <Receipt className="h-4 w-4 mr-2" />
                Pay Now
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
