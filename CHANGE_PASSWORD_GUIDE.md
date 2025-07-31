# How to Change Your Admin Password

## Quick Steps to Change Password

1. **Open the admin panel file:**
   - Go to: `client/src/pages/admin-panel.tsx`
   - Look for line 191

2. **Find this line:**
   ```javascript
   <AdminAuth requiredPassword="MumsSpace2024!">
   ```

3. **Change the password to your own:**
   ```javascript
   <AdminAuth requiredPassword="YourNewPassword123!">
   ```

## Password Requirements
- **Minimum 12 characters** (enforced by the system)
- **Mix of letters and numbers** recommended
- **Special characters** allowed (!@#$%^&*)
- **No spaces** in the password

## Example Password Changes

**Current:**
```javascript
<AdminAuth requiredPassword="MumsSpace2024!">
```

**Change to your own (examples):**
```javascript
<AdminAuth requiredPassword="MySecret123456!">
```
or
```javascript
<AdminAuth requiredPassword="Admin789Private">
```
or
```javascript
<AdminAuth requiredPassword="Owner2025Secure!">
```

## After Changing the Password

1. **Save the file**
2. **The website will automatically restart**
3. **Your new password is now active**
4. **Old password no longer works**

## Important Notes

- **Only you should know this password**
- **Write it down somewhere safe**
- **Don't share it with anyone**
- **Change it regularly for security**

## Where to Make the Change

**File location:** `client/src/pages/admin-panel.tsx`
**Line number:** 191
**What to change:** Replace `"MumsSpace2024!"` with your own password in quotes

## Testing Your New Password

1. Go to `/admin` on your website
2. Enter your new password
3. Should work immediately after saving the file

Your admin area will be completely secure with your custom password!