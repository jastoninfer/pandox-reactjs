# Pandox Blog Platform Frontend

Portfolio case study for a full-stack technical blogging platform. The frontend is a React/TypeScript single-page application for publishing long-form technical articles with Markdown, math notation, code highlighting, user profiles, comments, likes, follows, and search.

## Reviewer Snapshot

| Area | Summary |
| --- | --- |
| Product | Technical blogging platform for long-form programming and machine-learning notes |
| Frontend scope | React SPA, routed pages, authenticated flows, editor, article reader, profile, search, settings, notifications |
| Backend dependency | Node/Express API with MySQL, Redis, image storage, and Elasticsearch search |
| Original deployment | Vercel frontend + Oracle Cloud VPS backend |
| Current demo status | The Oracle VPS is offline, so the public Vercel URL may show only the static frontend shell. Screenshots below are captured from a local seeded environment with MySQL and Redis running. |

## Product Screenshots

| Home feed with seeded recommendations | Article reader with math rendering |
| --- | --- |
| ![Home page](docs/screenshots/home.png) | ![Article detail](docs/screenshots/article.png) |

| User profile | Existing article in Markdown editor |
| --- | --- |
| ![Profile page](docs/screenshots/profile.png) | ![Markdown editor](docs/screenshots/editor-existing-page.png) |

## Engineering Highlights

- Built a multi-page React SPA with nested React Router routes for home, profiles, article detail, editor, search, settings, notifications, login, and registration.
- Implemented a technical-writing workflow around Markdown authoring, preview mode, CodeMirror editing, KaTeX formulas, syntax highlighting, table support, image resizing, and generated table of contents.
- Created a typed API boundary with Axios service modules and Redux/Redux Thunk authentication state.
- Supported authenticated author actions including page creation, page updates, visibility status, image-backed articles, and profile-aware navigation.
- Integrated with backend capabilities for JWT auth, MySQL-backed content, Redis token invalidation, file uploads, and Elasticsearch search.

## Skills Demonstrated

| Skill | Evidence in this project |
| --- | --- |
| Frontend architecture | Route hierarchy, reusable service layer, Redux auth state, protected author workflows |
| Rich content UX | Markdown editor, live preview route, KaTeX, syntax highlighting, image rendering, TOC generation |
| Full-stack integration | Axios clients consume REST APIs for auth, users, pages, comments, images, likes, follows, and search |
| Product thinking | A complete author-reader loop: profile, publish, browse, read, comment, like, follow, and search |
| Legacy maintenance | README refresh, screenshots from local data, environment sanitization, deployment-status clarification |

## Tech Stack

| Layer | Tools |
| --- | --- |
| UI | React 18, TypeScript, React Router |
| State/API | Redux, Redux Thunk, Axios |
| Styling | styled-components, Sass, CSS |
| Editor/rendering | CodeMirror 6, Marked, KaTeX, highlight.js, Lezer Markdown |
| Platform integration | Express API, JWT auth, WebSocket endpoint |
| Data/search | MySQL, Redis, Elasticsearch |

## Reviewer Notes

The original public frontend URL is `https://pandox-reactjs.vercel.app/`. Because the Oracle VPS backend is no longer active, that URL may not demonstrate the interactive data flows. The screenshots in this README document the locally reproducible state after the backend seed scripts load demo users, articles, comments, keywords, and images.

Elasticsearch support is implemented through the backend search routes, but a local review does not require ES unless search results need to be reproduced. Core browsing, login, profile, article, image, and editor flows work with MySQL and Redis.

## Local Review Appendix

```bash
npm install
cp .env.example .env
npm run start:dev
```

Expected frontend environment:

```bash
REACT_APP_BASE_URL_DEV=http://localhost:8080
REACT_APP_BASE_URL_PROD=https://your-backend-domain.example.com
REACT_APP_WS_URL=ws://localhost:8080
```

Seeded login accounts:

| Username | Password |
| --- | --- |
| `pandoxone` | `1234` |
| `jzhang` | `1234` |
| `mshao` | `1234` |

Repository hygiene note: real `.env` files and local virtual environments are ignored. Use `.env.example` for review setup.
