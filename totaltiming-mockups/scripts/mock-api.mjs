// Answers the TotalTiming client's API calls with synthetic fixtures.
// No request is ever forwarded to a real server: anything not matched here is
// aborted and reported, so a capture can never touch a live backend.
import * as fx from "./fixtures.mjs";

const API = /^https?:\/\/(localhost|127\.0\.0\.1):8800\/api|^https:\/\/api\.totaltiming\.app\/api/;

export async function installMockApi(page, { userId, unmatched }) {
  const me = fx.userById[userId];

  await page.route((url) => API.test(url.href), async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    const path = url.pathname.replace(/^\/api/, "");
    const q = Object.fromEntries(url.searchParams);
    const method = req.method();
    const json = (body, status = 200) => route.fulfill({
      status, contentType: "application/json", body: JSON.stringify(body),
      headers: { "access-control-allow-origin": "http://localhost:5173", "access-control-allow-credentials": "true" },
    });

    if (method === "OPTIONS") {
      return route.fulfill({ status: 204, headers: {
        "access-control-allow-origin": "http://localhost:5173", "access-control-allow-credentials": "true",
        "access-control-allow-headers": "authorization,content-type", "access-control-allow-methods": "GET,POST,PUT,PATCH,DELETE",
      } });
    }

    let m;
    if (path === "/auth/refresh") return json({ accessToken: "demo-access-token" });
    if (path === "/auth/me") return json({ user: me });
    if (path === "/users") return json(fx.users);
    if (path === "/projects" || path === "/projects/active") return json(fx.projects);
    if ((m = path.match(/^\/projects\/([^/]+)\/members$/))) return json([1, 2, 4, 6].map((id) => ({ userId: id })));
    if ((m = path.match(/^\/projects\/(\d+)\/notes$/))) return json(fx.projectNotes(Number(m[1])));
    if ((m = path.match(/^\/projects\/([^/]+)\/images$/))) return json([]);
    if ((m = path.match(/^\/projects\/([^/]+)\/files$/))) return json(fx.projectFiles());
    if ((m = path.match(/^\/projects\/([^/]+)$/))) {
      const p = fx.projects.find((x) => String(x.id) === m[1] || x.projectCode === m[1]);
      return p ? json(p) : json({ message: "Not found" }, 404);
    }
    if (path === "/absence") return json(fx.absences);
    if ((m = path.match(/^\/absence\/([^/]+)$/))) {
      const a = fx.absences.find((x) => String(x.id) === m[1] || x.absenceCode === m[1]);
      return a ? json(a) : json({ message: "Not found" }, 404);
    }
    if (path === "/hours" && method === "GET") {
      if (q.userId) return json(fx.hoursForUser(q.userId));
      if (q.status === "pending") return json(fx.pendingHours());
      if (q.status === "approved") return json(fx.approvedHours());
      return json(fx.hours);
    }
    if (path === "/hours/pm-queue") return json(fx.pmQueue(userId));
    if ((m = path.match(/^\/reports\/projects\/(\d+)\/hours\/by-user$/))) return json(fx.projectHoursByUser(m[1]));
    if ((m = path.match(/^\/reports\/projects\/(\d+)\/hours$/))) return json(fx.projectHours(m[1]));
    if ((m = path.match(/^\/reports\/absence\/(\d+)\/hours-by-user$/))) return json([]);
    if ((m = path.match(/^\/reports\/absence\/(\d+)\/hours$/))) return json([]);
    if (path === "/reports/activity") return json(fx.activity(q.from, q.to));
    if (path === "/shifts/available") return json(fx.availableShifts());
    if (path === "/shifts/my-bookings") return json(fx.myBookings());
    if (path === "/shifts" && method === "GET") {
      let rows = fx.shifts;
      if (q.status === "OPEN") rows = rows.filter((s) => s.status === "OPEN");
      if (q.status === "CANCELLED") rows = rows.filter((s) => s.status === "CANCELLED");
      return json(rows);
    }
    if ((m = path.match(/^\/shifts\/([^/]+)\/bookings$/))) return json(fx.shiftBookings(m[1]));
    if (path === "/points/me") return json(fx.pointHistory(userId));
    if (path === "/points/users") return json(fx.scores);
    if ((m = path.match(/^\/points\/users\/(\d+)$/))) return json(fx.pointHistory(m[1]));

    unmatched.push(`${method} ${path}${url.search}`);
    return route.abort();
  });
}
