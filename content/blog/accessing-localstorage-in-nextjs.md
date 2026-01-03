---
title: "Accessing LocalStorage in NextJS"
date: "2020-10-05"
summary: "A quick fix for the 'window is undefined' error when using localStorage in Next.js applications."
tags: ["javascript", "nextjs"]
---

I recently migrated a Content Management System from Create React App to NextJS in order to score some SEO points.
One of the challenges I faced was seeing these errors at compile time.

`window is undefined` or `document is undefined`

`Window`, and `document` are not available on the server. This is why you'll run into these types of errors if you are trying to access `window` properties or `document`.
In my case, I was persisting my authentication token to localStorage on the previous application.

To avoid running into these undefined errors at compile and build time, you can run a simple check.

```javascript
if (typeof window !== "undefined") {
  localStorage.setItem(key, value)
}
```

This basically tells your piece of code only to run when it's in the client environment where it can access `window`.

Keep hacking.
