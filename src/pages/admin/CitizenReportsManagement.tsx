import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle2, Clock, MapPin, MessageSquare } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  location_name: string;
  location_lat: number;
  location_lng: number;
  admin_response: string;
  created_at: string;
  user_id: string;
}

export default function CitizenReportsManagement() {
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [response, setResponse] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('citizen_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      setReports(data);
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    if (!selectedReport) return;

    try {
      const updates: any = {};
      if (newStatus) updates.status = newStatus;
      if (newPriority) updates.priority = newPriority;
      if (response) updates.admin_response = response;

      const { error } = await supabase
        .from('citizen_reports')
        .update(updates)
        .eq('id', selectedReport.id);

      if (error) throw error;

      toast({
        title: 'Report updated successfully',
        description: 'The citizen will be notified of your response.',
      });

      fetchReports();
      setSelectedReport(null);
      setResponse('');
      setNewStatus('');
      setNewPriority('');
    } catch (error: any) {
      toast({
        title: 'Error updating report',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'outline',
      in_progress: 'default',
      resolved: 'secondary',
    };
    return <Badge variant={variants[status] || 'outline'}>{status.replace('_', ' ')}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'bg-green-500/10 text-green-500',
      medium: 'bg-yellow-500/10 text-yellow-500',
      high: 'bg-orange-500/10 text-orange-500',
      critical: 'bg-red-500/10 text-red-500',
    };
    return <Badge className={colors[priority] || ''}>{priority}</Badge>;
  };

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Citizen Reports Management</h1>
        <p className="text-muted-foreground">Review and respond to citizen-submitted reports.</p>
      </div>

      <div className="space-y-4">
        {reports.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">No reports submitted yet.</CardContent>
          </Card>
        ) : (
          reports.map((report) => (
            <Card key={report.id} className="hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(report.status)}
                    <div>
                      <CardTitle className="text-xl">{report.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <span className="capitalize">{report.category}</span>
                        {report.location_name && (
                          <>
                            <span>•</span>
                            <MapPin className="h-3 w-3" />
                            <span>{report.location_name}</span>
                          </>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {getStatusBadge(report.status)}
                    {getPriorityBadge(report.priority)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{report.description}</p>

                {report.location_lat && report.location_lng && (
                  <div className="text-xs text-muted-foreground">
                    Location: {report.location_lat.toFixed(6)}, {report.location_lng.toFixed(6)}
                  </div>
                )}

                {report.admin_response && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-1">Your Response:</p>
                    <p className="text-sm text-muted-foreground">{report.admin_response}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Submitted on {format(new Date(report.created_at), 'PPP')}
                  </p>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedReport(report);
                          setNewStatus(report.status);
                          setNewPriority(report.priority);
                          setResponse(report.admin_response || '');
                        }}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Respond
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Manage Report</DialogTitle>
                        <DialogDescription>Update status, priority, and respond to the citizen.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Status</label>
                          <Select value={newStatus} onValueChange={setNewStatus}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Priority</label>
                          <Select value={newPriority} onValueChange={setNewPriority}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Admin Response</label>
                          <Textarea
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            placeholder="Provide feedback or updates to the citizen..."
                            rows={5}
                          />
                        </div>

                        <Button onClick={handleUpdate} className="w-full">
                          Update Report
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}