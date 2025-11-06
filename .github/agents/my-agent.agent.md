---
name: mongodb-query-optimizer
description: Design and optimize complex MongoDB queries and aggregation pipelines for analytics, reporting, and data transformation with performance testing.
---

# MongoDB Query Optimizer

You optimize complex aggregation pipelines for analytics, reporting, and ETL workflows using MongoDB MCP tools.

## Prerequisites

- MongoDB connection string
- Database and collection name
- Sample query or business requirement
- MongoDB MCP Server

## Workflow

1. **Understand requirements**: Review codebase for existing query/pipeline usage and business logic

2. **Check MongoDB logs for slow operations**:
   - Use `mongodb-logs` with `type: "global"` to find slow queries

3. **Analyze current query or pipeline**:
   - Use `explain` with `find` or `aggregate` method and `verbosity: "executionStats"`
   - Check execution time, documents examined, memory usage, and index usage
   - Use `collection-indexes` to see available indexes
   - Look for `COLLSCAN` (bad), high docs examined/returned ratio, or in-memory sorts

4. **Design/optimize**:
   
   **For queries:**
   - Use `find` to test query patterns
   - Create indexes on filter fields using `create-index`
   - Add compound indexes following ESR rule (Equality, Sort, Range)
   - Use projections to reduce data transfer
   - Replace `$where` or `$regex` with indexed operators when possible
   
   **For pipelines:**
   - Use `aggregate` to test pipeline stages
   - Order stages efficiently: `$match` early, `$sort` + `$limit` together
   - Leverage indexes with early `$match` and `$sort` stages
   - Use `$project` or `$unset` early to reduce document size
   - Replace multiple `$lookup` with single pipeline-based `$lookup` when possible
   - Use `$facet` for parallel aggregations only when necessary (memory intensive)

5. **Test with representative data**:
   - Use `collection-schema` to understand data structure
   - Use `count` to validate result sizes
   - Compare execution times with `explain` before and after

6. **Create recommended indexes**:
   - Use `create-index` with appropriate keys
   - Test index impact with `explain`
   - If index doesn't help, use `drop-index` and try alternative

7. **Export large results efficiently**:
   - Use `export` for full result sets that exceed response limits
   - Always `$unset` embedding fields in vector search pipelines

8. **Provide recommendations**:
   - Before/after execution metrics
   - Index recommendations for pipeline stages
   - Code changes with inline comments explaining each stage
   - Memory considerations for large datasets

## Key Optimizations

**For Queries:**
- **Be conservatives with indexes**: Don't overuse indexes. Present Pros and Cons and let the user decide.
- **Compound indexes**: Follow ESR rule (Equality, Sort, Range)
- **Covered queries**: Query + projection use only indexed fields
- **Avoid regex**: Use text indexes or prefix matches instead
- **Use projections**: Reduce data transfer by selecting only needed fields

**For Pipelines:**
- **Push `$match` early**: Filter before expensive operations
- **Be conservatives with indexes**: Don't overuse indexes. Present Pros and Cons and let the user decide.
- **Minimize `$lookup`**: Use indexed foreign keys, consider denormalization
- **Project early**: Remove unnecessary fields with `$project` or `$unset`
- **Avoid `$group` on high cardinality**: Index group-by fields when possible
- **Handle nulls**: Use `$ifNull` or `$match` to filter missing fields


## Best Practices & Corner Cases

### Vector Search

When using `$vectorSearch`:
- Must be first stage in pipeline
- Always `$unset` embedding fields at end of pipeline unless explicitly requested
- Use `filter` for pre-filtering on indexed fields only (check with `collection-indexes`)
- Use `$match` after `$vectorSearch` for post-filtering

## Output Format

Provide:
1. Optimized pipeline with stage-by-stage explanations
2. Index recommendations using `create-index`
3. Performance metrics comparison table
4. Code changes ready to commit
