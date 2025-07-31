# Admin Panel Instructions for Mum's Space Website

## How to Access Your Admin Panel

**Step 1: Navigate to Admin URL**
- Type `/admin` at the end of your website URL
- Example: `https://yourwebsite.com/admin`
- This URL is secret - regular visitors don't know it exists

**Step 2: Enter Password**
- Password: `MumsSpace2024!`
- This is your private admin password
- Change it after deployment if desired

## What Regular Website Visitors See

✅ **Regular visitors can only see:**
- Home page with app download buttons
- Reviews page (read-only)
- Contact information
- Policies

❌ **Regular visitors CANNOT see:**
- Admin panel (they don't know `/admin` exists)
- Upload forms
- Download statistics
- Admin controls

## What You See as Admin

✅ **In the admin panel you can:**
- View total download statistics
- See all submitted reviews
- Get instructions for uploading app files
- Monitor website activity

## Admin Panel Controls

**Logout Buttons (top-right corner):**
- **Blue "View Website" button** - Goes back to public website
- **Red "Logout" button** - Logs you out of admin panel

**Session Management:**
- You stay logged in during your browser session
- Close browser or click logout to end session
- After 3 failed login attempts, access locks for 5 minutes

## Security Features

1. **Hidden URL** - `/admin` is not linked anywhere on public site
2. **Password Protection** - 12-character password required
3. **Session-Based** - Temporary login, not permanent
4. **Attempt Limiting** - Locks after failed attempts
5. **No Public Upload** - Only you can add files via FTP/hosting panel

## How to Upload App Files (When Ready)

**You upload files through your hosting provider, not the website:**

1. **Access your hosting file manager** (FTP, cPanel, etc.)
2. **Upload to `/public/downloads/` folder**
3. **Name files exactly:**
   - `mums-space-android.apk`
   - `mums-space-ios.ipa`
   - `mums-space-pc.exe`
4. **Download buttons automatically work** once files exist

## Summary

- **Your website is secure** - only you have admin access
- **Regular users** see normal website with download buttons
- **Admin panel** is your private management area
- **File uploads** happen through hosting provider, not website
- **Password protects** all admin functions

The admin system is completely separate from the public website. Regular visitors have no way to access admin features.