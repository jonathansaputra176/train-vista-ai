import Navbar from "@/components/Navbar";
import RefundProgressBar from "@/components/RefundProgressBar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Train, Calendar, MapPin, Users, DollarSign, FileText, Download, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MyOrders = () => {
  const { toast } = useToast();

  const handleDownloadTicket = () => {
    toast({
      title: "Download Started",
      description: "Your e-ticket is being downloaded.",
    });
  };

  const handleViewQR = () => {
    toast({
      title: "QR Code",
      description: "Scan this QR code at the station.",
    });
  };

  // Mock orders data
  const orders = [
    {
      id: "TRX001",
      train: "Argo Bromo Anggrek",
      origin: "Jakarta",
      destination: "Surabaya",
      date: "2025-10-20",
      time: "08:00",
      passengers: 2,
      status: "confirmed",
      price: 700000,
      refundStatus: null,
    },
    {
      id: "TRX002",
      train: "Bima",
      origin: "Yogyakarta",
      destination: "Jakarta",
      date: "2025-09-15",
      time: "10:30",
      passengers: 1,
      status: "completed",
      price: 320000,
      refundStatus: "processing_bank",
    },
    {
      id: "TRX003",
      train: "Turangga",
      origin: "Bandung",
      destination: "Surabaya",
      date: "2025-08-10",
      time: "14:00",
      passengers: 3,
      status: "cancelled",
      price: 750000,
      refundStatus: "completed",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-success">Confirmed</Badge>;
      case "completed":
        return <Badge className="bg-info">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">View and manage your train bookings</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{order.train}</h3>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleViewQR}>
                    <QrCode className="h-4 w-4 mr-2" />
                    QR Code
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownloadTicket}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Route</p>
                    <p className="font-semibold">
                      {order.origin} → {order.destination}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date & Time</p>
                    <p className="font-semibold">
                      {new Date(order.date).toLocaleDateString()} {order.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Passengers</p>
                    <p className="font-semibold">{order.passengers}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Total Price</p>
                    <p className="font-semibold text-accent">Rp {order.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {order.refundStatus && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <h4 className="font-semibold mb-4">Refund Status</h4>
                    <RefundProgressBar currentStatus={order.refundStatus as any} />
                  </div>
                </>
              )}

              {order.status === "confirmed" && (
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1">
                    Modify Booking
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    Cancel & Request Refund
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
