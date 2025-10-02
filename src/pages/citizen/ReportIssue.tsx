import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Camera, Send } from 'lucide-react';

export default function ReportIssue() {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location_name: '',
    location_lat: '',
    location_lng: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('citizen_reports').insert({
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location_name: formData.location_name,
        location_lat: formData.location_lat ? parseFloat(formData.location_lat) : null,
        location_lng: formData.location_lng ? parseFloat(formData.location_lng) : null,
      });

      if (error) throw error;

      toast({
        title: 'Report submitted successfully',
        description: 'Our team will review your report soon.',
      });

      setFormData({
        title: '',
        description: '',
        category: '',
        location_name: '',
        location_lat: '',
        location_lng: '',
      });
    } catch (error: any) {
      toast({
        title: 'Error submitting report',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            location_lat: position.coords.latitude.toString(),
            location_lng: position.coords.longitude.toString(),
          });
          toast({
            title: 'Location captured',
            description: 'Your current location has been added to the report.',
          });
        },
        (error) => {
          toast({
            title: 'Error getting location',
            description: 'Please enable location services or enter manually.',
            variant: 'destructive',
          });
        }
      );
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Report an Issue</h1>
        <p className="text-muted-foreground">Help us keep our river clean and safe by reporting issues you encounter.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit Your Report</CardTitle>
          <CardDescription>Provide detailed information about the issue you've observed.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Issue Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pollution">Water Pollution</SelectItem>
                  <SelectItem value="waste">Floating Waste</SelectItem>
                  <SelectItem value="safety">Safety Concern</SelectItem>
                  <SelectItem value="wildlife">Wildlife Issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Provide detailed information about what you observed..."
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location Name</Label>
              <Input
                id="location"
                value={formData.location_name}
                onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
                placeholder="e.g., Near Bridge XYZ"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lat">Latitude</Label>
                <Input
                  id="lat"
                  type="number"
                  step="any"
                  value={formData.location_lat}
                  onChange={(e) => setFormData({ ...formData, location_lat: e.target.value })}
                  placeholder="0.000000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lng">Longitude</Label>
                <Input
                  id="lng"
                  type="number"
                  step="any"
                  value={formData.location_lng}
                  onChange={(e) => setFormData({ ...formData, location_lng: e.target.value })}
                  placeholder="0.000000"
                />
              </div>
            </div>

            <Button type="button" variant="outline" onClick={getCurrentLocation} className="w-full">
              <MapPin className="h-4 w-4 mr-2" />
              Use Current Location
            </Button>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                {loading ? 'Submitting...' : 'Submit Report'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}