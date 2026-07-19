# Managing your website — a guide for Kunga

You can add and change everything on your site yourself, from a simple web page — **no code, no developer.**
You make your changes, then publish them all together with one click.

> 🇫🇷 *Un guide en français suit la version anglaise, plus bas.*

---

## Where to log in

Open **https://kungadempatsang.com/admin** and sign in with your GitHub account.
(The first-time setup of that login is done once by your developer — see "First-time setup" at the bottom.)

## Add a new artwork

1. Click **Artworks → New Artwork**.
2. **Cover image** — your **base** photo, shown in the gallery. A clear, straight-on shot: it is
   displayed **whole, exactly as you upload it — never cropped or reshaped**.
3. **More views (optional)** — your numbered variant photos (1, 2, …): details, the side/angle, or
   the work hanging in a room. Visitors swipe sideways through these next to the cover.
4. **Title** — in English; French is optional (blank = the English title is used). *Titles always show in italic.*
5. **Year** — the year you made it. Works are grouped by year automatically, newest first.
6. **Medium** *(optional)* — e.g. *Oil on canvas* / *Huile sur toile*. You can leave it blank and
   add it later; nothing breaks.
7. **Dimensions** *(optional)* — **height × width**, e.g. `75 × 140 cm`. Also fine to fill in later.
8. *Optional:* a short **description**, **alt text** (a sentence describing the image, good for Google),
   **Mark as sold**, and **Order within the year** (lower number shows first).
9. Click **Save** — then **publish** when you're ready (see below).

## Edit your About page / contact details

Click **Profile & About → Profile / About page**: your statement, biography, exhibitions, email, phone,
Instagram, your **portrait photo**, and the **home page background painting**. Everything has an
English and a French field.

## Publish your changes ✅

To keep the site fast and free to run, **saving does not put your changes online straight away** — it stores
them safely so you can make several edits first. When you're done for the session:

- Open your **“Publish my website”** bookmark (your developer sets this up once — it's a Netlify *build hook*
  link). The site rebuilds and your changes go live in ~1–2 minutes.
- *(Alternatively, in Netlify → **Deploys → Trigger deploy → Deploy site**.)*

So the rhythm is: **edit as much as you like → Save each one → click Publish once.**

## Mark a work as sold / hide a year

- **Sold:** open the artwork, turn on **Mark as sold** → a small "Sold" tag appears on it.
- A year appears automatically once it has at least one work, and disappears when empty.

## When someone contacts you

When a visitor sends a message from the **Contact** page, it arrives **in your email** (set up once —
see `deployment.md` §3b–3c) and is also kept in **Netlify → Forms**. Each message carries a short
**reference code** like `KDT-7Q4F2A`, and **both of you receive an email with it**: the visitor gets
a confirmation (in their language) with a copy of their message, and you get the message itself —
**just hit Reply** on it to answer them directly. The shared reference makes any follow-up easy to
trace. Nothing to install — it's free.

## Good to know

- **Two languages:** every text has an EN and FR box. English is used as a fallback if French is empty.
- **Descriptions are optional:** leave an artwork's description blank and nothing shows — just the
  title, year and medium. Add one only when you want to.
- **Photos:** export around 1600–2000 px on the long side — sharp but not huge.
- **Mistakes are safe:** every change is saved in version history and can be undone by your developer.
- The site also installs as an **app**: on a phone, open it and choose *Add to Home Screen*.

---

# 🇫🇷 Gérer votre site — guide pour Kunga

Vous pouvez tout ajouter et modifier vous-même, depuis une page web simple — **sans code, sans développeur.**
Vous faites vos changements, puis vous les publiez tous ensemble en un clic.

## Se connecter
Ouvrez **https://kungadempatsang.com/admin** et connectez-vous avec votre compte GitHub.

## Ajouter une œuvre
1. **Artworks → New Artwork**.
2. **Cover image** — votre photo **« base »**, affichée dans la galerie. Une photo nette, bien de face :
   elle est montrée **entière, exactement comme vous l'envoyez — jamais recadrée**.
3. **More views (facultatif)** — vos photos variantes numérotées (1, 2, …) : détails, l'œuvre de côté, ou
   accrochée dans une pièce. Les visiteurs les font défiler horizontalement.
4. **Title** — en anglais ; le français est facultatif. *Les titres s'affichent toujours en italique.*
5. **Year** — l'année (les œuvres sont regroupées par année).
6. **Medium** *(facultatif)* — ex. *Huile sur toile*. Vous pouvez le laisser vide et l'ajouter plus tard.
7. **Dimensions** *(facultatif)* — **hauteur × largeur**, ex. `75 × 140 cm`. À compléter plus tard si besoin.
8. Facultatif : **description**, **texte alternatif**, **Mark as sold**, **ordre dans l'année**.
9. **Save** — puis **publiez** quand vous êtes prête (voir ci-dessous).

## Modifier la page À propos
**Profile & About → Profile / About page** : démarche, biographie, expositions, e-mail, téléphone,
Instagram, **photo de portrait** et **peinture d'accueil**. Chaque texte a une version EN et FR.

## Publier vos changements ✅
Pour garder le site rapide et gratuit, **enregistrer ne met pas vos changements en ligne tout de suite** —
ils sont stockés pour que vous puissiez en faire plusieurs. Quand vous avez terminé :
- Ouvrez votre marque-page **« Publier mon site »** (lien *build hook* Netlify, configuré une fois par votre
  développeur). Le site se reconstruit et vos changements apparaissent en ~1–2 minutes.
- *(Ou dans Netlify → **Deploys → Trigger deploy → Deploy site**.)*

Le rythme : **modifiez autant que vous voulez → Save → cliquez sur Publier une fois.**

---

## First-time setup (developer, once)

The CMS commits to GitHub, so it needs a GitHub login configured once:

1. Create a GitHub OAuth App at <https://github.com/settings/developers>:
   - **Homepage URL:** `https://kungadempatsang.com`
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
2. In Netlify → **Site configuration → Access & security → OAuth → Install provider → GitHub**, paste the
   Client ID and Client Secret.
3. Visit `/admin`, click **Login with GitHub**, authorize.
4. Create the **build hook** and give the artist the “Publish my website” bookmark — see `deployment.md` §4.

If the Sveltia editor ever misbehaves, open `public/admin/index.html` and switch to the commented Decap CMS
line — the same configuration works for both.
