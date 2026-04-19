# Team Member Photos

## Instructions for Adding Your Photo

1. **Save your photo with your name** (lowercase, no spaces):
   - Aaron: `aaron.jpg`
   - Jessica: `jessica-zhu.jpg`
   - Rohan: `rohan-yelandur.jpg`
   - Tisha: `tisha-chhatbar.jpg`

2. **Photo Requirements:**
   - Format: `.jpg` or `.png`
   - Recommended size: 500x500 pixels (square)
   - File size: Under 1MB

3. **Upload your photo:**
   - Save it in this folder (`frontend/public/images/team/`)
   - Use the exact filename shown above

4. **Update the code:**
   - Open `frontend/app/team/page.tsx`
   - Find your entry in the `TEAM_MEMBERS` array
   - Change `image: null` to `image: "/images/team/your-name.jpg"`

## Example

```typescript
{
  id: "1",
  name: "Aaron Sulbaran",
  role: "Ambassador",
  bio: "Your bio here...",
  image: "/images/team/aaron.jpg",  // <-- Update this line
  linkedin: "https://linkedin.com/in/your-profile",
  email: "your-email@utexas.edu",
}
```

## Need Help?
Lmk lol
