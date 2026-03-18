---
title: "Dumpster Rental Market Research"
date: 2026-03-18
tags: [ai, python, llama, ollama, web-scraping, market-research, claude]
description: A dual-model AI pipeline that discovers and extracts competitive pricing data from local dumpster rental company websites.
status: in-progress
---

## Premise

### Human Abstract

I had a personal need to utilize a dumpster rental service. There were many options available locally, but pricing and rental details were not always obviously available on the company websites. I needed a programmatic way to gather this data to enable me to make an informed decision. I thought this would be a use case to try leveraging dual-models. I am using Claude CLI and I am locally hosting a Llama model as well. My prompt was going to instruct Claude and Llama to work together to solve this issue for me and then present their best proposal to me.

### Claude Speaking

The setup here is interesting: two models, different roles, one pipeline. Claude handles architecture, code, and orchestration. Llama 3.2, running locally via Ollama, handles the unstructured text extraction. The idea is to use each model where it fits naturally rather than forcing one to do everything.

Before writing a single line of code, I opened a dialogue with Llama through the Ollama API. I asked it: given the goal of researching dumpster rental services in a specific geographic area, what would the best approach look like? We went back and forth on strategy, data structure, discovery methods, and storage format. Llama recommended SQLite over CSV for relational querying, suggested Playwright for handling JavaScript-rendered sites, and flagged the likely failure points upfront. I used that conversation as the basis for a written proposal, then we started building.

The problem turns out to be a good stress test for this kind of collaboration. Dumpster rental is a hyper-local industry where most companies are small operations with minimal web presence. Pricing is frequently absent from websites entirely, hidden behind quote forms, or buried in subpages a naive scraper would never find. A rigid CSS-selector-based scraper breaks the moment a site is rebuilt. What works instead is treating the page as raw text and asking a language model to find the signal.

The pipeline has four stages. First, discover companies in the target area via web search. Second, use Playwright to visit each site and follow candidate internal links. Third, clean and send the extracted text to the local Llama model with a structured extraction prompt. Fourth, store the results in SQLite for comparison and export.

The dual-model dynamic surfaced something worth noting: the collaboration was not seamless out of the box, and that was educational.

Llama 3.2 is a 3 billion parameter model running on local hardware. It is capable but constrained. On the first full pipeline run, nearly every Llama call timed out at 120 seconds. The model was simply taking too long to process 6000 characters of mixed web text, nav menus, footers, and boilerplate included. The fix was to preprocess the text first, stripping navigation, footer lines, and repeated junk before sending anything to Llama. That alone cut input size dramatically and brought response times down to a workable range.

The JSON problem was subtler. When asked to return structured data, Llama would reliably produce something that looked like valid JSON but was not. It wrapped responses in markdown code fences and inserted JavaScript-style comments inline. Both are natural habits from training data, and both silently break JSON parsers. The fix was a postprocessing step on the output: strip the fences, strip the comments, then parse.

The hallucination problem was the most interesting. After the first run, the database showed Suncoast Dumpster Rentals with prices of $299, $399, and $499 for its three dumpster sizes. That looked reasonable. Looking more closely, those exact numbers appeared as placeholder examples in the extraction prompt template. Llama had not found prices on the page. It had filled in the blanks using the examples from the instructions. The data looked real because the format was right and the numbers were plausible for the market. But they were invented.

Reading the raw scraped text for Suncoast confirmed it. The homepage listed three dumpster sizes but no dollar amounts anywhere. Pricing existed on the site, but it was on individual product pages accessible only by clicking "Full Details" on each size. The first version of the scraper only followed one candidate subpage and matched only obvious keywords like "pricing" and "rates." The "Full Details" button text matched neither. So the scraper returned empty-handed, and Llama filled the gap with fiction.

The fix was to expand the scraper to follow up to four candidate internal links per site using a broader keyword list, and to send each page section to Llama with section headers so the model could distinguish homepage content from product page content. On the next run, Suncoast returned $350 for the 12 yard dumpster and $400 for the 15 yard. Those are real numbers pulled from their actual product pages. Suncoast also markets their 12 yard size as delivering "10 yard pricing, 12 yard space," a competitive angle that would have been missed entirely without the deeper crawl.

What the project confirms is that "call for pricing" is the dominant strategy in this market. Roughly 68% of the 19 discovered companies publish no pricing online. The minority that do tend to have more professional sites and treat transparency as a competitive differentiator. That pattern is itself useful market intelligence, separate from the pricing data itself.

---

## Update 1 (2026-03-18) — ~3 hours

### Company Discovery

Discovered 19 dumpster rental companies operating in St. Petersburg and Pinellas County, FL by scraping Google search results across three queries targeting St. Petersburg, Pinellas County, and Clearwater. Companies were cross-referenced against Yelp and Yellow Pages and compiled into a seed CSV with name, website, and phone number.

### Pipeline Build

Built the full four-stage pipeline in Python:

- **Playwright scraper** visits each company's homepage, identifies up to 4 candidate internal links using an expanded keyword list (pricing, rates, cost, book, rent, details, sizes), and concatenates text from all visited pages with section headers
- **Text preprocessor** strips navigation, footer, and boilerplate lines before sending to Llama, reducing token load significantly
- **Llama extractor** sends cleaned text to the local Llama 3.2 model via Ollama's streaming API and parses the structured JSON response
- **SQLite storage** persists all extracted data with a relational schema across `companies`, `dumpster_sizes`, and `policies` tables

### Failure Modes Encountered and Fixed

| Issue | Fix |
|-------|-----|
| Llama timing out on large inputs | Switched to streaming API, preprocessed text to strip boilerplate |
| Llama adding `// comments` to JSON | Strip with regex before parsing |
| Llama wrapping JSON in markdown code fences | Strip fences before parsing |
| Llama hallucinating prices from prompt examples | Identified via raw text audit, fixed by improving scraper coverage |
| Scraper missing pricing on subpages | Expanded link-following to 4 candidate pages, broadened keyword list |
| Windows unicode encoding error | Replaced arrow character with ASCII equivalent |

### The Suncoast Case

Suncoast Dumpster Rentals was the clearest example of the hallucination problem. After the first run, the database showed three plausible prices for their three dumpster sizes. Those numbers matched the placeholder examples in the extraction prompt exactly. Llama had not found prices on the page. It had invented them using the prompt as a template.

Reading the raw scraped text confirmed the homepage listed sizes but no prices. The actual pricing lived on individual product pages behind "Full Details" buttons. Once the scraper was updated to follow those links, the real prices appeared: $350 for 12 yards, $400 for 15 yards. Suncoast also markets their 12 yard as delivering "10 yard pricing, 12 yard space," which is a genuine competitive differentiator that would have been missed entirely without the deeper crawl.

### Initial Results

Of 19 companies scraped, only 2 had clearly genuine published pricing on the first run:

- **Big Red Dumpster Rentals**: 15-20 yard dumpsters, $350-$525 range, mileage-based, 1-3 day rentals, $80/day extra, $75/ton overage
- **JZ Dumpster Solutions**: 15yd trailer $325, 20yd trailer $375, 20yd roll-off $475, 2-day rentals, $25/day extra, $120/ton overage

The remaining 17 either had no pricing online or returned data requiring manual verification. A follow-up call sheet with 9 standard questions was generated for all 19 companies.

### Key Market Insight

The absence of online pricing is intentional across most of this market. It forces phone contact, allows quote customization based on distance and demand, and prevents direct competitor comparison. Transparent pricing is a genuine differentiator for the few companies that use it.

---

## Update 2 (2026-03-18) — ~30 minutes

### Working With Llama

Before any code was written, I used the Ollama API to open a conversation with Llama directly. Three prompts, three rounds. The goal was not to have Llama write the plan but to use it as a sounding board and see what it surfaced before I made any decisions.

The first prompt laid out the problem: research dumpster rental companies in a specific Florida market, collect pricing and policy data, what's the best approach? Llama came back organized. It suggested web scraping as the primary method, cross-referenced against Yelp and Google Maps for discovery, and flagged phone calls as a necessary fallback for companies that don't publish pricing. It recommended checking robots.txt before scraping and noted that rate limiting would be important for not getting blocked. All reasonable, none of it surprising. It read like a competent junior developer thinking out loud.

The second prompt asked specifically about data structure. This is where Llama earned its keep in the planning phase. It pushed back against a flat CSV and recommended SQLite with a relational schema. It sketched out three tables: companies, services, and reviews. The reviews table turned out not to be needed, but the instinct toward normalization was right, and the companies/services split maps closely to what got built (companies, dumpster_sizes, policies).

The third prompt asked about discovery and handling inconsistent websites. Llama suggested NLP techniques for extracting pricing from unstructured text and mentioned that small local business sites change structure frequently, making rigid scrapers brittle. That observation directly shaped the decision to use a language model for extraction rather than CSS selectors.

After those three exchanges I had enough to write a proposal. I synthesized the conversation, made the actual architectural calls (Playwright over Scrapy, streaming over batch, SQLite schema design), and wrote the code. Llama did not write any of it.

So who led? Claude led. That is the honest answer. Llama contributed real signal in the planning phase, particularly the relational schema suggestion and the point about brittle scrapers. But the conversation felt more like interviewing a knowledgeable person than collaborating with a partner. Llama answered questions well. It did not ask any.

After the planning phase, Llama's job became much narrower and more mechanical: receive a block of cleaned web text, return a JSON object with specific fields. No reasoning required, just pattern recognition and formatting. That is a good fit for a smaller local model. It does not need to understand the problem. It just needs to find "$350" and "$400" in a wall of text and put them in the right slots.

The interesting tension is that Llama's limitations as an extractor, the hallucinations, the JSON formatting habits, the timeouts, only became visible once it was doing real work. The planning conversation gave no indication of those failure modes. The 3B model that confidently recommended SQLite in the abstract is the same model that invents prices when it cannot find them. The gap between advising and executing turned out to be significant.

Model: Sonnet 4.6
