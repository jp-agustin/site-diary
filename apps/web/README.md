# Simplified Site Diary

## Environment Variables

Create a `.env.local` and `.env` file in this directory:

`.env.local`

```sh
API_KEY=something-cool
NEXT_PUBLIC_API_GRAPHQL_URL=http://localhost:3000/api/graphql
NEXT_PRIVATE_API_URL=http://localhost:3000/api/
UPLOADTHING_TOKEN=
OPENAI_API_KEY=
```

`.env`

```sh
DATABASE_URL=
```

## Running My Changes

To test the latest updates, follow these steps:

1. Regenerate Prisma client (from this directory):

```bash
npx prisma generate
```

2. Start the dev server (from the monorepo root or this directory):

```bash
yarn dev:web
# or
yarn dev
```

## Implementation Notes, Decisions & Future Improvements

This section explains the key decisions made during the Site Diary implementation, the tradeoffs taken due to the time constraints, and the areas I would improve if this were a production environment.

### Mobile Optimisation

Construction teams often complete daily diaries while on-site, so mobile usability was a priority from the start.

#### Implemented

- All pages (List View, Create Diary, Diary Details) use responsive utility classes (`flex-col`, `w-full`, responsive widths)
- Inputs and Buttons expand naturally to full-width (some anchored to screen edges) in smaller screens
- Components collapse into single-column stacks (with proper spacing and stacking to avoid overlapping elements) on small screens for easier vertical scrolling
- List items maintain readability with compact typography, spacing, and layout that preserves hierarchy without cramping
- AI summary uses “Show more / Show less” on mobile, improving scanability and avoiding overwhelming text
- Lazy queries (useLazyQuery for AI summary) ensure heavy operations run only when needed, improving load time on slower mobile networks
- Provided global CSS was used for all styling rather than defining custom variables. This ensures the app automatically respects dark and light mode once the global theme is toggled or system preferences change.

#### Future Considerations

- Add offline-first functionality with local caching and background sync, allowing users to create/edit, and view diary entries even when connectivity is unreliable, with UI indicators and automatic updates once the network is restored
- More mobile-native UI patterns such as bottom sheets for actions and swipe gestures for quick edits or deletions, making the diary experience feel more intuitive on mobile devices
- With more complex forms, image-heavy workflows, or real-time updates, memoization would be introduced selectively to improve user experience
- Add date-range filters (past 7 days, past 30 days, week to date, month to date) and pagination to support fast navigation and scalable data loading, ensuring the diary list remains performant and easy to browse as entries grow
- Implement image caching (thumbnails, caching, optional offline storage) to speed up image-heavy views, reduce mobile data usage

### Architecture Decisions

#### Why the backend sits inside Next.js

Keeping the backend within Next.js simplifies development for a small project

- Speed of Development
  - Frontend and backend live in a single repo
  - No need to set up separate servers, deployments, or Docker
  - Zero-config routing and API endpoints
- Avoids Over-Engineering

#### Scalability Limitations of Backend Inside Next.js

While convenient for small projects, embedding backend logic in Next.js has inherent limits for larger applications

- API Routes are Stateless Serverless Functions
  - Each API call is a separate cold start
  - Problematic when business logic grows, code sharing becomes complex, or response times are critical
  - Larger apps require persistent DB connections
- Deployment Coupling
  - Frontend and backend deploy together
  - A small UI change redeploys backend routes unnecessarily
  - Backend cannot scale independently, and outages could block frontend updates
- Limits flexibility and infrastructure choice for larger-scale applications

#### Future Considerations

- Extract backend logic into a standalone service
- Enable independent scaling and deployments for the backend
- Expose a clean REST or GraphQL API for the Next.js app (or other clients) to consume (w/ API gateway)

### Frontend → GraphQL → Internal API Separation

#### Why an Internal API Layer Exists

- The internal API handles database queries, validations, and interactions with external services, rather than embedding this logic in GraphQL resolvers to keep the resolvers thin and focused solely on mapping client requests to the internal API
- If data sources or external services change, resolvers do not need to be updated
- Enables easier introduction of caching, batching, or background processing (in the future) without touching the GraphQL layer
- Simplifies testing: the internal API can be unit-tested independently from GraphQL resolvers

### Known Issue: UploadThing CSS

There is a styling conflict with UploadThing: elements with the `hidden` Tailwind class remain hidden even after responsive breakpoints (`breakpoint:*`) are applied.

#### Quick Fix Implemented

- Scoped UploadThing CSS to the ImageUploader component only, so it doesn’t immediately affect other pages
- Note: once the component is loaded, some styles may still leak, but this approach minimizes the impact

#### Future Fix

- Replace the UploadThing UI with a custom upload component
  - The underlying UploadThing functions will still handle file uploads
  - The UI will be fully controlled to ensure consistent styling

### Additional Future Improvements

#### Component Structure & Reusability

- Extract reusable components into a shared folder or library as currently, all components live within the `site-diary/` folder
- Create a PageWrapper component to handle shared elements like headers (desktop and mobile) to reduce repetition, enforce layout consistency, and simplify adding new pages or modifying common elements

#### Testing

- Unit tests for form logic, filters, and upload handling
- Integration tests for creating, updating, and viewing diary entries
- Mocked GraphQL API tests to ensure reliability across frontend and backend interactions

#### Accessibility

- Improve proper semantic structure and contrast ratios
- Screen reader support for forms, upload interactions, and list navigation
