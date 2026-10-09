# Managing your Work section (CMS guide)

Your projects are managed at **www.draglinedevelopers.com/keystatic**. You don't need to touch any code.
Each time you press **Save**, the change is stored in the website's GitHub repository, and the live site
updates by itself about two minutes later.

---

## Logging in

1. Go to **www.draglinedevelopers.com/keystatic**.
2. Click **Log in with GitHub** and sign in with your GitHub account.
3. You'll see **Projects** in the left menu.

Only approved GitHub accounts can log in. If you see “This GitHub account can’t use the CMS”, ask the site
owner to approve you (see *For the site owner* below).

---

## Add a project

1. Click **Projects**, then **Add** (top right).
2. Fill in the fields:
   - **Title** – the project name. The **web address** fills in automatically from it (for example
     `/work/acme-website`).
   - **Category** – Websites, Product design or Campaigns. This decides which filter it appears under.
   - **Client name**, **Service**, **Year** and **One-line result** – short text. The result appears under the
     title on project cards.
   - **Cover image** – the main picture, shown on cards and at the top of the case study. Landscape images
     work best. Add a short **description** of the image for people who can’t see it.
   - **Gallery images** (optional) – up to three: one wide image, then a left and a right image. Each has its
     own description box. Empty slots are simply not shown.
   - **The challenge**, **What we did**, **The outcome** – the story of the project. You can use **bold**,
     *italic*, links and bullet or numbered lists.
   - **Testimonial** (optional) – only add a real quote the client has approved. Leave it empty and the quote
     section is not shown.
   - **Featured on Home** – tick this to show the project in “Selected work” on the home page. The home page
     shows the first three ticked projects.
   - **Display order** – lower numbers come first. Existing projects use 10, 20, 30… so you can slot a new
     one in between (for example 15).
3. Click **Save**. The project goes live in about two minutes.

A project only appears on the site once it is complete: it needs a **cover image** and no text left in
**[square brackets]**. Until then it stays hidden everywhere (Work, Home and its own page), so you can save
drafts safely.

---

## Edit a project

1. Click **Projects**, then the project you want to change.
2. Change any field. To replace an image, use **Choose file** again.
3. Click **Save**.

Try not to change the **web address** of a project that’s already live: old links to it would stop working.

---

## Delete a project

1. Click **Projects**, then the project.
2. Click the **bin icon** at the top right and confirm.

The project disappears from the Work page (and from Home, if it was featured) about two minutes later. If
you delete something by mistake, the site owner can restore it from the GitHub history.

---

## Good to know

- Text in **[square brackets]**, such as `[Project result]`, is placeholder text from the design. Replace it
  with real, verified content; the project stays hidden until every bracket is gone.
- Changes are not instant: allow about two minutes after saving, then refresh the page.
- The CMS only manages the Work section. Other pages are edited in code.

---

## For the site owner (one-time setup)

1. **Connect GitHub.** On your computer, run the site locally (`npm run dev`), open `localhost:3000/keystatic`
   and follow the on-screen steps to **Create GitHub App** (Deployed App URL: `https://www.draglinedevelopers.com`)
   and give it access to this repository. This writes four values to a local `.env` file. To log in locally too,
   add `KEYSTATIC_ALLOWED_GITHUB_USERS=your-github-username` to that `.env` file.
2. **Add them to Vercel.** In Vercel → Project → Settings → Environment Variables, add the four values from
   `.env` (`KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`,
   `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`), plus `KEYSTATIC_ALLOWED_GITHUB_USERS` (see step 3). Redeploy.
   In the GitHub App's settings, make sure `https://www.draglinedevelopers.com/api/keystatic/github/oauth/callback`
   is listed as a callback URL.
3. **Approve people.** A person needs both:
   - **write access** to the GitHub repository (GitHub → repository → Settings → Collaborators), and
   - their GitHub username in `KEYSTATIC_ALLOWED_GITHUB_USERS` on Vercel, separated by commas
     (for example `deekay,another-editor`), followed by a redeploy.

   To remove someone, take their name out of the list (and remove repository access). Until at least one name
   is listed, nobody can log in.

`/keystatic` is hidden from search engines and is not in the sitemap.
