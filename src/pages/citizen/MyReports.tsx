import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle2, Clock, MapPin } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  location_name: string;
  admin_response: string;
  created_at: string;
}

export default function MyReports() {
  const { user } = useAuthStore();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('citizen_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data && !error) {
        setReports(data);
      }
      setLoading(false);
    };

    fetchReports();
  }, [user]);

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
        <h1 className="text-3xl font-bold tracking-tight">My Reports</h1>
        <p className="text-muted-foreground">Track the status of your submitted reports.</p>
      </div>

      <div className="space-y-4">
        {reports.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No reports submitted yet. Report an issue to get started!
            </CardContent>
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
                
                {report.admin_response && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-1">Admin Response:</p>
                    <p className="text-sm text-muted-foreground">{report.admin_response}</p>
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground">
                  Submitted on {format(new Date(report.created_at), 'PPP')}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}