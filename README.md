# Event Management System - Comprehensive Testing Project

A full-stack web application testing project demonstrating modern testing practices including API testing, UI automation, performance testing, and bug discovery/documentation. This project showcases comprehensive testing methodologies applied to a React/Node.js event management platform.

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Testing Scope](#testing-scope)
- [Setup Instructions](#setup-instructions)
- [Testing Framework](#testing-framework)
- [Test Results](#test-results)
- [Bugs Found & Fixed](#bugs-found--fixed)
- [Performance Analysis](#performance-analysis)
- [Project Structure](#project-structure)
- [Test Reports](#test-Reports)
- [Key Learning Outcomes](#key-learning-outcomes)

## Project Overview

The Event Management System is a modern web-based platform that enables event creation, management, and RSVP functionality with role-based access control. This testing project demonstrates comprehensive quality assurance practices across multiple testing layers.

### Core Features Tested

**Admin Functionality:**
- User account management (create, delete, view)
- Event creation, updating, and deletion
- RSVP management and reporting
- JWT-based authentication with admin privileges

**User Functionality:**  
- User registration and authentication
- Event browsing and filtering
- RSVP to events
- Personal dashboard and profile management

**Security Features:**
- JWT token-based authentication
- Role-based access control (Admin/User)
- Input validation and sanitization
- Secure password hashing with bcrypt

## Technology Stack

**Frontend:**
- React.js with Material-UI components
- Responsive design for cross-device compatibility
- Client-side routing and state management

**Backend:**
- Node.js with Express.js framework
- RESTful API architecture
- JWT authentication middleware
- Input validation and error handling

**Database:**
- MariaDB with relational schema
- User, Event, and RSVP entity relationships
- Optimized queries and indexing

**Testing Tools:**
- **API Testing:** Postman with automated test suites
- **UI Automation:** Selenium WebDriver with Mocha
- **Performance Testing:** Apache JMeter (Load & Stress tests)
- **Database Testing:** SQL validation and data integrity checks

## System Architecture

```
Frontend (React)  ←→  Backend (Node.js/Express)  ←→  Database (MariaDB)
      ↓                        ↓                          ↓
  UI Testing              API Testing               SQL Testing
  (Selenium)              (Postman)                (Manual)
      ↓                        ↓                          
Performance Testing    Security Testing         
    (JMeter)             (JWT/Auth)              
```

## Testing Scope

### 1. API Testing (Postman)
**Coverage:** All 8 backend endpoints with comprehensive test scenarios

- **User Authentication:** Registration, login, profile management
- **Event Management:** CRUD operations with admin authorization
- **RSVP System:** Event registration and attendee management
- **Error Handling:** Invalid inputs, unauthorized access, missing resources

**Test Validation:**
- Response status codes and structure validation
- JSON schema verification
- Authentication token management
- Error message consistency

### 2. Frontend Automation (Selenium + Mocha)
**Coverage:** 11 comprehensive test scenarios

**Login & Authentication Tests:**
- Valid admin/user login verification
- Invalid credential handling
- Blank field validation
- Session management

**Navigation Tests:**
- Multi-page navigation flows
- Authentication state persistence  
- Logout functionality
- Registration/login page transitions

**Event Management Tests:**
- Admin event creation workflow
- Event deletion functionality
- Form validation and submission

**RSVP Functionality Tests:**
- End-to-end RSVP workflow
- User event registration
- RSVP status validation and confirmation

### 3. Performance Testing (JMeter)
**Load Test Configuration:**
- 10 concurrent users over 2 minutes
- Sequential workflow: Login → Get Events → RSVP
- Continuous load with realistic user behavior

**Stress Test Configuration:**
- Gradual load increase: 0→5→10→15 users  
- Progressive stress testing methodology
- System breaking point identification

### 4. Database Testing (SQL)
**Setup and Validation:**
- Schema creation and relationship validation
- Test data creation with proper constraints
- User role assignment and permission testing
- Data integrity and referential constraints

## Setup Instructions

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Update .env file with your database credentials:
DB_USER=root
DB_PASSWORD=your_password

# Initialize database
mysql -u username -p < create_database.sql

# Start backend server
npm run start
# Server runs on http://localhost:5000
```

### Frontend Setup
```bash
# Navigate to frontend directory (in new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm start
# Application runs on http://localhost:3000
```

### Test Environment Setup
```bash
# Selenium tests require ChromeDriver
# Install dependencies
npm install selenium-webdriver mocha chai

# Run frontend automation tests
mocha test_FrontEnd.js

# JMeter tests can be run via JMeter GUI
# Load the .jmx files and execute
```

## Testing Framework

### Test Data Management
**Pre-configured Test Users:**
```javascript
// Admin Account
email: admin@gmail.com
password: admin123

// Test Users
bassam@gmail.com / bassam123
ashraf@gmail.com / ashraf@123  
mohamed@gmail.com / Mohamed@Test_123
```

**Database Initialization:**
- Automated schema creation via SQL scripts
- Bcrypt password hashing for security
- Role-based user setup (admin/standard users)
- Sample event data for testing

### Authentication Flow Testing
- JWT token generation and validation
- Session persistence across requests
- Role-based access control verification
- Token expiration handling

## Test Results

### API Testing Results (Postman)
**Total Requests:** 8 endpoints fully tested
**Success Rate:** 100% after bug fixes
**Coverage:** All CRUD operations, authentication flows, and error scenarios

**Key Validations:**
- Schema compliance for all responses
- Proper HTTP status codes
- Authentication token functionality
- Error message accuracy

### UI Automation Results (Selenium)
**Total Test Cases:** 11 comprehensive scenarios
**Pass Rate:** 100% across all test scenarios
**Browser Compatibility:** Chrome (primary testing browser)

**Test Categories:**
- **Login Tests:** 5/5 passed (including edge cases)
- **Navigation Tests:** 3/3 passed  
- **Event Management:** 2/2 passed
- **RSVP Functionality:** 1/1 passed

### Performance Test Results (JMeter)

**Load Test Results:**
- **Duration:** 2 minutes with 10 concurrent users
- **Total Requests:** ~1,200 requests processed
- **Average Response Time:** <200ms
- **Error Rate:** 0%
- **Throughput:** ~10 requests/second

**Stress Test Results:**
- **Peak Load:** 15 concurrent users
- **System Stability:** Maintained under maximum load
- **Response Degradation:** Minimal increase in response times
- **Breaking Point:** Not reached within test parameters

## Bugs Found & Fixed

### Critical Backend Issues Discovered

**Bug #1: JWT Token Generation Issue**
- **Location:** `routes/auth.js`
- **Problem:** Static token generation preventing session management
- **Impact:** API test failures due to token reuse
- **Fix:** Added `loginTime: Date.now()` for unique token generation

**Bug #2: API Endpoint URL Error**
- **Location:** `app.js`
- **Problem:** Missing "/" in user profile endpoint URL
- **Impact:** 404 errors for profile requests
- **Fix:** Corrected endpoint from `api/users/profile` to `/api/users/profile`

**Bug #3: Registration Error Response**
- **Location:** `routes/auth.js` 
- **Problem:** Incorrect HTTP status code for duplicate email
- **Impact:** API specification non-compliance
- **Fix:** Changed from 500 to 400 status code with proper error message

### Testing Process Improvements
- Comprehensive error scenario documentation
- Automated regression testing implementation
- Performance baseline establishment
- Security vulnerability assessment

## Performance Analysis

### Load Testing Insights
- **Baseline Performance:** System handles normal user load efficiently
- **Response Times:** Consistent sub-200ms response times
- **Resource Utilization:** Optimal database connection handling
- **Scalability:** Linear performance scaling observed

### Stress Testing Findings
- **Concurrent User Limit:** Successfully tested up to 15 users
- **Failure Points:** No system failures observed within test scope
- **Recovery:** Graceful handling of peak loads
- **Recommendations:** Consider connection pooling for higher loads

## Project Structure

```
Event-Management-System-Testing/
├── docs/
│   ├── Project Description.pdf
│   ├── Backend API Specification.pdf
│   └── SQL commands description.pdf
├── tests/
│   ├── frontend/
│   │   ├── test_FrontEnd.js
│   │   └── config_test_FrontEnd.js
│   ├── backend/
│   │   └── test_backend.js
│   ├── api/
│   │   ├── API Test.postman_collection.json
│   │   └── workspace.postman_globals.json
│   └── performance/
│       ├── Load Test Plan.jmx
│       ├── Stress Test Plan.jmx
│       ├── Report_Load.html
│       └── Report_Stress.html
├── sql/
│   └── create_database.sql
└── README.md
```

## Documentation

### Test Reports
- [Test Cases Report](Reports/Event_Management_System_Test_Case_Report.pdf) - Comprehensive documentation of all 19 test cases with execution details
- [Bug Report](Reports/Event_Management_System_Bug_Report_Full.pdf) - Detailed analysis of 3 backend bugs with root cause and fixes

## Key Learning Outcomes

### Technical Skills Demonstrated
- **Full-Stack Testing:** End-to-end testing across all application layers
- **Test Automation:** Comprehensive automation framework implementation  
- **Performance Engineering:** Load and stress testing methodology
- **Bug Discovery:** Systematic defect identification and resolution
- **Tool Proficiency:** Advanced usage of Postman, Selenium, and JMeter

### Quality Assurance Practices
- **Test Planning:** Comprehensive test case design and documentation
- **Risk Assessment:** Critical path identification and prioritization
- **Regression Testing:** Automated test suite for continuous validation
- **Performance Baseline:** Establishing system performance benchmarks

### Professional Development
- **Documentation:** Clear, comprehensive project documentation
- **Problem Solving:** Root cause analysis and systematic debugging
- **Tool Integration:** Multi-tool testing workflow coordination
- **Best Practices:** Industry-standard testing methodologies

## Future Enhancements

### Testing Improvements
- **CI/CD Integration:** Automated test execution in build pipeline
- **Cross-Browser Testing:** Extended Selenium test coverage
- **API Security Testing:** Vulnerability assessment automation
- **Mobile Testing:** Responsive design validation

### System Improvements  
- **Database Optimization:** Query performance enhancements
- **Caching Strategy:** Redis implementation for better performance
- **Monitoring:** Application performance monitoring setup
- **Security Hardening:** Additional authentication mechanisms

## Contributing

This project serves as a comprehensive testing portfolio demonstrating professional software testing capabilities across multiple domains including functional testing, automation, performance testing, and quality assurance practices.

---

**Developed by:** Bassam Ashraf  
**Testing Focus:** Full-Stack Web Application  
**Tools Used:** Postman, Selenium, JMeter, Mocha, MariaDB  
**Duration:** Complete testing lifecycle implementation

**Contact:** For questions about testing methodologies or project details, please refer to the comprehensive documentation provided in the project files.
