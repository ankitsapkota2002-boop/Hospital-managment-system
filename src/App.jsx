import React, { useMemo, useState } from "react";
import {
  Activity, AlertCircle, ArrowDownRight, ArrowUpRight, Bell, BedDouble,
  CalendarDays, ChevronDown, ChevronLeft, ChevronRight, ClipboardList,
  Clock3, CreditCard, FlaskConical, HeartPulse, LayoutDashboard, Menu,
  MoreHorizontal, Pill, Plus, Search, Settings, ShieldCheck, Stethoscope,
  Users, UserRound, Wallet, X
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip,
  XAxis, YAxis
} from "recharts";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Patients", icon: Users },
  { label: "Doctors", icon: Stethoscope },
  { label: "Appointments", icon: CalendarDays },
  { label: "OPD Management", icon: ClipboardList },
  { label: "IPD & Admissions", icon: BedDouble },
  { label: "Laboratory", icon: FlaskConical },
  { label: "Pharmacy", icon: Pill },
  { label: "Billing & Payments", icon: CreditCard },
];

const chartData = [
  { day: "Mon", patients: 42, admissions: 18 },
  { day: "Tue", patients: 56, admissions: 24 },
  { day: "Wed", patients: 48, admissions: 20 },
  { day: "Thu", patients: 72, admissions: 29 },
  { day: "Fri", patients: 63, admissions: 25 },
  { day: "Sat", patients: 84, admissions: 34 },
  { day: "Sun", patients: 69, admissions: 27 },
];

const appointments = [
  { initials: "AM", name: "Aarav Mehta", type: "Cardiology", doctor: "Dr. Priya Sharma", time: "09:30 AM", status: "Checked in", tone: "green" },
  { initials: "SK", name: "Sara Khan", type: "Neurology", doctor: "Dr. James Wilson", time: "10:15 AM", status: "Waiting", tone: "amber" },
  { initials: "RJ", name: "Rohan Joshi", type: "Orthopedics", doctor: "Dr. Emily Carter", time: "11:00 AM", status: "Confirmed", tone: "blue" },
  { initials: "MP", name: "Mia Patel", type: "Dermatology", doctor: "Dr. Priya Sharma", time: "11:45 AM", status: "Confirmed", tone: "blue" },
];

const activities = [
  { icon: UserRound, color: "teal", title: "New patient registered", detail: "Patient UEL-2048 · Aarav Mehta", time: "8 min ago" },
  { icon: FlaskConical, color: "violet", title: "Lab report verified", detail: "Complete blood count · UEL-1982", time: "24 min ago" },
  { icon: BedDouble, color: "blue", title: "Bed assigned", detail: "Ward B · Bed 012", time: "42 min ago" },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MetricCard({ title, value, change, positive = true, icon: Icon, tint }) {
  return (
    <div className="metric-card">
      <div className="metric-top">
        <span className="metric-title">{title}</span>
        <span className={cx("metric-icon", tint)}><Icon size={19} /></span>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-foot">
        <span className={cx("trend", positive ? "trend-up" : "trend-down")}>
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </span>
        <span className="muted">vs. last month</span>
      </div>
    </div>
  );
}

function Status({ children, tone = "blue" }) {
  return <span className={cx("status", `status-${tone}`)}>{children}</span>;
}

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [appointmentSaved, setAppointmentSaved] = useState(false);

  const filteredAppointments = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return appointments;
    return appointments.filter((item) =>
      [item.name, item.type, item.doctor, item.status].some((v) => v.toLowerCase().includes(q))
    );
  }, [search]);

  const isDashboard = activePage === "Dashboard";

  return (
    <div className="uelcare-app"></div>