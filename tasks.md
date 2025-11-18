# Animated Navigation Provider - Implementation Options

## Goal
Create a centralized animation provider that handles page transitions automatically across all routes without adding animation code to individual pages.

## Current Setup Analysis
- React Router v7 (react-router-dom)
- Framer Motion already installed (v12.23.24)
- Template-based architecture (template-03 currently)
- 5 main routes: /, /projects, /projects/:id, /experiences, /experiences/:id

## Proposed Solutions

### Option 1: AnimatedRoutes Component with Framer Motion (RECOMMENDED)
**Approach**: Wrap the Routes component with AnimatedPresence and add a route-based animation wrapper

**Pros**:
- Clean, centralized solution
- Uses existing Framer Motion dependency
- No changes needed to individual page components
- Easy to customize animations per route type
- Great performance

**Implementation**:
1. Create `src/components/animated-routes-provider.tsx`
   - Use AnimatePresence with mode="wait" for clean transitions
   - Wrap each route's element with motion.div
   - Define animation variants (fadeIn, slideUp, slideLeft, etc.)
   
2. Update `src/App.tsx`
   - Replace Routes with AnimatedRoutes component
   
3. Optional: Create animation configuration
   - Different animations for different route types (list → detail, detail → list)
   - Configurable duration, easing, etc.

**Files to create/edit**:
- NEW: `src/components/animated-routes-provider.tsx`
- EDIT: `src/App.tsx`

---

### Option 2: Custom Route Transition Provider with Location-based Keys
**Approach**: Create a provider that watches route changes and applies transitions using location.pathname as key

**Pros**:
- More control over transition timing
- Can add route-specific transition logic
- Works well with React Router's location API

**Cons**:
- Slightly more complex than Option 1
- May require more boilerplate

**Implementation**:
1. Create `src/context/RouteTransitionContext.tsx`
2. Create `src/components/route-transition-wrapper.tsx`
3. Wrap App in the provider
4. Use location.pathname to trigger transitions

**Files to create/edit**:
- NEW: `src/context/RouteTransitionContext.tsx`
- NEW: `src/components/route-transition-wrapper.tsx`
- EDIT: `src/main.tsx`
- EDIT: `src/App.tsx`

---

### Option 3: View Transitions API (Modern Browser Feature)
**Approach**: Use the native View Transitions API for page transitions

**Pros**:
- Native browser feature (no additional JS bundle)
- Smooth, performant transitions
- Future-proof

**Cons**:
- Limited browser support (Chrome 111+, Safari 18+)
- Requires fallback for older browsers
- Less control over animation details

**Implementation**:
1. Create `src/hooks/useViewTransition.ts`
2. Wrap route changes with document.startViewTransition()
3. Add CSS view-transition rules

**Files to create/edit**:
- NEW: `src/hooks/useViewTransition.ts`
- NEW: `src/components/view-transition-provider.tsx`
- EDIT: `src/App.tsx`
- EDIT: `src/index.css`

---

### Option 4: Higher-Order Component (HOC) Pattern
**Approach**: Create a HOC that wraps page components with animations

**Pros**:
- Familiar React pattern
- Can be applied selectively

**Cons**:
- Requires modifying each page component import
- Less centralized than other options
- More boilerplate

**Not recommended** - defeats the purpose of "without me adding animation to each page"

---

## Recommended Implementation: Option 1

### Detailed Plan for Option 1

1. **Create AnimatedRoutes Provider** (`src/components/animated-routes-provider.tsx`)
   - Export `AnimatedRoutes` component
   - Use `useLocation()` to track route changes
   - Wrap children in `AnimatePresence` with `mode="wait"`
   - Define animation variants:
     - `fadeIn`: opacity 0 → 1
     - `slideUp`: translateY(20px) → 0
     - Optional: different animations for forward/back navigation

2. **Update App.tsx**
   - Replace `<Routes>` structure with new animated version
   - Keep all existing Route definitions
   - No changes to page components needed

3. **Optional Enhancements**:
   - Add route-direction detection (forward vs back)
   - Different animations for list pages vs detail pages
   - Customizable transition duration/easing
   - Skip animations on initial load

### Animation Style Options
- **Fade**: Simple opacity transition (subtle, professional)
- **Slide Up**: Content slides up while fading in (modern, clean)
- **Slide Horizontal**: Slides left/right based on navigation direction (mobile-app feel)
- **Scale + Fade**: Slight scale animation with fade (dynamic)

---

## Next Steps
1. Choose preferred option (Option 1 recommended)
2. Choose animation style (Fade + Slide Up recommended for professional portfolio)
3. Approve implementation
4. I'll create the files and make the changes

---

## ✅ IMPLEMENTATION COMPLETE

**Chosen Option**: Option 1 - AnimatedRoutes Component with Framer Motion  
**Animation Style**: Fade + Slide Up

### What Was Implemented

1. **Created** `src/components/animated-routes-provider.tsx`
   - Uses Framer Motion's AnimatePresence with `mode="wait"` for clean transitions
   - Wraps Routes with motion.div keyed by `location.pathname`
   - Animation: Fade in/out with subtle slide up (20px)
   - Duration: 300ms with easeInOut cubic-bezier timing
   - No initial animation on first load

2. **Updated** `src/App.tsx`
   - Replaced `<Routes>` with `<AnimatedRoutes>` component
   - All Route definitions remain unchanged
   - Zero modifications needed to any page components

### How It Works

Every route change now automatically:
- Fades out the current page with a slight upward slide
- Waits for exit animation to complete (`mode="wait"`)
- Fades in the new page with a slight upward slide
- Maintains scroll position per page

### Testing

Test the animations by navigating between:
- `/` → `/projects` → `/projects/:id`
- `/` → `/experiences` → `/experiences/:id`
- Back and forth navigation

All transitions should be smooth and professional without any page component changes!

---

**Decision Needed**:
- Which option do you prefer? (1, 2, or 3)
- Which animation style? (Fade, Slide Up, Horizontal Slide, or Scale + Fade)
- Any specific requirements or preferences?
