# E-Commerce Chatbot System
## Technical Architecture Document

**Author:** Senior Software Engineer & Technical Architect  
**Version:** 1.0  
**Date:** February 2026  
**Tech Stack:** React.js, Node.js, LangGraph (Python), PostgreSQL

---

## Table of Contents

1. [System Architecture](#1-system-architecture)
2. [AI/ML Integration Strategy](#2-aiml-integration-strategy)
3. [Scalability & Performance](#3-scalability--performance)
4. [Security & Monitoring](#4-security--monitoring)
5. [Key Technical Challenges](#5-key-technical-challenges)
6. [Deployment Strategy](#6-deployment-strategy)
7. [Cost Estimation](#7-cost-estimation)

---

## 1. System Architecture

### 1.1 High-Level Architecture Diagram

```
┌──────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                          │
│  ┌──────────┐        ┌─────────────┐                    │
│  │ React.js │◄──────►│  WebSocket  │                    │
│  │ Frontend │  HTTPS │   (Chat)    │                    │
│  └────┬─────┘        └─────────────┘                    │
└───────┼──────────────────────────────────────────────────┘
        │
┌───────▼──────────────────────────────────────────────────┐
│              CDN & LOAD BALANCER                         │
│  CloudFlare / AWS ALB / Nginx                            │
└───────┬──────────────────────────────────────────────────┘
        │
        ├──────────┬───────────┬─────────────┐
        │          │           │             │
┌───────▼───┐ ┌───▼────┐ ┌────▼────┐ ┌──────▼──────┐
│ Node.js   │ │Node.js │ │Node.js  │ │  Python     │
│ API-1     │ │ API-2  │ │ API-N   │ │  LangGraph  │
│           │ │        │ │         │ │  Chatbot    │
│ Express   │ │Express │ │Express  │ │             │
│ Socket.io │ │Socket  │ │Socket   │ │ FastAPI     │
└─────┬─────┘ └───┬────┘ └────┬────┘ └──────┬──────┘
      │           │           │             │
      └───────────┴───────────┴─────────────┤
                  │                         │
        ┌─────────┴─────────┐      ┌────────▼─────────┐
        │                   │      │                  │
   ┌────▼────┐    ┌─────────▼───┐  │  ┌────────────┐ │
   │PostgreSQL│    │Redis Cache  │  │  │ Vector DB  │ │
   │ Primary  │    │  -Session   │  │  │ (Pinecone) │ │
   │ +Replicas│    │  -Cart      │  │  └────────────┘ │
   │          │    │  -Products  │  │  ┌────────────┐ │
   │ -Users   │    └─────────────┘  │  │  LLM API   │ │
   │ -Products│                     │  │  (Gemini/  │ │
   │ -Orders  │                     │  │   Claude)  │ │
   │ -Chat    │                     │  └────────────┘ │
   └──────────┘                     └──────────────────┘
```

### 1.2 Technology Stack with Justification

#### Frontend Stack

| Technology | Version | Justification |
|-----------|---------|---------------|
| **React.js** | 18.x | - Component reusability<br>- Large ecosystem<br>- Excellent chatbot UI libraries<br>- WebSocket integration |
| **TypeScript** | 5.x | - Type safety<br>- Better IDE support<br>- Reduces runtime errors |
| **Redux Toolkit** | 2.x | - State management<br>- Chat history persistence<br>- Cart state |
| **React Query** | 5.x | - Server state<br>- Automatic caching<br>- Optimistic updates |
| **Tailwind CSS** | 3.x | - Rapid development<br>- Small bundle size<br>- Responsive design |
| **Socket.io Client** | 4.x | - Real-time chat<br>- Auto reconnection |

#### Backend API Stack (Node.js)

| Technology | Version | Justification |
|-----------|---------|---------------|
| **Node.js** | 20.x LTS | - Non-blocking I/O<br>- WebSocket support<br>- Fast JSON processing |
| **Express.js** | 4.x | - Lightweight<br>- Large middleware ecosystem<br>- Easy horizontal scaling |
| **Prisma ORM** | 5.x | - Type-safe queries<br>- Auto-generated types<br>- Migration management |
| **Socket.io** | 4.x | - Bi-directional communication<br>- Room support<br>- Event-based |
| **JWT** | jsonwebtoken | - Stateless auth<br>- Scalable<br>- Industry standard |
| **Bull Queue** | 4.x | - Redis-based jobs<br>- Retry mechanisms<br>- Scheduled jobs |

#### Chatbot Stack (Python)

| Technology | Version | Justification |
|-----------|---------|---------------|
| **Python** | 3.11+ | - Best AI/ML libraries<br>- LangChain support |
| **LangGraph** | 0.2.x | - State machine for conversation<br>- Memory management<br>- Tool calling |
| **FastAPI** | 0.110.x | - High performance (async)<br>- Auto docs<br>- WebSocket support |
| **LangChain** | 0.1.x | - LLM abstraction<br>- Vector store integration<br>- Prompt templates |
| **Pinecone/Chroma** | Latest | - Vector similarity search<br>- Scalable RAG |

#### Database & Cache

| Technology | Version | Justification |
|-----------|---------|---------------|
| **PostgreSQL** | 16.x | - ACID compliance<br>- JSON support<br>- Full-text search<br>- Proven scalability |
| **Redis** | 7.x | - Sub-ms latency<br>- Session storage<br>- Rate limiting<br>- Job queue |

### 1.3 Database Schema Highlights

```prisma
// Key schema decisions from your provided schema:

1. UUIDs for Distributed Systems
   - Users, Products, Orders use UUID
   - Prevents ID enumeration attacks
   - Enables distributed ID generation

2. Denormalization for Performance
   - OrderItem stores productName, variantSize, variantColor
   - Prevents broken orders if products deleted
   - Faster order history queries

3. Strategic Indexing
   - idx_products_category (categoryId)
   - idx_products_is_active (isActive)
   - idx_product_variants_sku (sku)
   - idx_shopping_bags_user (userId)
   - idx_orders_status (status)
   - idx_chat_sessions_user_id (userId)

4. Chat Schema Design
   - Separate ChatSession and ChatMessage
   - Intent field for analytics/routing
   - Can archive old sessions
```

**Recommended Additional Indexes:**

```sql
-- Composite indexes for common queries
CREATE INDEX idx_products_active_category 
  ON products(is_active, category_id);
  
CREATE INDEX idx_products_highlight_active 
  ON products(put_on_highlight, is_active);
  
CREATE INDEX idx_chat_messages_session_created 
  ON chat_messages(session_id, created_at DESC);

-- Full-text search
CREATE INDEX idx_products_search 
  ON products USING GIN(
    to_tsvector('indonesian', name || ' ' || COALESCE(description, ''))
  );
  
CREATE INDEX idx_faq_items_search 
  ON faq_items USING GIN(
    to_tsvector('indonesian', question || ' ' || answer)
  );
```

### 1.4 API Design

**Base URL:** `https://api.ecommerce.com/v1`

**Standard Response Format:**
```json
{
  "success": true,
  "data": { ... },
  "pagination": { ... },
  "error": null,
  "timestamp": "2026-02-02T10:00:00Z"
}
```

#### Core E-commerce Endpoints

| Endpoint | Method | Cache TTL | Purpose |
|----------|--------|-----------|---------|
| `/auth/register` | POST | - | User registration |
| `/auth/login` | POST | - | Authentication |
| `/users/current` | GET | 5 min | Get user info |
| `/products` | GET | 10 min | List products |
| `/products/:id` | GET | 30 min | Product detail |
| `/categories` | GET | 1 hour | List categories |
| `/cart` | GET | No cache | Get cart |
| `/cart/items` | POST | - | Add to cart |
| `/orders` | POST | - | Create order |

#### Chatbot Endpoints

| Endpoint | Method | Protocol | Purpose |
|----------|--------|----------|---------|
| `/chat/sessions` | POST | HTTP | Create session |
| `/chat/sessions/:id` | GET | HTTP | Get history |
| `/chat/message` | WebSocket | WSS | Real-time messaging |
| `/chat/feedback` | POST | HTTP | Rate conversation |

**WebSocket Events:**

```javascript
// Client → Server
{
  "event": "user_message",
  "sessionId": "uuid",
  "message": "Show me red sneakers",
  "userId": "uuid"
}

// Server → Client
{
  "event": "ai_response",
  "sessionId": "uuid",
  "message": "Here are 5 red sneakers...",
  "intent": "product_search",
  "products": [...],
  "timestamp": "2026-02-02T10:00:00Z"
}

// Typing indicator
{
  "event": "ai_typing",
  "sessionId": "uuid"
}
```

#### Rate Limiting

```javascript
const rateLimits = {
  public: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // requests per window
  },
  authenticated: {
    windowMs: 15 * 60 * 1000,
    max: 300
  },
  chatbot: {
    windowMs: 60 * 1000, // 1 minute
    max: 20 // messages per minute
  }
};
```

---

## 2. AI/ML Integration Strategy

### 2.1 LLM Provider Selection - Multi-Provider Strategy

| Provider | Use Case | Cost/1M Tokens | Pros | Cons |
|----------|----------|----------------|------|------|
| **Gemini 2.0 Flash** | Primary (80%) | Input: $0.075<br>Output: $0.30 | - Very fast<br>- Good Indonesian<br>- Affordable<br>- 1M context | - Less creative<br>- Occasional hallucinations |
| **Claude 3.5 Sonnet** | Complex (15%) | Input: $3.00<br>Output: $15.00 | - Best reasoning<br>- Excellent instructions<br>- Nuanced queries | - Expensive<br>- Rate limits |
| **Llama 3.3 70B** | Fallback (5%) | Self-hosted: ~$0.10 | - Cost effective<br>- Data privacy<br>- No vendor lock-in | - GPU infra needed<br>- Maintenance |

**Decision Logic:**

```python
def select_llm_provider(query_complexity, user_tier, error_count):
    if error_count > 2:
        return "claude"  # Most reliable
    
    if user_tier == "premium" or query_complexity == "high":
        return "claude"
    
    if query_complexity == "simple":
        return "gemini_flash"
    
    return "gemini_flash"  # Default
```

### 2.2 Prompt Engineering Approach

```python
SYSTEM_PROMPT = """
You are a helpful Indonesian e-commerce shopping assistant for [Brand Name].

**Capabilities:**
- Search and recommend products
- Answer product/pricing questions
- Help find right size/color
- Explain shipping/return policies
- Guide through checkout
- Answer FAQs

**Constraints:**
- Only recommend from current catalog
- Verify stock before recommending
- Use natural Indonesian
- Be concise but friendly
- If unsure, admit it and offer human support
- Never make up product info

**Response Format:**
- Under 150 words unless asked for details
- Use bullet points for lists
- Include product links
- Use emojis sparingly

**Context:**
Current Date: {current_date}
User: {user_name}
Previous Purchases: {purchase_history}
Cart: {cart_items}

**Available Actions:**
1. search_products(query, filters)
2. get_product_details(product_id)
3. check_stock(variant_id)
4. add_to_cart(variant_id, quantity)
5. get_faq(topic)
6. escalate_to_human()
"""
```

### 2.3 RAG Implementation

```python
# Vector store configuration
vectorstore = Pinecone(
    index_name="ecommerce-products",
    embedding_model="text-embedding-3-small",
    namespace="products"
)

# Prepare product for indexing
def prepare_product_for_vectorstore(product):
    metadata = {
        "product_id": product.id,
        "category": product.category.name,
        "price": float(product.basePrice),
        "brand": product.brand,
        "available_sizes": [s.name for s in product.sizes],
        "available_colors": [c.name for c in product.colors],
        "in_stock": any(v.stockQuantity > 0 for v in product.variants)
    }
    
    content = f"""
    Product: {product.name}
    Category: {product.category.name}
    Brand: {product.brand}
    Price: Rp {product.basePrice:,.0f}
    Description: {product.description}
    Details: {', '.join(product.details)}
    Sizes: {', '.join([s.name for s in product.sizes])}
    Colors: {', '.join([c.name for c in product.colors])}
    """
    
    return Document(page_content=content, metadata=metadata)

# Hybrid search
def search_products_with_rag(query: str, filters: dict):
    # Vector similarity
    vector_results = vectorstore.similarity_search(
        query=query,
        k=20,
        filter=filters  # price, category, brand
    )
    
    # Re-rank (optional)
    reranked = rerank_results(query, vector_results)
    
    return reranked[:5]
```

### 2.4 Cost Optimization Strategy

#### 1. Intelligent Caching

```python
class ResponseCache:
    def __init__(self, redis_client):
        self.redis = redis_client
        self.ttl = 3600  # 1 hour
    
    def get_cache_key(self, query, context):
        key_data = f"{query}:{json.dumps(context, sort_keys=True)}"
        return f"llm_cache:{hashlib.md5(key_data.encode()).hexdigest()}"
    
    def get(self, query, context):
        cached = self.redis.get(self.get_cache_key(query, context))
        return json.loads(cached) if cached else None
    
    def set(self, query, context, response):
        self.redis.setex(
            self.get_cache_key(query, context),
            self.ttl,
            json.dumps(response)
        )
```

#### 2. Tiered Response Strategy

```python
RESPONSE_STRATEGIES = {
    # No LLM needed
    "greeting": {
        "use_llm": False,
        "templates": [
            "Halo! Ada yang bisa saya bantu? 😊",
            "Selamat datang! Mau cari apa hari ini?"
        ]
    },
    
    # Database query only
    "faq": {
        "use_llm": False,
        "use_database": True
    },
    
    # Cheap LLM
    "product_search": {
        "use_llm": True,
        "provider": "gemini_flash",
        "max_tokens": 150
    },
    
    # Expensive LLM
    "complex_recommendation": {
        "use_llm": True,
        "provider": "claude",
        "max_tokens": 500
    }
}
```

### 2.5 Estimated Cost Per Conversation

**Scenario 1: Simple Query (Gemini Flash)**
```
Input:  500 tokens × $0.075/1M = $0.0000375
Output: 150 tokens × $0.30/1M  = $0.000045
Total per message: $0.00008
Total per conversation (5 AI msgs): $0.0004
```

**Scenario 2: Complex Query (Claude Sonnet)**
```
Input:  1000 tokens × $3.00/1M  = $0.003
Output: 300 tokens × $15.00/1M  = $0.0045
Total per message: $0.0075
Total per conversation (2 msgs): $0.015
```

**Average Cost Per Conversation:**
```
(0.0004 × 0.80) + (0.015 × 0.15) + (0.0001 × 0.05) + RAG
= $0.00032 + $0.00225 + $0.000005 + $0.00002
= ~$0.003 per conversation

Monthly for 100K conversations: $300
Monthly for 1M conversations: $3,000
```

**With Optimizations (50% savings):**
- Response caching (30% hit rate): -30%
- Rule-based for FAQs: -15%
- Batch processing: -10%
- Shorter prompts: -5%
- **Optimized: ~$0.0015 per conversation**

---

## 3. Scalability & Performance

### 3.1 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| API Response (p95) | < 200ms | Excluding LLM |
| Chatbot Response (p95) | < 2s | Including LLM |
| DB Query (p95) | < 50ms | Indexed queries |
| Page Load (p95) | < 3s | Full page |
| WebSocket Latency | < 100ms | Message delivery |
| Concurrent Users | 100K | No degradation |
| Uptime | 99.9% | ~8.76 hrs/year downtime |

### 3.2 Horizontal Scaling (Kubernetes)

```yaml
# API Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodejs-api
spec:
  replicas: 5  # Scale to 50
  template:
    spec:
      containers:
      - name: api
        image: ecommerce/api:latest
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
---
# Auto-scaling
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    kind: Deployment
    name: nodejs-api
  minReplicas: 5
  maxReplicas: 50
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### 3.3 Caching Strategy

#### Multi-Layer Cache

```
CDN (CloudFlare)
  ↓ Static assets, 1 year TTL
Redis Application Cache
  ↓ API responses, products, sessions
Database Query Cache
  ↓ PostgreSQL shared_buffers
```

**Redis Implementation:**

```javascript
class ProductCache {
  async getProduct(productId) {
    // Try cache
    const cached = await redis.get(`product:${productId}`);
    if (cached) return JSON.parse(cached);
    
    // Query DB
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
        variants: {
          include: { size: true, color: true }
        },
        images: true
      }
    });
    
    // Cache for 30 min
    await redis.setex(
      `product:${productId}`,
      1800,
      JSON.stringify(product)
    );
    
    return product;
  }
  
  async invalidateProduct(productId) {
    await redis.del(`product:${productId}`);
  }
}
```

**Cache Invalidation:**

```javascript
// Event-driven invalidation
eventEmitter.on('product.updated', async (productId) => {
  await redis.del(`product:${productId}`);
  // Clear list caches
  const keys = await redis.keys('products:*');
  if (keys.length > 0) await redis.del(...keys);
});

eventEmitter.on('order.created', async (userId) => {
  await redis.del(`cart:${userId}`);
});
```

### 3.4 Database Scaling

#### Read Replicas

```
Primary DB (Writes)
  ├─ Read Replica 1 (Product queries)
  ├─ Read Replica 2 (Order history)
  └─ Read Replica 3 (Analytics)
```

**Prisma Configuration:**

```javascript
const prismaWrite = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL_PRIMARY } }
});

const prismaRead = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL_REPLICA } }
});

class DatabaseRouter {
  async query(operation) {
    if (operation.type === 'write') {
      return prismaWrite[operation.model][operation.method](operation.params);
    } else {
      return prismaRead[operation.model][operation.method](operation.params);
    }
  }
}
```

**Connection Pooling:**

```javascript
const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
  pool: {
    min: 10,
    max: 100,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000
  }
});
```

### 3.5 Load Balancing (Nginx)

```nginx
upstream nodejs_backend {
    least_conn;
    
    server api-1.internal:3000 max_fails=3 fail_timeout=30s;
    server api-2.internal:3000 max_fails=3 fail_timeout=30s;
    server api-3.internal:3000 max_fails=3 fail_timeout=30s;
    
    keepalive 32;
}

server {
    listen 80;
    server_name api.ecommerce.com;
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    
    location /api/ {
        limit_req zone=api_limit burst=20 nodelay;
        
        proxy_pass http://nodejs_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        
        # Timeouts
        proxy_connect_timeout 5s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    location /health {
        access_log off;
        return 200 "OK\n";
    }
}
```

### 3.6 Capacity Planning

#### 10K Concurrent Users

**Infrastructure:**
- 3 Node.js API (2 CPU, 4GB each)
- 2 Python chatbot (2 CPU, 8GB each)
- 1 PostgreSQL primary + 1 replica
- 1 Redis (4GB)

**Expected:**
- API Response: 50-100ms (p95)
- Chatbot: 1-1.5s (p95)
- DB CPU: 30-40%
- Cache Hit: 85-90%

#### 50K Concurrent Users

**Infrastructure:**
- 10 Node.js API (4 CPU, 8GB each)
- 5 Python chatbot (4 CPU, 16GB each)
- 1 PostgreSQL primary + 3 replicas
- Redis Cluster (3 nodes, 16GB each)

**Expected:**
- API Response: 100-150ms (p95)
- Chatbot: 1.5-2s (p95)
- DB CPU: 50-60%
- Cache Hit: 90-93%

#### 100K Concurrent Users

**Infrastructure:**
- 25 Node.js API (4 CPU, 8GB each)
- 12 Python chatbot (4 CPU, 16GB each)
- 1 PostgreSQL primary + 5 replicas
- Redis Cluster (6 nodes, 32GB each)

**Expected:**
- API Response: 150-200ms (p95)
- Chatbot: 2-2.5s (p95)
- DB CPU: 60-70%
- Cache Hit: 93-95%

**Cost:** ~$13,300/month

---

## 4. Security & Monitoring

### 4.1 Authentication (JWT)

```javascript
// Registration
async function registerUser(userData) {
  const passwordHash = await bcrypt.hash(userData.password, 12);
  
  const user = await prisma.user.create({
    data: {
      username: userData.username,
      name: userData.name,
      email: userData.email,
      passwordHash,
      role: 'user'
    }
  });
  
  delete user.passwordHash;
  return user;
}

// Login
async function loginUser(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    throw new Error('Invalid credentials');
  }
  
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  delete user.passwordHash;
  return { user, token };
}

// Middleware
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Auth required' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

// Authorization
function requireRole(allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}
```

### 4.2 PII Handling

**Data Classification:**

| Data | Classification | Encryption | Retention |
|------|---------------|------------|-----------|
| Password | Sensitive | Bcrypt | Permanent |
| Email | PII | At rest | Until deletion |
| Phone | PII | At rest | Until deletion |
| Chat | Sensitive | At rest | 90 days |
| Orders | Business | At rest | 7 years |
| Payment | Sensitive | **Not stored** | N/A |

**Encryption:**

```javascript
const crypto = require('crypto');

class DataEncryption {
  constructor() {
    this.algorithm = 'aes-256-gcm';
    this.key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  }
  
  encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    
    return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
  }
  
  decrypt(encryptedData) {
    const [ivHex, authTagHex, encrypted] = encryptedData.split(':');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(ivHex, 'hex')
    );
    decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
```

**GDPR Compliance:**

```javascript
// Right to be forgotten
async function deleteUserData(userId) {
  await prisma.$transaction([
    // Anonymize orders
    prisma.order.updateMany({
      where: { userId },
      data: { userId: 'DELETED_USER' }
    }),
    // Delete personal data
    prisma.chatSession.deleteMany({ where: { userId } }),
    prisma.shoppingBag.deleteMany({ where: { userId } }),
    prisma.user.delete({ where: { id: userId } })
  ]);
}

// Data export
async function exportUserData(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      orders: { include: { items: true } },
      chatSessions: { include: { messages: true } }
    }
  });
  
  delete user.passwordHash;
  return user;
}
```

### 4.3 Monitoring (Prometheus)

```javascript
const client = require('prom-client');
const register = new client.Registry();

// Metrics
const httpDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.3, 0.5, 1, 3, 5, 10]
});

const chatbotDuration = new client.Histogram({
  name: 'chatbot_response_time_seconds',
  help: 'Chatbot response time',
  labelNames: ['intent', 'provider'],
  buckets: [0.5, 1, 2, 3, 5, 10, 20]
});

const llmCost = new client.Counter({
  name: 'llm_cost_total_usd',
  help: 'Total LLM costs',
  labelNames: ['provider', 'model']
});

register.registerMetric(httpDuration);
register.registerMetric(chatbotDuration);
register.registerMetric(llmCost);

// Track request duration
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpDuration.labels(req.method, req.route?.path || 'unknown', res.statusCode).observe(duration);
  });
  next();
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

**Key Metrics:**

| Category | Metrics | Target |
|----------|---------|--------|
| **API** | Request duration (p95) | < 200ms |
| | Error rate | < 0.1% |
| **Chatbot** | Response time (p95) | < 2s |
| | Intent accuracy | > 90% |
| | User satisfaction | > 4.0/5 |
| **Database** | Query duration (p95) | < 50ms |
| | Connection pool | < 80% |
| **Cache** | Hit rate | > 85% |
| **Cost** | LLM per conversation | < $0.003 |

### 4.4 Logging (Winston)

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'ecommerce-api',
    environment: process.env.NODE_ENV
  },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Request logging
app.use((req, res, next) => {
  req.requestId = crypto.randomUUID();
  logger.info('Request', {
    requestId: req.requestId,
    method: req.method,
    url: req.url,
    userId: req.user?.userId
  });
  next();
});

// Error logging
app.use((err, req, res, next) => {
  logger.error('Error', {
    requestId: req.requestId,
    error: { message: err.message, stack: err.stack },
    url: req.url
  });
  res.status(500).json({ error: 'Internal error', requestId: req.requestId });
});
```

### 4.5 CI/CD Pipeline

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy_staging
  - deploy_production

test:
  stage: test
  image: node:20
  script:
    - npm ci
    - npx prisma migrate deploy
    - npm run test
    - npm run lint

build:
  stage: build
  image: docker:latest
  script:
    - docker build -t registry/api:$CI_COMMIT_SHA .
    - docker push registry/api:$CI_COMMIT_SHA

deploy_staging:
  stage: deploy_staging
  script:
    - kubectl set image deployment/api api=registry/api:$CI_COMMIT_SHA -n staging
    - kubectl rollout status deployment/api -n staging
  only:
    - develop

deploy_production:
  stage: deploy_production
  script:
    - kubectl set image deployment/api api=registry/api:$CI_COMMIT_SHA -n prod
    - kubectl rollout status deployment/api -n prod
  when: manual
  only:
    - main
```

---

## 5. Key Technical Challenges

### 5.1 Challenge #1: Context Management

**Problem:** Maintain context across long conversations without exceeding token limits or costs.

**Solution:**

```python
class ConversationContextManager:
    def __init__(self, vectorstore, llm):
        self.vectorstore = vectorstore
        self.llm = llm
        self.max_recent = 5
    
    async def build_context(self, session_id, current_query):
        messages = await self.get_messages(session_id)
        
        # Keep recent messages in full
        recent = messages[-self.max_recent:]
        older = messages[:-self.max_recent]
        
        # Summarize older messages
        summary = await self.summarize(older) if older else ""
        
        # Extract key facts
        key_facts = self.extract_facts(messages)
        
        # RAG: Get relevant products/FAQs
        relevant = await self.vectorstore.similarity_search(current_query, k=5)
        
        return {
            "summary": summary,
            "recent": recent,
            "key_facts": key_facts,
            "relevant_info": relevant
        }
    
    async def summarize(self, messages):
        conversation = "\n".join([f"{m['type']}: {m['content']}" for m in messages])
        prompt = f"""
        Summarize concisely (max 100 words):
        {conversation}
        """
        return await self.llm.generate(prompt, max_tokens=150, model="gemini-flash")
    
    def extract_facts(self, messages):
        facts = {
            "user_preferences": {"brands": [], "price_range": None},
            "products_discussed": [],
            "intent_history": []
        }
        
        for msg in messages:
            if msg.get('intent') == 'product_search':
                filters = msg.get('metadata', {}).get('filters', {})
                if filters.get('brand'):
                    facts['user_preferences']['brands'].append(filters['brand'])
            facts['intent_history'].append(msg.get('intent'))
        
        return facts
```

### 5.2 Challenge #2: Conversation Quality

**Problem:** LLMs hallucinate product info; need accuracy with natural language.

**Solution: Function Calling + Validation**

```python
from pydantic import BaseModel

# Define tools
class ProductSearchTool(BaseModel):
    query: str
    category: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None

# Implement tools
async def search_products(params: ProductSearchTool):
    where = {'isActive': True}
    
    if params.category:
        category = await prisma.category.find_first(
            where={'name': {'contains': params.category}}
        )
        if category:
            where['categoryId'] = category.id
    
    if params.min_price or params.max_price:
        where['basePrice'] = {}
        if params.min_price:
            where['basePrice']['gte'] = params.min_price
        if params.max_price:
            where['basePrice']['lte'] = params.max_price
    
    products = await prisma.product.find_many(
        where=where,
        include={'variants': True, 'images': True},
        take=10
    )
    
    return [format_product(p) for p in products]

# Validation layer
class ResponseValidator:
    async def validate_product_info(self, response, mentioned_products):
        for product_id in mentioned_products:
            product = await prisma.product.find_unique(where={'id': product_id})
            if not product:
                return False
        return True
    
    async def validate_price(self, product_id, mentioned_price):
        product = await prisma.product.find_unique(where={'id': product_id})
        if not product:
            return False
        
        # Allow 1% variance
        if abs(float(product.basePrice) - mentioned_price) / float(product.basePrice) > 0.01:
            return False
        return True
```

**Indonesian Language Quality:**

```python
INDONESIAN_STYLE_GUIDE = """
Tone: Informal but respectful (kamu/Anda based on context)
Be warm, friendly, natural

Good examples:
✅ "Ada beberapa sepatu kets keren yang cocok untuk kamu"
✅ "Harganya Rp 299.000, stoknya masih banyak kok"

Bad examples:
❌ "Saya menemukan produk berikut untuk Anda" (too formal)
❌ "Produk ini memiliki spesifikasi..." (robotic)

Price: Always "Rp" with thousand separators (Rp 299.000)
"""
```

### 5.3 Challenge #3: Error Handling

**Problem:** API failures, invalid inputs, stock issues - must maintain conversation flow.

**Solution:**

```python
from enum import Enum

class ErrorSeverity(Enum):
    LOW = "low"      # Can continue
    MEDIUM = "medium"  # Degraded
    HIGH = "high"    # Must escalate

class ErrorHandler:
    def __init__(self):
        self.error_counts = {}
    
    async def handle_error(self, error, session_id, context):
        severity = self.classify_error(error)
        self.increment_error_count(session_id, type(error).__name__)
        
        if severity == ErrorSeverity.LOW:
            return {
                'message': "Maaf, bisa kamu jelaskan lebih spesifik?",
                'suggestions': ["Cari sepatu olahraga", "Lihat kategori pakaian"]
            }
        
        elif severity == ErrorSeverity.MEDIUM:
            return {
                'message': "Responsnya agak lama. Saya coba lagi ya...",
                'action': 'retry'
            }
        
        else:  # HIGH
            error_count = self.get_error_count(session_id)
            if error_count > 3:
                return {
                    'message': "Maaf gangguan teknis. Biar saya hubungkan dengan CS.",
                    'action': 'escalate_to_human'
                }
```

**Error Messages (Indonesian):**

```python
ERROR_MESSAGES = {
    'product_not_found': "Hmm, produknya tidak ketemu. Coba kata kunci lain?",
    'out_of_stock': "Maaf, produk ini habis 😢 Mau lihat yang serupa?",
    'cart_add_failed': "Gagal menambah ke keranjang. Coba lagi?",
    'timeout': "Prosesnya lama. Kamu mau tunggu atau coba cara lain?",
    'escalate': "Biar saya hubungkan dengan CS. Tunggu sebentar! 👨‍💼"
}
```

### 5.4 Challenge #4: Stock Synchronization

**Problem:** Prevent overselling with concurrent cart adds.

**Solution: Optimistic Locking**

```javascript
async function addToCartWithStockCheck(userId, variantId, quantity) {
  const maxRetries = 3;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await prisma.$transaction(async (tx) => {
        // 1. Get stock with lock
        const variant = await tx.productVariant.findUnique({
          where: { id: variantId }
        });
        
        if (variant.stockQuantity < quantity) {
          throw new Error(`Insufficient stock: ${variant.stockQuantity} available`);
        }
        
        // 2. Check existing cart
        const existing = await tx.shoppingBag.findFirst({
          where: { userId, productVariantId: variantId }
        });
        
        if (existing) {
          const newQty = existing.quantity + quantity;
          if (variant.stockQuantity < newQty) {
            throw new Error(`Can't add ${quantity} more. Already have ${existing.quantity}`);
          }
          await tx.shoppingBag.update({
            where: { id: existing.id },
            data: { quantity: newQty }
          });
        } else {
          await tx.shoppingBag.create({
            data: { userId, productVariantId: variantId, quantity }
          });
        }
        
        // 3. Reserve stock
        await tx.productVariant.update({
          where: { id: variantId },
          data: { stockQuantity: { decrement: quantity } }
        });
        
        return { success: true };
      }, {
        isolationLevel: 'Serializable',
        timeout: 5000
      });
    } catch (error) {
      if (error.code === 'P2034' && attempt < maxRetries - 1) {
        // Retry with exponential backoff
        await new Promise(r => setTimeout(r, 100 * Math.pow(2, attempt)));
        continue;
      }
      throw error;
    }
  }
}

// Cart expiration (30 min)
async function expireOldCarts() {
  const threshold = new Date(Date.now() - 30 * 60 * 1000);
  
  const expired = await prisma.shoppingBag.findMany({
    where: { updatedAt: { lt: threshold } },
    include: { productVariant: true }
  });
  
  await prisma.$transaction([
    ...expired.map(item =>
      prisma.productVariant.update({
        where: { id: item.productVariantId },
        data: { stockQuantity: { increment: item.quantity } }
      })
    ),
    prisma.shoppingBag.deleteMany({
      where: { updatedAt: { lt: threshold } }
    })
  ]);
}

// Run every 5 minutes
setInterval(expireOldCarts, 5 * 60 * 1000);
```

**Real-time Stock Updates:**

```javascript
// WebSocket notifications
io.on('connection', (socket) => {
  socket.on('subscribe_product', (productId) => {
    socket.join(`product:${productId}`);
  });
});

async function updateProductStock(productId, variantId, newStock) {
  await prisma.productVariant.update({
    where: { id: variantId },
    data: { stockQuantity: newStock }
  });
  
  io.to(`product:${productId}`).emit('stock_updated', {
    productId,
    variantId,
    stockQuantity: newStock
  });
}
```

### 5.5 Challenge #5: Cost Control

**Problem:** LLM costs can balloon; need budget control.

**Solution:**

```python
class CostOptimizationManager:
    def __init__(self):
        self.daily_budget = 100.0  # $100/day
        self.hourly_budget = self.daily_budget / 24
        self.current_hour_spend = 0.0
    
    def should_use_llm(self, session_id, query_type):
        # Check budget
        if self.current_hour_spend >= self.hourly_budget * 0.9:
            # Only for high-value
            return query_type in ['product_recommendation', 'complex_query']
        
        # Premium users always get LLM
        if self.get_user_tier(session_id) == 'premium':
            return True
        
        # Check cache
        if self.has_cached_response(query_type):
            return False
        
        return True
    
    def track_cost(self, provider, model, input_tokens, output_tokens):
        costs = {
            'gemini_flash': {'input': 0.075, 'output': 0.30},
            'claude_sonnet': {'input': 3.00, 'output': 15.00}
        }
        
        model_costs = costs.get(f"{provider}_{model}", costs['gemini_flash'])
        cost = (
            (input_tokens / 1_000_000) * model_costs['input'] +
            (output_tokens / 1_000_000) * model_costs['output']
        )
        
        self.current_hour_spend += cost
        llm_cost_metric.labels(provider, model).inc(cost)
        
        return cost

async def monitor_costs():
    if cost_manager.current_hour_spend > cost_manager.hourly_budget:
        await send_alert(f"LLM costs exceeded: ${cost_manager.current_hour_spend:.2f}")
        await switch_to_economy_mode()

async def switch_to_economy_mode():
    config.primary_llm = "gemini_flash"
    config.max_output_tokens = 100  # Down from 200
    config.cache_ttl = 3600  # 1 hour
    config.rule_based_threshold = 0.6  # More aggressive
```

---

## 6. Deployment Strategy

### 6.1 Docker Compose (Development)

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: ecommerce
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
  
  api:
    build: ./api
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://dev:dev123@postgres:5432/ecommerce
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis
  
  chatbot:
    build: ./chatbot
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://dev:dev123@postgres:5432/ecommerce
      GEMINI_API_KEY: ${GEMINI_API_KEY}
    depends_on:
      - postgres

volumes:
  postgres_data:
```

### 6.2 Kubernetes Production

```yaml
# api-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 5
  template:
    spec:
      containers:
      - name: api
        image: registry/api:latest
        resources:
          requests:
            cpu: "500m"
            memory: "512Mi"
          limits:
            cpu: "1000m"
            memory: "1Gi"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    kind: Deployment
    name: api
  minReplicas: 5
  maxReplicas: 50
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        averageUtilization: 70
```

### 6.3 Blue-Green Deployment

```bash
#!/bin/bash
# deploy.sh

# Deploy green
kubectl apply -f api-green.yaml
kubectl rollout status deployment/api-green

# Smoke test
npm run test:smoke -- --env=green

if [ $? -ne 0 ]; then
  kubectl delete deployment/api-green
  exit 1
fi

# Switch traffic
kubectl patch service api -p '{"spec":{"selector":{"version":"green"}}}'

# Monitor 5 min
sleep 300

# Check errors
ERROR_RATE=$(curl prometheus/query?error_rate)
if [ "$ERROR_RATE" > "0.01" ]; then
  # Rollback
  kubectl patch service api -p '{"spec":{"selector":{"version":"blue"}}}'
  exit 1
fi

# Delete old
kubectl delete deployment/api-blue
```

---

## 7. Cost Estimation

### 7.1 Monthly Breakdown (100K Conversations)

| Category | Item | Cost |
|----------|------|------|
| **Compute** | API Servers (25 pods) | $3,500 |
| | Chatbot Servers (12 pods) | $2,800 |
| | Load Balancers | $500 |
| **Database** | PostgreSQL Primary | $1,200 |
| | Read Replicas (3x) | $1,800 |
| | Backups | $100 |
| **Cache** | Redis Cluster (6 nodes) | $1,500 |
| **Storage** | Block (2TB) | $200 |
| | Object (500GB) | $10 |
| **CDN** | 5TB bandwidth | $300 |
| **LLM APIs** | Gemini (80K conv) | $240 |
| | Claude (15K conv) | $450 |
| | Fallback (5K) | $100 |
| **Vector DB** | Pinecone Standard | $70 |
| **Monitoring** | Datadog/New Relic | $400 |
| | Sentry | $50 |
| **Security** | WAF | $200 |
| **Misc** | DNS, etc | $150 |
| **TOTAL** | | **$13,570/month** |

**Per Conversation:** $0.14  
**Per User (10 conv/month):** $1.40

### 7.2 Scaling Economics

| Conversations/Month | Infrastructure | LLM | Total | Per Conv |
|---------------------|---------------|-----|-------|----------|
| 10K | $3,000 | $69 | $3,069 | $0.31 |
| 50K | $6,500 | $345 | $6,845 | $0.14 |
| 100K | $12,000 | $690 | $12,690 | $0.13 |
| 500K | $28,000 | $3,450 | $31,450 | $0.06 |
| 1M | $45,000 | $6,900 | $51,900 | $0.05 |

---

## Conclusion

This architecture provides a production-ready e-commerce chatbot system with:

### ✅ Core Strengths

1. **Scalability**: Handles 100K+ concurrent users with horizontal scaling
2. **Performance**: <2s chatbot responses, <200ms API responses
3. **Cost Efficiency**: ~$0.003/conversation with optimizations
4. **Reliability**: 99.9% uptime with comprehensive error handling
5. **Security**: JWT auth, encryption, GDPR compliance

### 🎯 Key Design Decisions

- **Multi-provider LLM** (Gemini primary, Claude fallback) balances cost/quality
- **Aggressive caching** (85%+ hit rate) critical for performance
- **Function calling + validation** prevents hallucinations
- **Optimistic locking** prevents overselling
- **Cost monitoring** ensures budget compliance

### 📋 Implementation Phases

**Phase 1 (Weeks 1-2):** Infrastructure, database, basic API  
**Phase 2 (Weeks 3-4):** Chatbot with LangGraph, RAG setup  
**Phase 3 (Weeks 5-6):** Frontend, testing, optimization  
**Phase 4 (Week 7):** Staging, load testing, security audit  
**Phase 5 (Week 8):** Production deployment, monitoring

### 💡 Critical Success Factors

- ✅ Start simple - don't over-engineer
- ✅ Monitor everything - metrics drive decisions
- ✅ Optimize costs early - prevent surprises
- ✅ Test failures - graceful degradation is key
- ✅ Plan for scale - build for current needs

---

**Document Version:** 1.0  
**Last Updated:** February 2026  
**Contact:** [Your contact info]  
**Stack:** React 18 • Node 20 • Python 3.11 • PostgreSQL 16 • Redis 7 • LangGraph 0.2