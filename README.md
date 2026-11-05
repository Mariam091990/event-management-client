Community Events Management Platform
A web application for discovering, creating, and managing community
events. The platform is designed to help people find local initiatives,
learn about event details, and participate in activities such as health
camps, cleanups, tree plantations, donations, food distribution,
education programs, and community support.
Overview
The application provides an event-focused experience with event
creation, event listings, detailed event pages, organizer information,
and event participation features. It uses a Next.js frontend and
communicates with a separately hosted REST API for event data.
Features
- Event discovery: Browse available community events and view
  event information.
- Event details: View an event's description, category, date,
  location, thumbnail, and organizer information.
- Create events: Submit an event with a title, description, event
  type, image URL, location, and event date.
- Future-date validation: The event creation form requires an
  event date later than tomorrow.
- Authentication: Better Auth is integrated for user sessions and
  authentication endpoints.
- Authenticated event creation: The frontend obtains an
  authentication token and sends it as a Bearer token when creating an
  event.
- Organizer details: Event pages display information about the
  event organizer.
- Event participation: Event detail pages include an event-joining
  interface.
- Event management: Event detail pages include update and delete
  interfaces.
- Loading and error handling: Suspense fallbacks, not-found
  handling, and user-facing notifications are used where appropriate.
- Responsive interface: The UI uses Tailwind CSS utility classes
  to support different screen sizes.
Technology Stack
  Area                  Technology
  Framework             Next.js (App Router)
Language              TypeScript
UI styling            Tailwind CSS
Authentication        Better Auth
Notifications         react-hot-toast
Icons                 lucide-react
Data communication    Fetch API / REST API
Backend data source   Configured through NEXT_PUBLIC_API_URL
The frontend repository communicates with an API service. Configure
the API URL to point to the backend environment you are using.

Application Structure
The following paths are represented in the supplied project source:
src/
└── app/
    ├── api/
    │   └── auth/
    │       └── [...all]/
    │           └── route.ts
    ├── create-events/
    │   └── page.tsx
    ├── doneNFutureEvents/
    │   ├── donNfuE.tsx
    │   └── page.tsx
    └── events/
        ├── page.tsx
        └── [eventId]/
            └── page.tsx
Additional UI components are imported from the src/components
directory, including event listing, event update, event deletion, event
joining, and organizer information components.
Important routes
  Route                               Purpose
  /create-events                    Displays the event creation form.

  /doneNFutureEvents                Loads and displays the event
collection through the
DoneNUpcomingEventsContent
component.

  /events/[eventId]                 Displays details for a specific
event, including organizer and
participation information.
/api/auth/[...all]                Handles Better Auth requests
through the Next.js integration.
The exact navigation available to a visitor may depend on the
application's shared layout and navigation components.
Getting Started
Prerequisites
- Node.js
- pnpm, npm, or another supported package manager
- Access to the backend REST API
- The authentication environment configuration required by your Better
  Auth setup
1. Clone the repository
git clone --GitHub Repository
 (server):  https://github.com/Mariam091990/event-management-server.git

(client):  https://github.com/Mariam091990/event-management-client.git
cd <event-management-client>
Replace the placeholders with your repository URL and project directory.
2. Install dependencies
Using pnpm:
pnpm install
Or using npm:
npm install
3. Configure environment variables
Create a .env.local file in the project root and configure the API
endpoint:
NEXT_PUBLIC_API_URL=http://localhost:5000
Replace the example URL with the actual base URL of your backend API.
The frontend uses this variable when making requests for event data.

Better Auth may require additional environment variables, such as its
secret, application base URL, and OAuth provider credentials, depending
on the configuration in src/lib/auth and your deployment environment.
Add those values using the names expected by your authentication
configuration. Do not commit secrets or private credentials to version
control.
4. Start the development server
Using pnpm:
pnpm dev
Or using npm:
npm run dev
Open http://localhost:3000 in your browser.
5. Create a production build
pnpm build
pnpm start
If you use npm, run:
npm run build
npm run start
Event Creation Flow
1. The user opens /create-events.
2. The page reads the current user session using
   authClient.useSession().
3. The user enters the event title, description, category, thumbnail
   URL, location, and date.
4. The form checks that the selected event date is later than tomorrow.
5. The client requests an authentication token through
   authClient.token().
6. The event data, including the organizer's name and email, is sent to
   the backend using a POST request to /events.
7. The token is included in the Authorization header as a Bearer
   token.
8. On success, a toast notification is displayed and the user is
   redirected to /upcoming-events.
API Integration
The frontend uses NEXT_PUBLIC_API_URL as the base URL for backend
requests.
  Method                  Endpoint                Usage shown in the
frontend
  POST                      /events                  Creates an event using
the submitted form data
and Bearer token.

  GET                   /events/:eventId            Retrieves an individual
event for the event
details page.
GET                   /limit-events             Retrieves the event
data displayed by the
done/upcoming events
page.
The backend is responsible for implementing these endpoints, validating
requests, applying authorization rules, and persisting event data.
Confirm the backend's actual route behavior and response format before
extending this table.
Event Data
The event creation form collects the following fields:
  Field                               Description
  title                             Name of the event.

  description                       Details about the event and its
purpose.

  eventType                         Event category, such as Cleanup,
Plantation, Donation, or Education.

  thumbnail                         URL of the event image.

  location                          Venue or location of the event.

  eventDate                         Scheduled date of the event.

  organizerName                     Name of the authenticated user
creating the event.
organizerEmail                    Email address of the authenticated
user creating the event.
The event details page also supports optional fields such as featured,
organizerName, and organizerEmail in its event type.
Authentication
Better Auth is connected to the Next.js App Router through:
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
The client uses the authentication session to obtain the current user's
information. During event creation, it requests a token and sends that
token to the backend in the request's Authorization header.

Make sure the backend verifies the token and that the frontend and
backend use compatible authentication configuration.
Error Handling and User Feedback
- The event creation form displays validation errors when the selected
  date is not allowed.
- Failed event creation requests produce an error message.
- Successful event creation displays a success toast.
- The event details page handles a 404 response with Next.js
  notFound().
- Suspense fallbacks provide loading feedback while event data is
  being retrieved.
Development Notes
- Keep the backend API running and make sure NEXT_PUBLIC_API_URL
  points to the correct host.
- Restart the Next.js development server after changing environment
  variables.
- Ensure image hosts are configured in next.config.ts if event
  thumbnails are rendered with next/image and come from remote
  domains.
- Never expose Better Auth secrets, database credentials, or private
  API keys in client-side code or public environment variables.
- Validate and authorize event operations on the backend; frontend
  checks alone are not a security boundary.
Future Improvements
Potential enhancements for the platform include:
- Search, filtering, and sorting for event listings.
- Pagination or incremental loading for large event collections.
- More comprehensive form validation and clearer API error messages.
- Event capacity and participant management.
- Automated tests for authentication and event workflows.
- Accessibility improvements and consistent empty states.
Contributing
1. Fork the repository.
2. Create a feature branch.
3. Make your changes and test them locally.
4. Commit your changes with a descriptive message.
5. Open a pull request describing the changes.
License
No license information was included in the supplied project files. Add a
LICENSE file and update this section before distributing the project.