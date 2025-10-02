# Smart Riverfront Management System - Project Structure

## Overview
This is a full-stack application for Smart India Hackathon 2025, built with React (TypeScript) frontend and Lovable Cloud backend.

## Frontend Structure

### Tech Stack
- **React 18** with TypeScript
- **Vite** for blazing fast development
- **Tailwind CSS** for styling
- **shadcn/ui** for beautiful UI components
- **Zustand** for state management
- **React Router** for navigation
- **TanStack Query** for data fetching

### Folder Organization

```
src/
├── components/          # Reusable UI components
│   └── ui/             # shadcn UI components
├── pages/              # Page components (routes)
│   ├── Login.tsx       # Authentication page
│   ├── Dashboard.tsx   # Main dashboard
│   └── NotFound.tsx    # 404 page
├── store/              # Zustand state management
│   ├── useAuthStore.ts      # User authentication state
│   ├── useSensorStore.ts    # IoT sensor data state
│   ├── useDroneStore.ts     # Drone fleet state
│   └── useAlertStore.ts     # Alert/notification state
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── integrations/       # Backend integrations (auto-generated)
│   └── supabase/       # Lovable Cloud SDK
└── App.tsx             # Root component with routing
```

## Backend Architecture (Lovable Cloud)

### What is Lovable Cloud?
Lovable Cloud provides a complete backend infrastructure without requiring external setup:
- **PostgreSQL Database** - Fully managed, scalable database
- **Authentication** - JWT-based auth with email/password
- **Storage** - File storage for images, videos, documents
- **Edge Functions** - Serverless TypeScript functions (replaces Express.js routes)
- **Real-time** - WebSocket support for live data

### Backend Structure

```
supabase/
├── functions/          # Edge Functions (serverless API routes)
│   ├── water-quality/  # IoT sensor data processing
│   ├── drone-control/  # Drone management APIs
│   ├── waste-detection/# AI waste detection
│   ├── flood-prediction/# Flood forecasting
│   └── alerts/         # Alert system
└── migrations/         # Database schema migrations
```

### Key Features Implementation

#### 1. Water Quality Monitoring
- **IoT Integration**: Edge function receives sensor data via HTTP/WebSocket
- **Storage**: Real-time data stored in PostgreSQL
- **Alerts**: Automatic threshold-based alerts
- **Visualization**: Dashboard displays trends and anomalies

#### 2. Drone-Based Water Sampling
- **Control API**: Edge functions for drone commands
- **GPS Tracking**: Real-time location updates
- **Sample Management**: Store geo-tagged water samples
- **Telemetry**: Live drone status monitoring

#### 3. Floating Waste Detection (AI)
- **Image Processing**: Edge function with AI model
- **Detection**: YOLOv8-style object detection
- **Storage**: Images/videos in Lovable Cloud Storage
- **Alerts**: Automatic cleanup notifications

#### 4. Flood & Water Level Management
- **Prediction**: AI-based forecasting
- **Monitoring**: Real-time water level tracking
- **Alerts**: Threshold-based warnings

#### 5. Safety & Surveillance
- **Video Analysis**: AI drowning detection
- **Emergency Response**: Automatic alert system
- **Monitoring**: Live camera feeds

#### 6. Citizen Engagement
- **Public API**: Report submission endpoints
- **Authentication**: User registration/login
- **Reports**: GPS-tagged incident reports

#### 7. Biodiversity Monitoring
- **Data Collection**: Ecosystem tracking
- **Analysis**: AI-powered biodiversity insights
- **Reporting**: Conservation metrics

## State Management with Zustand

### Store Pattern
Each feature has its own Zustand store:
- `useAuthStore` - User authentication
- `useSensorStore` - IoT sensor data
- `useDroneStore` - Drone fleet management
- `useAlertStore` - System alerts

### Usage Example
```typescript
import { useSensorStore } from '@/store/useSensorStore';

const Dashboard = () => {
  const { sensors, selectedSensor } = useSensorStore();
  return <div>...</div>;
};
```

## Database Schema (PostgreSQL)

### Core Tables
- `sensors` - IoT sensor registry
- `sensor_readings` - Time-series sensor data
- `drones` - Drone fleet information
- `drone_samples` - Water sample data
- `waste_detections` - AI waste detection results
- `alerts` - System alerts and notifications
- `citizen_reports` - Public incident reports
- `biodiversity_data` - Ecological monitoring

### Authentication
- Built-in `auth.users` table (managed by Lovable Cloud)
- `profiles` - Extended user information

## API Routes (Edge Functions)

### Example Edge Function
```typescript
// supabase/functions/water-quality/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { sensorId, readings } = await req.json();
  
  // Store in database
  // Check thresholds
  // Trigger alerts if needed
  
  return new Response(JSON.stringify({ success: true }));
});
```

## Development Workflow

### Running Locally
```bash
npm install
npm run dev
```

### Adding New Features
1. Create database tables using Lovable Cloud UI
2. Add edge functions for backend logic
3. Create Zustand stores for state
4. Build UI components
5. Connect everything together

### Deployment
- Frontend: Automatic deployment via Lovable
- Backend: Edge functions auto-deploy
- Database: Managed by Lovable Cloud

## Key Differences from Traditional MERN Stack

| Traditional | Lovable Cloud |
|------------|---------------|
| Express.js server | Edge Functions (serverless) |
| Manual JWT setup | Built-in authentication |
| MongoDB/Prisma | PostgreSQL with built-in client |
| Manual deployment | Automatic deployment |
| Server hosting | Serverless (scales automatically) |

## Why Lovable Cloud vs Express.js?

### Advantages:
✅ **No server management** - Fully serverless
✅ **Auto-scaling** - Handles millions of users automatically
✅ **Built-in auth** - No JWT library needed
✅ **Real-time support** - WebSocket built-in
✅ **Free tier** - Generous free usage
✅ **TypeScript native** - Type-safe edge functions
✅ **Instant deployment** - No manual deploy process

### When to use traditional backend:
- You need specific Node.js libraries not available in Deno
- You require long-running background processes
- You have legacy code to integrate

## Next Steps

1. **Implement Authentication** - Add login/signup with Lovable Cloud
2. **Create Database Schema** - Design tables for all features
3. **Build Edge Functions** - Implement API endpoints
4. **Connect IoT Devices** - Set up sensor data ingestion
5. **Integrate AI Models** - Add waste detection and drowning detection
6. **Build Dashboard UI** - Complete all monitoring interfaces
7. **Add Real-time Features** - WebSocket for live updates
8. **Implement Alerts** - Email/SMS notification system

## Resources

- [Lovable Cloud Documentation](https://docs.lovable.dev/features/cloud)
- [Edge Functions Guide](https://docs.lovable.dev/features/cloud#edge-functions)
- [Authentication Setup](https://docs.lovable.dev/features/cloud#authentication)
- [Database Management](https://docs.lovable.dev/features/cloud#database)

## Team Roles

- **Your Role**: Software Development (Frontend + Backend)
- **Hardware Team**: IoT sensors, Drones, Cameras
- **AI/ML Team**: Detection models, Predictions
- **Design Team**: UI/UX design

## Support

For questions or issues:
1. Check Lovable documentation
2. Ask in team chat
3. Review code examples in this repo

---

**Built for Smart India Hackathon 2025**
**Team: [Your Team Name]**
**Project: Smart Riverfront Management System**
