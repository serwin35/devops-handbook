import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Lesson01 = lazy(() => import('./pages/lessons/Lesson01'));
const Lesson02 = lazy(() => import('./pages/lessons/Lesson02'));
const Lesson03 = lazy(() => import('./pages/lessons/Lesson03'));
const Permissions = lazy(() => import('./pages/cheatsheets/Permissions'));
const Filesystem = lazy(() => import('./pages/cheatsheets/Filesystem'));
const DockerBasics = lazy(() => import('./pages/cheatsheets/DockerBasics'));
const GitCommands = lazy(() => import('./pages/cheatsheets/GitCommands'));
const Networking = lazy(() => import('./pages/cheatsheets/Networking'));
const Systemd = lazy(() => import('./pages/cheatsheets/Systemd'));
const SSHWelcome = lazy(() => import('./pages/cheatsheets/SSHWelcome'));
const LinuxBasics = lazy(() => import('./pages/cheatsheets/LinuxBasics'));
const LessonsList = lazy(() => import('./pages/LessonsList'));
const CheatsheetsList = lazy(() => import('./pages/CheatsheetsList'));
const Search = lazy(() => import('./pages/Search'));
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
            <Route path="cheatsheets" element={<CheatsheetsList />} />
            <Route path="cheatsheets/linux-basics" element={<LinuxBasics />} />
            <Route path="cheatsheets/permissions" element={<Permissions />} />
            <Route path="cheatsheets/filesystem" element={<Filesystem />} />
            <Route path="cheatsheets/docker" element={<DockerBasics />} />
            <Route path="cheatsheets/git" element={<GitCommands />} />
            <Route path="cheatsheets/networking" element={<Networking />} />
            <Route path="cheatsheets/systemd" element={<Systemd />} />
            <Route path="cheatsheets/ssh-welcome" element={<SSHWelcome />} />
            <Route path="search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
