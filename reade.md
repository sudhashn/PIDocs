# Professional Indemnity Insurance Platform - MVP

A React-based professional indemnity insurance platform specifically designed for doctors and medical practitioners in India. Built with mobile-first approach and optimized for busy healthcare professionals.

## ?? Features

### ? Implemented
- **Mobile-first responsive design** - Optimized for smartphones and tablets
- **4-step simplified journey** - Doctor info ? Practice info ? Coverage ? Quote
- **Real-time quote calculation** - Instant premium calculation based on specialty and experience
- **Sofove brand integration** - Professional blue gradient design theme
- **Touch-friendly interface** - 44px+ touch targets, thumb-friendly navigation
- **Smart form validation** - Prevents errors and guides users
- **Professional coverage options** - Multiple coverage amounts and add-ons
- **Indian market optimized** - ? currency, GST calculation, local specialties

### ?? Future Features (Placeholders Ready)
- **OCR Integration** - Photo upload for clinic signage recognition
- **Voice AI** - Quote-to-bind workflow through voice commands
- **Aadhaar Integration** - Instant KYC verification
- **Payment Gateway** - Secure payment processing
- **Policy Generation** - Instant policy documents

## ??? Tech Stack

- **Frontend**: React 18 + Hooks
- **Styling**: Tailwind CSS 3.3
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Architecture**: Ready for Spring Boot backend integration

## ?? Project Structure

```
src/
+-- components/
¦   +-- InsurancePlatform.jsx    # Main application component
+-- App.js                       # App wrapper
+-- index.js                     # React entry point
+-- index.css                    # Tailwind CSS imports + custom styles

public/
+-- index.html                   # HTML template with SEO optimization

package.json                     # Dependencies and scripts
tailwind.config.js              # Tailwind configuration with Sofove colors
README.md                       # This file
```

## ?? Getting Started

### Prerequisites
- Node.js 16+ and npm
- Git

### Installation

1. **Create the project directory**
   ```bash
   mkdir -p d:\Documents\Sofove\InsuranceRatingEngine\MVP\Claude
   cd d:\Documents\Sofove\InsuranceRatingEngine\MVP\Claude
   ```

2. **Copy all the files from artifacts to respective locations:**
   - Copy `package.json` to root directory
   - Create `src/` folder and copy:
     - `InsurancePlatform.jsx` to `src/components/`
     - `App.js` to `src/`
     - `index.js` to `src/`
     - `index.css` to `src/`
   - Create `public/` folder and copy `index.html`
   - Copy `tailwind.config.js` to root

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Install Tailwind CSS plugins**
   ```bash
   npm install -D @tailwindcss/forms
   ```

5. **Start development server**
   ```bash
   npm start
   ```

6. **Open browser**
   - Navigate to `http://localhost:3000`
   - Test the complete user journey

## ?? Configuration

### Environment Variables
Create `.env` file in root directory:
```env
REACT_APP_API_BASE_URL=http://localhost:8080/api/v1
REACT_APP_ENVIRONMENT=development
REACT_APP_VERSION=1.0.0
```

### API Integration
The application is structured to easily connect with Spring Boot backend:

```javascript
// Example API integration
const calculateQuote = async (formData) => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/quotes/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(formData)
  });
  return response.json();
};
```

## ?? Mobile Optimization

### Design Principles
- **Touch targets**: Minimum 44px for all interactive elements
- **Thumb navigation**: Important actions accessible within thumb reach
- **Progressive disclosure**: Show only relevant information per step
- **Fast loading**: Optimized images and minimal bundle size
- **Offline-ready**: Service worker support (ready to implement)

### Testing on Mobile
```bash
# Start dev server accessible on network
npm start -- --host 0.0.0.0

# Access from mobile device using your IP
# http://192.168.x.x:3000
```

## ?? Design System

### Colors (Sofove Brand)
```css
Primary Blue: #2563EB
Secondary Blue: #1E40AF  
Accent Blue: #3B82F6
Gradient: from-blue-500 to-blue-700
```

### Typography
- **Headers**: font-bold text-2xl to text-4xl
- **Body**: font-medium text-base
- **Small text**: text-sm text-gray-600

### Components
- **Cards**: rounded-xl with shadow-lg
- **Buttons**: gradient backgrounds with hover effects
- **Forms**: focus:ring-2 focus:ring-blue-500
- **Progress**: White indicators on blue background

## ?? Security Considerations

- **Form validation**: Client and server-side validation required
- **HTTPS only**: All API calls must use HTTPS
- **Data sanitization**: All user inputs sanitized
- **IRDAI compliance**: Audit logging and data protection
- **CORS**: Properly configured for production domains

## ?? Deployment

### Build for Production
```bash
npm run build
```

### Docker Deployment
```dockerfile
FROM nginx:alpine
COPY build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Integration with Spring Boot
1. Update API endpoints in environment variables
2. Configure Kong API Gateway (see deployment guide)
3. Set up proper CORS configuration
4. Implement authentication flow

## ?? Analytics & Monitoring

### Recommended Integrations
- **Google Analytics 4**: User journey tracking
- **Hotjar**: User behavior analysis
- **Sentry**: Error monitoring
- **LogRocket**: Session replay for debugging

### Key Metrics to Track
- **Conversion Rate**: Users completing quote flow
- **Step Drop-off**: Where users abandon the process
- **Mobile vs Desktop**: Usage patterns
- **Quote-to-Purchase**: Conversion funnel
- **Load Times**: Performance monitoring

## ?? Contributing

### Development Workflow
1. Create feature branches from `main`
2. Follow component-based development
3. Test on mobile devices
4. Update documentation
5. Submit pull requests

### Code Style
- Use functional components with hooks
- Follow Tailwind CSS utility patterns
- Maintain responsive design principles
- Add PropTypes for type checking

## ?? Support

### Development Team Contact
- **Technical Lead**: [Your Name]
- **Product Owner**: Sofove Consulting
- **Architecture Reference**: See deployment guide artifact

### Resources
- **Deployment Guide**: Complete infrastructure setup documentation
- **Architecture Decisions**: Technology choices and rationale
- **API Documentation**: Spring Boot backend integration guide

## ?? Roadmap

### Phase 1 (Current)
- [x] Basic quote flow
- [x] Mobile-responsive design
- [x] Sofove branding
- [x] Form validation

### Phase 2 (Next)
- [ ] OCR integration for rural doctors
- [ ] Voice AI for busy practitioners  
- [ ] Aadhaar KYC integration
- [ ] Payment gateway

### Phase 3 (Future)
- [ ] Policy management
- [ ] Claims processing
- [ ] Agent portal
- [ ] Advanced analytics

---

**Built with ?? by Sofove Consulting for Indian healthcare professionals**