# Jingsong Qi Portfolio Update

This version is based on the public repository at commit
`3daaf494feb174de49c67444bf71575c7044b3d4`.

## Preview

Local preview: http://127.0.0.1:8000/portfolio-update/index.html

Scroll down on the globe or select Projects to expand the button into the
white gallery. At the top of Projects, continue scrolling upward (or pull down
on touch screens) to fold the gallery back into the same Projects button.
Opening and closing share one reversible animation; the globe stays mounted
and prepares its textures in the background, including on direct project links.
Resume, My Journey, and the compact contact dock remain available.
Project cards open individual, shareable detail routes. Browser Back and direct
refresh are supported. City pins open the personal journey, not project details.

## Deploy to the Existing GitHub Pages Repository

Replace or add the files in this folder at the root of
`2026design-drives-the-world-portfolio`, keeping the folder structure:

- `index.html`
- `styles.css`
- `portfolio.css`
- `src/`
- `vendor/`
- `assets/`

The Resume page includes `assets/Jingsong-Qi-Resume-2026.pdf`, which is the
source used for the 2026 experience, education, skills, awards, and contact details.

The ZIP contains these files at its root. Do not upload the ZIP itself as the
homepage, or nest these files inside an extra portfolio-update folder in the
repository. The existing GitHub Pages settings can stay the same.

No build step or package installation is required. Serve via HTTP for local
preview because the site uses JavaScript modules. Three.js 0.165.0 is included
locally with its license. The existing project pictures and resume content have
been retained. The Instagram link still uses the original generic Instagram URL.

This update does not automatically publish or change the live GitHub Pages site.
