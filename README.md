# Sanctum Aeterna Alliance Event Form

A secure contest entry form with Discord webhook integration, hosted on Netlify.

## 🔐 Why Netlify?

Your original GitHub Pages setup **exposed your Discord webhook URLs** in the source code, allowing anyone to spam your server. This Netlify version solves that by:

- ✅ Hiding webhooks in serverless functions (backend code users can't see)
- ✅ Processing image uploads securely
- ✅ 100% FREE forever
- ✅ Same easy deployment as GitHub Pages

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Your Accounts Ready

1. **Netlify Account** (if you don't have one):
   - Go to https://netlify.com
   - Click "Sign up" → Use GitHub to sign in
   - It's completely free!

2. **imgbb API Key** (for image hosting):
   - Go to https://api.imgbb.com/
   - Click "Get API Key"
   - Sign up (free) and copy your API key

### Step 2: Deploy to Netlify

#### Option A: Drag & Drop (Easiest)

1. Download all files from this folder
2. Go to https://app.netlify.com/drop
3. Drag the entire folder onto the page
4. Wait for deployment (30 seconds)
5. Your site is live! 🎉

#### Option B: GitHub Deploy (Recommended)

1. Create a new GitHub repository
2. Upload all these files to the repo
3. Go to https://app.netlify.com
4. Click "Add new site" → "Import an existing project"
5. Choose "Deploy with GitHub"
6. Select your repository
7. Click "Deploy site"

### Step 3: Configure Environment Variables

This is where you add your SECRET information that users can't see:

1. In Netlify dashboard, go to **Site settings**
2. Click **Environment variables** in the left menu
3. Click **Add a variable** and add these:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `DISCORD_WEBHOOKS` | Your Discord webhook URLs (comma-separated if multiple) | `https://discord.com/api/webhooks/123/abc,https://discord.com/api/webhooks/456/def` |
| `IMGBB_API_KEY` | Your imgbb API key | `c865249e81ba759d28d1c83979113157` |
| `EMBED_COLOR` | Discord embed color (optional) | `#596D69` |
| `AVATAR_IMAGE` | Logo URL (optional) | `https://i.imgur.com/9aiqU0r.png` |
| `FORM_LINK` | Your form URL (optional, add after deployment) | `https://your-site.netlify.app` |

4. Click **Save**
5. Go to **Deploys** tab and click **Trigger deploy** → **Deploy site**

### Step 4: Test It!

1. Go to your live site URL (shown in Netlify dashboard)
2. Fill out the form
3. Upload images
4. Submit!
5. Check your Discord server for the entry 🎊

---

## 📁 File Structure

```
your-project/
├── index.html              # Main form page
├── script.js               # Frontend JavaScript
├── netlify.toml            # Netlify configuration
├── package.json            # Dependencies
├── netlify/
│   └── functions/
│       ├── submit-entry.js      # Main serverless function
│       └── parse-multipart.js   # Form parser utility
└── README.md               # This file
```

---

## 🔧 Configuration Options

### Multiple Discord Servers

To send submissions to multiple Discord servers, separate webhook URLs with commas:

```
DISCORD_WEBHOOKS=https://discord.com/api/webhooks/111/aaa,https://discord.com/api/webhooks/222/bbb
```

### Custom Embed Colors

Change the Discord embed color by setting `EMBED_COLOR`:
- Blue: `#3B82F6`
- Green: `#10B981`
- Red: `#EF4444`
- Purple: `#8B5CF6`
- Gold: `#F59E0B`

### Form Link in Embed

After deployment, add your Netlify URL to `FORM_LINK` so the Discord embed includes a link back to the form.

---

## 🐛 Troubleshooting

### "IMGBB_API_KEY not configured" error
- Make sure you added the `IMGBB_API_KEY` environment variable
- Trigger a new deploy after adding it

### "No Discord webhooks configured" error
- Check that `DISCORD_WEBHOOKS` environment variable is set
- Make sure webhook URLs are valid
- Trigger a new deploy

### Form submits but nothing appears in Discord
- Check your Discord webhook URL is correct
- Make sure the webhook hasn't been deleted
- Look at Netlify function logs: Site settings → Functions → View logs

### Images not showing in Discord
- Verify your imgbb API key is valid
- Check image file sizes (must be under 8MB)
- Try a different image hosting service if imgbb is down

---

## 🔒 Security Features

✅ **Webhook URLs hidden** - Users can't see or abuse them  
✅ **Server-side validation** - Prevents fake/malicious submissions  
✅ **Rate limiting** - Netlify automatically prevents spam  
✅ **File type validation** - Only accepts images  
✅ **Size limits enforced** - Max 8MB per image  

---

## 💰 Cost

**Everything is 100% FREE!**

- Netlify: Free tier includes 100GB bandwidth, 300 build minutes/month
- imgbb: Free tier includes unlimited image hosting
- Discord webhooks: Free forever

---

## 🆘 Need Help?

Common issues and solutions:

1. **Can't find environment variables:**
   - Go to Site settings → Environment variables
   - Make sure you're on the correct site

2. **Deployment failed:**
   - Check Netlify deploy logs
   - Make sure all files are uploaded
   - Verify package.json is present

3. **Function not working:**
   - Check function logs in Netlify dashboard
   - Verify all environment variables are set
   - Try triggering a new deploy

---

## 📝 Updating Your Form

To make changes:

1. Edit the files locally
2. Push to GitHub (if using GitHub deploy)
   - OR drag & drop again (if using manual deploy)
3. Netlify will automatically redeploy!

---

## 🎨 Customization

Want to customize colors, text, or layout?

- Edit `index.html` for structure and styling
- Edit `script.js` for form behavior
- Colors are defined in CSS `:root` variables
- Discord embed customization is in `submit-entry.js`

---

## ✨ Features

- 📸 Multiple captura image uploads (up to 5)
- ⚔️ Required arsenal screenshot
- 🎨 Beautiful animated UI
- 📱 Mobile responsive
- 🔒 Secure webhook handling
- 🖼️ Image preview before upload
- ✅ Form validation
- 🎯 Direct Discord integration
- 🌟 Drag & drop file upload

---

## 📜 License

MIT License - Feel free to use and modify!

---

## 🎯 What's Next?

After setup:
1. Share your Netlify URL with participants
2. Monitor submissions in Discord
3. Customize the form to your needs
4. Add more fields if needed

**Your webhooks are now secure!** 🎉
