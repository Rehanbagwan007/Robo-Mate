import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAlertStore } from '@/store/useAlertStore';
import { MapPin, Send } from 'lucide-react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function ReportIssue() {
  const { toast } = useToast();
  const { addAlert } = useAlertStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location_name: '',
    location_lat: '',
    location_lng: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newAlert = {
      id: Date.now(),
      ...formData,
    };

    addAlert(newAlert);

    toast({
      title: 'Report submitted successfully',
      description: 'Your report has been added to the list.',
    });

    // Optionally close the dialog by calling a prop function
    // For now, just clear the form
    setFormData({
      title: '',
      description: '',
      category: '',
      location_name: '',
      location_lat: '',
      location_lng: '',
    });

    setLoading(false);
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
        () => {
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
    <>
      <DialogHeader>
        <DialogTitle>Submit Your Report</DialogTitle>
        <DialogDescription>Provide detailed information about the issue you've observed.</DialogDescription>
      </DialogHeader>
      <div className="max-h-[70vh] overflow-y-auto pr-6">
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
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

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              {loading ? 'Submitting...' : 'Submit Report'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
