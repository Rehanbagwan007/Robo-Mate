import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Calendar, MapPin, Users, Sparkles, Heart } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  activity_type: string;
  location: string;
  scheduled_date: string;
  max_volunteers: number;
  current_volunteers: number;
  status: string;
}

export default function Volunteer() {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      // Fetch activities
      const { data: activitiesData } = await supabase
        .from('volunteer_activities')
        .select('*')
        .eq('status', 'open')
        .order('scheduled_date', { ascending: true });

      // Fetch user's registrations
      const { data: registrationsData } = await supabase
        .from('volunteer_registrations')
        .select('activity_id')
        .eq('user_id', user.id);

      if (activitiesData) setActivities(activitiesData);
      if (registrationsData) setRegisteredIds(registrationsData.map((r) => r.activity_id));
      setLoading(false);
    };

    fetchData();
  }, [user]);

  const handleRegister = async (activityId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase.from('volunteer_registrations').insert({
        activity_id: activityId,
        user_id: user.id,
      });

      if (error) throw error;

      setRegisteredIds([...registeredIds, activityId]);
      toast({
        title: 'Registration successful!',
        description: 'Thank you for volunteering. You will receive updates soon.',
      });
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleUnregister = async (activityId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('volunteer_registrations')
        .delete()
        .eq('activity_id', activityId)
        .eq('user_id', user.id);

      if (error) throw error;

      setRegisteredIds(registeredIds.filter((id) => id !== activityId));
      toast({
        title: 'Unregistered successfully',
        description: 'You have been removed from this activity.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getActivityIcon = (type: string) => {
    const icons: Record<string, any> = {
      cleanup: Sparkles,
      awareness: Heart,
      plantation: Users,
      survey: Calendar,
    };
    const Icon = icons[type] || Users;
    return <Icon className="h-5 w-5" />;
  };

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Volunteer Opportunities</h1>
        <p className="text-muted-foreground">Join community activities and make a difference!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activities.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-6 text-center text-muted-foreground">
              No volunteer activities available at the moment. Check back soon!
            </CardContent>
          </Card>
        ) : (
          activities.map((activity) => {
            const isRegistered = registeredIds.includes(activity.id);
            const isFull = activity.current_volunteers >= activity.max_volunteers;

            return (
              <Card key={activity.id} className="flex flex-col hover:border-primary/40 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {getActivityIcon(activity.activity_type)}
                    <Badge variant="outline" className="capitalize">
                      {activity.activity_type}
                    </Badge>
                  </div>
                  <CardTitle>{activity.title}</CardTitle>
                  <CardDescription>{activity.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(activity.scheduled_date), 'PPP')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>
                      {activity.current_volunteers} / {activity.max_volunteers} volunteers
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  {isRegistered ? (
                    <Button variant="outline" onClick={() => handleUnregister(activity.id)} className="w-full">
                      Unregister
                    </Button>
                  ) : (
                    <Button onClick={() => handleRegister(activity.id)} disabled={isFull} className="w-full">
                      {isFull ? 'Full' : 'Register'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}