import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Lesson01 = lazy(() => import('./pages/lessons/Lesson01'));
const Lesson02 = lazy(() => import('./pages/lessons/Lesson02'));
const Lesson03 = lazy(() => import('./pages/lessons/Lesson03'));
const Lesson04 = lazy(() => import('./pages/lessons/Lesson04'));
const Lesson05 = lazy(() => import('./pages/lessons/Lesson05'));
const Permissions = lazy(() => import('./pages/cheatsheets/Permissions'));
const Filesystem = lazy(() => import('./pages/cheatsheets/Filesystem'));
const DockerBasics = lazy(() => import('./pages/cheatsheets/DockerBasics'));
const GitCommands = lazy(() => import('./pages/cheatsheets/GitCommands'));
const Networking = lazy(() => import('./pages/cheatsheets/Networking'));
const Systemd = lazy(() => import('./pages/cheatsheets/Systemd'));
const SSHWelcome = lazy(() => import('./pages/cheatsheets/SSHWelcome'));
const SSHKeys = lazy(() => import('./pages/cheatsheets/SSHKeys'));
const LinuxBasics = lazy(() => import('./pages/cheatsheets/LinuxBasics'));
const Editors = lazy(() => import('./pages/cheatsheets/Editors'));
const BashScripting = lazy(() => import('./pages/cheatsheets/BashScripting'));
const PackageManagement = lazy(
  () => import('./pages/cheatsheets/PackageManagement'),
);
const CronJobs = lazy(() => import('./pages/cheatsheets/CronJobs'));
const LessonsList = lazy(() => import('./pages/LessonsList'));
const CheatsheetsList = lazy(() => import('./pages/CheatsheetsList'));
const Search = lazy(() => import('./pages/Search'));
const Homework01 = lazy(() => import('./pages/homework/Homework01'));
const Homework02 = lazy(() => import('./pages/homework/Homework02'));
const Homework03 = lazy(() => import('./pages/homework/Homework03'));
const Homework04 = lazy(() => import('./pages/homework/Homework04'));
const ProcessesMonitoring = lazy(
  () => import('./pages/cheatsheets/ProcessesMonitoring'),
);
const NotFound = lazy(() => import('./pages/NotFound'));

function Loading() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="text-[var(--c-muted)] text-lg animate-pulse">
        Ładowanie...
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="lessons" element={<LessonsList />} />
            <Route path="lessons/01" element={<Lesson01 />} />
            <Route path="lessons/02" element={<Lesson02 />} />
            <Route path="lessons/03" element={<Lesson03 />} />
            <Route path="lessons/04" element={<Lesson04 />} />
            <Route path="lessons/05" element={<Lesson05 />} />
            <Route path="cheatsheets" element={<CheatsheetsList />} />
            <Route path="cheatsheets/linux-basics" element={<LinuxBasics />} />
            <Route path="cheatsheets/permissions" element={<Permissions />} />
            <Route path="cheatsheets/filesystem" element={<Filesystem />} />
            <Route path="cheatsheets/docker" element={<DockerBasics />} />
            <Route path="cheatsheets/git" element={<GitCommands />} />
            <Route path="cheatsheets/networking" element={<Networking />} />
            <Route path="cheatsheets/systemd" element={<Systemd />} />
            <Route path="cheatsheets/ssh-welcome" element={<SSHWelcome />} />
            <Route path="cheatsheets/ssh-keys" element={<SSHKeys />} />
            <Route path="cheatsheets/editors" element={<Editors />} />
            <Route
              path="cheatsheets/bash-scripting"
              element={<BashScripting />}
            />
            <Route
              path="cheatsheets/package-management"
              element={<PackageManagement />}
            />
            <Route path="cheatsheets/cron-jobs" element={<CronJobs />} />
            <Route
              path="cheatsheets/processes-monitoring"
              element={<ProcessesMonitoring />}
            />
            <Route path="homework/01" element={<Homework01 />} />
            <Route path="homework/02" element={<Homework02 />} />
            <Route path="homework/03" element={<Homework03 />} />
            <Route path="homework/04" element={<Homework04 />} />
            <Route path="search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
