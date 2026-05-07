# AI-Generated Reading Interpretation — Plan

A future feature for `plum-blossom-iching`: let users get an AI-generated personalised interpretation of their cast, synthesising the question, the three hexagrams, the changing line, and the Ti-Yong analysis into a coherent reading.

---

## What's needed

### 1. Backend endpoint
The Anthropic API key can't ship in the browser bundle, so calls have to go through a server.

- **Recommended**: Vercel serverless function at `/api/interpret`. Receives the cast result + question, calls Anthropic, streams text back. Already on Vercel, so no new infrastructure.
- **Alternative**: Supabase Edge Function — automatically receives the user's JWT, which makes per-user rate limiting trivial.

### 2. The prompt
- **System prompt**: frames Claude as a Plum Blossom (Mai Hoa Dịch Số) interpreter; outlines the tradition's interpretive approach.
- **User message**: question, three hexagrams (Original / Nuclear / Transformed) with names + judgments + images, the changing line and its meaning, the Ti-Yong outcome, the user's language.
- **Output**: 4–6 paragraph personalised reading in `vi` / `en` / `zh`.
- **Prompt caching**: the system prompt and the static tradition-reference block stay the same every call, so cache them — ~90% discount on the cached portion after the first call. This is a big deal since most of the prompt is invariant.

### 3. Frontend wire-up
- "Interpret with AI" button on `ReadingDisplay`.
- Stream the response via SSE so paragraphs appear progressively.
- On completion, persist the text on the reading entry (e.g. `reading.interpretation`) so re-viewing in History doesn't re-charge.
- Show the saved interpretation when present; show the button when absent.

---

## Decisions to make first

1. **Auth gate** — require sign-in to use the endpoint?
   **Strongly yes.** Without it, the public URL is a credit-draining vector. Magic-link auth is already wired; this becomes a single `if (!session) return 401`.

2. **Model**
   - Sonnet 4.6 — sweet spot, ~$0.005 uncached / ~$0.001 cached per reading.
   - Opus 4.7 — deepest readings, ~$0.025 per reading.
   - Haiku 4.5 — cheapest at ~$0.0005, but may flatten nuance, especially in Vietnamese/Chinese.
   Default recommendation: **Sonnet 4.6**.

3. **Trigger**
   - Button-press — cheap, deliberate, reading is generated on demand.
   - Auto-run on cast — better flow, higher cost, more pressure on rate limits.
   Default recommendation: **button**.

4. **Persistence and re-runs**
   - Save the first interpretation on the reading entry.
   - Allow "regenerate"? If yes, overwrite or keep history? Keeping history makes the data shape grow but is cheap.

---

## Effort breakdown

Roughly 4–6 hours of focused work:

| Phase | Estimate |
|---|---|
| Endpoint + prompt + streaming | ~2h |
| Frontend button + streaming UI + error states | ~1.5h |
| Persist + show in History | ~0.5h |
| Per-user rate limit (Supabase row count or KV) | ~1h |
| Multilingual prompt tuning + a few test casts | ~0.5–1h |

---

## Cost ballpark

With prompt caching + Sonnet 4.6: **~$0.001–0.005 per reading**.

- 100 readings/month → under $1.
- 1,000 readings/month → ~$5.

Real risk isn't usage — it's whether the endpoint is auth-gated.

---

## Data shape addition

The reading entry would gain an optional field:

```js
{
  id, data, createdAt, updatedAt, deletedAt, dirty,
  interpretation: {
    text: "…",
    model: "claude-sonnet-4-6",
    lang: "vi",
    generatedAt: "2026-05-08T12:34:56Z",
  } | null,
}
```

`storage/local.js` `_migrateEntry` doesn't need changes — `interpretation: null` is the default for entries that pre-date this feature.

The Supabase `readings.data` is `jsonb`, so no schema migration needed there either.

---

## Open questions

- **Sharing**: any plan to let users share interpretations? If yes, need to think about anonymisation and a public read URL.
- **Multi-pass**: should follow-up questions on the same cast be supported (e.g. "expand on the changing line")? That's a separate feature — chat-on-reading rather than one-shot interpret.
- **Disclaimer**: the static commentary already carries traditional caveats; the AI reading should probably get its own "for reflection, not prescription" footer.
