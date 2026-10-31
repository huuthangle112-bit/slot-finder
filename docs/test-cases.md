# Test Cases

## Test Case 1: Normal Assignment

Input:
- Medium project
- Required PM, Analyst, Engineer, QA
- Deadline has sufficient buffer

Expected:
- App recommends a feasible squad
- Slack is positive
- Risk is Low or Medium

## Test Case 2: Overloaded Engineer

Input:
- Project requires API integration
- Senior engineer already has high assigned effort

Expected:
- App flags utilization risk
- Recommendation explains capacity concern

## Test Case 3: QA Bottleneck

Input:
- Multiple projects require QA
- QA specialist has existing assignment or leave

Expected:
- App flags QA as a bottleneck
- Recommendation shows risk

## Test Case 4: Specialist Goes on Leave

Input:
- Recommended QA specialist becomes unavailable

Expected:
- App shows increased risk
- Replanning scenario explains impact

## Test Case 5: Deadline Moves Earlier

Input:
- Project deadline moves forward by 5 days

Expected:
- Slack decreases
- Risk level increases

## Test Case 6: Project Size Increases

Input:
- Engineering effort increases

Expected:
- Utilization increases
- Slack decreases
- Risk flags appear
