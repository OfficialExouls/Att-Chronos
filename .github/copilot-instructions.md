# Voodoo Copilot Instructions

## Architecture Overview
Voodoo is a magic mod for "A Township Tale" VR game with three main components:
- **Voodoo Client** (this repo): Electron app with React UI, C# speech recognition, communicates with server via WebSocket/API
- **Voodoo Server** (att-voodoo-server): Node.js/Express server using att-client to interface with game servers, manages spellbook validation and player sessions
- **Voodoo Spellbook** (hidden repo): Contains spell definitions for validation

Data flows: Client authenticates via Alta OAuth → sends voice commands → server validates against spellbook → sends console commands to game server.

## Key Technologies & Patterns
- **State Management**: Jotai atoms in `src/ui/atoms/` for UI state (e.g., `appStageAtom`, `spellbookAtom`)
- **API Structure**: Express server with request handlers in `src/api/requestHandlers/` (e.g., `postTrigger.ts` for spell casting)
- **Bot Integration**: Uses `att-client` library to connect to game servers, listens for player events
- **Speech Recognition**: C# component built with dotnet, packaged into Electron app
- **Database**: PostgreSQL with queries in `src/db/sql/`

## Development Workflows
- **Client Build**: `npm run build` (builds C# speech, webpack React, electron-builder packaging)
- **Client Dev**: `npm run dev` (concurrent React dev server + Electron with nodemon)
- **Server Build**: `npm run build` (TypeScript compilation)
- **Server Dev**: `npm run dev` (builds then runs with dotenv config)
- **Formatting**: Prettier auto-formats on commit via husky/lint-staged

## Conventions
- **TypeScript**: Strict mode enabled, paths `@/*` for UI imports
- **Environment**: Required vars like `ALTA_CLIENT_ID`, `GA_TRACKING_ID`, `CONJURE_HEARTFRUIT_INCANTATION`
- **Node Version**: >=18.2.0 <19 (server)
- **Error Handling**: Sentry integration for server errors
- **Authentication**: OAuth2 with PKCE flow via Alta API

## Common Patterns
- **Atom Updates**: Use `jotai` atoms for reactive UI state, e.g., `useAtom(appStageAtom)` in components
- **API Endpoints**: RESTful handlers export `method` and `path`, e.g., `postTrigger` handles spell triggers
- **Server Events**: Bot listens to `att-client` events like 'connect', 'playerEntered'
- **Spell Validation**: Server checks incantations against spellbook before executing commands
- **Graceful Shutdown**: SIGTERM handler in server for cleanup

## Integration Points
- **Alta API**: OAuth auth, account linking
- **Game Servers**: Console commands via `att-client`
- **Database**: Session management, patron top-ups
- **External Services**: Google Analytics, Discord (commented), Sentry

Reference: `README.md`, `guides/`, `src/` structure</content>
<parameter name="filePath">vsls:/att-voodoo/.github/copilot-instructions.md