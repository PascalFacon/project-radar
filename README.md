# Project Radar

A small static dashboard to keep visual oversight of development ideas and projects.

## Stack

- HTML, CSS, and vanilla JavaScript only
- No npm, no build step, no backend

## Run locally

### Option A — open the file

Double-click `index.html` or open it from your browser (File → Open).

Some browsers restrict `file://` behavior; if something looks wrong, use Option B.

### Option B — simple local server

From this folder:

```bash
python3 -m http.server 8000
```

Then visit: http://localhost:8000

Stop the server with `Ctrl+C`.

## Edit projects

Open `app.js` and change the `projects` array at the top. Save and refresh the browser.

## Deploy (later)

1. Push this folder to a GitHub repository.
2. In the repo: **Settings → Pages**.
3. Build from branch `main`, folder `/` (root).
4. Your site will be at `https://<username>.github.io/<repo-name>/`.

## Files

| File        | Purpose                     |
|-------------|-----------------------------|
| index.html  | Page structure and controls |
| style.css   | Layout and status styling   |
| app.js      | Data and filtering logic    |
