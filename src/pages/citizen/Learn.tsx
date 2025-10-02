import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { BookOpen, Eye, Lightbulb, Newspaper, Trophy, BookMarked } from 'lucide-react';

interface Content {
  id: string;
  title: string;
  content: string;
  category: string;
  image_url: string;
  views: number;
  published_at: string;
}

export default function Learn() {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('awareness_content')
        .select('*')
        .order('published_at', { ascending: false });

      if (data && !error) {
        setContent(data);
      }
      setLoading(false);
    };

    fetchContent();
  }, []);

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      tips: Lightbulb,
      news: Newspaper,
      success_story: Trophy,
      guide: BookMarked,
    };
    const Icon = icons[category] || BookOpen;
    return <Icon className="h-5 w-5" />;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      tips: 'bg-blue-500/10 text-blue-500',
      news: 'bg-green-500/10 text-green-500',
      success_story: 'bg-purple-500/10 text-purple-500',
      guide: 'bg-orange-500/10 text-orange-500',
    };
    return colors[category] || '';
  };

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Learn & Awareness</h1>
        <p className="text-muted-foreground">Educate yourself about river conservation and environmental protection.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-6 text-center text-muted-foreground">
              No content available yet. Check back soon for educational resources!
            </CardContent>
          </Card>
        ) : (
          content.map((item) => (
            <Card key={item.id} className="flex flex-col hover:border-primary/40 transition-colors cursor-pointer">
              {item.image_url && (
                <div className="h-48 bg-muted overflow-hidden">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {getCategoryIcon(item.category)}
                  <Badge className={getCategoryColor(item.category)}>{item.category.replace('_', ' ')}</Badge>
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Eye className="h-3 w-3" />
                  <span>{item.views} views</span>
                  <span>•</span>
                  <span>{format(new Date(item.published_at), 'PP')}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3">{item.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}