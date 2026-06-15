# AI Business Studio London — Website
*(aibs.london)*

This repository contains the source code for the official website of **AI Business Studio London**, a boutique advisory firm translating AI complexity into clear, actionable business advantages. The site is designed to look premium, minimalistic, and load extremely fast.

---

## 🛠️ Tech Stack & Architecture

- **Static Site Generator:** [Eleventy (11ty)](https://www.11ty.dev/) — Provides clean, HTML-first performance without JavaScript bloat.
- **Templating Engine:** [Nunjucks (njk)](https://mozilla.github.io/nunjucks/) — Used for flexible layout inheritance and component rendering.
- **Styling:** Vanilla CSS (for the public site) and [Tailwind CSS](https://tailwindcss.com/) (specifically for the admin dashboard).
- **Interactivity:** Vanilla JS (public forms) and [Alpine.js](https://alpinejs.dev/) (interactive admin operations).
- **Serverless Form Processing:** [Web3Forms](https://web3forms.com/) — Secure, spam-protected client-side form submissions.

---

## 📁 Project Structure

```bash
├── .eleventy.js          # Eleventy configuration, custom markdown filters, and passthroughs
├── package.json          # Node scripts and development dependencies
├── namecheap-connection.md # Step-by-step custom domain integration guide for Namecheap
├── CNAME                 # Custom domain declaration (aibs.london) for GitHub Pages
└── src/
    ├── index.njk         # Home/Main single-page landing layout
    ├── _data/            # Global JSON data stores edited by the CMS
    │   ├── settings.json  # SEO configs, slogans, and Web3Forms access key
    │   ├── manifesto.json # Manifesto sentence blocks
    │   ├── services.json  # "Hizmet Yaklaşımı" services array
    │   └── trust.json     # "Entelektüel Güven" trust-building cards
    ├── _includes/        # Layout partials and sections
    │   └── admin2/       # Partials specifically for the custom admin panel dashboard
    ├── admin2/
    │   └── index.njk     # Custom Admin Panel UI (Tailwind & Alpine) accessible at /admin2/
    └── assets/           # Global visual assets, fonts, icons, and logos
```

---

## 🚀 Local Development Setup

To run this project locally, ensure you have [Node.js](https://nodejs.org/) (v16+) installed.

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm start
   ```
   *The site will be available at `http://localhost:8080` and will auto-reload on file edits.*

3. **Build the Production Bundle:**
   ```bash
   npm run build
   ```
   *This compiles the entire site into the `_site` directory.*

---

## 🔒 Contact Form Integration (Web3Forms)

The request invitation form submits via AJAX (fetch) directly to the Web3Forms API. This prevents page refreshes and displays inline success/error feedback.

To configure the form submissions:
1. Obtain an access key for your verified email at [Web3Forms](https://web3forms.com/).
2. Log into the custom Admin Panel (at `/admin2/`) or open [settings.json](file:///home/hamza/_projects_/silverandelegant-co/aibs-london/src/_data/settings.json) directly.
3. Set your active key under the **Web3Forms Access Key** configuration field:
   ```json
   "web3forms_key": "YOUR_ACCESS_KEY_HERE"
   ```

*Note: The form has a built-in spam honeypot (`botcheck`) and submission states are fully styled dynamically.*

---

## ✍️ Custom Content Management (Admin Panel)

This repository includes a bespoke, premium **CMS Dashboard** accessible locally at `http://localhost:8080/admin2/` or live at `https://aibs.london/admin2/`.

### How to use:
1. Generate a **GitHub Personal Access Token (PAT)** with repository edit permissions.
2. Enter your PAT into the login screen at `/admin2/`.
3. Modify the general settings, manifesto blocks, or service lists through the intuitive visual forms.
4. Click **Bölümü Kaydet** (Save Section) to stage changes in memory.
5. Click the top-right **Yayınla** (Publish) button to push the changes directly to your GitHub repository. The site will automatically redeploy via GitHub Actions/Pages.

---

## 🌐 Custom Domain & DNS Settings

The website is configured to run under the custom domain `aibs.london` registered on Namecheap.

For detailed steps to map your Namecheap DNS records to GitHub Pages servers, please refer to the dedicated guide:
👉 **[namecheap-connection.md](file:///home/hamza/_projects_/silverandelegant-co/aibs-london/namecheap-connection.md)**