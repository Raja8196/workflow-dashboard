# Workflow Engine

A full-stack workflow management system built with Node.js, Express, PostgreSQL, and React.

## Features

- **Order Management**: Create and manage customer orders
- **Workflow Engine**: Design and execute custom workflows with steps and rules
- **Dashboard**: Configurable dashboard with KPIs, charts, and tables
- **Rule Engine**: Conditional logic for workflow progression

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL with Sequelize
- Rule Engine for workflow logic

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router
- Axios for API calls
- Recharts for data visualization
- React Grid Layout for dashboard customization

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Set up PostgreSQL:
   - Install PostgreSQL on your system
   - Create a database named `workflow_engine`
   - Update connection details in `backend/.env` if needed

## Configuration

1. Backend environment variables (`.env`):
```
PORT=5000
# PostgreSQL Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=workflow_engine
DB_USER=postgres
DB_PASSWORD=postgres123
```

2. Update PostgreSQL connection details as needed.

## Running the Application

1. Start the backend:
```bash
cd backend
npm run dev
```

2. Start the frontend (in a new terminal):
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173` (or the port shown by Vite)

## API Endpoints

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### Workflows
- `GET /api/workflows` - Get all workflows
- `POST /api/workflows` - Create workflow
- `PUT /api/workflows/:id` - Update workflow
- `DELETE /api/workflows/:id` - Delete workflow

### Steps
- `GET /api/workflows/:workflowId/steps` - Get steps for workflow
- `POST /api/workflows/:workflowId/steps` - Create step
- `PUT /api/steps/:id` - Update step
- `DELETE /api/steps/:id` - Delete step

### Rules
- `GET /api/steps/:stepId/rules` - Get rules for step
- `POST /api/steps/:stepId/rules` - Create rule
- `PUT /api/rules/:id` - Update rule
- `DELETE /api/rules/:id` - Delete rule

### Executions
- `POST /api/workflows/:workflowId/execute` - Start workflow execution
- `GET /api/executions/:id` - Get execution details
- `GET /api/workflows/:workflowId/executions` - Get executions for workflow

### Dashboard
- `GET /api/dashboards` - Get dashboard config
- `PUT /api/dashboards/:id` - Update dashboard config
- `GET /api/dashboards/data` - Get widget data

## Usage

1. **Create Orders**: Use the Orders page to add customer orders
2. **Design Workflows**: Create workflows with steps and conditional rules
3. **Execute Workflows**: Run workflows with input data
4. **Configure Dashboard**: Add widgets to visualize order data

## Development

- Backend runs on port 5000
- Frontend runs on port 5173
- MongoDB default port 27017

## License

ISC