# Sanctum Aeterna Alliance Event Form

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


## 📝 Updating Your Form

To make changes:

1. Edit the files locally
2. Push to GitHub (if using GitHub deploy)
   - OR drag & drop again (if using manual deploy)
3. Netlify will automatically redeploy!

---

## 🎨 Customization

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
