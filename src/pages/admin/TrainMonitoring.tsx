import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import { Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const TrainMonitoring = () => {
  const [trains, setTrains] = useState([
    { id: "TR001", name: "Argo Bromo", route: "Jakarta - Surabaya", status: "on-time", eta: "14:30", currentStation: "Semarang" },
    { id: "TR002", name: "Bima Express", route: "Jakarta - Yogyakarta", status: "delayed", eta: "15:45", currentStation: "Cirebon", delay: 30 },
    { id: "TR003", name: "Gajayana", route: "Jakarta - Malang", status: "on-time", eta: "16:20", currentStation: "Surabaya" },
    { id: "TR004", name: "Argo Parahyangan", route: "Jakarta - Bandung", status: "on-time", eta: "13:15", currentStation: "Purwakarta" },
  ]);

  const [selectedTrain, setSelectedTrain] = useState<any>(null);
  const [delayMinutes, setDelayMinutes] = useState("");
  const [delayNotes, setDelayNotes] = useState("");

  const handleUpdateDelay = () => {
    if (!delayMinutes || !selectedTrain) {
      toast.error("Please enter delay duration");
      return;
    }

    setTrains(trains.map(train => 
      train.id === selectedTrain.id 
        ? { ...train, status: "delayed", delay: parseInt(delayMinutes) }
        : train
    ));

    toast.success(`Delay updated for ${selectedTrain.name}`);
    setDelayMinutes("");
    setDelayNotes("");
    setSelectedTrain(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Train Monitoring</h1>
        <p className="text-muted-foreground mt-2">
          Real-time tracking and status updates for all trains
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Trains</CardTitle>
          <CardDescription>Live status of all trains in operation</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Train ID</TableHead>
                <TableHead>Train Name</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Current Station</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trains.map((train) => (
                <TableRow key={train.id}>
                  <TableCell className="font-medium">{train.id}</TableCell>
                  <TableCell>{train.name}</TableCell>
                  <TableCell>{train.route}</TableCell>
                  <TableCell>{train.currentStation}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {train.eta}
                  </TableCell>
                  <TableCell>
                    {train.status === "on-time" ? (
                      <Badge variant="default" className="bg-success">On Time</Badge>
                    ) : (
                      <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                        <AlertCircle className="h-3 w-3" />
                        Delayed {train.delay}min
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedTrain(train)}
                        >
                          Update Status
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Train Status</DialogTitle>
                          <DialogDescription>
                            Update delay information for {train.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="delay">Delay Duration (minutes)</Label>
                            <Input
                              id="delay"
                              type="number"
                              placeholder="Enter delay in minutes"
                              value={delayMinutes}
                              onChange={(e) => setDelayMinutes(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                              id="notes"
                              placeholder="Reason for delay..."
                              value={delayNotes}
                              onChange={(e) => setDelayNotes(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleUpdateDelay}>Update Status</Button>
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

export default TrainMonitoring;
