# ExtForge — Media Folder

Drop project media here, then update the `image` / `video` fields in `frontend/app/hackathon/2026/page.tsx`.

## Expected files

| File | Purpose |
|------|---------|
| `photo.jpg` | Team photo or product screenshot shown in the card |
| `demo.mp4`  | Demo video (shown instead of photo if both exist) |

## After dropping files

In `page.tsx`, find the ExtForge winner entry and set:

```ts
image: "/hackathon/2026/extforge/photo.jpg",
// and/or
video: "/hackathon/2026/extforge/demo.mp4",
```

Tip: keep images under 1 MB and videos under 10 MB for fast load times.
