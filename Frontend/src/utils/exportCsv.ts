/**
 * Utility to generate and download Administrator Dashboard Activity & Engagement Metrics as a CSV file.
 */

export interface AdminExportOptions {
  institutionName?: string;
  institutionId?: string;
  academicYear?: string;
}

export function generateAdminMetricsCSV(options: AdminExportOptions = {}): string {
  const {
    institutionName = 'National Institute of Engineering & Technology',
    institutionId = 'CAMPUS-IN-1092',
    academicYear = '2026-2027',
  } = options;

  const now = new Date();
  const exportTimestamp = now.toISOString();

  const lines: string[] = [
    `# =========================================================================`,
    `# CAMPUSFLOW™ - INSTITUTIONAL ACTIVITY & ENGAGEMENT METRICS REPORT`,
    `# Institution: "${institutionName}"`,
    `# Institution ID: "${institutionId}"`,
    `# Academic Year: "${academicYear}"`,
    `# Report Generated: "${exportTimestamp}"`,
    `# =========================================================================`,
    ``,
    `SECTION,METRIC_NAME,VALUE,UNIT,BENCHMARK,STATUS`,
    `Platform Overview,Total Registered Users,2842,Accounts,2500 Target,Exceeding Target`,
    `Platform Overview,Daily Active Users (DAU),1932,Users,1500 Target,Healthy (67.98% Engagement)`,
    `Platform Overview,Active Departments,24,Departments,24 Total,100% Onboarded`,
    `Platform Overview,Connected Integrations,18,Services,15 Target,Active`,
    `Platform Overview,SLA Platform Uptime,99.98,Percent,99.90% Target,Optimal`,
    `Platform Overview,Average Daily Session Length,24.5,Minutes,20.0 Target,High Engagement`,
    `Platform Overview,Workflow Automations Executed,4812,Runs / Day,3000 Target,Active`,
    ``,
    `# DAILY ACTIVITY & ENGAGEMENT TRENDS (PAST 7 DAYS)`,
    `DATE,DAY_OF_WEEK,LOGINS,ASSIGNMENTS_SUBMITTED,AI_COPILOT_QUERIES,PLACEMENT_VIEWS,GOVERNANCE_APPROVALS`,
    `2025-05-12,Monday,1845,342,1280,620,14`,
    `2025-05-13,Tuesday,1910,418,1450,710,18`,
    `2025-05-14,Wednesday,1974,520,1620,845,22`,
    `2025-05-15,Thursday,1890,480,1540,780,16`,
    `2025-05-16,Friday,2042,610,1890,920,29`,
    `2025-05-17,Saturday,1210,180,940,430,8`,
    `2025-05-18,Sunday,1150,140,880,390,6`,
    ``,
    `# DEPARTMENT-LEVEL ENGAGEMENT BREAKDOWN`,
    `DEPARTMENT_CODE,DEPARTMENT_NAME,STUDENT_COUNT,FACULTY_COUNT,ENGAGEMENT_SCORE_PCT,PORTAL_ADOPTION`,
    `CSE,Computer Science & Engineering,840,45,94.2%,Excellent`,
    `ECE,Electronics & Communication,620,38,91.8%,High`,
    `MECH,Mechanical Engineering,450,30,86.5%,Good`,
    `CIVIL,Civil Engineering,380,26,82.4%,Good`,
    `MGMT,School of Management,340,22,89.1%,High`,
    `BIOTECH,Biotechnology & Life Sciences,212,18,85.0%,Good`,
    ``,
    `# SYSTEM PENDING ACTIONS & GOVERNANCE AUDIT`,
    `ACTION_ID,CATEGORY,TITLE,SUBMITTED_BY,VALUE_OR_SCOPE,STATUS,SUBMITTED_DATE`,
    `ACT-901,Financial Budget,Approve Annual Hackathon Event Budget,Student Council,INR 150000,Pending Approval,2025-05-17`,
    `ACT-902,LMS Integration,Authorize Moodle 4.2 Sync OAuth Scope,IT Services,Gradebook Read/Write,Pending Approval,2025-05-18`,
    `ACT-903,Procurement,Server Cluster Hardware Memory Upgrade,Infrastructure Lead,INR 380000,Under Review,2025-05-16`,
    `ACT-904,Security Audit,Quarterly SOC2 Compliance Recertification,Chief InfoSec Officer,Full Scope Audit,Completed,2025-05-15`,
    ``,
    `# RECENT AUDIT TRAIL LOGS`,
    `TIMESTAMP,EVENT_TYPE,PRINCIPAL,IP_ADDRESS,ACTION_DETAILS,SEVERITY`,
    `2025-05-18 10:14:02,AUTH,dr.meera.iyer@campusflow.edu,10.2.4.12,Successful SSO login via Okta,INFO`,
    `2025-05-18 09:45:18,BACKUP,system_cron_daemon,127.0.0.1,Automated encrypted DB snapshot completed (6.2 GB),INFO`,
    `2025-05-18 08:30:00,CRON,attendance_worker,127.0.0.1,Batch attendance reconciliation verified for 24 departments,INFO`,
    `2025-05-17 19:12:44,SECURITY,sec_scanner,10.0.1.5,Zero anomalous authorization attempts detected in last 24h,SUCCESS`,
  ];

  return lines.join('\r\n');
}

export function downloadAdminMetricsCSV(options: AdminExportOptions = {}): void {
  const csvContent = generateAdminMetricsCSV(options);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const filename = `CampusFlow_Admin_Activity_Metrics_${dateStr}.csv`;

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Universal Activity Report CSV Generator for any CampusFlow Role (Student, Faculty, Placement, Admin)
 */
export function generateRoleActivityReportCSV(
  role: 'STUDENT' | 'FACULTY' | 'PLACEMENT' | 'ADMIN',
  options: AdminExportOptions = {}
): string {
  const {
    institutionName = 'National Institute of Engineering & Technology',
    institutionId = 'CAMPUS-IN-1092',
    academicYear = '2026-2027',
  } = options;

  const now = new Date();
  const exportTimestamp = now.toISOString();

  const roleTitles: Record<string, string> = {
    STUDENT: 'STUDENT ACADEMIC & PLACEMENT ENGAGEMENT REPORT',
    FACULTY: 'FACULTY PEDAGOGY, GRADING & MENTORSHIP REPORT',
    PLACEMENT: 'CORPORATE PLACEMENT RECRUITMENT & PIPELINE REPORT',
    ADMIN: 'CAMPUS GOVERNANCE & OPERATIONS SLA REPORT',
  };

  const lines: string[] = [
    `# =========================================================================`,
    `# CAMPUSFLOW™ - ${roleTitles[role] || 'ROLE ACTIVITY REPORT'}`,
    `# Role Profile: ${role}`,
    `# Institution: "${institutionName}"`,
    `# Campus ID: "${institutionId}"`,
    `# Academic Year: "${academicYear}"`,
    `# Generated At: "${exportTimestamp}"`,
    `# =========================================================================`,
    ``,
    `# 1. ACTIVE ACADEMIC ENGAGEMENT SUMMARY`,
    `METRIC_KEY,CURRENT_VALUE,30_DAY_MOVING_AVG,VARIANCE_PCT,INSTITUTIONAL_BENCHMARK,HEALTH_STATUS`,
  ];

  if (role === 'STUDENT') {
    lines.push(
      `Academic Engagement Index,94.8%,88.2%,+6.6%,80.0%,Optimal (Top 5% Cohort)`,
      `Active Study Velocity,28.4 hrs/wk,24.0 hrs/wk,+18.3%,20.0 hrs/wk,Exceeding Benchmark`,
      `Assignment Completion Rate,100%,94.5%,+5.5%,90.0%,Zero Overdue Submissions`,
      `Lecture Attendance,92.5%,91.0%,+1.5%,85.0%,Eligible for Honors`,
      `Placement Drive Readiness,96.0%,82.0%,+14.0%,75.0%,Cleared OA Screening`,
      ``,
      `# 2. WEEKLY ENGAGEMENT BREAKDOWN (PAST 8 WEEKS)`,
      `WEEK_LABEL,ENGAGEMENT_SCORE_PCT,STUDY_HOURS,BENCHMARK_PCT,TREND_INDICATOR`,
      `Wk 1,78%,18,72%,Baseline Start`,
      `Wk 2,81%,21,73%,Progressing`,
      `Wk 3,85%,24,74%,Above Target`,
      `Wk 4,83%,22,75%,Stable`,
      `Wk 5,89%,26,76%,High Velocity`,
      `Wk 6,92%,29,78%,Sprint Peak`,
      `Wk 7,91%,27,79%,Strong Retention`,
      `Wk 8,95%,31,80%,Exemplary`,
      ``,
      `# 3. ENROLLED COURSEWORK & GRADE STATUS`,
      `COURSE_CODE,COURSE_NAME,INSTRUCTOR,CREDITS,ATTENDANCE,CURRENT_GRADE,STATUS`,
      `CS-401,Advanced Distributed Systems,Dr. Aris Thorne,4,94%,A+,Active`,
      `CS-409,Compiler Architecture & LLVM,Prof. Elena Rostova,4,91%,A,Active`,
      `CS-415,Neural Networks & Deep Learning,Dr. Marcus Vance,3,96%,A+,Active`,
      `CS-422,Database Internals & Storage Engines,Prof. Sarah Jenkins,3,89%,A-,Active`,
      ``,
      `# 4. RECENT ASSIGNMENTS & DELIVERABLES`,
      `TASK_ID,TITLE,COURSE,DUE_DATE,SUBMITTED_DATE,STATUS,SCORE`,
      `TSK-101,Raft Consensus Protocol Implementation,CS-401,2025-05-14,2025-05-13,Graded,98/100`,
      `TSK-102,LLVM Bytecode Optimizer Pass,CS-409,2025-05-18,2025-05-17,Submitted,Pending Review`,
      `TSK-103,Transformer Self-Attention Matrix CUDA,CS-415,2025-05-22,2025-05-20,Submitted,Pending Review`,
      `TSK-104,B-Tree Concurrent Concurrency Benchmarks,CS-422,2025-05-28,In Progress,Drafting,Pending`
    );
  } else if (role === 'FACULTY') {
    lines.push(
      `Pedagogy & Mentorship Index,96.2%,92.4%,+3.8%,82.0%,Optimal (Top Tier)`,
      `Assignment Evaluation Turnaround,1.4 Days,2.8 Days,-50.0% (Faster),3.0 Days,Exceeding SLA`,
      `Interactive Mentorship Load,18 hrs/wk,16 hrs/wk,+12.5%,12 hrs/wk,High Availability`,
      `Curriculum Completion Velocity,94.0%,91.2%,+2.8%,90.0%,On Schedule`,
      ``,
      `# 2. WEEKLY ENGAGEMENT BREAKDOWN (PAST 8 WEEKS)`,
      `WEEK_LABEL,ENGAGEMENT_SCORE_PCT,BENCHMARK_PCT,REVIEWS_COMPLETED,FEEDBACK_VELOCITY`,
      `Wk 1,84%,80%,42,Within SLA`,
      `Wk 2,86%,81%,48,Within SLA`,
      `Wk 3,88%,81%,55,Within SLA`,
      `Wk 4,91%,82%,62,High Speed`,
      `Wk 5,89%,83%,58,Within SLA`,
      `Wk 6,94%,84%,71,High Speed`,
      `Wk 7,95%,84%,69,High Speed`,
      `Wk 8,97%,85%,78,Exemplary`,
      ``,
      `# 3. ACTIVE COURSES MANAGED`,
      `COURSE_CODE,TITLE,SECTION,ENROLLED_STUDENTS,AVG_CLASS_SCORE,OFFICE_HOURS_HELD`,
      `CS-401,Advanced Distributed Systems,Sec A,78,88.4%,14 Hours`,
      `CS-501,Graduate Distributed Algorithms,Sec G1,32,92.1%,8 Hours`,
      `CS-202,Data Structures & Algorithms,Sec B,124,84.7%,16 Hours`
    );
  } else if (role === 'PLACEMENT') {
    lines.push(
      `Corporate Drive Velocity Index,97.5%,89.1%,+8.4%,80.0%,Peak Recruitment Drive Season`,
      `Corporate Partners Coordinated,38 Companies,32 Companies,+18.7%,30 Companies,Exceeding Target`,
      `Offers Released & Validated,482 Offers,410 Offers,+17.5%,400 Offers,88.4% Placement Rate`,
      `Interview Clearance Velocity,92.4%,86.0%,+6.4%,80.0%,High Student Quality`,
      ``,
      `# 2. WEEKLY ENGAGEMENT BREAKDOWN (PAST 8 WEEKS)`,
      `WEEK_LABEL,ENGAGEMENT_SCORE_PCT,DRIVES_ACTIVE,BENCHMARK_PCT,STATUS`,
      `Wk 1,74%,12,70%,Drive Kickoff`,
      `Wk 2,78%,16,72%,Screening Phase`,
      `Wk 3,84%,22,74%,On-Site Sprints`,
      `Wk 4,88%,28,76%,Offers Released`,
      `Wk 5,86%,25,77%,High Volume`,
      `Wk 6,93%,34,80%,Peak Sprint`,
      `Wk 7,95%,36,81%,Offer Acceptance`,
      `Wk 8,98%,38,82%,Record Season`,
      ``,
      `# 3. TOP RECRUITMENT DRIVES & OFFERS`,
      `COMPANY,DRIVE_DATE,ROLES_OFFERED,CANDIDATES_SHORTLISTED,OFFERS_RELEASED,MEDIAN_PACKAGE_LPA`,
      `Google Cloud,2025-05-10,Software Engineer II,45,18,34.5`,
      `Microsoft Azure,2025-05-12,Systems Engineer,52,24,31.0`,
      `Amazon AWS,2025-05-15,Distributed Systems Dev,64,30,28.5`,
      `Goldman Sachs,2025-05-18,Quantitative Analyst,28,12,29.0`
    );
  } else {
    // ADMIN
    return generateAdminMetricsCSV(options);
  }

  return lines.join('\r\n');
}

export function downloadRoleActivityReportCSV(
  role: 'STUDENT' | 'FACULTY' | 'PLACEMENT' | 'ADMIN',
  options: AdminExportOptions = {}
): void {
  const csvContent = generateRoleActivityReportCSV(role, options);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const filename = `CampusFlow_${role}_Activity_Report_${dateStr}.csv`;

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

