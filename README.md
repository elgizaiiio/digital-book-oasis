# AI Millionaire Blueprint

هنعمل موقع لبيع كتاب كيف تربح من الذكاء الاصطناعي وتحقق إيرادات تتخطي المليون دولار 



هنستخدم البرومبت ده للتصميم 

Build a single-file `index.html` full-viewport poster. No scroll. No frameworks. No redesign. Match layout, type, color, both image URLs, entrance choreography, mobile menu, and mouse morph-reveal exactly.



---



0. Document shell



```html

<!doctype html>

<html lang="en" class="anim">

<head>

  <meta charset="utf-8">

  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

  <meta name="theme-color" content="#161616">

  <title>Orbit — Secure system</title>

```



- Root `<html>` starts with class `anim`

- `html, body`: `width/height 100%`, `margin: 0`, `overflow: hidden`, background `#161616`

- Body: `"Orbit Sans", Arial, Helvetica, sans-serif`, color `#fff`, antialiased

- CSS vars:

  - `--ink: #ffffff`

  - `--surface: #161616`

  - `--orb-reveal: cubic-bezier(.16, 1, .3, 1)`

  - `--orb-soft: cubic-bezier(.25, .8, .28, 1)`



Structure:



```

main.viewport (fixed, inset 0, black)

  section.stage (absolute, inset 0, contain:strict, isolation:isolate)

    [all poster elements]

```



Z-order: wordmark `1` → flower `2` → corner copy `3` → brand/nav/pill `4`. Mobile: scrim `9`, sheet `10`, burger `12`.



---



1. Fonts (mandatory)



Two custom TrueType faces, weight 400, `font-display: block`, embedded as `@font-face` data-URLs:



1. `"Orbit Sans"` — nav, pill, corner copy. Fallback: Arial, Helvetica, sans-serif  

2. `"Orbit Display"` — giant wordmark only. Fallback: `"Times New Roman", Times, serif`



Do not use Inter, Roboto, system-ui, or Playfair. Extract the original base64 TTFs from the existing `index.html` `@font-face` blocks if needed.



---



2. The two image URLs (use exactly — do not replace)



Both are Higgsfield-proxied PNGs as webp `w=1280&q=85`. Transparent backgrounds. Pixel-art / halftone lilies.



FRONT / BG lily (default visible)



```

https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260808_192942_e1086505-d7da-433b-a59b-8220f4e6c808.png&w=1280&q=85

```



Raw source:



```

https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_192942_e1086505-d7da-433b-a59b-8220f4e6c808.png

```



REVEAL / TOP lily (only visible inside morph trail)



```

https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260808_151324_bf318a5f-5525-4fc7-aab5-e9a341018828.png&w=1280&q=85

```



Raw source:



```

https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_151324_bf318a5f-5525-4fc7-aab5-e9a341018828.png

```



Front `alt`: `Pixel-art pink and violet lily`. Reveal `alt=""`. No other images.



---



3. Every on-stage element (desktop)



Brand mark

SVG `.brand-mark`, `viewBox="0 0 66 62"`, white 4-stroke asterisk, `stroke-width: 5px`, square caps:

- `(33,1)→(33,61)`, `(3,31)→(63,31)`, `(11.8,9.8)→(54.2,52.2)`, `(54.2,9.8)→(11.8,52.2)`

- Position: `top: 2.141745dvh; left: 3.854167vw; width: clamp(34px, min(3.4375vw, 5.2dvh), 66px)`



Primary nav

Links: Home / Resources / Benefits / Contact → `#home` `#resources` `#benefits` `#contact`  

White, size `clamp(13px, min(1.302083vw, 2.05dvh), 25px)`, each `li` at `top: 3.426791dvh`:



| Item | left | scaleX |

|---|---|---|

| Home | `10.104167vw` | `1.165` |

| Resources | `17.526042vw` | `1.052` |

| Benefits | `27.578125vw` | `1.126` |

| Contact | `36.171875vw` | `1.168` |



`.primary-nav` is full-stage but `pointer-events: none`; links opt back in with `pointer-events: auto` so the lily stays hoverable.



Secure system pill

White pill, text `#161616`, `top: 2.336449dvh; right: 7.5vw`, height `clamp(34px, 4.439252dvh, 57px)`, `border-radius: 999px`, tracking `0.026923em`.



Wordmark ORBIT

```html





  

    

      OR

      BIT

    

  





```

- `top: 11.565421dvh; left: 4.348958vw`

- `"Orbit Display"`, size `min(27.8125vw, 55dvh)`, tracking `0.033708em`

- OR solid `#fff`; O has `scaleX(1.0866)`, `margin-right: 0.042135em`

- BIT gradient: `linear-gradient(180deg, #ffc5dc 0%, #fd86db 100%)` via `background-clip: text`



Flower stack

```html





  

  



    

  



  



    

  







```

- `top: 14.749065dvh; left: 49.121328vw; height: 106.109034dvh; transform: translateX(-50%); pointer-events: none`

- Sizer: hidden, `height: 100%; width: auto` (sets intrinsic width)

- Layers: `absolute; inset: 0`; imgs `object-fit: cover`

- Top layer starts fully masked out: `mask-image: linear-gradient(#0000, #0000)`



Corner copy

Color `#f7f7f7`, size `clamp(14px, min(1.40625vw, 2.102804dvh), 27px)`, `bottom: 4.361371dvh`  

Left (`left: 3.177083vw; scaleX(1.073)`): `Every workflow, / intelligently connected.`  

Right (`left: 78.28125vw; scaleX(1.058)`): `Less manual work. / More meaningful output.`  

Animate via inner `.support-copy__inner` only.



Mobile chrome (hidden on desktop)

Burger + scrim buttons. Shown only at `(max-width: 900px), (max-aspect-ratio: 4 / 5)`.



---



4. Mouse morph-reveal trail (implement exactly)



Not a CSS circle spotlight. Organic morphing blob trail that punches holes in the front lily and paints the reveal lily in the same shape.



Constants

```

TRAIL_MAX_POINTS  = 60

TRAIL_HEAD_R      = 140

TRAIL_NOISE_AMP   = 44

TRAIL_BLOB_PTS    = 24

TRAIL_FADE_SPEED  = 0.92

TRAIL_SAMPLE_DIST = 8

```



Architecture

Each `MorphTrailLayer`:

- Hidden offscreen canvas (`display:none`) sized to `.flower`

- Visible absolute layer with cover-fit ``

- Every active frame: `maskImage = url(canvas.toDataURL())`, size `100% 100%`, no-repeat



Two layers, same trail:

- `invert=false` → FRONT/BG (white fill → `destination-out` blobs = holes)

- `invert=true` → REVEAL/TOP (clear canvas → white blobs = only trail shows)



Mouse on `.stage`: `mousemove` / `mouseenter` / `mouseleave`. Convert to flower canvas space via getBoundingClientRect + scale.



Per frame

```

targetR = hovering ? 140 : 0

headRadius += (targetR - headRadius) * (hovering ? 0.14 : 0.04)

```

When hovering and `headRadius > 5`, if distance from last sample `> 8px`, push `{x,y,r:headRadius,alpha:1,seed:random*100}`; cap 60.  

Decay: `alpha *= 0.92; r *= 0.995`; remove if `alpha < 0.01`.  

`time += 0.016`.



`drawMorphBlob(ctx, cx, cy, r, t, seed)`

Skip if `r < 2`. 24 points:

```

n1 = sin(angle*3 + t*1.4 + seed) * 0.45

n2 = sin(angle*5 - t*0.9 + seed*2.3) * 0.3

n3 = cos(angle*2 + t*1.8 + seed*0.7) * 0.25

noise = (n1+n2+n3) * 44 * (r/140)

```

Closed path via midpoints + `quadraticCurveTo` (organic blob, not circle). Fill white.



Result: moving the mouse leaves a morphing organic wipe that cuts the front lily away and paints the second lily along a fading trail. Wordmark still shows through transparent petals. Leave stage → head lerps shut, trail dies.



---



5. Entrance animation (once)



Pure CSS while ``. JS removes `.anim` after last `orb-*` animation finishes (6000ms safety). Never replays.



Keyframes:

- `orb-word`: `translateY(118%) → 0` (no fade)

- `orb-subject`: fade + `translateX(-50%) translateY(3.4dvh → 0)` — do not scale the lily

- `orb-corner` / `orb-quiet`: small rise + fade

- `orb-dim`: fade only



Desktop timing:

| Element | anim | dur | delay |

|---|---|---|---|

| brand | quiet | 620ms | 100ms |

| nav 1–4 | dim | 550ms | 180 / 225 / 270 / 315ms |

| pill | quiet | 620ms | 340ms |

| word inner | word | 1150ms | 300ms |

| flower | subject | 1150ms | 660ms |

| both corners | corner | 720ms | 980ms same |



Easing: word/flower use `--orb-reveal`; rest use `--orb-soft`.  

While animating, wordmask has overflow hidden + padding/negative margin so the serif can rise without clipping layout.  

Do not animate transform on nav `li`, corner parents, or the O — their `scaleX` is optical.



Reduced motion: only whole-stage 280ms fade.  

Mobile entrance: burger instead of pill/nav; slightly tighter delays.



---



6. Responsive essentials



(max-width: 900px) or (max-aspect-ratio: 4/5): white circular burger, frosted sheet menu, scrim, Escape/Tab-trap/inert when closed.



(max-aspect-ratio: 4/5): smaller centered lily `height: min(55dvh, 110vw)`, word `min(27.5vw, 18dvh)`, wrapping corner copy.



(max-width: 1200px) or portrait: center the wordmark (`left:0; width:100%; text-align:center`).



---



7. Acceptance checklist



- Black `#161616` poster, no scroll

- Asterisk + 4 nav words with exact scaleX + white Secure system pill

- Giant OR white + BIT pink gradient; O slightly wider

- FRONT lily at exact desktop coords, overlapping BIT

- Load: frame → word rises → lily rises in front → both corners together; then `.anim` gone

- Mouse: 140px-head morphing trail, 24-point noisy blobs, fade 0.92, sample every 8px, max 60 points

- Trail punches FRONT and paints REVEAL; wordmark readable through transparency

- Exact two Higgsfield URLs above

- Orbit Sans + Orbit Display embedded

مش هيكون فيه تسجيل 

فقط هيدفعوا من دودو بايمنت 

الكتاب هيتبعت علي الايميل 

بالنسبه للدفع من دودو بايمنت ف عندهم حاجه اسمها تصميم صفحة الدفع ف هنخلي كل حاجه ف متجرنا بدون ما نحول المستخدم لصفحات أخري 



هنعمل المتجر عباره عن landing page للترويج للموقع بشكل نظيف وواضح وصريح ومثير مع علم النفس الدارك 



دي برومبتس للاقسام 

Build a "Core Features" marketing section as a single centered component with three gradient cards. Use the Inter font family (weights 400, 500, 600) loaded from Google Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap`.



Page shell:

- Body: white background `#ffffff`, 80px top/bottom + 20px left/right padding, flex centered, Inter font.

- Global reset: `* { box-sizing: border-box; margin: 0; padding: 0; }`.



Container (`.c1-container`): max-width 1100px, full width, text-align center.



Header block:

- Badge (`.c1-badge`): text "Core Features", 0.75rem, weight 600, uppercase, letter-spacing 1px, gradient text using `linear-gradient(90deg, #F5C344, #F28482, #B567C2)` with `-webkit-background-clip: text` and transparent fill. 16px bottom margin.

- Title (`.c1-title`): "Built for Speed & Quality", font-size 2.75rem, weight 500, color `#0f172a`, letter-spacing -0.02em, 12px bottom margin.

- Subtitle (`.c1-subtitle`): "Everything you need to go" + `
` + "from idea to image", 1.125rem, color `#64748b`, line-height 1.5, 50px bottom margin.



Grid (`.c1-grid`): 3 equal columns, 24px gap. Breakpoints: 2 columns under 900px, 1 column under 600px (title scales to 2.25rem).



Card base (`.c1-card`): 20px border-radius, height 340px, flex column justify-end, relative, overflow hidden, text-align left, background `#F4F8F9`, shadow `0 10px 30px -10px rgba(0,0,0,0.1)`. Titles inside (`h3`): 1.05rem, weight 600, color `#1e293b`, padding 24px, z-index 2.



Card 1 — Smart Prompt Suggestions (`.c1-card-1`):

- Background: `radial-gradient(circle at 50% 0%, #FFB347 0%, #F9ED96 30%, #F4F8F9 60%, #F4F8F9 100%)`.

- Prompt box (white, 12px radius, 16px padding, 0.8rem text, color `#475569`, line-height 1.6, shadow `0 8px 20px rgba(0,0,0,0.04)`), absolutely positioned top:30px/left:24px/right:24px. Text: "A bright, high-resolution 3D illustration of a cheerful cartoon of a girl character centred against a smooth blue background" — bold phrases have class `.c1-blur-text` with gradient `linear-gradient(90deg, #FFB347, #E5A1F5)` as clipped text, weight 600.

- "Add more details" pill button: absolute top:180px/left:40px, white background, 1px solid black border, 5px 14px padding, 20px radius, 0.75rem text, weight 600, color `#1e293b`, shadow `0 4px 15px rgba(0,0,0,0.08)`, includes `✦` character styled `color: #a855f7; font-size: 1rem` with 6px gap.

- Cursor SVG arrow: absolute top:205px/left:110px, 24x24, fill `#0f172a`, white stroke 1px, drop-shadow `0 4px 6px rgba(0,0,0,0.2)`, z-index 10. Path: `M4 2L20 11L11 13L9 22L4 2Z`.

- Heading: "Smart Prompt Suggestions".



Card 2 — API Access (`.c1-card-2`):

- Background: `radial-gradient(circle at 50% 0%, #E5A1F5 0%, #F8ACA0 30%, #F4F8F9 60%, #F4F8F9 100%)`.

- `.c1-api-visual` absolutely positioned top:0/left:0/right:0/bottom:70px, flex centered, 24px horizontal padding.

- Image (`.c1-network-img`): width 100%, height 180px, object-fit contain, margin-top 20px. Source: `https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor/network.svg`.

- Heading: "API Access".



Card 3 — Project Library (`.c1-card-3`):

- Background: `radial-gradient(circle at 50% 0%, #F9ED96 0%, #E5A1F5 30%, #F4F8F9 60%, #F4F8F9 100%)`.

- Mesh overlay (`.c1-mesh`): absolute inset 0, background image = two linear gradients of `rgba(255,255,255,0.8) 1px, transparent 1px` (horizontal and 90deg vertical), background-size 16px 16px, masked with `radial-gradient(circle at center top, black 0%, transparent 80%)` (include `-webkit-mask-image`).

- Folder image (`.c1-folder`): absolute top:50px, horizontally centered via `left:50%; transform:translateX(-50%)`, width 170px, drop-shadow `0 15px 25px rgba(0,0,0,0.08)`. Source: `https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor/library%20icon.svg`.

- Search pill (`.c1-search`): absolute top:220px, centered, white background, 1px solid black, 6px 18px padding, 20px radius, 0.75rem text weight 500 color `#1e293b`, shadow `0 8px 20px rgba(0,0,0,0.06)`, white-space nowrap, 8px gap. Contains a 14x14 lucide-style search SVG (circle cx=11 cy=11 r=8, line 21,21→16.65,16.65, stroke `#64748b`, stroke-width 2, round caps/joins) followed by text "Search in library".

- Heading: "Project Library".



Note: No animations are defined in this component — it is purely static styling. No JavaScript behavior, no hover effects. Use Supabase if any data persistence is needed, though this section requires none.





وده 



ROLE
Recreate a single-file HTML product landing mosaic pixel-faithful to the reference below. Output one self-contained `index.html` with inline CSS + JS. No external images. All icons are inline SVG. The only external resource is Google Fonts.

---

PAGE META
- `lang="en"`
- Title: `Automate your work — Focus on what matters`
- Viewport: `width=device-width, initial-scale=1, viewport-fit=cover`
- Body page background: `#f0f0f0`
- Text color: `#141414`
- Font smoothing: antialiased; `text-rendering: optimizeLegibility`
- `body`: flex center, `min-height: 100vh` / `100dvh`, `overflow: hidden`

---

FONT (exact URL)
```
https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap
```
Preconnect: `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (crossorigin).

Family stack:
`'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`

Weights used: 400, 500, 600, 700, 800. No other display/serif fonts.

---

MEASUREMENT SYSTEM (critical)
Author the entire composition in design units where:
- Reference stage = 1374 × 666 units
- `1rem` = 1 reference unit
- Root scale knob:
```css
html { font-size: min(calc(95vw / 1374), calc(94vh / 666)); }
```
Nothing hard-coded in device pixels for the desktop composition. All sizes below are in these rem-units.

---

DESKTOP STAGE GRID
`.stage` = `1374rem × 666rem`, CSS grid:
- Columns: `339rem | 627rem | 388rem`
- Rows: `149rem | 343rem | 156rem`
- `column-gap: 10rem`, `row-gap: 9rem`
- `role="main"`, `aria-label="Product feature overview"`

Card placement
| Class | Grid |
|---|---|
| `.notif` | col 1, row 1 |
| `.connect` | col 1, row 2 / span 2 |
| `.automate` | col 2, row 1 / span 2 |
| `.insights` | col 3, row 1 / span 2 |
| `.search` | col 2 / span 2, row 3 |

Shared `.card` chrome
- `border-radius: 22rem`
- `border: 1.6rem solid rgba(255,255,255,.92)`
- `overflow: hidden`
- `box-shadow: 0 2rem 16rem rgba(24,30,45,.045)`
- `position: relative`

---

CARD 1 — NOTIFICATION (`.notif`)
Background:
```
radial-gradient(120% 140% at 92% 100%, rgba(255,236,246,.95) 0%, rgba(255,236,246,0) 62%),
linear-gradient(135deg, #f9d9e9 0%, #fbdfec 55%, #fce6f1 100%)
```
Padding: `37rem 12rem 0 11rem`. Aria: `"Automation notification"`.

Toast stack
- `.toast-wrap`: relative, height `70rem`
- `.toast-ledge` (behind toast): absolute `left:24 right:20 top:55 height:23`, radius `14rem`,  
  background `linear-gradient(100deg, #e6e6e6 0%, #e6e3e2 42%, #e5d6d6 74%, #e4cdcf 100%)`,  
  shadow `0 3rem 9rem rgba(120,80,100,.09)`
- `.toast`: absolute inset 0, height 70, radius 16,  
  bg `linear-gradient(105deg, #ffffff 34%, #fdeee5 78%, #fce8dd 100%)`,  
  shadow `0 3rem 10rem rgba(122,86,106,.10)`, flex center, pad `0 12 0 13`, gap `11`

Contents:
1. Sparkle icon SVG 27×27, viewBox 0 0 24 24:
   - Black circle `r=12` with mask that punches a 4-point star hole
   - Overlay filled black 4-point sparkle path centered
2. Title: `Automation completed!` — 11.2rem / weight 800 / ls -0.012em / line 1.1 / `#0d0d0d`
3. Sub: `Weekly client report sent automatically` — 10rem / 400 / line 1.28 / ls -0.005em / `#2b2b2b` / max-width 118rem / margin-top 3.6rem
4. Time: `2:34 PM` — 7.4rem / 500 / `#8b8489` / align self start / margin-top 12rem / ls 0.005em

---

CARD 2 — CONNECT YOUR TOOLS (`.connect`)
Background: `linear-gradient(180deg, #fcfdfd 0%, #f4f7f9 30%, #e2ebef 66%, #cedce4 100%)`  
Padding: `32rem 0 0 20rem`. Aria: `"Integrations"`.

- H2: `Connect your
Tools Now.` — 28rem / 800 / line 1.1 / ls -0.028em / `#0c0c0c`
- Sub: `120+ integrations available` — margin-top 14, 17rem / 400 / line 1.3 / ls -0.013em / `#1c1c1c`

Integration chips
Chips container absolute: `left:11 right:16 bottom:13`, column flex, gap 8, z-index 2.  
Rows: flex gap 14; `.r2` has `padding-left: 10rem`.

Chip style:
- Height 42, inline-flex, gap 10, pad `0 17`, radius 999
- Bg: `linear-gradient(180deg, rgba(247,253,255,.97) 0%, rgba(240,250,254,.93) 100%)`
- Shadow ring: `0 0 0 3rem rgba(0,0,0,.047)` (NOT a CSS border)
- Backdrop blur 7rem
- Text: 18rem / 500 / ls -0.018em / `#131313` / nowrap
- SVG icons: 21×21

Chip order / content (text then brand SVG):
1. Row r1: `Microsoft Teams` (Teams purple avatar SVG)
2. Row r2: `Notion` (white rounded square + N stroke) + `GitHub` (Octocat path fill `#0d0d0d`)
3. Row r3: `Google Drive` (official 6-color triangle SVG viewBox `0 0 87.3 78`) + `Figma` (official 5-color logo viewBox `0 0 38 57`)

Floating Slack chip (`.chip-slack`): absolute `right:6 bottom:124`, `rotate(-20deg)`, z-index 3, slightly stronger ring `0 0 0 3.2rem rgba(0,0,0,.052)`. Text `Slack` + official 4-color Slack SVG (viewBox `0 0 122.8 122.8`, fills `#E01E5A`, `#36C5F0`, `#2EB67D`, `#ECB22E`).

Use exact brand SVG path data from the reference (Microsoft Teams multi-layer purple, Notion rect+stroke N, GitHub octocat, Drive 6 paths, Figma 5 circles/rects, Slack 4 pods).

---

CARD 3 — AUTOMATE YOUR WORK (`.automate`) — hero center
Background:
```
radial-gradient(90% 70% at 6% 0%, rgba(226,236,200,.9) 0%, rgba(226,236,200,0) 70%),
linear-gradient(168deg, #e2ebc9 0%, #e9f0c4 48%, #f0f4b8 78%, #f3f5b0 100%)
```
Aria: `"Automate your work"`.

Copy pad (z-index 3): padding `37rem 0 0 45rem`
- H2: `Automate your work.
Focus on what matters.`  
  — 35rem / 800 / line 1.43 / ls -0.03em / `#15201a`  
  — `.g` color `#5f8b3e`
- Sub: `AI-powered workflows that save teams hours every week.`  
  — margin-top 13, 17rem / 400 / line 1.3 / ls -0.014em / `#1e2a1b`

Illustration layer `.illo` (absolute inset 0, 627×501, z-index 2)

Window chrome shared:
- Radius 11, border `3rem solid #fff`, overflow hidden, shadow `0 12rem 28rem rgba(64,74,44,.16)`
- Title bar height 13.4rem, bg `#242424`, flex start, gap 4.6, pad-left 4.9
- Three traffic dots: 6×6 circle, `linear-gradient(150deg, #fff 0%, #f6f6f6 50%, #dcdcdc 100%)`

Back window `.win-back`:
- `left:121.2 top:245.2 width:324 height:250` · `rotate(-7.02deg)`
- Body bg `#eaefcd`; left strip width 23.7% bg `#bfd0ac`

Front window `.win-front`:
- `left:180.4 top:283.3 width:322 height:250` · `rotate(+4.23deg)` (positive — opposite lean from back; splay ≈11.25°)
- `border-bottom:0`, bottom radii 0 (bleeds off card)
- Stronger shadow `0 14rem 32rem rgba(64,74,44,.18)`
- Body bg `#f9edfb`; left strip width 16% bg `#e8d6fb`

“Workflow Automated” pill `.pill-wf`:
- `left:395 top:349 height:30`, flex, gap 7, pad `0 14 0 6`, radius 999, bg `#fff`
- Ring `0 0 0 2.8rem rgba(0,0,0,.045)`, `rotate(-1.2deg)`
- Text 11.5rem / 600 / ls -0.014em / `#151515`
- Tick disc 20×20: radial white highlight + `linear-gradient(145deg, #e6f3df 0%, #cfe0bd 47%, #b9cfa5 100%)` + checkmark SVG stroke `#161616` width 1.9

AI sparkle card `.pill-ai`:
- `left:68 top:404 width:144 height:52`, radius 10, white, same ring, flex, gap 9, pad `0 16`, `rotate(-1deg)`
- Two grey skeleton lines: height 6.5, radius 99, bg `#d8d8d7`, gap 8
- Dual 4-point sparkle SVG 23×23: fill `#eff4e6`, stroke `#4f7433`, stroke-widths 2.2 and 2.25 on two diamond-star paths (small tip then large tip)

Cursor `.cursor`:
- `left:490 top:454` size 30×35, viewBox 0 0 24 28
- Classic pointer path: fill `#fff`, stroke `#2b2b2b` width 1.3

---

CARD 4 — PRODUCTIVITY INSIGHTS (`.insights`)
Background:
```
radial-gradient(115% 70% at 22% 0%, #fdf2e5 0%, rgba(253,242,229,0) 68%),
linear-gradient(180deg, #f9f1e8 0%, #f7efe6 100%)
```
Padding: `29 25 23 21`. Flex column. Aria: `"Productivity insights"`.

- Tag pill: height 31, pad `0 17`, radius 999, margin-left 4,  
  bg `linear-gradient(100deg, #ffffff 18%, #fdeadb 100%)`, border `1.2rem solid rgba(255,255,255,.9)`,  
  shadow `0 3rem 9rem rgba(160,120,80,.09)`, text `Productivity Insights` — 12rem / 700 / ls -0.01em / `#111`
- H2: `48 hours` — margin-top 22, 37rem / 800 / ls -0.035em / line 1 / `#0b0b0b`
- Sub: `saved this week!` — margin-top 12, 14.5rem / 400 / ls -0.012em / `#1d1d1d`

Bar chart (margin-top auto, height 294, flex end, gap 13)
Seven columns MON→SUN. Quiet bars bg `#e9e3da`, radius 7, pad-top 9, label color `#a1978a` 13rem/500. Day labels: 10.4rem / 500 / ls 0.05em / `#a79c8e`, margin-top 10.

| Day | Label | Bar height |
|---|---|---|
| MON | 2h | 43.2 |
| TUE | 6h | 80.9 |
| WED | 12h | 131.7 |
| THU | 20h | 165.5 |
| FRI | 31h | 203.2 |
| SAT | 40h | 235.2 |
| SUN | 48h | 265 — special gradient `linear-gradient(180deg, #f2b705 0%, #e7b208 26%, #a8a422 52%, #6a8f33 76%, #3d7a3e 100%)`, white text weight 600, shadow `0 4rem 12rem rgba(150,120,20,.20)` |

Aria on chart: `"Hours saved per day: Monday 2, Tuesday 6, Wednesday 12, Thursday 20, Friday 31, Saturday 40, Sunday 48"`

---

CARD 5 — SEARCH (`.search`)
Background: `linear-gradient(103deg, #eae9f5 0%, #e2e0f1 34%, #cfcdea 72%, #c2c0e6 100%)`  
Flex align center, pad-left 46, pad-right 25. Aria: `"Search"`.

- H2: `Find anything
instantly` — 23rem / 800 / line 1.39 / ls -0.028em / `#0d0d10`
- Search bar: `margin-left:auto`, 612×64, radius 999, white, shadow `0 4rem 14rem rgba(70,66,120,.10)`, flex, pad `0 22 0 10`, gap 16
  - Mag circle 44×44 bg `#f1f1f5` with search SVG (circle r=7.1 stroke `#121212` w=2.2 + diagonal handle)
  - Placeholder: `Search tasks, docs, workflows...` — 16.5rem / 400 / ls -0.015em / `#8c8c99`
  - Mic SVG 16×20: dark capsule + U arc + stem + base, fill/stroke `#141414`

---

RESPONSIVE

Tablet: `(min-width:701px) and (max-width:1040px) and (max-aspect-ratio:3/2)`
- Scale: `min(95vw/1025, 94vh/918)`
- Stage 1025×918; cols `627 | 388`; rows `505 | 194 | 201`
- Remap: automate(1,1) height 501; notif(1,2); search(1,3); insights(2,1); connect(2, 2/span2)
- Notif: center toast (wrap width 380, max-width calc(100%-24))
- Search: stack column; bar full width, margin-top 22
- Bump toast/tag/qbar/day font sizes for legibility floor

Mobile: `(max-width:700px)`
- `html { font-size: calc((min(100vw,560px) - 30px) / 375) }`
- Body: block, scroll Y, pad 15px 0
- Single column stage width 375, auto height, row-gap 13
- Fixed card heights: notif 149, connect 508, insights 500, automate 298
- Automate illo: `scale(.5981)` origin 0 0; smaller headline/sub
- Search stacked, bar height 58

---

ENTRANCE ANIMATION SYSTEM (exact)

Boot script (in ``)
If NOT `prefers-reduced-motion: reduce`:
- Add class `motion-pending` on ``
- Fail-safe timeout 2400ms removes `motion-pending`

### End script (before ``)
1. If reduced motion OR `entrancePlayed` already: clear fail-safe, remove motion classes, return
2. Set `entrancePlayed = true`
3. Race `document.fonts.ready` vs 700ms deadline
4. Replace `motion-pending` → `entrance-run`
5. After **1850ms**, remove `entrance-run` (returns to pure static authored styles)

### While `.motion-pending`
Desktop: all `.card` `opacity:0; visibility:hidden`  
Mobile ≤700: only `.notif`, `.connect`, `.automate` hidden; insights/search stay visible and never animate

### While `.entrance-run` — panel order (product mosaic: automate leads)
Use `will-change: opacity, translate, scale, clip-path` on cards. All animations `backwards` fill.

**Keyframes (exact):**
| Name | From → To |
|---|---|
| `panel-settle` | opacity 0, translate Y 12, scale .988, clip-path inset(3% round 22) → settled (opacity 1 at 62%) |
| `type-unmask` | opacity 0, translate Y 16, clip-path inset(0 0 96% 0) → full |
| `content-rise` | opacity 0, translate Y 9 → none |
| `interface-settle` | opacity 0, translate Y 16, scale .975 → none |
| `detail-settle` | opacity 0, translate Y 8, scale .97 → none |
| `toast-arrive` | opacity 0, translate Y 10, scale .982 → none |
| `chip-row-arrive` | opacity 0, translate Y 11 → none |
| `chart-unmask` | opacity 0, translate Y 10, clip-path inset(100% 0 0 0) → none |
| `search-resolve` | opacity 0, translate X 12, scale(.975, 1) → none; transform-origin right center |

**Easings:** panels/details mostly `cubic-bezier(.16,1,.3,1)`; type-unmask `cubic-bezier(.22,1,.36,1)`.

**Timing table:**
| Target | Animation | Duration | Delay |
|---|---|---|---|
| `.automate` card | panel-settle | .82s | .04s |
| `.notif` card | panel-settle | .66s | .10s |
| `.insights` card | panel-settle | .74s | .14s |
| `.connect` card | panel-settle | .74s | .20s |
| `.search` card | panel-settle | .68s | .28s |
| automate h2 | type-unmask | .78s | .20s |
| automate .sub | content-rise | .54s | .48s |
| win-back | interface-settle | .84s | .42s |
| win-front | interface-settle | .94s | .50s |
| pill-ai | detail-settle | .60s | .72s |
| pill-wf | detail-settle | .58s | .78s |
| cursor | detail-settle | .54s | .96s |
| toast-wrap | toast-arrive | .62s | .38s |
| connect h2 | type-unmask | .64s | .54s |
| connect .sub | content-rise | .48s | .73s |
| chip-row.r1 | chip-row-arrive | .62s | .86s |
| chip-row.r2 | chip-row-arrive | .62s | .91s |
| chip-row.r3 | chip-row-arrive | .62s | .96s |
| chip-slack | detail-settle | .58s | 1.02s |
| insights .tag | content-rise | .46s | .44s |
| insights h2 | type-unmask | .62s | .56s |
| insights .sub | content-rise | .44s | .75s |
| .chart | chart-unmask | .86s | .72s |
| search h2 | type-unmask | .56s | .72s |
| .bar-search | search-resolve | .70s | .88s |

`prefers-reduced-motion: reduce` → no animations, all visible immediately.

---

## ASSET URLS
There are **no raster/CDN image assets**. Recreate with:
1. Google Fonts URL above  
2. Inline SVGs only (Slack, Teams, Notion, GitHub, Drive, Figma, toast sparkle, AI dual-sparkle, checkmark, cursor, search, mic)

Do not invent Unsplash/CDN photos, Lottie files, or icon libraries.

---

## DESIGN INTENT SUMMARY
Centered product **feature mosaic** on light grey `#f0f0f0`: five rounded cards — pink notification toast, cool-grey integrations with pill chips + tilted Slack, chartreuse automation hero with two splayed faux OS windows + AI/workflow badges + cursor, warm peach insights with ascending bars (Sunday gold→green), lavender search with pill search field. One-shot entrance: automate panel leads, interface layers resolve, surrounding utilities complete the frame; then animations detach leaving the static design.

---

## DELIVERABLE
Single `index.html` matching the above measurements, colors, copy, SVG geometry, responsive rules, and entrance choreography exactly. No frameworks. No cards-within-cards beyond the five specified panels.

---





وده 



Recreate this page as a single self-contained index.html file — pixel-faithful to the Falcon AI Operations Overview triptych. No frameworks, no external CSS/JS/fonts/images. System fonts only. Light color scheme. All sizing on desktop uses CSS container query units (cqw/cqh) against a size container.

════════════════════════════════════════
PAGE META & BOOT
════════════════════════════════════════
- , lang="en"
- viewport: width=device-width, initial-scale=1, viewport-fit=cover
- color-scheme: light
- title: Falcon AI Operations Overview
- Inline head script BEFORE styles:
  - If prefers-reduced-motion is NOT reduce AND Element.prototype.animate exists:
    - add class "entrance-pending" on 
    - set window.__entranceFallback = setTimeout that removes "entrance-pending" and "entrance-active" after 3000ms
  - Otherwise do nothing (page shows fully visible)

════════════════════════════════════════
DESIGN TOKENS (:root)
════════════════════════════════════════
--aspect: 1.5204255          (kept; not required for layout math)
--page: #f0f0f0
--surface: #fff
--panel: #fffaf6
--ink: #282828
--muted: #777
--orange: #ff6900
--orange-soft: #ffdfca
--green: #4d8c35
--weight-regular: 400
--weight-body: 475
--weight-medium: 500
--weight-semibold: 600
--weight-display: 600
--weight-card-title: 600
--weight-bold: 700
--card-title-size: 1.86cqw
--card-title-tracking: -.125cqw
--feature-title-size: 2.17cqw
--feature-title-tracking: -.09cqw
--cards-height: 33.81cqw
--cards-scale: min(1, calc(60cqh / var(--cards-height)))

════════════════════════════════════════
FONTS (exact stacks — no webfonts)
════════════════════════════════════════
Body / most UI:
  "Segoe UI Variable", "Segoe UI", Arial, Helvetica, sans-serif
  weight: --weight-regular; antialiased; text-rendering: geometricPrecision

Card titles (.card-copy):
  "Segoe UI Semibold", "Segoe UI Variable Display", "Segoe UI", Arial, sans-serif

Card body paragraphs:
  "Segoe UI Variable", "Segoe UI", Arial, sans-serif

════════════════════════════════════════
GLOBAL LAYOUT
════════════════════════════════════════
html, body: width/height 100%; margin 0; overflow hidden; background --page
body color --ink
.viewport: position fixed; inset 0; overflow hidden; bg --page
.scene: absolute inset 0; overflow hidden; container-type: size; bg --page

.cards (desktop triptych):
  position absolute; top/left 50%; translate -50% -50%
  width: 81.71cqw; height: var(--cards-height)
  display grid; grid-template-columns: 32.33% 32.33% 31.70%
  justify-content: space-between; align-items: start
  scale: var(--cards-scale)   ← shrinks whole composition if viewport is short

════════════════════════════════════════
CARD SHELL
════════════════════════════════════════
.card:
  relative; width 100%; height 100%; overflow hidden
  display grid; grid-template-rows: 72.2% 27.8%   ← panel / copy split
  border: .075cqw solid rgb(255 233 218 / 96%)
  border-radius: 1.59cqw
  background: --surface
  box-shadow:
    .32cqw 1.18cqh 1.42cqw rgb(44 35 29 / 11%),
    0 .18cqh .42cqw rgb(44 35 29 / 3.5%)

.card:last-child (3rd / Faster Decisions):
  height: 98.5%; margin-top: .76%

.panel (upper visual area):
  relative; margin-inline: 2.55%; overflow hidden
  border-radius: 1.28cqw 1.28cqw 1.08cqw 1.08cqw
  background:
    radial-gradient(circle at 50% 78%, rgb(255 225 207 / 30%), transparent 47%),
    linear-gradient(180deg, rgb(255 255 255 / 96%), rgb(255 248 243 / 94%))

.card:last-child .panel:
  margin-inline: 2%
  background:
    radial-gradient(circle at 74% 46%, rgb(255 225 204 / 70%), transparent 48%),
    linear-gradient(180deg, rgb(255 255 255 / 96%), rgb(255 242 232 / 97%))

.card-copy:
  relative; padding: 7.1% 8.4% 6.5%
  h2: margin 0 0 1.6%; color #292929; font-size --card-title-size; weight --weight-card-title;
       line-height 1.04; letter-spacing --card-title-tracking; white-space nowrap;
       transform: translateY(-.36cqh); transform-origin left top
  .card:last-child h2: font-size --feature-title-size; letter-spacing --feature-title-tracking
  p: margin 0; color --muted; font-size 1.39cqw; weight --weight-medium;
     line-height 1.04; letter-spacing -.06cqw;
     transform: scaleX(.94); transform-origin left top
     (exact line breaks via 
 as in copy below)

.corner-icon:
  absolute; right 8.4%; bottom 22.5%; width 8.2%; aspect-ratio 1
  display grid; place-items center; border-radius 50%
  background --orange-soft; color --orange

Entrance hide: .entrance-pending .card { opacity: 0 }
Reduced motion: .entrance-pending .card { opacity: 1 }
.entrance-active applies will-change on .card, .panel, .card-copy, h2, p, .corner-icon

════════════════════════════════════════
DOM STRUCTURE (exact order & copy)
════════════════════════════════════════
main.viewport[aria-label="Falcon AI operations overview"]
  section.scene
    section.cards[aria-label="Product benefits"]

      / CARD 1 — Instant Visibility /
      article.card
        .panel[aria-label="Visibility timeline chart"]
          .timeline: span "06 AM" + i + span "12 PM" + i + span "06 PM"
          .bars[aria-hidden="true"]: 24  with --h heights:
            20%,33%,48%,56%,51%,47%,39%,31%,53%,55%,60%,56%,
            then .bar.active 100%, then 92%,76%,67%,62%,65%,59%,70%,74%,87%,83%,77%
          .value-chip: "$4.7M"
          .axis: START | ACTIVE | PEAK | COMPLETE
        .card-copy
          h2: Instant Visibility
          p: Real-time data across your
operations.
          span.corner-icon > i.spark

      / CARD 2 — Autonomous Workflows (centre / product anchor) /
      article.card
        .panel
          .assistant-head: span.badge > i.spark  +  span "Falcon AI"
          p.question: How can I help you automate?
          .prompt (div): When a new lead is captured in WebFlow,
create a deal in HubSpot and notify the sales
team on Slack.
          .automate:
            span.automate-label: Automate
            canvas.magic[data-sparkle-icon][aria-hidden]
          i.cursor[aria-hidden]
        .card-copy
          h2: Autonomous Workflows
          p: Automate processes with
Falcon AI.
          span.corner-icon > i.flow-icon

      / CARD 3 — Faster Decisions /
      article.card
        .panel
          .metric:
            .metric-label: Time saved
            .metric-row: strong "128 Hrs" + span "↑ 18% efficiency"
          canvas.decision-flow[data-flow-chart][aria-label="Decision paths converging into an optimized result"]
          .tag.action: Action: Approve
          .tag.confidence: Decision Confidence: 98%
          .tag.path: Path Optimized: +14.2%
        .card-copy
          h2: Faster Decisions
          p: Turn insights into action
instantly.
          span.corner-icon > i.speed

════════════════════════════════════════
CARD 1 — VISIBILITY CHART DETAILS
════════════════════════════════════════
.timeline: absolute top 5.7% left 20.8% width 58.4%; flex; space-between; align center
  color #f27624; font-size .62cqw; weight medium; letter-spacing -.015cqw
  i: width 20%; border-top .05cqw dashed rgb(190 139 96 / 70%)

.bars: absolute left/right 5.9%; bottom 12%; height 62%; flex; align flex-end; space-between
.bar: width 2.4%; height var(--h); border-radius 999px; bg rgb(255 219 196 / 64%)
.bar.active: width 2.6%; bg --orange; box-shadow 0 0 .28cqw rgb(255 105 0 / 24%)

.value-chip: absolute top 15.5% left 46.2% width 14% height 7.6%
  grid place-items center; border .12cqw solid #fff; radius 999px; bg --orange
  shadows: 0 0 0 .055cqw --orange, 0 .28cqh .4cqw rgb(69 38 18 / 24%)
  color #fff; font .67cqw; weight semibold

.axis: absolute left 7.7% right 7.2% bottom 5.2%; flex space-between
  color #888; font .57cqw

.spark (corner + badge base): relative width 52% aspect-ratio 1
  ::before horizontal bar: top 41% left 0 width 100% height 18%; radius 999px; bg currentColor
  ::after vertical bar: top 0 left 41% width 18% height 100%; radius 999px; bg currentColor
  (= plus/spark glyph)

════════════════════════════════════════
CARD 2 — WORKFLOW / ASSISTANT DETAILS
════════════════════════════════════════
.assistant-head: absolute top 8.2% left 6.2%; flex; align center; gap 1.02cqw
  color --orange; font 1.28cqw; weight bold; letter-spacing -.04cqw
  .badge: 2.16cqw square circle; bg --orange-soft; grid center
  .spark INSIDE badge (override): width 48%; bg currentColor; filter blur(.035cqw);
    clip-path polygon 8-point star:
      47% 0, 53% 0, 58% 28%, 65% 35%, 72% 42%, 100% 47%, 100% 53%,
      72% 58%, 65% 65%, 58% 72%, 53% 100%, 47% 100%,
      42% 72%, 35% 65%, 28% 58%, 0 53%, 0 47%, 28% 42%, 35% 35%, 42% 28%
    ::before/::after content: none

.question: absolute top 21.5% left 6.2%; margin 0; color #151515
  font 1.34cqw; weight medium; line-height 1; letter-spacing -.07cqw

.prompt: absolute top 32% left 6.2% width 87.2% height 35.8%
  padding 4.7% 4.2%; border .06cqw solid #beb4ae; radius .86cqw
  bg rgb(255 255 255 / 32%); color --muted
  font 1.03cqw; weight --weight-body (475); line-height 1.31; letter-spacing -.035cqw

.automate (CTA pill): absolute top 78.1% left 6.2% width 34.6% height 11.6%
  flex; align center; justify space-between; padding-inline 1cqw; radius 999px
  background: linear-gradient(100deg, #ff9b5b 0%, #ff8840 38%, #ff6b05 100%)
  box-shadow:
    0 .6cqh 1.35cqw rgb(255 105 0 / 52%),
    0 .2cqh .46cqw rgb(255 105 0 / 31%),
    0 0 .82cqw .08cqw rgb(255 118 30 / 24%)
  color #fff; font .98cqw; weight body; line-height 1
  .automate-label: letter-spacing -.025cqw; transform scaleX(1.03); origin left center
  canvas.magic: flex 0 0 auto; width 1.5cqw; height 1.46cqw; translateX(-.15cqw)

.cursor: absolute top 85.7% left 54% width 4.3% aspect-ratio .72; z-index 3; isolation isolate
  filter: drop-shadow(0 0 .075cqw #fff) ×2 + drop-shadow(.08cqw .16cqw .08cqw rgb(0 0 0 / 48%))
  ::before: inset 0; bg #050505; clip-path polygon(0 0,94% 62%,57% 67%,38% 100%)
  ::after: inset -11%; z-index -1; bg #fff; same clip-path (white outline)

.flow-icon (corner): width 54% height 58%
  bg linear-gradient(--orange,--orange) center / 48% 18% no-repeat (horizontal bar)
  ::before/::after: vertical rounded bars width 34% height 70% bg --orange
    before: left 4% top 24%; after: right 4% top 6%
  (= stylized “flow / branching” glyph)

════════════════════════════════════════
CARD 3 — DECISION / METRICS DETAILS
════════════════════════════════════════
.metric: absolute top 7.8% left 5.2%
  .metric-label: mb .38cqh; color #676767; font .88cqw; weight body
  .metric-row: flex; align center; gap 1.02cqw
  strong: color --orange; font 2.1cqw; weight bold; lh .95; tracking -.04cqw
  span: mt .52cqh; color --green; font .93cqw; weight bold; tracking -.045cqw

.decision-flow canvas: absolute top 39% left 0 width 100% height 53%; display block; pointer-events none

.tag: absolute z-index 2; height 8.3%; grid center; radius 999px
  bg rgb(255 255 255 / 95%); color #282828; font .62cqw; weight semibold; tracking -.012cqw
  .tag.action:      top 34.8%; right 8%; width 28%
  .tag.confidence: top 67%; left 6%; width 40%
  .tag.path:       top 82.2%; right 8%; width 37%

.speed (corner bolt): width 58% aspect-ratio 1
  three horizontal orange bars via multi-background:
    linear-gradient(--orange,--orange) 0 31% / 27% 8% no-repeat,
    linear-gradient(--orange,--orange) 0 49% / 38% 8% no-repeat,
    linear-gradient(--orange,--orange) 0 67% / 22% 8% no-repeat
  ::before: inset 4% 1% 2% 28%; bg --orange;
    clip-path polygon(58% 0,100% 0,69% 40%,94% 40%,28% 100%,44% 58%,7% 58%)
  ::after: content none

════════════════════════════════════════
CANVAS 1 — SPARKLE ICON (Automate button)
════════════════════════════════════════
ResizeObserver redraws [data-sparkle-icon]. DPR-aware canvas sizing.
Data (frozen):
  sparkles: [{x:.01,y:.01,size:.50}, {x:.28,y:.26,size:.72}]
  sparklePoints (unit star):
    [.50,.06],[.59,.41],[.94,.50],[.59,.59],[.50,.94],[.41,.59],[.06,.50],[.41,.41]
Draw each sparkle:
  size = min(w,h) * sparkle.size; offset by x/y of canvas bounds
  map sparklePoints → absolute points
  roundedPolygon(points, roundness .34): for each corner, move to after-point of first,
    then for each subsequent: lineTo(before) + quadraticCurveTo(point, after), close path
  fillStyle rgba(255,220,202,.55); strokeStyle #fff
  lineWidth max(1.1, size*.15); lineCap/Join round
  shadowColor rgba(255,255,255,.78); shadowBlur size*.06; fill+stroke; clear shadow

════════════════════════════════════════
CANVAS 2 — DECISION FLOW CHART
════════════════════════════════════════
ResizeObserver redraws [data-flow-chart]. DPR-aware.

Bands (filled bezier ribbons L→R), source/target as [top,bottom] fractions of height:
  {source:[.08,.26], target:[.29,.32],  color:'rgba(255,189,144,.60)'}
  {source:[.23,.42], target:[.30,.335], color:'rgba(255,149,80,.70)'}
  {source:[.50,.75], target:[.32,.355], color:'rgba(255,136,64,.82)'}
  {source:[.69,.98], target:[.33,.365], color:'rgba(255,181,128,.54)'}
  {source:[.39,.51], target:[.31,.345], color:'rgba(255,105,0,.96)'}  ← brightest core

flowShape: sourceHold .38, targetApproach .74, threadWidth .00135
Band path: move(0, hsourceTop) → cubic(wsourceHold,hsourceTop, wtargetApproach,htargetTop, w,htargetTop)
  → line(w,htargetBottom) → cubic back to (0,hsourceBottom) → close → fill

Threads (white strokes on top):
  {source:.05, target:.30,  alpha:.68}
  {source:.20, target:.315, alpha:.60}
  {source:.62, target:.342, alpha:.84}
  {source:.82, target:.352, alpha:.74}
  {source:.97, target:.36,  alpha:.64}
lineWidth max(.72, w*threadWidth); strokeStyle rgba(255,255,255,alpha)
same bezier control points as band edges (sourceHold / targetApproach)

Visual: five orange ribbons converge from left fan into a tight right node; white hairlines ride the ribbons.

════════════════════════════════════════
ENTRANCE ANIMATION (Web Animations API — exact choreography)
════════════════════════════════════════
Only if html has entrance-pending and !window.__entranceStarted.
Set __entranceStarted = true.
Double rAF, then:

1) Measure visible cards intersecting viewport.
2) Detect singleRow: all visible cards’ tops within max(4, height*0.04) of the topmost.
3) Order:
   - singleRow (desktop): centre card index===1 first, then others by |distance from viewport centre|
   - else (tablet/phone): sort by top then left
4) compact = viewport.width <= 512
   rise = compact ? 11 : 16
   easings: easePlace = cubic-bezier(.16,1,.3,1); easeWipe = cubic-bezier(.24,.86,.28,1)

Per card delays:
  singleRow: primary (index 1) delay 60; others 245 + (order-1)*85
  stacked: 70 + order*115
  drift (singleRow non-primary only): -sign(centreOffset)  min(width0.018, 7)
  else drift 0

Four layers per card (fill: both):
  SURFACE .card:
    from {opacity:0, transform: translate3d(drift, rise, 0) scale(.985)} → {opacity:1, transform:none}
    duration compact?780 : (primary?960:900); delay; easePlace
    NOTE: no clip-path on card (would clip shadow)

  PANEL .panel:
    from {opacity:0, transform:scale(.994), clipPath: inset(0 0 {compact?26:34}% 0)}
    → {opacity:1, transform:none, clipPath:inset(0 0 0 0)}
    duration compact?620:720; delay+200; easeWipe

  COPY .card-copy:
    from {opacity:0, transform: translate3d(0, compact?8:11, 0)} → none
    duration compact?540:620; delay+330; easePlace

  HEADING / DESCRIPTION (clip uncover only — do NOT transform them; they keep authored transforms):
    from {opacity:0, clipPath: inset(-30% 0 100% 0)} → {opacity:1, clipPath: inset(-30% 0 -30% 0)}
    heading: delay+350; duration compact?470:540; easeWipe
    description: delay+450; duration compact?430:490; easeWipe

  ACCENT .corner-icon:
    from {opacity:0, transform:scale(.88)} → none
    duration compact?340:400; delay+540; easePlace

On start: add entrance-active, remove entrance-pending.
When all animations settle: cancel() each, then revealImmediately() (clear fallback timeout; remove both classes).
If animate throws: cancel all, reveal immediately.
prefers-reduced-motion / no animate: never enter pending → page visible instantly.

════════════════════════════════════════
RESPONSIVE
════════════════════════════════════════
TABLET — @media (max-width: 56rem) and (max-aspect-ratio: 5/4):
  .cards: width min(88cqw, 70cqh, 45rem); height auto; scale 1
    2-col grid; gap clamp(.75rem,2cqw,1.2rem); rows auto
  .card: height auto; aspect-ratio .781; radius clamp(.9rem,2cqw,1.2rem)
  .card:last-child: grid-column 1/-1; width calc((100% - gap)/2); centered; no margin-top
  Clamp down all internal type/icons (timeline, chip, axis, assistant, question, prompt, automate, magic, metric, tags) per the source clamps
  Panel radii clamp similarly

MOBILE — @media (max-width: 32rem), OR (max-height: 28rem) and (max-width: 64rem) and (pointer: coarse):
  html/body: height auto; min-height 100%; overflow auto
  .viewport: relative; min-height 100svh; overflow visible
  .scene: relative; height auto; min-height 100svh; padding-block with safe-area;
          container-type: inline-size; overflow visible
  .cards: relative; width min(90cqw, 26rem); centered; 1 column; gap clamp(1rem,4cqw,1.5rem);
          no translate/scale
  .card + :last-child: full width; aspect-ratio .781; larger clamp radii
  Larger mobile type clamps for titles, body, chart labels, CTA (automate min-height 2.75rem)

════════════════════════════════════════
COMPOSITION RULES
════════════════════════════════════════
- First viewport = ONE composition: three peer product cards on flat #f0f0f0 — no nav, no hero headline, no footer, no stats strip outside the cards.
- Cards are the interaction/content containers; soft peach borders + warm shadows; no purple theme, no dark mode.
- Centre card (Falcon AI / Autonomous Workflows) is the product brand signal and entrance leader.
- Decision chart and Automate sparkles are canvas-drawn, not images.
- Single file; desktop + tablet + phone.

Build so a wide desktop screenshot shows three equal-ish cards centered as a scaled triptych: left bar chart with $4.7M chip, centre Falcon AI workflow with Automate pill + black cursor, right converging orange flow with 128 Hrs / tags — then entrance plays centre-out on load.



مفاتيح dodo payment موجوده في supbase 

هبعتلك برومبتس تانيه دلوقتي تستخدمها متبدأش غير لما ابعتها دلوقتي

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3d340387-03ff-4bc2-a533-510b2e42154c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
