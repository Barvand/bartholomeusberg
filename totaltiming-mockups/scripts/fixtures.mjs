// Synthetic demo data for TotalTiming marketing captures.
// Every person, project, code and number in this file is invented. Nothing is
// read from a database; these objects are served to the real client by
// Playwright request interception (see capture.mjs).

// The captures freeze the browser clock at this instant (Thursday, week 42).
export const NOW = "2026-10-15T14:20:00+02:00";

// Oslo wall time -> ISO UTC. October 2026 is CEST until the 25th.
function oslo(date, time) {
  const offset = date >= "2026-10-25" ? "+01:00" : "+02:00";
  return new Date(`${date}T${time}:00${offset}`).toISOString();
}

function addDays(date, days) {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function isWeekday(date) {
  const day = new Date(`${date}T12:00:00Z`).getUTCDay();
  return day !== 0 && day !== 6;
}

export const users = [
  { userId: 1, name: "Ingrid Solheim", email: "ingrid@demo.totaltiming.app", role: "admin", isActive: 1 },
  { userId: 2, name: "Jonas Aasen", email: "jonas@demo.totaltiming.app", role: "employee", isActive: 1 },
  { userId: 3, name: "Marte Kvamme", email: "marte@demo.totaltiming.app", role: "employee", isActive: 1 },
  { userId: 4, name: "Erik Haugland", email: "erik@demo.totaltiming.app", role: "employee", isActive: 1 },
  { userId: 5, name: "Sofie Lie", email: "sofie@demo.totaltiming.app", role: "employee", isActive: 1 },
  { userId: 6, name: "Henrik Tveit", email: "henrik@demo.totaltiming.app", role: "employee", isActive: 1 },
  { userId: 7, name: "Nora Brekke", email: "nora@demo.totaltiming.app", role: "employee", isActive: 1 },
  { userId: 8, name: "Anders Myhre", email: "anders@demo.totaltiming.app", role: "employee", isActive: 0 },
  { userId: 9, name: "Regnskap", email: "regnskap@demo.totaltiming.app", role: "accountant", isActive: 1 },
];

export const userById = Object.fromEntries(users.map((u) => [u.userId, u]));

const project = (id, name, projectCode, status, totalHours, extra = {}) => ({
  id, name, projectCode, status, totalHours,
  description: null, notes_costs: null, notes_misc: null,
  startDate: null, endDate: null, projectType: "customer", project_manager_id: 1,
  ...extra,
});

export const projects = [
  project(101, "Fjordbakken boligfelt", "24017", "active", 1284.5, {
    description: "Nytt boligfelt med 18 rekkehus. Grunnarbeid, betong og råbygg i tre byggetrinn.",
    startDate: "2025-03-03", endDate: "2027-05-28", project_manager_id: 1,
    notes_costs: "Tilleggsarbeid på drenering avtalt med byggherre i uke 38.",
    notes_misc: "Kranbil bestilles minst to dager i forveien.",
  }),
  project(102, "Sentrum skole, tilbygg", "24022", "active", 846, {
    description: "Tilbygg på to etasjer med spesialrom og ny inngangsparti.",
    startDate: "2025-06-02", endDate: "2026-12-18", project_manager_id: 3,
  }),
  project(103, "Havnelageret rehabilitering", "25003", "active", 412.5, {
    description: "Rehabilitering av fasade og bærende konstruksjon i eldre lagerbygg.",
    startDate: "2026-02-09", endDate: "2027-01-29", project_manager_id: 1,
  }),
  project(104, "Kai 7 betongarbeid", "25008", "active", 198, {
    description: "Forsterkning av kaifront og ny dekkeplate.",
    startDate: "2026-08-17", endDate: "2026-11-27", project_manager_id: 4,
  }),
  project(105, "Lysefjell barnehage", "25011", "active", 76.5, {
    description: "Ny barnehage med fire avdelinger. Oppstart grunnarbeid.",
    startDate: "2026-09-28", endDate: "2027-08-13", project_manager_id: 1,
  }),
  project(108, "Bryggeloftet kontorbygg", "25016", "active", 341, {
    startDate: "2026-04-13", endDate: "2027-03-26", project_manager_id: 3,
  }),
  project(109, "Skogly omsorgsboliger", "25019", "active", 129.5, {
    startDate: "2026-08-03", endDate: "2027-10-01", project_manager_id: 4,
  }),
  project(110, "Vestre kai parkeringshus", "26002", "active", 18, {
    startDate: "2026-10-05", endDate: "2028-01-14", project_manager_id: 3,
  }),
  project(106, "Nordre allé rekkehus", "23041", "completed", 2210, {
    startDate: "2024-01-08", endDate: "2025-11-14",
  }),
  project(107, "Strandvegen næringsbygg", "25014", "inactive", 0, {
    startDate: "2027-02-01",
  }),
  project(801, "Verksted og vedlikehold", "801", "active", 164, { projectType: "internal", project_manager_id: null }),
  project(802, "Opplæring og HMS", "802", "active", 58.5, { projectType: "internal", project_manager_id: null }),
  project(803, "Planlegging og befaring", "803", "active", 92, { projectType: "internal", project_manager_id: null }),
];

export const projectById = Object.fromEntries(projects.map((p) => [p.id, p]));

export const absences = [
  { id: 1, name: "Ferie", absenceCode: "901", description: "Lovpålagt og avtalt ferie", totalHours: 412, status: "active" },
  { id: 2, name: "Egenmelding", absenceCode: "902", description: "Sykdom med egenmelding", totalHours: 96, status: "active" },
  { id: 3, name: "Sykt barn", absenceCode: "903", description: "Omsorgsdager", totalHours: 37.5, status: "active" },
  { id: 4, name: "Permisjon", absenceCode: "904", description: "Permisjon med eller uten lønn", totalHours: 22.5, status: "active" },
  { id: 5, name: "Avspasering", absenceCode: "905", description: "Uttak av opptjent tid", totalHours: 61, status: "active" },
];

// ── Hours ─────────────────────────────────────────────────────────────────
let nextHourId = 5000;

function hour(userId, date, start, end, { projectsId = null, absenceId = null, breakMinutes = 30, status = "approved", note = null, rejection_note = null } = {}) {
  const p = projectsId ? projectById[projectsId] : null;
  const a = absenceId ? absences.find((x) => x.id === absenceId) : null;
  const startTime = oslo(date, start);
  const endTime = oslo(date, end);
  const hoursWorked = Math.round(((new Date(endTime) - new Date(startTime)) / 60000 - breakMinutes) / 6) / 10;
  return {
    idHours: nextHourId++, userId, name: userById[userId].name, userName: userById[userId].name,
    projectsId, projectName: p?.name ?? null, projectCode: p?.projectCode ?? null, projectType: p?.projectType ?? null,
    absenceId, absenceName: a?.name ?? null, absenceCode: a?.absenceCode ?? null,
    startTime, endTime, breakMinutes, hoursWorked, note, status,
    reviewed_by: status === "pending" ? null : 1,
    reviewed_at: status === "pending" ? null : oslo(addDays(date, 1), "09:15"),
    rejection_note,
  };
}

// Five weeks of history for every active employee, plus this week in progress.
const rotation = {
  2: [101, 101, 103, 101, 104],
  3: [102, 102, 102, 801, 102],
  4: [104, 104, 101, 104, 803],
  5: [103, 103, 105, 103, 103],
  6: [101, 105, 105, 101, 802],
  7: [102, 103, 102, 102, 101],
};
const notes = {
  101: ["Forskaling trinn 2", "Armering hus 7–9", "Støp av ringmur", "Drenering langs vestside"],
  102: ["Montering av stendere 2. etg.", "Innvendig kledning", "Isolering av yttervegg"],
  103: ["Riving av gammel kledning", "Stålbjelker i akse C", "Fasadestillas"],
  104: ["Forskaling kaifront", "Betongstøp dekkeplate"],
  105: ["Utsetting og grunnarbeid", "Graving for fundamenter"],
  801: ["Service på kompaktor"], 802: ["Varme arbeider-kurs"], 803: ["Befaring nye prosjekter"],
};

const today = "2026-10-15";
const weekStart = "2026-10-12";
export const hours = [];
for (const [uid, plan] of Object.entries(rotation)) {
  const userId = Number(uid);
  for (let d = -35; d <= 3; d++) {
    const date = addDays(weekStart, d);
    if (!isWeekday(date) || date > today) continue;
    const weekday = new Date(`${date}T12:00:00Z`).getUTCDay() - 1;
    const projectsId = plan[(weekday + Math.floor((d + 35) / 7)) % plan.length];
    const projectNotes = notes[projectsId];
    const note = projectNotes[(d + 40 + userId) % projectNotes.length];
    const thisWeek = date >= weekStart;
    if (userId === 5 && date === "2026-09-24") {
      hours.push(hour(userId, date, "07:00", "14:30", { absenceId: 2, breakMinutes: 0, note: null }));
      continue;
    }
    if (date === today) {
      if (userId === 2) {
        hours.push(hour(userId, date, "07:00", "11:00", { projectsId: 101, breakMinutes: 0, status: "pending", note: "Forskaling trinn 2" }));
        hours.push(hour(userId, date, "11:30", "14:00", { projectsId: 803, breakMinutes: 0, status: "pending", note: "Befaring Lysefjell" }));
      } else if (userId !== 6) {
        hours.push(hour(userId, date, "07:00", "11:30", { projectsId, breakMinutes: 0, status: "pending", note }));
      }
      continue;
    }
    const end = userId % 2 === 0 ? "15:00" : "15:30";
    let status = thisWeek ? "pending" : "approved";
    let rejection_note = null;
    if (userId === 2 && date === "2026-10-09") {
      status = "rejected";
      rejection_note = "Feil prosjekt. Dette var Havnelageret, ikke Fjordbakken.";
    }
    hours.push(hour(userId, date, "07:00", end, { projectsId, status, note, rejection_note }));
  }
}
// Jonas: a week of holiday in week 39 to show absence in the overview.
for (const date of ["2026-09-21", "2026-09-22"]) {
  const idx = hours.findIndex((h) => h.userId === 2 && h.startTime.startsWith(date));
  if (idx >= 0) hours.splice(idx, 1);
  hours.push(hour(2, date, "07:00", "14:30", { absenceId: 1, breakMinutes: 0 }));
}

hours.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

export const hoursForUser = (userId) => hours.filter((h) => h.userId === Number(userId));
export const pendingHours = () => hours.filter((h) => h.status === "pending");
export const approvedHours = () => hours.filter((h) => h.status === "approved");
export const pmQueue = (pmId) => pendingHours().filter((h) => h.projectsId && projectById[h.projectsId]?.project_manager_id === pmId);

export function activity(from, to) {
  const start = new Date(`${from}T00:00:00+02:00`);
  const end = new Date(`${to}T23:59:59+02:00`);
  return hours.filter((h) => {
    const t = new Date(h.startTime);
    return t >= start && t <= end;
  });
}

// ── Shifts ────────────────────────────────────────────────────────────────
const shiftSeed = [
  ["S-301", 101, "2026-10-17", "07:00", "15:00", "Lørdagsstøp av dekke hus 10–12", 4, 3],
  ["S-302", 104, "2026-10-19", "06:30", "14:30", "Forskaling kaifront, seksjon 3", 3, 1],
  ["S-303", 103, "2026-10-20", "07:00", "15:30", "Montering av stålbjelker i akse D", 2, 2],
  ["S-304", 105, "2026-10-21", "07:00", "15:00", "Graving og fundamenter, avdeling B", 3, 0],
  ["S-305", 102, "2026-10-22", "15:30", "20:00", "Kveldsskift: sparkling og maling 1. etg.", 2, 1],
  ["S-306", 101, "2026-10-24", "08:00", "14:00", "Rydding og sikring av byggeplass", 5, 2],
  ["S-307", 104, "2026-10-27", "06:30", "14:30", "Betongstøp dekkeplate kai 7", 4, 1],
  ["S-308", 103, "2026-10-29", "07:00", "15:30", "Fasadeplater, nordvegg", 3, 0],
];

export const shifts = shiftSeed.map(([id, projectId, date, start, end, description, capacity, activeBookings]) => ({
  id, projectId, projectName: projectById[projectId].name,
  startsAt: oslo(date, start), endsAt: oslo(date, end), description, capacity, activeBookings,
  remainingPositions: capacity - activeBookings, status: "OPEN",
  createdAt: oslo("2026-10-08", "10:00"),
}));
// One cancelled shift for the admin "all" view.
shifts.push({
  id: "S-299", projectId: 105, projectName: projectById[105].name,
  startsAt: oslo("2026-10-18", "08:00"), endsAt: oslo("2026-10-18", "14:00"),
  description: "Søndagsarbeid avlyst, levering flyttet", capacity: 2, activeBookings: 0,
  remainingPositions: 2, status: "CANCELLED", createdAt: oslo("2026-10-05", "12:00"),
});

const myBookedShiftIds = new Set(["S-301", "S-306"]);

export const availableShifts = () => shifts
  .filter((s) => s.status === "OPEN")
  .map((s) => ({
    ...s,
    isBooked: myBookedShiftIds.has(s.id),
    myBookingId: myBookedShiftIds.has(s.id) ? `B-${s.id}` : null,
    isAvailable: !myBookedShiftIds.has(s.id) && s.remainingPositions > 0,
  }));

export const myBookings = () => [
  ...shifts.filter((s) => myBookedShiftIds.has(s.id)).map((s) => ({
    id: `B-${s.id}`, shiftId: s.id, projectId: s.projectId, projectName: s.projectName,
    startsAt: s.startsAt, endsAt: s.endsAt, description: s.description, capacity: s.capacity,
    shiftStatus: s.status, status: "BOOKED", attendanceStatus: "PENDING",
    bookedAt: oslo("2026-10-09", "16:42"), cancelledAt: null, cancellationReason: null,
  })),
  {
    id: "B-S-288", shiftId: "S-288", projectId: 101, projectName: projectById[101].name,
    startsAt: oslo("2026-10-10", "07:00"), endsAt: oslo("2026-10-10", "13:00"),
    description: "Lørdagsarbeid, armering hus 7–9", capacity: 3, shiftStatus: "COMPLETED",
    status: "BOOKED", attendanceStatus: "ATTENDED", bookedAt: oslo("2026-10-02", "08:10"),
    cancelledAt: null, cancellationReason: null,
  },
  {
    id: "B-S-281", shiftId: "S-281", projectId: 103, projectName: projectById[103].name,
    startsAt: oslo("2026-10-03", "07:00"), endsAt: oslo("2026-10-03", "12:00"),
    description: "Fasadestillas, oppsett", capacity: 2, shiftStatus: "COMPLETED",
    status: "BOOKED", attendanceStatus: "ATTENDED", bookedAt: oslo("2026-09-28", "19:31"),
    cancelledAt: null, cancellationReason: null,
  },
];

export const shiftBookings = (shiftId) => {
  const s = shifts.find((x) => x.id === shiftId);
  if (!s) return [];
  const pool = [2, 4, 6, 3, 7, 5];
  return pool.slice(0, s.activeBookings).map((employeeId, i) => ({
    id: `B-${shiftId}-${employeeId}`, employeeId, employeeName: userById[employeeId].name,
    bookedAt: oslo("2026-10-09", `${String(9 + i).padStart(2, "0")}:2${i}`), status: "BOOKED",
    cancelledAt: null, cancellationReason: null, attendanceStatus: "PENDING", attendanceVersion: 0,
  }));
};

// ── Points ────────────────────────────────────────────────────────────────
export const scores = [
  { employeeId: 4, employeeName: "Erik Haugland", totalPoints: 14, attendedShifts: 14, noShows: 0, excusedShifts: 1 },
  { employeeId: 2, employeeName: "Jonas Aasen", totalPoints: 11, attendedShifts: 11, noShows: 0, excusedShifts: 0 },
  { employeeId: 6, employeeName: "Henrik Tveit", totalPoints: 9, attendedShifts: 10, noShows: 1, excusedShifts: 0 },
  { employeeId: 7, employeeName: "Nora Brekke", totalPoints: 7, attendedShifts: 7, noShows: 0, excusedShifts: 2 },
  { employeeId: 3, employeeName: "Marte Kvamme", totalPoints: 5, attendedShifts: 5, noShows: 0, excusedShifts: 0 },
  { employeeId: 5, employeeName: "Sofie Lie", totalPoints: 3, attendedShifts: 4, noShows: 1, excusedShifts: 1 },
];

export function pointHistory(userId) {
  const score = scores.find((s) => s.employeeId === Number(userId)) ?? scores[1];
  const items = [
    ["S-288", 101, "Lørdagsarbeid, armering hus 7–9", "2026-10-10", "ATTENDED", 1],
    ["S-281", 103, "Fasadestillas, oppsett", "2026-10-03", "ATTENDED", 1],
    ["S-270", 104, "Forskaling kaifront, seksjon 1", "2026-09-26", "ATTENDED", 1],
    ["S-262", 101, "Kveldsstøp ringmur", "2026-09-17", "ATTENDED", 1],
    ["S-251", 102, "Lørdag: innvendig kledning", "2026-09-12", "ATTENDED", 1],
  ];
  return {
    employeeId: score.employeeId, employeeName: score.employeeName,
    totalPoints: score.totalPoints, totalEvents: score.attendedShifts + score.noShows,
    page: 1, limit: 20,
    history: items.map(([shiftId, projectId, description, date, newStatus, pointsDelta], i) => ({
      id: `P-${i}`, bookingId: `B-${shiftId}`, bookingVersion: 1, shiftId, projectId,
      projectName: projectById[projectId].name, description,
      startsAt: oslo(date, "07:00"), endsAt: oslo(date, "13:00"),
      previousStatus: "PENDING", newStatus, pointsDelta, recordedBy: 1,
      recordedAt: oslo(date, "15:10"), correctionReason: null,
    })),
  };
}

// ── Project detail ────────────────────────────────────────────────────────
export function projectHoursByUser(projectId) {
  const totals = {};
  for (const h of hours) {
    if (h.projectsId !== Number(projectId)) continue;
    totals[h.userId] = (totals[h.userId] ?? 0) + h.hoursWorked;
  }
  return Object.entries(totals)
    .map(([userId, totalHours]) => ({ userId: Number(userId), name: userById[userId].name, totalHours: Math.round(totalHours * 10) / 10 }))
    .sort((a, b) => b.totalHours - a.totalHours);
}

export const projectHours = (projectId) => hours
  .filter((h) => h.projectsId === Number(projectId))
  .map((h) => ({ ...h, projectId: h.projectsId }));

export const projectNotes = (projectId) => [
  { id: 1, projectId, userId: 1, authorName: "Ingrid Solheim", content: "Byggherremøte flyttet til tirsdag kl. 09:00. Ta med oppdatert fremdriftsplan for trinn 2.", createdAt: oslo("2026-10-14", "08:12"), updatedAt: null },
  { id: 2, projectId, userId: 4, authorName: "Erik Haugland", content: "Betongbil bekreftet for lørdag 07:00. Pumpebil står ved hus 11.", createdAt: oslo("2026-10-13", "15:40"), updatedAt: null },
  { id: 3, projectId, userId: 2, authorName: "Jonas Aasen", content: "Manglende armeringsjern til hus 9 er bestilt. Levering torsdag.", createdAt: oslo("2026-10-12", "11:05"), updatedAt: oslo("2026-10-12", "11:20") },
];

export const projectFiles = () => ({
  breadcrumbs: [],
  folders: [
    { id: 1, name: "Tegninger", parentFolderId: null },
    { id: 2, name: "HMS og SJA", parentFolderId: null },
    { id: 3, name: "Avvik", parentFolderId: null },
  ],
  files: [
    { id: 11, originalName: "Fremdriftsplan trinn 2.pdf", mimeType: "application/pdf", sizeBytes: 482113, uploadedBy: 1, uploadedByName: "Ingrid Solheim", createdAt: oslo("2026-10-06", "09:00"), folderId: null },
    { id: 12, originalName: "Mengdeliste betong.xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", sizeBytes: 64210, uploadedBy: 4, uploadedByName: "Erik Haugland", createdAt: oslo("2026-10-09", "13:30"), folderId: null },
  ],
});
