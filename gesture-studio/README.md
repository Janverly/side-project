# Kinetic — Hand Tracking Studio

A webcam-controlled creative studio built with React, TypeScript and MediaPipe. Your hand becomes a cursor, a paintbrush and a remote control: steer a live particle field, fire effects with poses, and draw in mid-air with your index finger.

Everything runs locally in the browser. Camera frames are never uploaded.

## Features

- **21-point hand tracking** with MediaPipe `GestureRecognizer` (two hands supported).
- **Pose recognition** for thumbs up, peace, open palm, point and fist, backed by a rotation-tolerant landmark classifier when the trained model is unsure.
- **Gesture stability filter** so a pose has to hold for a few frames before it fires.
- **Particle playground** with fingertip attraction, bursts, shockwaves, gravity wells, rainbow mode, freeze and motion trails.
- **Drawing board** controlled by the index finger (mouse also works), with colours, brush sizes, undo, clear and PNG export.
- **Custom gesture shortcuts** that map any pose to any action and persist in `localStorage`.
- **Demo authentication** with a protected app shell, powered by a mock backend (MSW) so the project runs without a server.

## Quick start

Requires **Node.js 20.19+** (or 22.12+).

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

The repo ships with `.env.local` enabled, so the fake backend is on. Log in with:

```
demo@example.com
password123
```

Click **Use demo credentials** on the login page to fill them in.

### Environment

| Variable        | Default                     | Purpose                                      |
| --------------- | --------------------------- | -------------------------------------------- |
| `VITE_USE_MOCKS` | `true`                      | Starts the MSW fake backend in the browser.  |
| `VITE_API_URL`   | `http://localhost:3000/api` | Base URL used by the shared axios client.    |

Copy `.env.example` to `.env.local` if you need to recreate the file. Set `VITE_USE_MOCKS=false` when you point the app at a real API.

## Scripts

```bash
npm run dev        # Vite dev server on port 3000
npm run build      # Type-check the project and build to dist/
npm run preview    # Serve the production build
npm run typecheck  # TypeScript only
npm run lint       # Oxlint (vendored MediaPipe files are ignored)
npm run test       # Vitest in watch mode
npm run test:run   # Vitest once
```

## Gestures

| Pose       | Default shortcut | What happens                                                     |
| ---------- | ---------------- | ---------------------------------------------------------------- |
| 👍 Thumbs up | Party pop        | Explodes a ring of sparks from your fingertip.                    |
| ✌️ Peace     | Sonic wave       | Sends an expanding energy ring across the stage.                  |
| 🖐️ Open palm | Gravity well     | Implodes the particle field into a spinning vortex.               |
| ☝️ Point     | *Not mapped*     | Drawing pose. Extend only your index finger to draw.              |
| ✊ Fist      | Deep freeze      | Freezes every particle until you toggle it back.                  |

Point is deliberately left unmapped because it is the drawing pose. You can map it anyway on the Shortcuts page.

### Actions available for shortcuts

`burst`, `shockwave`, `vortex`, `rainbow`, `freeze`, `clear_drawing`, `toggle_mode`, `cycle_color`, `save_art`.

Shortcuts are stored under the `kinetic-shortcuts` key in `localStorage`. Use **Reset defaults** on the Shortcuts page to restore the built-in mappings.

## Using the studio

1. Open the studio and press **Enable camera**, then allow camera access.
2. Hold a pose steady for a moment — the stabilizer needs a few frames before it triggers.
3. Use the **Particles / Draw** switch (or `?mode=draw` in the URL) to change output.
4. In Draw mode, extend only your index finger to paint, curl it to lift the pen.
5. Customise mappings on **Shortcuts**; read the walkthrough on **Gesture guide**.

Tips: keep your whole hand in frame, palm toward the camera, roughly an arm's length away. Good, even lighting helps a lot.

## How it works

```
src/
  features/
    auth/                     # login page, auth service, hooks
    gestures/
      components/             # camera panel, overlays, particles, drawing board
      hooks/
        useHandTracker.ts     # camera + MediaPipe lifecycle
        useGestureShortcuts.ts# persisted shortcut store
      lib/
        gestureRecognition.ts # pose classification + stability filter
        particleEngine.ts     # Canvas 2D particle system
      pages/                  # Studio, Shortcuts, Guide
      schemas.ts              # shared Zod schema
  lib/
    api/axios.ts              # one axios client: auth header + response mapping
    constants/gesture.ts      # labels, actions, defaults, asset paths
  routes/                     # router, layouts, 404
  store/                      # auth store
  test/                       # setup, MSW mocks, hand fixtures
public/
  models/gesture_recognizer.task
  wasm/                       # MediaPipe vision WASM runtime
```

- **Recognition:** MediaPipe's trained categories are preferred when confidence is at least `0.5`; otherwise a landmark classifier checks finger extension with joint angles and wrist reach, so rotated hands still work.
- **Stability:** `GestureStabilizer` promotes a pose after `GESTURE_STABILITY_FRAMES` (4) consecutive frames and resets when the hand drops to `none`.
- **Particles:** a `Canvas 2D` engine with device-pixel-ratio scaling, capped particle count and `requestAnimationFrame`, exposed through an imperative ref.
- **Drawing:** a separate canvas maps index-finger landmarks to stroke coordinates, with pointer events as a mouse fallback. Strokes are kept for undo and PNG export.
- **State:** TanStack Query for server calls, Zustand for auth and shortcuts, nuqs for the studio mode URL parameter.

MediaPipe WASM and the gesture model are vendored in `public/` so the app works offline after the first load. If they go missing, the camera screen reports a model-loading error.

## Privacy

- Camera frames are processed entirely in the browser through MediaPipe.
- Only the login request reaches the (mocked) API; no image or landmark data is ever sent.
- Auth and shortcut data live in `localStorage` on your device.

## Troubleshooting

| Symptom                              | Fix                                                                                 |
| ------------------------------------ | ----------------------------------------------------------------------------------- |
| “Camera permission was denied”       | Allow camera access in the browser's site settings, then press **Try again**.        |
| “No camera was found”                | Connect a webcam and reload.                                                         |
| Camera is busy                        | Close other apps using the webcam (video calls, OBS) and retry.                      |
| Model fails to load                   | Confirm `public/models/gesture_recognizer.task` and `public/wasm/` exist and are served. |
| Gestures feel twitchy                 | Hold the pose steady, improve lighting, and keep your hand fully in frame.           |
| Login fails                           | Ensure `.env.local` has `VITE_USE_MOCKS=true`, then restart the dev server.          |
