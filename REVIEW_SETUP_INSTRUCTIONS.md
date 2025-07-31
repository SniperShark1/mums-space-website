# Review System Setup Instructions

## For App Developers: How to Integrate Review Button

### 1. Add Review Button to Your App

Add a "Write Review" or "Rate App" button in your app's settings, menu, or after positive user interactions.

### 2. Button Action - Open Website Review Page

When users tap the review button, open this URL in their default browser:

```
https://your-website-domain.com/reviews#review-form
```

**Example implementations:**

**React Native:**
```javascript
import { Linking } from 'react-native';

const openReviewPage = () => {
  const reviewUrl = 'https://your-website-domain.com/reviews#review-form';
  Linking.openURL(reviewUrl);
};
```

**Flutter:**
```dart
import 'package:url_launcher/url_launcher.dart';

void openReviewPage() async {
  final url = 'https://your-website-domain.com/reviews#review-form';
  if (await canLaunch(url)) {
    await launch(url);
  }
}
```

**Native Android (Java/Kotlin):**
```java
Intent browserIntent = new Intent(Intent.ACTION_VIEW, 
    Uri.parse("https://your-website-domain.com/reviews#review-form"));
startActivity(browserIntent);
```

**Native iOS (Swift):**
```swift
if let url = URL(string: "https://your-website-domain.com/reviews#review-form") {
    UIApplication.shared.open(url)
}
```

### 3. What Happens Next

1. User taps the review button in your app
2. Their default browser opens to the reviews page
3. The page automatically scrolls to the review form section
4. User can:
   - Enter their name (e.g., "Sarah M.")
   - Select 1-5 star rating by clicking stars
   - Write their review text
   - Submit the review
5. Review is automatically marked as "verified" since it came from the app
6. Review appears immediately on the public reviews page
7. User sees a success message

## For Website Admin: Review Management

### Review Form Features
- **Star Rating**: Interactive 1-5 star selection
- **User Name**: Text input for reviewer name
- **Review Text**: Textarea for detailed review
- **Auto-Verification**: Reviews from app are automatically marked as verified
- **Real-time Updates**: Reviews appear immediately on the reviews page

### API Endpoints
- **Submit Review**: `POST /api/reviews`
- **Get All Reviews**: `GET /api/reviews`
- **Download Stats**: `GET /api/download-stats`

### Review Data Structure
```json
{
  "userName": "Sarah M.",
  "rating": 5,
  "reviewText": "This app has been amazing for connecting with other mums!",
  "verified": true
}
```

## Best Practices

### For App Integration
1. **Timing**: Show review prompt after positive interactions (successful chat, helpful content, etc.)
2. **Frequency**: Don't spam users - limit to once per app version or significant time period
3. **Context**: Provide context like "Help other mums discover our community"
4. **Optional**: Make it clear that reviewing is optional and appreciated

### For Review Quality
1. **Authentic Names**: Encourage users to use real names with last initial (Sarah M.)
2. **Helpful Content**: Guide users to write helpful, specific reviews
3. **Positive Focus**: Reviews should highlight what users love about the app
4. **Community Impact**: Emphasize how reviews help other mothers find the community

## Technical Details

### Review Form Validation
- Name: Minimum 2 characters
- Rating: Required, 1-5 stars
- Review Text: Minimum 10 characters
- All fields are required

### Success Flow
1. Form submission shows loading state
2. API call creates review in database
3. Success message displays with green checkmark
4. Option to write another review
5. Reviews page refreshes to show new review

### Error Handling
- Network errors show retry option
- Validation errors highlight specific fields
- Server errors show user-friendly messages

## URL Parameters (Optional Enhancement)

You can pre-fill the form by adding URL parameters:

```
https://your-website-domain.com/reviews?userName=Sarah%20M.&rating=5#review-form
```

This would pre-populate the name field and star rating for a smoother user experience.

## Analytics & Monitoring

The system automatically tracks:
- Total number of reviews
- Average rating
- Review submission success/failure rates
- Most common review themes (manual analysis)

## Support

If you need help implementing this system or have questions about the integration, refer to the website's technical documentation or contact the development team.