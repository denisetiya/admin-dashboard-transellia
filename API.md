# 📡 Transellia Admin API Documentation

## 🎯 Overview

Dokumentasi lengkap API endpoints yang diperlukan untuk Transellia Admin Dashboard. API ini mendukung semua operasi CRUD untuk manajemen users, subscriptions, payments, stores, dan analytics.

## 🔐 Authentication

### Base URL
```
Production: https://api.transellia.com/v1
Development: http://localhost:3000/api/v1
```

### Authentication Headers
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
Accept: application/json
```

### Login Endpoint
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "admin@transellia.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "user": {
      "id": "admin123",
      "name": "Admin User",
      "email": "admin@transellia.com",
      "role": "admin",
      "avatar": "https://api.transellia.com/avatars/admin.jpg"
    }
  }
}
```

---

## 👥 Users Management

### Get All Users
```http
GET /users?page=1&limit=10&search=john&status=active&subscription=premium
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `search` (optional): Search by name or email
- `status` (optional): Filter by status (active, inactive)
- `subscription` (optional): Filter by subscription plan

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_123",
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "https://api.transellia.com/avatars/user_123.jpg",
        "role": "user",
        "status": "active",
        "registrationDate": "2023-01-15T00:00:00Z",
        "lastLogin": "2023-06-20T10:30:00Z",
        "subscription": {
          "id": "sub_456",
          "name": "Premium Plan",
          "status": "active",
          "expiryDate": "2023-12-31T00:00:00Z"
        },
        "stores": 2,
        "totalRevenue": 12500.00,
        "createdAt": "2023-01-15T00:00:00Z",
        "updatedAt": "2023-06-20T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 47,
      "itemsPerPage": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### Get Single User
```http
GET /users/{userId}
```

### Create New User
```http
POST /users
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user",
  "status": "active"
}
```

### Update User
```http
PUT /users/{userId}
```

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "status": "inactive",
  "subscription": {
    "planId": "sub_789",
    "expiryDate": "2024-12-31"
  }
}
```

### Delete User
```http
DELETE /users/{userId}
```

### User Statistics
```http
GET /users/statistics
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1247,
    "activeUsers": 1156,
    "inactiveUsers": 91,
    "newUsersThisMonth": 89,
    "usersWithSubscription": 945,
    "topUsersByRevenue": [
      {
        "userId": "user_123",
        "name": "John Doe",
        "totalRevenue": 15000.00
      }
    ]
  }
}
```

---

## 💳 Subscriptions Management

### Get All Subscriptions
```http
GET /subscriptions?page=1&limit=10&status=active
```

**Response:**
```json
{
  "success": true,
  "data": {
    "subscriptions": [
      {
        "id": "sub_123",
        "name": "Premium Plan",
        "description": "Advanced features for growing businesses",
        "price": 79.99,
        "currency": "USD",
        "duration": {
          "value": 1,
          "unit": "months"
        },
        "features": [
          "Unlimited products",
          "Advanced analytics",
          "Priority support",
          "5 stores",
          "Custom domain",
          "API access"
        ],
        "status": "active",
        "subscribersCount": 342,
        "totalRevenue": 27358.58,
        "createdAt": "2023-01-01T00:00:00Z",
        "updatedAt": "2023-06-01T00:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 2,
      "totalItems": 15,
      "itemsPerPage": 10
    }
  }
}
```

### Get Single Subscription
```http
GET /subscriptions/{subscriptionId}
```

### Create Subscription
```http
POST /subscriptions
```

**Request Body:**
```json
{
  "name": "Pro Plan",
  "description": "Professional features for businesses",
  "price": 149.99,
  "currency": "USD",
  "duration": {
    "value": 1,
    "unit": "months"
  },
  "features": [
    "Unlimited products",
    "Advanced analytics",
    "24/7 support"
  ],
  "status": "active"
}
```

### Update Subscription
```http
PUT /subscriptions/{subscriptionId}
```

### Delete Subscription
```http
DELETE /subscriptions/{subscriptionId}
```

### Subscription Analytics
```http
GET /subscriptions/analytics
```

---

## 💰 Payments Management

### Get All Payments
```http
GET /payments?page=1&limit=20&status=completed&dateFrom=2023-06-01&dateTo=2023-06-30&userId=user_123
```

**Query Parameters:**
- `page`, `limit`: Pagination
- `status`: Filter by payment status (completed, pending, failed, refunded)
- `dateFrom`, `dateTo`: Date range filter (ISO 8601 format)
- `userId`: Filter by specific user
- `subscriptionId`: Filter by subscription plan
- `paymentMethod`: Filter by payment method

**Response:**
```json
{
  "success": true,
  "data": {
    "payments": [
      {
        "id": "pay_123",
        "userId": "user_456",
        "userName": "John Doe",
        "userEmail": "john@example.com",
        "subscriptionId": "sub_789",
        "subscriptionName": "Premium Plan",
        "amount": 79.99,
        "currency": "USD",
        "paymentMethod": "credit_card",
        "paymentMethodDetails": {
          "brand": "visa",
          "last4": "4242",
          "expiryMonth": 12,
          "expiryYear": 2025
        },
        "status": "completed",
        "transactionDate": "2023-06-01T10:30:00Z",
        "transactionId": "txn_abc123",
        "invoice": {
          "invoiceId": "inv_456",
          "invoiceUrl": "https://api.transellia.com/invoices/inv_456.pdf"
        },
        "refund": null,
        "createdAt": "2023-06-01T10:25:00Z",
        "updatedAt": "2023-06-01T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 25,
      "totalItems": 487,
      "itemsPerPage": 20
    },
    "summary": {
      "totalAmount": 38599.53,
      "totalTransactions": 487,
      "successfulPayments": 465,
      "failedPayments": 22
    }
  }
}
```

### Get Single Payment
```http
GET /payments/{paymentId}
```

### Process Refund
```http
POST /payments/{paymentId}/refund
```

**Request Body:**
```json
{
  "amount": 79.99,
  "reason": "Customer request",
  "notifyCustomer": true
}
```

### Payment Analytics
```http
GET /payments/analytics?period=monthly&year=2023
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalRevenue": 245870.45,
    "totalTransactions": 3245,
    "averageTransactionValue": 75.82,
    "monthlyRevenue": [
      {
        "month": "2023-06",
        "revenue": 38599.53,
        "transactions": 487,
        "growth": 15.3
      }
    ],
    "paymentMethods": [
      {
        "method": "credit_card",
        "count": 2890,
        "percentage": 89.1
      },
      {
        "method": "paypal",
        "count": 355,
        "percentage": 10.9
      }
    ]
  }
}
```

---

## 🏪 Stores Management

### Get All Stores
```http
GET /stores?page=1&limit=15&status=active&ownerId=user_123&search=electronics
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stores": [
      {
        "id": "store_123",
        "name": "John's Electronics",
        "description": "Electronics and gadgets store",
        "ownerId": "user_456",
        "ownerName": "John Doe",
        "ownerEmail": "john@example.com",
        "status": "active",
        "logo": "https://api.transellia.com/stores/logos/store_123.jpg",
        "banner": "https://api.transellia.com/stores/banners/store_123.jpg",
        "categories": ["Electronics", "Gadgets", "Accessories"],
        "settings": {
          "currency": "USD",
          "timezone": "UTC",
          "language": "en"
        },
        "metrics": {
          "products": 125,
          "orders": 342,
          "revenue": 12500.00,
          "customers": 267
        },
        "performance": {
          "rating": 4.5,
          "reviews": 89,
          "responseTime": "2h",
          "fulfillmentRate": 98.5
        },
        "createdAt": "2023-01-20T00:00:00Z",
        "updatedAt": "2023-06-15T00:00:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 12,
      "totalItems": 178,
      "itemsPerPage": 15
    }
  }
}
```

### Get Single Store
```http
GET /stores/{storeId}
```

### Create Store
```http
POST /stores
```

**Request Body:**
```json
{
  "name": "My New Store",
  "description": "Description of the store",
  "ownerId": "user_123",
  "categories": ["Fashion", "Accessories"],
  "settings": {
    "currency": "USD",
    "timezone": "UTC",
    "language": "en"
  }
}
```

### Update Store
```http
PUT /stores/{storeId}
```

### Delete Store
```http
DELETE /stores/{storeId}
```

### Store Analytics
```http
GET /stores/{storeId}/analytics?period=monthly
```

---

## 📊 Income & Analytics

### Dashboard Statistics
```http
GET /dashboard/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalRevenue": 245870.45,
      "totalUsers": 1247,
      "totalStores": 178,
      "activeSubscriptions": 945
    },
    "revenueGrowth": {
      "currentMonth": 38599.53,
      "previousMonth": 33567.21,
      "growthPercentage": 15.0
    },
    "userGrowth": {
      "currentMonth": 89,
      "previousMonth": 67,
      "growthPercentage": 32.8
    },
    "topPerformingStores": [
      {
        "storeId": "store_123",
        "storeName": "John's Electronics",
        "revenue": 12500.00,
        "orders": 342
      }
    ],
    "recentActivity": [
      {
        "id": "activity_1",
        "type": "payment_completed",
        "description": "Payment of $79.99 completed by John Doe",
        "timestamp": "2023-06-21T10:30:00Z",
        "metadata": {
          "userId": "user_123",
          "amount": 79.99,
          "paymentId": "pay_456"
        }
      }
    ]
  }
}
```

### Income Analytics
```http
GET /analytics/income?period=monthly&year=2023&subscriptionId=sub_123
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalIncome": 245870.45,
    "period": "monthly",
    "year": 2023,
    "monthlyBreakdown": [
      {
        "month": "2023-01",
        "income": 18540.32,
        "transactions": 234,
        "subscriptionBreakdown": {
          "Basic Plan": 5620.00,
          "Premium Plan": 9840.32,
          "Enterprise Plan": 3080.00
        }
      }
    ],
    "subscriptionPerformance": [
      {
        "subscriptionId": "sub_123",
        "subscriptionName": "Premium Plan",
        "totalRevenue": 156789.45,
        "subscribers": 1967,
        "averageMonthlyRevenue": 13065.79
      }
    ],
    "trends": {
      "averageGrowthRate": 12.5,
      "peakMonth": "2023-06",
      "peakRevenue": 38599.53
    }
  }
}
```

### Export Data
```http
GET /analytics/export?type=income&format=csv&dateFrom=2023-01-01&dateTo=2023-12-31
```

**Query Parameters:**
- `type`: Data type (income, users, payments, stores)
- `format`: Export format (csv, excel, pdf)
- `dateFrom`, `dateTo`: Date range

---

## 🔍 Search & Filters

### Global Search
```http
GET /search?query=john&types=users,stores,payments&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_123",
        "type": "user",
        "name": "John Doe",
        "email": "john@example.com",
        "relevance": 0.95
      }
    ],
    "stores": [
      {
        "id": "store_456",
        "type": "store",
        "name": "John's Electronics",
        "owner": "John Doe",
        "relevance": 0.87
      }
    ],
    "payments": [],
    "totalResults": 2
  }
}
```

---

## 📈 Reports

### Generate Report
```http
POST /reports/generate
```

**Request Body:**
```json
{
  "reportType": "monthly_revenue",
  "parameters": {
    "startDate": "2023-06-01",
    "endDate": "2023-06-30",
    "includeCharts": true,
    "format": "pdf"
  },
  "recipients": ["admin@transellia.com"]
}
```

### Get Report Status
```http
GET /reports/{reportId}/status
```

### Download Report
```http
GET /reports/{reportId}/download
```

---

## 🔔 Notifications

### Get Notifications
```http
GET /notifications?page=1&limit=10&unread=true
```

### Mark as Read
```http
PUT /notifications/{notificationId}/read
```

### Get Notification Settings
```http
GET /settings/notifications
```

---

## ⚙️ Settings

### Get System Settings
```http
GET /settings/system
```

### Update System Settings
```http
PUT /settings/system
```

**Request Body:**
```json
{
  "siteName": "Transellia Admin",
  "currency": "USD",
  "timezone": "UTC",
  "emailNotifications": true,
  "maintenanceMode": false
}
```

---

## 📝 Error Responses

### Standard Error Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  },
  "timestamp": "2023-06-21T10:30:00Z",
  "requestId": "req_abc123"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `429` - Rate Limited
- `500` - Internal Server Error

---

## 🚀 Rate Limiting

```
Rate Limit: 1000 requests per hour
Rate Limit Headers:
- X-RateLimit-Limit: 1000
- X-RateLimit-Remaining: 999
- X-RateLimit-Reset: 1625097600
```

---

## 🔄 Webhooks

### Available Events
- `user.created`
- `user.updated` 
- `user.deleted`
- `payment.completed`
- `payment.failed`
- `subscription.created`
- `subscription.cancelled`
- `store.created`
- `store.suspended`

### Webhook Payload Example
```json
{
  "event": "payment.completed",
  "timestamp": "2023-06-21T10:30:00Z",
  "data": {
    "paymentId": "pay_123",
    "userId": "user_456",
    "amount": 79.99,
    "currency": "USD"
  }
}
```

---

## 📚 SDK & Libraries

### JavaScript/TypeScript
```bash
npm install @transellia/admin-sdk
```

### Usage Example
```typescript
import { TranselliaAdmin } from '@transellia/admin-sdk';

const client = new TranselliaAdmin({
  apiKey: 'your_api_key',
  environment: 'production' // or 'development'
});

// Get users
const users = await client.users.list({
  page: 1,
  limit: 10,
  status: 'active'
});

// Create subscription
const subscription = await client.subscriptions.create({
  name: 'Pro Plan',
  price: 149.99,
  features: ['Unlimited products', 'Priority support']
});
```

---

## 🧪 Testing

### Test Environment
```
Base URL: https://api-test.transellia.com/v1
Test API Key: test_sk_1234567890
```

### Test Data
Test environment includes sample users, payments, and subscriptions for development and testing purposes.

---

Dokumentasi ini mencakup semua endpoint yang diperlukan untuk frontend Transellia Admin Dashboard. Semua endpoint mendukung operasi CRUD lengkap dengan filtering, pagination, dan analytics yang diperlukan untuk dashboard yang komprehensif.