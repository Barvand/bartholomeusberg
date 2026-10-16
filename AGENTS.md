# Bartholomeusberg.com rebuild team

This repository is the Next.js website for Bartholomeus Berg, a personal technology services business serving private customers and small businesses in Bergen and Arna. The site should make practical web development, custom systems, PC help, IT support, and basic security easy to understand and easy to enquire about. Read `README.md` and inspect the current site before proposing a rebuild. Keep the voice personal and specific; aim for a premium, distinctive design without generic tech imagery, inflated claims, or unnecessary complexity.

## Visual direction

Build a highly polished, personal, visually engaging website with minimalism, bold colour, expressive typography, extensive authentic photography and video, and elegant, purposeful animation. Inventory real assets and confirm usage rights before relying on photography or video in a design. Avoid generic AI agency aesthetics, excessive decoration, dependence on stock imagery, unnecessary cards, and visually empty layouts. Keep motion restrained and provide reduced-motion support.

## Coordination and shared decisions

- The main Codex agent owns the brief, task boundaries, sequencing, integration, and final decisions. Delegate bounded questions or file sets to specialists; wait for their findings before resolving dependencies.
- Use `docs/strategy/brief.md` as the shared approved brief once strategy work begins. Record audience, services, positioning, target locations, desired enquiry paths, evidence, constraints, and decisions there. The coordinator owns this file.
- Specialists should read the approved brief and the relevant handoff documents before work. Use `docs/strategy/marketing.md`, `ux.md`, `design.md`, `content.md`, and `seo.md` for their respective proposals. The coordinator reconciles conflicts in the brief; a specialist must not silently override another discipline's decision.
- Give each agent an explicit task, expected output, permitted files, and a stop condition. Each agent may edit only its assigned files. Read access does not grant edit access. The coordinator must assign disjoint files to parallel writers and integrate sequentially when work overlaps.
- Preserve the existing project-specific `seo-specialist` agent. Use it for Norwegian local and technical SEO. Do not replace it with the agency catalog's generic SEO profile.

## Roles and handoffs

| Agent                   | Primary responsibility                                                                           | Default writable scope                               |
| ----------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| `marketing-strategist`  | Advise on audience, local positioning, offers, enquiry funnel, channels and measurement          | `docs/strategy/marketing.md`                         |
| `seo-specialist`        | Advise on Norwegian search intent, local SEO, site structure and metadata                       | `docs/strategy/seo.md` after explicit assignment     |
| `UX Architect`          | Own information architecture, user journeys, navigation, conversion paths and UX handoff         | `docs/strategy/ux.md`                                |
| `UI Designer`           | Own visual design proposals, typography, colour, components and responsive states               | `docs/strategy/design.md`                            |
| `Content Creator`       | Develop personal, credible Norwegian page copy and calls to action from verified facts          | `docs/strategy/content.md`                           |
| `Frontend Developer`    | Implement approved UI and content in the Next.js app incrementally                              | Only the `app/` or `pages/` files named in its task  |
| `Accessibility Auditor` | Independently validate accessibility and report reproducible findings and fixes                 | `docs/qa/accessibility.md` after explicit assignment |
| `Code Reviewer`         | Independently review the change set for defects and regressions                                 | `docs/qa/code-review.md` after explicit assignment   |

The auditor and reviewer should normally report findings without editing application code. The coordinator assigns fixes to the frontend agent or handles integration after reconciling findings. Do not let competing agents independently redesign or edit the same components. Do not send multiple agents to edit `app/globals.css`, `app/content.ts`, shared components, or the same route concurrently.

## Phases and approval points

1. **Discovery and strategy:** Audit the present site, existing brand decisions and available assets. Ask marketing, SEO, and UX agents for separate evidence-backed findings; consolidate the brief and proposed page structure. Obtain the owner's approval of positioning, services, audience, and enquiry goals before visual design.
2. **Design and content:** Have UI Designer and Content Creator develop design concepts, specifications and copy from the approved brief. Use UX Architect for handoff details. Present the visual direction, key page structure, and representative Norwegian copy for approval before implementation.
3. **Implementation:** Assign non-overlapping files to the Frontend Developer, with the approved strategy documents as inputs. Implement approved designs incrementally; the coordinator integrates any shared edits. Obtain approval of the implemented direction before release preparation.
4. **QA:** Run the existing lint and build scripts, TasteSkill validation and screenshot review, inspect responsive layouts in a real browser, test the contact journey, and request independent accessibility, SEO, and code reviews. Track findings with severity and resolution. Obtain approval before any deployment. Do not deploy or commit without an explicit request.

When asking for phase approval, present the concrete deliverables, unresolved decisions, and meaningful tradeoffs. Do all work that can be completed within the current phase before asking. Never overwrite existing brand decisions without the owner's explicit approval.

## Design authority

- TasteSkill v2 at `C:\Users\B\.agents\skills\design-taste-frontend\SKILL.md` governs the website design workflow, creative direction, page composition, motion, browser inspection and visual quality checks.
- TypeUI Bold at `.agents/skills/design-system/SKILL.md` provides candidate typography, colour tokens and component design foundations. It is a proposed direction, not evidence of Bartholomeus Berg's existing brand identity.
- When the owner explicitly approves TypeUI Bold's palette and typography, preserve them during TasteSkill direction generation with its supported `--keep palette,type` option. Until then, treat those values as proposals.
- Resolve conflicting rules against the approved project brief and accessibility requirements, then TasteSkill's documented constraints. Record design choices and any justified exceptions in `docs/strategy/design.md`; do not silently combine incompatible prescriptions.

## Installed design skills

TasteSkill and the other user-level design skills are installed under `C:\Users\B\.agents\skills`; TypeUI Bold is project-local under `.agents/skills/design-system/`. Use their existing manifests when relevant. Do not duplicate or reinstall them.

| Phase          | Skill use                                                                                                                                                                                                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Discovery      | `redesign-existing-projects` for an audit of the existing site; `design-taste-frontend` for public-page art direction and visual critique.                                                                                                                                                             |
| Design         | `design-taste-frontend` as the main website design workflow; project-local `bold` (TypeUI Bold) as a candidate token and component foundation. `high-end-visual-design` may inform typography and spacing; `minimalist-ui` is an optional editorial direction if it fits the approved brief. Resolve conflicting style rules against the brief rather than combining every prescription. |
| Implementation | `design-taste-frontend` for page composition and screenshot review; `redesign-existing-projects` for targeted improvements to the current Next.js project. Use `gpt-taste` only if the owner approves substantial motion and it serves the content; the existing brief favours restrained animation.   |
| QA             | `design-taste-frontend` for browser-based visual review and `redesign-existing-projects` for regression checks. `find-skills` is for discovering additional skills if a real gap appears, not a default rebuild step.                                                                                  |

## Quality and evidence

- Prefer Norwegian copy aimed at real Bergen/Arna customers. Verify business facts, testimonials, prices, service promises, keyword volumes, and performance claims before publishing them.
- Prioritize qualified enquiries and clear contact paths over vanity metrics. Preserve accessibility, mobile usability, page performance, and the existing contact flow.
- Record strategy assumptions separately from observed facts. Make QA findings reproducible, cite affected files or pages, and retest fixes.
