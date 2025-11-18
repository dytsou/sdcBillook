# SDC Billook Backend

A Node.js/Express backend application for the SDC Billook bill management system, providing a GraphQL API for managing bills, users, and payments.

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **API**: GraphQL with express-graphql
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Rate Limiting**: express-rate-limit
- **Testing**: Jest with Supertest
- **Package Manager**: pnpm

## Prerequisites

- Node.js (v14 or higher)
- pnpm (v8.15.0 or higher)
- MongoDB instance (local or MongoDB Atlas)

## Installation

1. Install dependencies:
```bash
pnpm install
```

2. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`:
```
PORT=5000
MONGO_USERNAME=your_mongodb_username
MONGO_PASSWORD=your_mongodb_password
MONGO_DB=your_database_name
MONGO_HOST=your_mongodb_cluster_host
```

## Running the Application

### Development Mode

Start the server with auto-reload using nodemon:
```bash
pnpm run dev
```

### Production Mode

Start the server:
```bash
pnpm start
```

The server will start on `http://localhost:4000` (or the port specified in your `.env` file).

### GraphQL Playground

Once the server is running, you can access the GraphiQL playground at:
```
http://localhost:5000/graphql
```

## Testing

### Run Tests
```bash
pnpm test
```

## API Endpoints

### GraphQL Endpoint
- **URL**: `/graphql`
- **Method**: POST (or GET for GraphiQL)
- **GraphiQL**: Available at `http://localhost:4000/graphql` when server is running

## Features

- **GraphQL API**: Efficient data fetching with GraphQL
- **User Authentication**: JWT-based authentication
- **Password Security**: Bcrypt password hashing
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Cross-Origin Resource Sharing enabled
- **MongoDB Integration**: Mongoose ODM for database operations

## Project Structure

```
backend/
├── __tests__/          # Test files
│   └── app.test.js
├── graphql/
│   ├── resolvers/      # GraphQL resolvers
│   │   ├── book.js
│   │   ├── index.js
│   │   ├── payment.js
│   │   ├── transformer.js
│   │   └── user.js
│   └── schema/         # GraphQL schemas
│       ├── bookSchema.js
│       ├── index.js
│       ├── paymentSchema.js
│       └── userSchema.js
├── middleware/         # Express middleware
│   ├── enable-cors.js
│   └── is-auth.js
├── models/             # MongoDB models
│   ├── book.js
│   ├── index.js
│   ├── payment.js
│   └── User.js
├── app.js              # Main application entry point
├── package.json
├── pnpm-lock.yaml
└── README.md
```

## Available Scripts

- `pnpm start` - Start the production server
- `pnpm run dev` - Start the development server with nodemon
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | No (defaults to 5000) |
| `MONGO_USERNAME` | MongoDB username | Yes |
| `MONGO_PASSWORD` | MongoDB password | Yes |
| `MONGO_DB` | MongoDB database name | Yes |
| `MONGO_HOST` | MongoDB cluster host | Yes |

## Security Features

- **Rate Limiting**: Prevents abuse with 100 requests per 15 minutes per IP
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **CORS**: Configurable cross-origin resource sharing

## Development

The project uses ES Modules (`"type": "module"`), so all imports use the `import` syntax instead of `require()`.

## License

[ISC License](LICENSE)