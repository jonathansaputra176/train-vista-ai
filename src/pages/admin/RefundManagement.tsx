import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const RefundManagement = () => {
  const [refunds, setRefunds] = useState([
    { id: "RF001", bookingId: "BK12345", user: "John Doe", amount: "Rp 350.000", status: "requested", date: "2025-01-15" },
    { id: "RF002", bookingId: "BK12346", user: "Jane Smith", amount: "Rp 450.000", status: "verified", date: "2025-01-14" },
    { id: "RF003", bookingId: "BK12347", user: "Bob Wilson", amount: "Rp 280.000", status: "processing_bank", date: "2025-01-13" },
    { id: "RF004", bookingId: "BK12348", user: "Alice Brown", amount: "Rp 520.000", status: "sent", date: "2025-01-12" },
  ]);

  const [selectedRefund, setSelectedRefund] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");
  const [notes, setNotes] = useState("");

  const statusColors: Record<string, string> = {
    requested: "bg-info",
    verified: "bg-primary",
    processing_bank: "bg-warning",
    sent: "bg-accent",
    completed: "bg-success",
    rejected: "bg-destructive"
  };

  const handleUpdateStatus = () => {
    if (!newStatus) {
      toast.error("Please select a status");
      return;
    }

    setRefunds(refunds.map(refund =>
      refund.id === selectedRefund.id
        ? { ...refund, status: newStatus }
        : refund
    ));

    toast.success(`Refund status updated to ${newStatus}`);
    setNewStatus("");
    setNotes("");
    setSelectedRefund(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Refund Management</h1>
        <p className="text-muted-foreground mt-2">
          Process and track refund requests
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Refund Requests</CardTitle>
          <CardDescription>Manage customer refund requests and update statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Refund ID</TableHead>
                <TableHead>Booking ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refunds.map((refund) => (
                <TableRow key={refund.id}>
                  <TableCell className="font-medium">{refund.id}</TableCell>
                  <TableCell>{refund.bookingId}</TableCell>
                  <TableCell>{refund.user}</TableCell>
                  <TableCell>{refund.amount}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[refund.status]}>
                      {refund.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{refund.date}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedRefund(refund)}
                        >
                          Update
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Refund Status</DialogTitle>
                          <DialogDescription>
                            Update the status for refund {refund.id}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>New Status</Label>
                            <Select value={newStatus} onValueChange={setNewStatus}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="requested">Requested</SelectItem>
                                <SelectItem value="verified">Verified</SelectItem>
                                <SelectItem value="processing_bank">Processing Bank</SelectItem>
                                <SelectItem value="sent">Sent</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="notes">Admin Notes</Label>
                            <Textarea
                              id="notes"
                              placeholder="Add notes about this status update..."
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleUpdateStatus}>Update Status</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RefundManagement;
