# UX Guidelines — full reference

119 rules, grouped by category, most severe first within each.

Vendored from nextlevelbuilder/ui-ux-pro-max-skill (MIT). See `../ATTRIBUTION.md`.

## Accessibility

### Text Reflow and Spacing — Critical · Web
Text must remain available at narrow widths zoom and user spacing overrides

- **Do:** Use fluid sizes content-driven height and unitless line height
- **Don't:** Clip text in fixed-width or fixed-height boxes
- OK: `.copy { inline-size: min(100%, 65ch); height: auto; line-height: 1.5; }`
- NO: `.copy { width: 900px; height: 40px; overflow: hidden; }`

### Compact Control Semantics — Critical · Web
Interactive chips need a native role accessible name state keyboard operation and visible focus

- **Do:** Prefer a button and expose pressed or selected state that matches the visible label
- **Don't:** Use a clickable div or reveal the only action on hover
- OK: `<button aria-pressed='true'>Open now</button>`
- NO: `<div class='selected' onclick='toggle()'>Open now</div>`

### Color Contrast — High · All
Text must be readable against background

- **Do:** Minimum 4.5:1 ratio for normal text
- **Don't:** Low contrast text
- OK: `#333 on white (7:1)`
- NO: `#999 on white (2.8:1)`

### Color Only — High · All
Don't convey information by color alone

- **Do:** Use icons/text in addition to color
- **Don't:** Red/green only for error/success
- OK: `Red text + error icon`
- NO: `Red border only for error`

### Alt Text — High · All
Images need text alternatives

- **Do:** Descriptive alt text for meaningful images
- **Don't:** Empty or missing alt attributes
- OK: `alt='Dog playing in park'`
- NO: `alt='' for content images`

### ARIA Labels — High · All
Interactive elements need accessible names

- **Do:** Add aria-label for icon-only buttons
- **Don't:** Icon buttons without labels
- OK: `aria-label='Close menu'`
- NO: `<button><Icon/></button>`

### Keyboard Navigation — High · Web
Web users need complete keyboard navigation with visible focus on every operable control

- **Do:** Keep tab order aligned with visual order and test every action without a pointer
- **Don't:** Keyboard traps or illogical tab order
- OK: `tabIndex for custom order`
- NO: `Unreachable elements`

### Form Labels — High · All
Inputs must have associated labels

- **Do:** Use label with for attribute or wrap input
- **Don't:** Placeholder-only inputs
- OK: `<label for='email'>`
- NO: `placeholder='Email' only`

### Error Messages — High · All
Error messages must be announced

- **Do:** Use aria-live or role=alert for errors
- **Don't:** Visual-only error indication
- OK: `role='alert'`
- NO: `Red border only`

### Motion Sensitivity — High · All
Parallax/Scroll-jacking causes nausea

- **Do:** Honor prefers-reduced-motion and present the final readable state without parallax or scroll-jacking
- **Don't:** Force scroll effects
- OK: `@media (prefers-reduced-motion)`
- NO: `ScrollTrigger.create()`

### Focus Not Obscured (Minimum) — High · Web
WCAG 2.2 AA requires keyboard focus to remain at least partially visible

- **Do:** Offset sticky UI with scroll-padding and dismiss or move persistent overlays
- **Don't:** Let headers footers banners or chat widgets fully cover focus
- OK: `scroll-padding-top: var(--header-height)`
- NO: `fixed overlay covers :focus`

### Dragging Movements — High · All
WCAG 2.2 AA requires a single-pointer alternative for author-controlled drag operations

- **Do:** Add buttons menus or tap-to-move controls and retain keyboard operation
- **Don't:** Make dragging the only way to reorder resize or select
- OK: `Move up and Move down buttons beside drag handle`
- NO: `drag handle only`

### Target Size (Minimum) — High · Web
WCAG 2.2 AA requires 24 CSS px pointer targets or an applicable exception

- **Do:** Use at least 24 by 24 CSS px or verify spacing equivalent inline user-agent or essential exceptions
- **Don't:** Assume native 44pt or 48dp guidance defines web conformance
- OK: `min-width: 24px; min-height: 24px`
- NO: `tiny adjacent icon buttons`

### Contextual Live Badge Updates — High · Web
Async badge and count changes should announce a meaningful contextual status without moving focus

- **Do:** Use one appropriate atomic status message such as 3 items in cart
- **Don't:** Announce a bare number or make every badge a competing live region
- OK: `<span role='status' aria-atomic='true'>3 items in cart</span>`
- NO: `<span aria-live='polite'>3</span>`

### Heading Hierarchy — Medium · Web
Screen readers use headings for navigation

- **Do:** Use sequential heading levels h1-h6
- **Don't:** Skip heading levels or misuse for styling
- OK: `h1 then h2 then h3`
- NO: `h1 then h4`

### Screen Reader — Medium · All
Content should make sense when read aloud

- **Do:** Use semantic HTML and ARIA properly
- **Don't:** Div soup with no semantics
- OK: `<nav> <main> <article>`
- NO: `<div> for everything`

### Skip Links — Medium · Web
Allow keyboard users to skip navigation

- **Do:** Provide skip to main content link
- **Don't:** No skip link on nav-heavy pages
- OK: `Skip to main content link`
- NO: `100 tabs to reach content`

### Focus Not Obscured (Enhanced) — Medium · Web
WCAG 2.2 AAA requires keyboard focus to remain fully visible

- **Do:** Keep the entire focused component unobscured by author-created content
- **Don't:** Present this enhanced AAA criterion as an AA requirement or allow persistent UI to hide any part of focus
- OK: `close persistent overlay before focus moves behind it`
- NO: `sticky footer covers half the focused button`

### Focus Appearance — Medium · Web
WCAG 2.2 AAA defines minimum area and contrast for focus indicators

- **Do:** Use an indicator at least as large as a 2 CSS px perimeter with 3:1 state contrast
- **Don't:** Present this enhanced AAA criterion as an AA requirement or use a thin low-contrast outline
- OK: `outline: 2px solid currentColor; outline-offset: 2px`
- NO: `box-shadow: 0 0 1px low-contrast`

### Consistent Help — Medium · All
WCAG 2.2 A requires repeated help mechanisms to stay in the same relative order

- **Do:** Keep contact self-help and automated help in consistent locations
- **Don't:** Move help controls to different locations on each page
- OK: `shared header help menu`
- NO: `page-specific help placement`

## Content

### Essential Text Truncation — Critical · All
Headings actions errors safety text and distinguishing names need complete access

- **Do:** Wrap stack resize or provide a visible full-detail path
- **Don't:** Clamp essential meaning only to make cards uniform
- OK: `Action label wraps or opens full details`
- NO: `Primary action shown only as an unexplained ellipsis`

### Compact Label Semantics — High · All
Badges communicate state while chips or tags represent values or actions

- **Do:** Choose static or interactive markup from the label's meaning and ownership
- **Don't:** Make every pill clickable or encode status with color alone
- OK: `<span class='status'>Pending</span>`
- NO: `<div class='pill' onclick='toggle()'>Pending</div>`

### Compact Label Overflow — High · All
A badge chip or pill label should stay whole on one line when practical and disclose unavoidable truncation

- **Do:** Bound only unpredictable values; use nowrap with a shrinkable label; expose full text to keyboard pointer and touch users
- **Don't:** Let one compact label wrap to a second line or use a hover-only tooltip
- OK: `Flexible label with min-width 0 and an operable full-value disclosure`
- NO: `Fixed-width badge wraps to second line or clips with title-only recovery`

### Truncation — Medium · All
Handle long content gracefully

- **Do:** Truncate with ellipsis and expand option
- **Don't:** Overflow or broken layout
- OK: `line-clamp-2 with expand`
- NO: `Overflow or cut off`

### Date Formatting — Low · All
Use locale-appropriate date formats

- **Do:** Use relative or locale-aware dates
- **Don't:** Ambiguous date formats
- OK: `2 hours ago or locale format`
- NO: `01/02/03`

### Number Formatting — Low · All
Format large numbers for readability

- **Do:** Use thousand separators or abbreviations
- **Don't:** Long unformatted numbers
- OK: `1.2K or 1,234`
- NO: `1234567`

### Placeholder Content — Low · All
Show realistic placeholders during dev

- **Do:** Use realistic sample data
- **Don't:** Lorem ipsum everywhere
- OK: `Real sample content`
- NO: `Lorem ipsum`

## Security / Accessibility

### Accessible Authentication (Minimum) — Critical · All
WCAG 2.2 AA says authentication must not depend only on a cognitive function test unless an exception applies

- **Do:** Allow password managers and paste; offer passkeys OAuth or another non-cognitive method
- **Don't:** Block paste or require manual OTP transcription with no alternative
- OK: `autocomplete="current-password" and paste allowed`
- NO: `onpaste preventDefault`

## AI Interaction

### Disclaimer — High · All
Users need to know they talk to AI

- **Do:** Clearly label AI generated content
- **Don't:** Present AI as human
- OK: `AI Assistant label`
- NO: `Fake human name without label`

### Streaming — Medium · All
Waiting for full text is slow

- **Do:** Stream text response token by token
- **Don't:** Show loading spinner for 10s+
- OK: `Typewriter effect`
- NO: `Spinner until 100% complete`

### Feedback Loop — Low · All
AI needs user feedback to improve

- **Do:** Thumps up/down or 'Regenerate'
- **Don't:** Static output only
- OK: `Feedback component`
- NO: `Read-only text`

## Animation

### Excessive Motion — High · All
Too many animations cause distraction and motion sickness

- **Do:** Animate 1-2 key elements per view maximum
- **Don't:** Animate everything that moves
- OK: `Single hero animation`
- NO: `animate-bounce on 5+ elements`

### Reduced Motion — High · All
Respect user's motion preferences

- **Do:** Check prefers-reduced-motion media query
- **Don't:** Ignore accessibility motion settings
- OK: `@media (prefers-reduced-motion: reduce)`
- NO: `No motion query check`

### Loading States — High · All
Show feedback during async operations

- **Do:** Use skeleton screens or spinners
- **Don't:** Leave UI frozen with no feedback
- OK: `animate-pulse skeleton`
- NO: `Blank screen while loading`

### Hover vs Tap — High · All
Hover effects don't work on touch devices

- **Do:** Use click/tap for primary interactions
- **Don't:** Rely only on hover for important actions
- OK: `onClick handler`
- NO: `onMouseEnter only`

### Auto-Rotating Content Controls — High · All
Auto-rotating content needs user control

- **Do:** Provide previous next and play/pause; stop on focus or hover and when reduced motion is requested
- **Don't:** Auto-advance slides without a stop control
- OK: `button aria-label="Pause carousel"`
- NO: `timer-only carousel`

### Cancellable State Transitions — High · Web
Rapid compact-control changes can interrupt an in-flight transition

- **Do:** Cancel or replace prior motion; set the final semantic state directly and handle cancellation cleanup
- **Don't:** Depend on animationend or transitionend for required state correctness
- OK: `previous?.cancel(); setSelected(next)`
- NO: `Enable the chip only inside transitionend`

### Duration Timing — Medium · All
Motion duration depends on distance complexity platform and user context

- **Do:** Use shared motion tokens and test that feedback stays responsive
- **Don't:** Present 150-300ms or any cutoff as a universal requirement
- OK: `transition-colors duration-200`
- NO: `One duration copied to every transition`

### Continuous Animation — Medium · All
Infinite animations are distracting

- **Do:** Use for loading indicators only
- **Don't:** Use for decorative elements
- OK: `animate-spin on loader`
- NO: `animate-bounce on icons`

### Transform Performance — Medium · Web
Some CSS properties trigger expensive repaints

- **Do:** Use transform and opacity for animations
- **Don't:** Animate width/height/top/left properties
- OK: `transform: translateY()`
- NO: `top: 10px animation`

### Easing Functions — Low · All
Easing should match how an element changes speed and purpose

- **Do:** Use deceleration when arriving acceleration when leaving and linear for constant-rate progress
- **Don't:** Reject linear easing even for steady rotation or progress
- OK: `ease-out for entry; linear for spinner`
- NO: `ease-in-out for every motion`

## Feedback

### Loading Indicators — High · All
Loading feedback should match the expected wait and avoid flashing for near-instant work

- **Do:** Follow platform and component guidance; preserve layout focus and accessible busy status
- **Don't:** Apply one timing threshold to every operation or leave long waits unexplained
- OK: `Stable skeleton or progress with aria-busy`
- NO: `Flickering spinner or frozen UI`

### Empty States — Medium · All
Guide users when no content exists

- **Do:** Show helpful message and action
- **Don't:** Blank empty screens
- OK: `No items yet. Create one!`
- NO: `Empty white space`

### Error Recovery — Medium · All
Help users recover from errors

- **Do:** Provide clear next steps
- **Don't:** Error without recovery path
- OK: `Try again button + help link`
- NO: `Error message only`

### Progress Indicators — Medium · All
Show progress for multi-step processes

- **Do:** Step indicators or progress bar
- **Don't:** No indication of progress
- OK: `Step 2 of 4 indicator`
- NO: `No step information`

### Toast Notifications — Medium · All
Transient messages for non-critical info

- **Do:** Auto-dismiss after 3-5 seconds
- **Don't:** Toasts that never disappear
- OK: `Auto-dismiss toast`
- NO: `Persistent toast`

### Confirmation Messages — Medium · All
Confirm successful actions

- **Do:** Brief success message
- **Don't:** Silent success
- OK: `Saved successfully toast`
- NO: `No confirmation`

## Forms

### Input Labels — High · All
Every input needs a visible label

- **Do:** Always show label above or beside input
- **Don't:** Placeholder as only label
- OK: `<label>Email</label><input>`
- NO: `placeholder='Email' only`

### Error Placement — High · All
Each invalid field needs an inline error connected to that field

- **Do:** Show a specific error below the input and reference it with aria-describedby
- **Don't:** Show only a top-level error without identifying each invalid field
- OK: `<input aria-describedby="email-error"><p id="email-error">Enter an email address</p>`
- NO: `Red border or summary only`

### Submit Feedback — High · All
Confirm form submission status

- **Do:** Show loading then success/error state
- **Don't:** No feedback after submit
- OK: `Loading -> Success message`
- NO: `Button click with no response`

### Inline Validation — Medium · All
Validate as user types or on blur

- **Do:** Validate on blur for most fields
- **Don't:** Validate only on submit
- OK: `onBlur validation`
- NO: `Submit-only validation`

### Input Types — Medium · All
Use appropriate input types

- **Do:** Use email tel number url etc
- **Don't:** Text input for everything
- OK: `type='email'`
- NO: `type='text' for email`

### Autofill Support — Medium · Web
Help browsers autofill correctly

- **Do:** Use autocomplete attribute properly
- **Don't:** Block or ignore autofill
- OK: `autocomplete='email'`
- NO: `autocomplete='off' everywhere`

### Required Indicators — Medium · All
Mark required fields clearly

- **Do:** Use asterisk or (required) text
- **Don't:** No indication of required fields
- OK: `* required indicator`
- NO: `Guess which are required`

### Password Visibility — Medium · All
Let users see password while typing

- **Do:** Toggle to show/hide password
- **Don't:** No visibility toggle
- OK: `Show/hide password button`
- NO: `Password always hidden`

### Input Affordance — Medium · All
Inputs should look interactive

- **Do:** Use distinct input styling
- **Don't:** Inputs that look like plain text
- OK: `Border/background on inputs`
- NO: `Borderless inputs`

### Mobile Keyboards — Medium · Mobile
Show appropriate keyboard for input type

- **Do:** Use inputmode attribute
- **Don't:** Default keyboard for all inputs
- OK: `inputmode='numeric'`
- NO: `Text keyboard for numbers`

### Redundant Entry — Medium · All
WCAG 2.2 A avoids requiring the same information twice in one process

- **Do:** Auto-populate prior values or let users select previously entered information
- **Don't:** Ask users to retype the same address or account data without necessity
- OK: `reuse confirmed shipping address`
- NO: `repeat full address form`

## Forms / Accessibility

### Focusable Error Summary — High · Web
An error summary for failed validation complements inline field errors and must be easy to find by keyboard and screen reader users

- **Do:** Place it at the top of the form; move focus to its heading or container after failed submit; link each item to its invalid field; retain inline errors
- **Don't:** Replace inline errors with a visual-only summary or move focus on every blur
- OK: `<div role="alert" tabindex="-1" aria-labelledby="error-title"><h2 id="error-title">There is a problem</h2><a href="#email">Enter an email address</a></div>`
- NO: `Toast only with no field links or focus target`

## Interaction

### Focus States — High · All
Keyboard focus, including controls inside a modal, needs a visible indicator

- **Do:** Use a visible focus ring on every interactive control, including modal controls
- **Don't:** Remove focus outline without replacement
- OK: `focus:ring-2 focus:ring-blue-500`
- NO: `outline-none without alternative`

### Loading Buttons — High · All
Prevent double submission during async actions

- **Do:** Disable button and show loading state
- **Don't:** Allow multiple clicks during processing
- OK: `disabled={loading} spinner`
- NO: `Button clickable while loading`

### Error Feedback — High · All
Users need to know when something fails

- **Do:** Show clear error messages near problem
- **Don't:** Silent failures with no feedback
- OK: `Red border + error message`
- NO: `No indication of error`

### Confirmation Dialogs — High · All
Prevent accidental destructive actions

- **Do:** Confirm before delete/irreversible actions
- **Don't:** Delete without confirmation
- OK: `Are you sure modal`
- NO: `Direct delete on click`

### Hover States — Medium · Web
Visual feedback on interactive elements

- **Do:** Change cursor and add subtle visual change
- **Don't:** No hover feedback on clickable elements
- OK: `hover:bg-gray-100 cursor-pointer`
- NO: `No hover style`

### Active States — Medium · All
Show immediate feedback on press/click

- **Do:** Add pressed/active state visual change
- **Don't:** No feedback during interaction
- OK: `active:scale-95`
- NO: `No active state`

### Disabled States — Medium · All
Clearly indicate non-interactive elements

- **Do:** Reduce opacity and change cursor
- **Don't:** Confuse disabled with normal state
- OK: `opacity-50 cursor-not-allowed`
- NO: `Same style as enabled`

### Success Feedback — Medium · All
Confirm successful actions to users

- **Do:** Show success message or visual change
- **Don't:** No confirmation of completed action
- OK: `Toast notification or checkmark`
- NO: `Action completes silently`

## Layout

### Z-Index Management — High · Web
Stacking context conflicts cause hidden elements

- **Do:** Define z-index scale system (10 20 30 50)
- **Don't:** Use arbitrary large z-index values
- OK: `z-10 z-20 z-50`
- NO: `z-[9999]`

### Content Jumping — High · Web
Images badges validation text and skeleton replacements can shift nearby content when they update

- **Do:** Reserve appropriate space or keep async states in a stable content-driven container
- **Don't:** Insert compact text or media without a layout strategy
- OK: `aspect-ratio for media; stable count slot for badges`
- NO: `Badge insertion pushes toolbar actions`

### Long Token Wrapping — High · Web
URLs identifiers and user content must not force horizontal overflow

- **Do:** Use overflow-wrap anywhere and let flex or grid text children shrink
- **Don't:** Apply word-break break-all to all prose
- OK: `.token { min-inline-size: 0; overflow-wrap: anywhere; }`
- NO: `.token { white-space: nowrap; }`

### Chip Collection Reflow — High · All
Filter chips and editable value collections must preserve labels when space or text size changes

- **Do:** Wrap the collection or use an operable +n disclosure for hidden overflow values
- **Don't:** Force all chips into one clipped row or hide overflow values
- OK: `<div class='chip-list'>{chips}</div> with flex-wrap`
- NO: `<div class='chip-list' style='height:32px;overflow:hidden'>`

### Overflow Hidden — Medium · Web
Hidden overflow can clip important content

- **Do:** Test all content fits within containers
- **Don't:** Blindly apply overflow-hidden
- OK: `overflow-auto with scroll`
- NO: `overflow-hidden truncating content`

### Fixed Positioning — Medium · Web
Fixed elements can overlap or be inaccessible

- **Do:** Account for safe areas and other fixed elements
- **Don't:** Stack multiple fixed elements carelessly
- OK: `Fixed nav + fixed bottom with gap`
- NO: `Multiple overlapping fixed elements`

### Stacking Context — Medium · Web
New stacking contexts reset z-index

- **Do:** Understand what creates new stacking context
- **Don't:** Expect z-index to work across contexts
- OK: `Parent with z-index isolates children`
- NO: `z-index: 9999 not working`

### Viewport Units — Medium · Web
100vh can be problematic on mobile browsers

- **Do:** Use dvh or account for mobile browser chrome
- **Don't:** Use 100vh for full-screen mobile layouts
- OK: `min-h-dvh or min-h-screen`
- NO: `h-screen on mobile`

### Container Width — Medium · Web
Content too wide is hard to read

- **Do:** Limit max-width for text content (65-75ch)
- **Don't:** Let text span full viewport width
- OK: `max-w-prose or max-w-3xl`
- NO: `Full width paragraphs`

## Navigation

### Smooth Scroll — High · Web
Anchor links should scroll smoothly to target section

- **Do:** Use scroll-behavior: smooth on html element
- **Don't:** Jump directly without transition
- OK: `html { scroll-behavior: smooth; }`
- NO: `<a href='#section'> without CSS`

### Back Button — High · Mobile
Users expect back to work predictably

- **Do:** Preserve navigation history properly
- **Don't:** Break browser/app back button behavior
- OK: `history.pushState()`
- NO: `location.replace()`

### Sticky Navigation — Medium · Web
Fixed nav should not obscure content

- **Do:** Add padding-top to body equal to nav height
- **Don't:** Let nav overlap first section content
- OK: `pt-20 (if nav is h-20)`
- NO: `No padding compensation`

### Active State — Medium · All
Current page/section should be visually indicated

- **Do:** Highlight active nav item with color/underline
- **Don't:** No visual feedback on current location
- OK: `text-primary border-b-2`
- NO: `All links same style`

### Deep Linking — Medium · All
URLs should reflect current state for sharing

- **Do:** Update URL on state/view changes
- **Don't:** Static URLs for dynamic content
- OK: `Use query params or hash`
- NO: `Single URL for all states`

### Breadcrumbs — Low · Web
Show user location in site hierarchy

- **Do:** Use for sites with 3+ levels of depth
- **Don't:** Use for flat single-level sites
- OK: `Home > Category > Product`
- NO: `Only on deep nested pages`

## Performance

### Image Optimization — High · All
Large images slow page load

- **Do:** Use appropriate size and format (WebP)
- **Don't:** Unoptimized full-size images
- OK: `srcset with multiple sizes`
- NO: `4000px image for 400px display`

### Lazy Loading — Medium · All
Load content as needed

- **Do:** Lazy load below-fold images and content
- **Don't:** Load everything upfront
- OK: `loading='lazy'`
- NO: `All images eager load`

### Code Splitting — Medium · Web
Large bundles slow initial load

- **Do:** Split code by route/feature
- **Don't:** Single large bundle
- OK: `dynamic import()`
- NO: `All code in main bundle`

### Caching — Medium · Web
Repeat visits should be fast

- **Do:** Set appropriate cache headers
- **Don't:** No caching strategy
- OK: `Cache-Control headers`
- NO: `Every request hits server`

### Font Loading — Medium · Web
Web fonts can block rendering

- **Do:** Use font-display swap or optional
- **Don't:** Invisible text during font load
- OK: `font-display: swap`
- NO: `FOIT (Flash of Invisible Text)`

### Third Party Scripts — Medium · Web
External scripts can block rendering

- **Do:** Load non-critical scripts async/defer
- **Don't:** Synchronous third-party scripts
- OK: `async or defer attribute`
- NO: `<script src='...'> in head`

### Bundle Size — Medium · Web
Large JavaScript slows interaction

- **Do:** Monitor and minimize bundle size
- **Don't:** Ignore bundle size growth
- OK: `Bundle analyzer`
- NO: `No size monitoring`

### Render Blocking — Medium · Web
CSS/JS can block first paint

- **Do:** Inline critical CSS defer non-critical
- **Don't:** Large blocking CSS files
- OK: `Critical CSS inline`
- NO: `All CSS in head`

## Responsive

### Touch Friendly — High · Web
Mobile layouts need touch-sized targets

- **Do:** Increase touch targets on mobile
- **Don't:** Same tiny buttons on mobile
- OK: `Larger buttons on mobile`
- NO: `Desktop-sized targets on mobile`

### Readable Font Size — High · All
Text must be readable on all devices

- **Do:** Minimum 16px body text on mobile
- **Don't:** Tiny text on mobile
- OK: `text-base or larger`
- NO: `text-xs for body text`

### Viewport Meta — High · Web
Set viewport for mobile devices

- **Do:** Use width=device-width initial-scale=1
- **Don't:** Missing or incorrect viewport
- OK: `<meta name='viewport'...>`
- NO: `No viewport meta tag`

### Horizontal Scroll — High · Web
Avoid horizontal scrolling

- **Do:** Ensure content fits viewport width
- **Don't:** Content wider than viewport
- OK: `max-w-full overflow-x-hidden`
- NO: `Horizontal scrollbar on mobile`

### Mobile First — Medium · Web
Design for mobile then enhance for larger

- **Do:** Start with mobile styles then add breakpoints
- **Don't:** Desktop-first causing mobile issues
- OK: `Default mobile + md: lg: xl:`
- NO: `Desktop default + max-width queries`

### Breakpoint Testing — Medium · Web
Test at all common screen sizes

- **Do:** Test at 320 375 414 768 1024 1440
- **Don't:** Only test on your device
- OK: `Multiple device testing`
- NO: `Single device development`

### Image Scaling — Medium · Web
Images should scale with container

- **Do:** Use max-width: 100% on images
- **Don't:** Fixed width images overflow
- OK: `max-w-full h-auto`
- NO: `width='800' fixed`

### Table Handling — Medium · Web
Tables can overflow on mobile

- **Do:** Use horizontal scroll or card layout
- **Don't:** Wide tables breaking layout
- OK: `overflow-x-auto wrapper`
- NO: `Table overflows viewport`

## Spatial UI

### Gaze Hover — High · VisionOS
Elements should respond to eye tracking before pinch

- **Do:** Scale/highlight element on look
- **Don't:** Static element until pinch
- OK: `hoverEffect()`
- NO: `onTap only`

### Depth Layering — Medium · VisionOS
UI needs Z-depth to separate content from environment

- **Do:** Use glass material and z-offset
- **Don't:** Flat opaque panels blocking view
- OK: `.glassBackgroundEffect()`
- NO: `bg-white`

## Touch

### Touch Target Size — High · Mobile
Touch target guidance depends on platform and web context

- **Do:** Use 44pt on iOS and 48dp on Android; for web use the separate WCAG Target Size rule
- **Don't:** Treat one unit or minimum as universal across platforms
- OK: `iOS 44pt; Android 48dp; Web 24 CSS px plus WCAG exceptions`
- NO: `w-6 h-6 buttons`

### Touch Spacing — Medium · Mobile
Adjacent touch targets need adequate spacing

- **Do:** Minimum 8px gap between touch targets
- **Don't:** Tightly packed clickable elements
- OK: `gap-2 between buttons`
- NO: `gap-0 or gap-1`

### Gesture Conflicts — Medium · Mobile
Custom gestures can conflict with system

- **Do:** Avoid horizontal swipe on main content
- **Don't:** Override system gestures
- OK: `Vertical scroll primary`
- NO: `Horizontal swipe carousel only`

### Tap Delay — Medium · Mobile
300ms tap delay feels laggy

- **Do:** Use touch-action CSS or fastclick
- **Don't:** Default mobile tap handling
- OK: `touch-action: manipulation`
- NO: `No touch optimization`

### Pull to Refresh — Low · Mobile
Accidental refresh is frustrating

- **Do:** Disable where not needed
- **Don't:** Enable by default everywhere
- OK: `overscroll-behavior: contain`
- NO: `Default overscroll`

### Haptic Feedback — Low · Mobile
Tactile feedback improves interaction feel

- **Do:** Use for confirmations and important actions
- **Don't:** Overuse vibration feedback
- OK: `navigator.vibrate(10)`
- NO: `Vibrate on every tap`

## Typography

### Contrast Readability — High · All
Body text needs good contrast

- **Do:** Use darker text on light backgrounds
- **Don't:** Gray text on gray background
- OK: `text-gray-900 on white`
- NO: `text-gray-400 on gray-100`

### Line Height — Medium · All
Adequate line height improves readability

- **Do:** Use 1.5-1.75 for body text
- **Don't:** Cramped or excessive line height
- OK: `leading-relaxed (1.625)`
- NO: `leading-none (1)`

### Line Length — Medium · Web
Long lines are hard to read

- **Do:** Limit to 65-75 characters per line
- **Don't:** Full-width text on large screens
- OK: `max-w-prose`
- NO: `Full viewport width text`

### Font Size Scale — Medium · All
Consistent type hierarchy aids scanning

- **Do:** Use consistent modular scale
- **Don't:** Random font sizes
- OK: `Type scale (12 14 16 18 24 32)`
- NO: `Arbitrary sizes`

### Font Loading — Medium · Web
Fonts should load without layout shift

- **Do:** Reserve space with fallback font
- **Don't:** Layout shift when fonts load
- OK: `font-display: swap + similar fallback`
- NO: `No fallback font`

### Heading Clarity — Medium · All
Headings should stand out from body

- **Do:** Clear size/weight difference
- **Don't:** Headings similar to body text
- OK: `Bold + larger size`
- NO: `Same size as body`

### Heading Line Balance — Medium · Web
Short multi-line headings may use balanced wrapping as a progressive visual heuristic

- **Do:** Bound the measure and test natural-wrap fallback across widths fonts and locales
- **Don't:** Promise an exact final line or insert blanket nonbreaking spaces or hardcoded br tags
- OK: `.hero-title { max-inline-size: 20ch; text-wrap: balance; }`
- NO: `Heading copy rewritten with forced last-line breaks`

## Onboarding

### User Freedom — Medium · All
Users should be able to skip tutorials

- **Do:** Provide Skip and Back buttons
- **Don't:** Force linear unskippable tour
- OK: `Skip Tutorial button`
- NO: `Locked overlay until finished`

## Search

### Autocomplete — Medium · Web
Help users find results faster

- **Do:** Show predictions as user types
- **Don't:** Require full type and enter
- OK: `Debounced fetch + dropdown`
- NO: `No suggestions`

### No Results — Medium · Web
Dead ends frustrate users

- **Do:** Show 'No results' with suggestions
- **Don't:** Blank screen or '0 results'
- OK: `Try searching for X instead`
- NO: `No results found.`

## Sustainability

### Auto-Play Video — Medium · Web
Autoplaying media consumes data and creates motion barriers

- **Do:** Prefer click-to-play; provide pause and captions; stop off-screen and honor reduced motion
- **Don't:** Auto-play high-resolution loops without pause or captions
- OK: `<video controls preload="none"><track kind="captions" /></video>`
- NO: `autoplay loop`

### Asset Weight — Medium · Web
Heavy 3D/Image assets increase carbon footprint

- **Do:** Compress and lazy load 3D models
- **Don't:** Load 50MB textures
- OK: `Draco compression`
- NO: `Raw .obj files`

## Data Entry

### Bulk Actions — Low · Web
Editing one by one is tedious

- **Do:** Allow multi-select and bulk edit
- **Don't:** Single row actions only
- OK: `Checkbox column + Action bar`
- NO: `Repeated actions per row`
