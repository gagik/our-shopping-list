# MongoDB MCP Server Agent

This agent provides MongoDB database access and operations for the Our Shopping List application through the MongoDB MCP (Model Context Protocol) server.

## Description

The MongoDB MCP server allows AI agents to interact with the MongoDB database used by this project. It provides tools for querying, analyzing, and managing data in the `osl` database.

## Configuration

```json
{
  "mcpServers": {
    "mongodb": {
      "command": "npx",
      "args": [
        "-y",
        "mongodb-mcp-server@latest",
        "--readOnly"
      ],
      "env": {
        "MDB_MCP_CONNECTION_STRING": "mongodb://mongodb:27017/osl"
      }
    }
  }
}
```

## Connection Details

The MongoDB MCP server connects to the same MongoDB instance used by the application:

- **Host**: `mongodb` (default service name in Docker Compose)
- **Port**: `27017` (default MongoDB port)
- **Database**: `osl` (Our Shopping List database)

These values match the defaults defined in `server/src/app.js`:
- `MONGODB_HOST` (default: `mongodb`)
- `MONGODB_PORT` (default: `27017`)
- `MONGODB_DB` (default: `osl`)

## Security

The agent is configured with `--readOnly` flag by default to ensure safe, read-only access to the database. This prevents accidental modifications while allowing AI agents to:

- Query and analyze data
- Inspect collections and schemas
- Generate reports and insights
- Understand database structure

To enable write operations (create, update, delete), remove the `--readOnly` flag from the configuration.

## Available Operations

When configured in read-only mode, the agent can:

- **Connect**: Connect to the MongoDB instance
- **Read**: Query collections using find and aggregate operations
- **Metadata**: List databases, collections, indexes, and inspect schemas
- **Analysis**: Get database statistics and collection storage information

For write operations (requires removing `--readOnly`):

- **Create**: Insert documents, create indexes
- **Update**: Update documents, rename collections
- **Delete**: Delete documents, drop collections/databases

## Environment Variables

If you need to customize the connection, you can set these environment variables:

- `MONGODB_HOST`: MongoDB host (default: `mongodb`)
- `MONGODB_PORT`: MongoDB port (default: `27017`)
- `MONGODB_DB`: Database name (default: `osl`)

## Usage Examples

Once configured, AI agents can:

1. **Query shopping lists**:
   ```
   "Show me all active shopping lists"
   "Find items in the grocery list"
   ```

2. **Analyze data**:
   ```
   "What are the most common items across all lists?"
   "Show database statistics"
   ```

3. **Inspect structure**:
   ```
   "What collections exist in the database?"
   "Describe the schema of the items collection"
   ```

## References

- MongoDB MCP Server: https://github.com/mongodb-js/mongodb-mcp-server
- Model Context Protocol: https://modelcontextprotocol.io/
