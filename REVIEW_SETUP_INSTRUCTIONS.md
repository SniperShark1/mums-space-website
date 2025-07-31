# Review System Setup Instructions

## For App Developers: How to Integrate Review Button

### 1. Add Review Button to Your App

Add a "Write Review" or "Rate App" button in your app's settings, menu, or after positive user interactions.

### 2. Button Action - Open Website Review Page

When users tap the review button, open this URL with their username parameter:

```
https://your-website-domain.com/submit-review?userName=[USER_ONLINE_NAME]
```

**Important:** Replace `[USER_ONLINE_NAME]` with the actual user's online name from your app (e.g., "viplounger")

**Example implementations:**

**React Native:**
```javascript
import { Linking } from 'react-native';

const openReviewPage = (userName) => {
  const encodedUserName = encodeURIComponent(userName);
  const reviewUrl = `https://your-website-domain.com/submit-review?userName=${encodedUserName}`;
  Linking.openURL(reviewUrl);
};

// Usage example:
// openReviewPage("viplounger");
```

**Flutter:**
```dart
import 'package:url_launcher/url_launcher.dart';

void openReviewPage(String userName) async {
  final encodedUserName = Uri.encodeComponent(userName);
  final url = 'https://your-website-domain.com/submit-review?userName=$encodedUserName';
  if (await canLaunch(url)) {
    await launch(url);
  }
}

// Usage example:
// openReviewPage("viplounger");
```

**Native Android (Java/Kotlin):**
```java
// Java
public void openReviewPage(String userName) {
    String encodedUserName = URLEncoder.encode(userName, "UTF-8");
    String url = "https://your-website-domain.com/submit-review?userName=" + encodedUserName;
    Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
    startActivity(browserIntent);
}

// Kotlin
fun openReviewPage(userName: String) {
    val encodedUserName = URLEncoder.encode(userName, "UTF-8")
    val url = "https://your-website-domain.com/submit-review?userName=$encodedUserName"
    val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
    startActivity(browserIntent)
}

// Usage example:
// openReviewPage("viplounger");
```

**Native iOS (Swift):**
```swift
func openReviewPage(userName: String) {
    let encodedUserName = userName.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? ""
    let urlString = "https://your-website-domain.com/submit-review?userName=\(encodedUserName)"
    if let url = URL(string: urlString) {
        UIApplication.shared.open(url)
    }
}

// Usage example:
// openReviewPage("viplounger")
```

### 3. What Happens Next

1. User taps the review button in your app
2. Their default browser opens to the secure review submission page
3. System verifies they came from the app (checks for username parameter)
4. User can:
   - See their app username already filled in (e.g., "viplounger")
   - Select 1-5 star rating by clicking stars
   - Write their review text
   - Submit the review
5. Review is automatically marked as "verified" since it came from the app
6. Review appears immediately on the public reviews page with their online name
7. User sees a success message

**Security:** If someone tries to access the review form directly without coming from the app, they'll see an "Access Restricted" message and be redirected to view existing reviews only.

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
  "userName": "viplounger",
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
1. **Authentic Usernames**: User's app username automatically carries over (e.g., "viplounger")
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
https://your-website-domain.com/submit-review?userName=viplounger&rating=5
```

**Parameters:**
- `userName`: **Required** - User's online name from the app (automatically filled and read-only)
- `rating`: Optional pre-selected rating (1-5)

**Important:** The `userName` parameter is required for access. Without it, users will see an access restriction message.

## Analytics & Monitoring

The system automatically tracks:
- Total number of reviews
- Average rating
- Review submission success/failure rates
- Most common review themes (manual analysis)

## Support

If you need help implementing this system or have questions about the integration, refer to the website's technical documentation or contact the development team.