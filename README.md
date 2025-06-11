# STREETWEAR E-commerce Platform

A modern, responsive e-commerce platform specialized in streetwear fashion, built with React and microservices architecture.


## 🚀 Features

- **Modern UI/UX**
  - Responsive design for all devices
  - Glassmorphism effects
  - Smooth animations and transitions
  - Dark theme optimized for streetwear aesthetics

- **Product Management**
  - Category-based filtering
  - Price range filtering
  - Dynamic product grid
  - Detailed product views
  - Real-time stock updates

- **User Features**
  - User authentication (login/register)
  - Profile management
  - Order history
  - Wishlist functionality
  - Profile picture upload

- **Shopping Experience**
  - WhatsApp integration for direct communication
  - Ecuador-focused shipping (Quito only)
  - Secure payment gateway integration
  - Real-time order tracking

## 🛠 Tech Stack

- **Frontend**
  - React.js
  - CSS3 with modern features
  - Font Awesome icons
  - Responsive design principles

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - Microservices Architecture

- **API Gateway**
  - Express.js
  - HTTP-Proxy-Middleware
  - CORS support

- **DevOps**
  - Docker
  - Docker Compose
  - Nginx (reverse proxy)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- Docker
- Docker Compose
- Git

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git https://github.com/JustinGomezcoello/e-commerce
   cd e-commerce
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up API Gateway**
   ```bash
   cd ../api-gateway
   npm install
   ```

4. **Environment Configuration**
   Create `.env` files in both frontend and API Gateway directories:
   ```bash
   # Frontend .env
   REACT_APP_API_URL=http://localhost:8080
   
   # API Gateway .env
   PORT=8080
   USER_SERVICE_URL=http://service-users:3001
   PRODUCT_SERVICE_URL=http://service-products:3002
   ORDER_SERVICE_URL=http://service-orders:3003
   ```
5. **Rebuild and start Docker services**
   ```bash
   # Stop and remove existing containers
   docker-compose down

   # rebuild and start the containers:
   docker-compose up --build
   
   ```

6. **Start frontend development server**
   ```bash
   cd frontend
   npm start

   ```

## 🚀 Usage

After installation, you can access:
- Frontend: http://localhost:3000
- API Gateway: http://localhost:8080

### Available Services:
- Users Service: http://localhost:3001
- Products Service: http://localhost:3002
- Orders Service: http://localhost:3003

## 🔍 API Documentation

### API Gateway Endpoints

- **Authentication**
  - POST `/api/users/register` - Register new user
  - POST `/api/users/login` - User login
  - GET `/api/users/profile` - Get user profile

- **Products**
  - GET `/api/products` - Get all products
  - GET `/api/products/:id` - Get specific product
  - GET `/api/products/category/:category` - Get products by category

- **Orders**
  - POST `/api/orders` - Create new order
  - GET `/api/orders/user/:userId` - Get user orders
  - PUT `/api/orders/:id` - Update order status

## 🔐 Security

- JWT Authentication
- CORS protection
- Rate limiting
- Input validation
- Secure password hashing


## 🌟 Best Practices

- Component-based architecture
- Clean code principles
- Performance optimization
- SEO friendly
- Accessibility standards
- Error handling
- Loading states

## 🔄 Development Workflow

1. Make changes in development
2. Test locally
3. Build Docker images
4. Deploy to staging
5. Run tests
6. Deploy to production

## 🐛 Troubleshooting

Common issues and solutions:

1. **Services not connecting**
   ```bash
   # Check if all containers are running
   docker-compose ps
   
   # Check logs
   docker-compose logs -f
   ```

2. **Frontend not loading**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Reinstall dependencies
   rm -rf node_modules
   npm install
   ```



## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.



