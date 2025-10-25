# Milestone Template

Use this template when adding a new milestone to your task file.

---

## Milestone [N]: [Milestone Name]
**Date:** [YYYY-MM-DD]  
**Confidence:** [X/10]  
**Status:** 🔵 Not Started | 🟡 In Progress | ✅ Complete  
**Time Spent:** [X hours]  

### Activities
- [ ] [Activity 1 - Be specific]
- [ ] [Activity 2]
- [ ] [Activity 3]

### Design Decisions
[Only include if design decisions were made during this milestone]

| Decision | Options Considered | Choice Made | Rationale | Confidence |
|----------|-------------------|-------------|-----------|------------|
| [Topic] | [Option A, Option B, Option C] | [Chosen option] | [Why this was best] | X/10 |

### Risks Identified
[Only include if new risks were discovered]

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| [Risk] | High/Med/Low | High/Med/Low | [How we'll handle it] |

### Code Written
[Only for implementation milestones]

**Files Created/Modified:**
1. `[path/to/file.ts]` ([X lines + comments])
   - [What this file does]
   - [Key classes/functions]

### Implementation Notes
[Only for implementation milestones]

**Challenge #[N]: [Challenge Title]**
- **Problem:** [What went wrong or was difficult]
- **Impact:** [How it affected the work]
- **Solution:** [What was tried]
- **Result:** [Did it work? How well?]
- **Code Location:** `[file:lines]`
- **Confidence:** X/10

### Performance Benchmarks
[Only if this is performance-critical code]

| Metric | Target | Actual | Test Method |
|--------|--------|--------|-------------|
| [Metric] | [Target value] | [Measured value] | [How measured] |

### Test Results
[Only for testing milestones]

**Unit Tests:**
```
[Test output or summary]
```

**Integration Tests:**
```
[Test output or summary]
```

**Manual Testing:**

| Scenario | Expected | Actual | Pass/Fail | Notes |
|----------|----------|--------|-----------|-------|
| [Test case] | [Expected result] | [What happened] | ✅/❌ | [Notes] |

### Issues Found & Fixed
[Only for testing milestones]

| Issue # | Description | Severity | Fix | Confidence |
|---------|-------------|----------|-----|------------|
| [#] | [Issue] | High/Med/Low | [Fix applied] | X/10 |

### Human Review
[Only when human review occurs]

**Reviewer:** [Name]  
**Date:** [YYYY-MM-DD]  
**Duration:** [X minutes]

**Feedback:**
- ✅ [Positive point]
- ⚠️ [Concern] → **Action:** [What was done]

**Sign-off:** ✅ Approved / ⚠️ Needs changes / ❌ Rejected

### Files Created/Modified
[Always include this]
- `[path]` - [Description]

### Notes
[Any additional context or observations]

---

## Tips for Writing Milestones

### When to Create a New Milestone

Create a milestone when you've completed a significant step:
- Finished design/planning phase
- Completed core implementation
- Finished writing tests
- Completed human review
- Reached a major checkpoint

### What Makes a Good Milestone

**Good milestone names:**
- "Design & Planning"
- "Core Implementation"
- "Edge Case Handling"
- "Testing & Validation"
- "Human Review & Refinement"

**Bad milestone names:**
- "Day 1"
- "Work"
- "Code"

### Confidence Ratings Guide

- **9-10**: Thoroughly tested, no known issues, ready for production
- **7-8**: Working well, minor refinement may be needed
- **5-6**: Functional but needs more testing or optimization
- **3-4**: Concerning issues, requires review
- **1-2**: Serious problems, stop and get help

**Remember**: If confidence <8, human review is required.

### Time Tracking

Be honest about time spent:
- Include research/reading time
- Include debugging time
- Include time spent writing docs/tests
- Don't just count "coding time"

### Writing Implementation Notes

For each challenge, follow this pattern:
1. **Problem** - What was difficult or went wrong
2. **Impact** - How did it affect your work
3. **Solution** - What did you try
4. **Result** - Did it work? How well?
5. **Confidence** - How confident are you in this solution

### Performance Benchmarks

Only include if:
- The code is performance-critical
- There's a specific performance target
- You can measure it reliably

Format:
- **Metric**: What you're measuring (time, memory, etc.)
- **Target**: What you're aiming for
- **Actual**: What you measured
- **Test Method**: How you measured it

### Test Results

Be specific:
- Don't just say "tests pass"
- Include numbers: "15/15 tests passing"
- Include coverage: "94% statement coverage"
- Note any skipped or failing tests

---

**Last Updated:** 2025-10-25
