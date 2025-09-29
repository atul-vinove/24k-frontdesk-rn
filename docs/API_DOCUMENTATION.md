# 🔌 API Documentation - 24Karat Visitor Management System

This document outlines all the APIs required for the 24Karat Visitor Management Application. The backend developer can use this as a reference to implement the necessary endpoints and database schemas.

## 📋 Table of Contents

1. [Authentication APIs](#authentication-apis)
2. [Branch Management APIs](#branch-management-apis)
3. [Visitor Management APIs](#visitor-management-apis)
4. [Dynamic Data APIs](#dynamic-data-apis)
5. [Search & History APIs](#search--history-apis)
6. [Data Models](#data-models)
7. [Authentication & Security](#authentication--security)
8. [Error Handling](#error-handling)

---

## 🔐 Authentication APIs

### 1. User Login
**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and return access token with user profile information.

**Request Body:**
```json
{
  "email": "admin@24karat.co.in",
  "password": "password123",
  "branch": "Main Office"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "admin@24karat.co.in",
      "name": "Admin User",
      "branch": {
        "id": "branch_1",
        "name": "Main Office",
        "address": "123 Main Street, City"
      }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

### 2. Logout
**Endpoint:** `POST /api/auth/logout`

**Description:** Invalidate user session and token.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 🏢 Branch Management APIs

### 1. Get All Branches
**Endpoint:** `GET /api/branches`

**Description:** Retrieve list of all available branches for dropdown selection.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "branch_1",
      "name": "Main Office",
      "address": "123 Main Street, City",
      "phone": "+1-555-0100",
      "email": "main@24karat.co.in",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z"
    },
    {
      "id": "branch_2", 
      "name": "Branch A",
      "address": "456 Oak Avenue, City",
      "phone": "+1-555-0101",
      "email": "brancha@24karat.co.in",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

## 👥 Visitor Management APIs

### 1. Submit Visitor Information
**Endpoint:** `POST /api/visitors`

**Description:** Submit new visitor registration with photo and signature.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@email.com",
  "phone": "+1-555-0123",
  "purpose": "meeting",
  "source": "website",
  "photo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  "signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "branch": "Main Office",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "visitor_123",
    "name": "John Smith",
    "email": "john.smith@email.com",
    "phone": "+1-555-0123",
    "purpose": "meeting",
    "source": "website",
    "photo": "https://api.24karat.co.in/uploads/visitors/visitor_123_photo.jpg",
    "signature": "https://api.24karat.co.in/uploads/visitors/visitor_123_signature.png",
    "branch": "Main Office",
    "timestamp": "2024-01-15T10:30:00Z",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Visitor information recorded successfully"
}
```

### 2. Get Visitor by Phone Number
**Endpoint:** `GET /api/visitors/lookup?phone={phone_number}`

**Description:** Look up existing visitor information by phone number for form pre-filling.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `phone` (required): Phone number to search for

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "visitor_123",
    "name": "John Smith",
    "email": "john.smith@email.com",
    "phone": "+1-555-0123",
    "purpose": "meeting",
    "source": "website",
    "photo": "https://api.24karat.co.in/uploads/visitors/visitor_123_photo.jpg",
    "signature": "https://api.24karat.co.in/uploads/visitors/visitor_123_signature.png",
    "branch": "Main Office",
    "lastVisit": "2024-01-15T10:30:00Z",
    "visitCount": 3
  }
}
```

### 3. Get Visitor History
**Endpoint:** `GET /api/visitors/history`

**Description:** Retrieve visitor history with pagination and search capabilities.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `branch` (optional): Filter by branch
- `search` (optional): Search by name, email, or phone
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `sortBy` (optional): Sort field (default: timestamp)
- `sortOrder` (optional): Sort direction (asc/desc, default: desc)

**Response:**
```json
{
  "success": true,
  "data": {
    "visitors": [
      {
        "id": "visitor_123",
        "name": "John Smith",
        "email": "john.smith@email.com",
        "phone": "+1-555-0123",
        "purpose": "meeting",
        "source": "website",
        "photo": "https://api.24karat.co.in/uploads/visitors/visitor_123_photo.jpg",
        "signature": "https://api.24karat.co.in/uploads/visitors/visitor_123_signature.png",
        "branch": "Main Office",
        "timestamp": "2024-01-15T10:30:00Z",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 100,
      "itemsPerPage": 20
    }
  }
}
```

### 4. Get Visitor Details
**Endpoint:** `GET /api/visitors/{visitor_id}`

**Description:** Get detailed information for a specific visitor.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "visitor_123",
    "name": "John Smith",
    "email": "john.smith@email.com",
    "phone": "+1-555-0123",
    "purpose": "meeting",
    "source": "website",
    "photo": "https://api.24karat.co.in/uploads/visitors/visitor_123_photo.jpg",
    "signature": "https://api.24karat.co.in/uploads/visitors/visitor_123_signature.png",
    "branch": "Main Office",
    "timestamp": "2024-01-15T10:30:00Z",
    "createdAt": "2024-01-15T10:30:00Z",
    "visitHistory": [
      {
        "id": "visit_456",
        "timestamp": "2024-01-15T10:30:00Z",
        "purpose": "meeting",
        "branch": "Main Office"
      }
    ]
  }
}
```

---

## 📊 Dynamic Data APIs

### 1. Get Visit Purposes
**Endpoint:** `GET /api/visit-purposes`

**Description:** Retrieve dynamic list of visit purposes for form dropdown.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "purpose_1",
      "label": "Meeting",
      "value": "meeting",
      "isActive": true,
      "sortOrder": 1
    },
    {
      "id": "purpose_2",
      "label": "Interview", 
      "value": "interview",
      "isActive": true,
      "sortOrder": 2
    },
    {
      "id": "purpose_3",
      "label": "Delivery",
      "value": "delivery", 
      "isActive": true,
      "sortOrder": 3
    },
    {
      "id": "purpose_4",
      "label": "Maintenance",
      "value": "maintenance",
      "isActive": true,
      "sortOrder": 4
    },
    {
      "id": "purpose_5",
      "label": "Consultation",
      "value": "consultation",
      "isActive": true,
      "sortOrder": 5
    },
    {
      "id": "purpose_6",
      "label": "Training",
      "value": "training",
      "isActive": true,
      "sortOrder": 6
    },
    {
      "id": "purpose_7",
      "label": "Other",
      "value": "other",
      "isActive": true,
      "sortOrder": 7
    }
  ]
}
```

### 2. Get Sources
**Endpoint:** `GET /api/sources`

**Description:** Retrieve dynamic list of sources (how visitors heard about us) for form dropdown.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "source_1",
      "label": "Website",
      "value": "website",
      "isActive": true,
      "sortOrder": 1
    },
    {
      "id": "source_2",
      "label": "Social Media",
      "value": "social_media",
      "isActive": true,
      "sortOrder": 2
    },
    {
      "id": "source_3",
      "label": "Referral",
      "value": "referral",
      "isActive": true,
      "sortOrder": 3
    },
    {
      "id": "source_4",
      "label": "Advertisement",
      "value": "advertisement",
      "isActive": true,
      "sortOrder": 4
    },
    {
      "id": "source_5",
      "label": "Walk-in",
      "value": "walk_in",
      "isActive": true,
      "sortOrder": 5
    },
    {
      "id": "source_6",
      "label": "Phone Call",
      "value": "phone_call",
      "isActive": true,
      "sortOrder": 6
    },
    {
      "id": "source_7",
      "label": "Other",
      "value": "other",
      "isActive": true,
      "sortOrder": 7
    }
  ]
}
```

---

## 🔍 Search & History APIs

### 1. Search Visitors (Future Scope)
**Endpoint:** `GET /api/visitors/search`

**Description:** Advanced search functionality for visitor history.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `q` (required): Search query
- `branch` (optional): Filter by branch
- `purpose` (optional): Filter by visit purpose
- `source` (optional): Filter by source
- `dateFrom` (optional): Start date filter (ISO 8601)
- `dateTo` (optional): End date filter (ISO 8601)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "visitors": [
      {
        "id": "visitor_123",
        "name": "John Smith",
        "email": "john.smith@email.com",
        "phone": "+1-555-0123",
        "purpose": "meeting",
        "source": "website",
        "photo": "https://api.24karat.co.in/uploads/visitors/visitor_123_photo.jpg",
        "signature": "https://api.24karat.co.in/uploads/visitors/visitor_123_signature.png",
        "branch": "Main Office",
        "timestamp": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 45,
      "itemsPerPage": 20
    },
    "filters": {
      "query": "john",
      "branch": "Main Office",
      "dateRange": {
        "from": "2024-01-01T00:00:00Z",
        "to": "2024-01-31T23:59:59Z"
      }
    }
  }
}
```

### 2. Get Dashboard Statistics (Future Scope)
**Endpoint:** `GET /api/dashboard/stats`

**Description:** Get dashboard statistics for the current user's branch.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `period` (optional): Time period (today, week, month, year)
- `branch` (optional): Specific branch (admin only)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalVisitors": 1250,
    "todayVisitors": 15,
    "weekVisitors": 89,
    "monthVisitors": 342,
    "topPurposes": [
      { "purpose": "meeting", "count": 45 },
      { "purpose": "consultation", "count": 32 },
      { "purpose": "interview", "count": 28 }
    ],
    "topSources": [
      { "source": "website", "count": 67 },
      { "source": "referral", "count": 43 },
      { "source": "walk_in", "count": 31 }
    ],
    "recentVisitors": [
      {
        "id": "visitor_123",
        "name": "John Smith",
        "timestamp": "2024-01-15T10:30:00Z",
        "purpose": "meeting"
      }
    ]
  }
}
```

---

## 📋 Data Models

### User Model
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  branch: Branch;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### Branch Model
```typescript
interface Branch {
  id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### Visitor Model
```typescript
interface Visitor {
  id: string;
  name: string;
  email?: string;
  phone: string;
  purpose: string;
  source: string;
  photo: string; // URL to uploaded image
  signature: string; // URL to uploaded signature
  branch: string;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}
```

### Visit Purpose Model
```typescript
interface VisitPurpose {
  id: string;
  label: string;
  value: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}
```

### Source Model
```typescript
interface Source {
  id: string;
  label: string;
  value: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}
```

---

## 🔒 Authentication & Security

### JWT Token Structure
```json
{
  "sub": "user_123",
  "email": "admin@24karat.co.in",
  "branch": "Main Office",
  "iat": 1640995200,
  "exp": 1641081600
}
```

### Required Headers
All authenticated endpoints require:
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Token Management
- Token-based authentication for admin access
- Backend handles token expiration and refresh logic

---

## ⚠️ Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Common Error Codes
- `UNAUTHORIZED` (401): Invalid or missing token
- `NOT_FOUND` (404): Resource not found
- `VALIDATION_ERROR` (422): Invalid input data
- `INTERNAL_ERROR` (500): Server error

### Rate Limiting
- **Login attempts**: 5 per minute per IP
- **API calls**: 1000 per hour per user
- **File uploads**: 10MB max per request

---

## 🚀 Implementation Notes

### Database Schema Recommendations

1. **Users Table**
   - Primary key: `id` (UUID)
   - Unique: `email`
   - Foreign key: `branch_id`

2. **Branches Table**
   - Primary key: `id` (UUID)
   - Unique: `name`

3. **Visitors Table**
   - Primary key: `id` (UUID)
   - Indexes: `phone`, `email`, `timestamp`, `branch_id`
   - Foreign key: `branch_id`

4. **Visit Purposes Table**
   - Primary key: `id` (UUID)
   - Unique: `value`

5. **Sources Table**
   - Primary key: `id` (UUID)
   - Unique: `value`

### File Storage
- Store photos and signatures in cloud storage (AWS S3, Google Cloud, etc.)
- Generate unique filenames: `{visitor_id}_{type}_{timestamp}.{extension}`
- Implement image optimization and compression
- Set appropriate file size limits (5MB for photos, 2MB for signatures)

### Security Considerations
- Implement rate limiting
- Use HTTPS for all endpoints
- Validate and sanitize all inputs
- Implement proper CORS policies
- Use environment variables for sensitive configuration
- Implement audit logging for all visitor data changes

### Performance Optimizations
- Implement database indexing on frequently queried fields
- Use pagination for large datasets
- Implement caching for static data (branches, purposes, sources)
- Optimize image storage and delivery
- Use database connection pooling

---

## 📱 Mobile App Integration

The mobile app will use these APIs in the following sequence:

1. **App Launch**: Call `GET /api/branches` to populate branch dropdown
2. **Login**: Call `POST /api/auth/login` with credentials and selected branch
3. **Form Load**: Call `GET /api/visit-purposes` and `GET /api/sources` for dropdowns
4. **Phone Lookup**: Call `GET /api/visitors/lookup?phone={phone}` when user enters phone
5. **Form Submit**: Call `POST /api/visitors` with visitor data
6. **History View**: Call `GET /api/visitors/history` for visitor list
7. **Search**: Call `GET /api/visitors/search` for filtered results (Future Scope)

This API structure provides a complete backend solution for the 24Karat Visitor Management System with all necessary endpoints for authentication, visitor management, dynamic data, and search functionality.
