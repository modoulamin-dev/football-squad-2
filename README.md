# Scenario C · A squad sheet

**Starter for Assignment 2, the JavaScript project.** A finished page with no
JavaScript. You write `js/app.js` from the comment at the top of it.

## What is here

| File | What it is | What you do with it |
|---|---|---|
| `index.html` | The page: a form, an empty list, a summary line, a clear button. Every element named for your script | **Add your own field** (the comment inside the form shows where). Change any words you like |
| `css/styles.css` | The stylesheet. Three rules wait for JavaScript: `.form-message.is-error`, `.item.is-flagged`, `:empty` | Nothing required. Change it if you want to |
| `js/app.js` | **Empty**, with the nine things listed at the top | **All of your work** |
| `preview.png` | What the page looks like once your script is drawing a few players | Look at it. It is a picture, not a rule |

## The rules that matter

- Nothing is written into the list in the HTML. `render()` draws every player.
- The player button here is **"Scored"**. The brief allows the
  alternatives in its scenario table; pick one and make it change the data.
- The derived value is **total goals, or the top scorer**. One is enough.
- Every `<button>` keeps its `type`. The script keeps `defer`.

Read `brief.md` for what is marked and `rubric.md` for how much. Both are in
the portal beside this folder.
