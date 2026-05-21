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
const Lesson06 = lazy(() => import('./pages/lessons/Lesson06'));
const Lesson07 = lazy(() => import('./pages/lessons/Lesson07'));
const Lesson08 = lazy(() => import('./pages/lessons/Lesson08'));
const Lesson09 = lazy(() => import('./pages/lessons/Lesson09'));
const Lesson10 = lazy(() => import('./pages/lessons/Lesson10'));
const Lesson11 = lazy(() => import('./pages/lessons/Lesson11'));
const Lesson12 = lazy(() => import('./pages/lessons/Lesson12'));
const Lesson13 = lazy(() => import('./pages/lessons/Lesson13'));
const Lesson14 = lazy(() => import('./pages/lessons/Lesson14'));
const Lesson15 = lazy(() => import('./pages/lessons/Lesson15'));
const Lesson16 = lazy(() => import('./pages/lessons/Lesson16'));
const Lesson17 = lazy(() => import('./pages/lessons/Lesson17'));
const Lesson18 = lazy(() => import('./pages/lessons/Lesson18'));
const Lesson19 = lazy(() => import('./pages/lessons/Lesson19'));
const Lesson20 = lazy(() => import('./pages/lessons/Lesson20'));
const Lesson21 = lazy(() => import('./pages/lessons/Lesson21'));
const Lesson22 = lazy(() => import('./pages/lessons/Lesson22'));
const Permissions = lazy(() => import('./pages/cheatsheets/Permissions'));
const Filesystem = lazy(() => import('./pages/cheatsheets/Filesystem'));
const DockerBasics = lazy(() => import('./pages/cheatsheets/DockerBasics'));
const GitCommands = lazy(() => import('./pages/cheatsheets/GitCommands'));
const Networking = lazy(() => import('./pages/cheatsheets/Networking'));
const NetworkingBasics = lazy(
  () => import('./pages/cheatsheets/NetworkingBasics'),
);
const NetworkTools = lazy(() => import('./pages/cheatsheets/NetworkTools'));
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
const Homework05 = lazy(() => import('./pages/homework/Homework05'));
const Homework06 = lazy(() => import('./pages/homework/Homework06'));
const Homework07 = lazy(() => import('./pages/homework/Homework07'));
const Homework08 = lazy(() => import('./pages/homework/Homework08'));
const Homework09 = lazy(() => import('./pages/homework/Homework09'));
const Homework10 = lazy(() => import('./pages/homework/Homework10'));
const Homework11 = lazy(() => import('./pages/homework/Homework11'));
const Homework12 = lazy(() => import('./pages/homework/Homework12'));
const Homework13 = lazy(() => import('./pages/homework/Homework13'));
const Homework14 = lazy(() => import('./pages/homework/Homework14'));
const Homework15 = lazy(() => import('./pages/homework/Homework15'));
const Homework16 = lazy(() => import('./pages/homework/Homework16'));
const Homework17 = lazy(() => import('./pages/homework/Homework17'));
const Homework18 = lazy(() => import('./pages/homework/Homework18'));
const Homework19 = lazy(() => import('./pages/homework/Homework19'));
const Homework20 = lazy(() => import('./pages/homework/Homework20'));
const Homework21 = lazy(() => import('./pages/homework/Homework21'));
const Homework22 = lazy(() => import('./pages/homework/Homework22'));
const ProcessesMonitoring = lazy(
  () => import('./pages/cheatsheets/ProcessesMonitoring'),
);
const CiCd = lazy(() => import('./pages/cheatsheets/CiCd'));
const DnsDomains = lazy(() => import('./pages/cheatsheets/DnsDomains'));
const Rsync = lazy(() => import('./pages/cheatsheets/Rsync'));
const LogAnalysis = lazy(() => import('./pages/cheatsheets/LogAnalysis'));
const NginxApache = lazy(() => import('./pages/cheatsheets/NginxApache'));
const SslTls = lazy(() => import('./pages/cheatsheets/SslTls'));
const Sql = lazy(() => import('./pages/cheatsheets/Sql'));
const Ansible = lazy(() => import('./pages/cheatsheets/Ansible'));
const DockerCompose = lazy(() => import('./pages/cheatsheets/DockerCompose'));
const DockerVolumesNetworks = lazy(
  () => import('./pages/cheatsheets/DockerVolumesNetworks'),
);
const DockerImages = lazy(() => import('./pages/cheatsheets/DockerImages'));
const PythonBasics = lazy(() => import('./pages/cheatsheets/PythonBasics'));
const PipVenv = lazy(() => import('./pages/cheatsheets/PipVenv'));
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
            <Route path="lessons/06" element={<Lesson06 />} />
            <Route path="lessons/07" element={<Lesson07 />} />
            <Route path="lessons/08" element={<Lesson08 />} />
            <Route path="lessons/09" element={<Lesson09 />} />
            <Route path="lessons/10" element={<Lesson10 />} />
            <Route path="lessons/11" element={<Lesson11 />} />
            <Route path="lessons/12" element={<Lesson12 />} />
            <Route path="lessons/13" element={<Lesson13 />} />
            <Route path="lessons/14" element={<Lesson14 />} />
            <Route path="lessons/15" element={<Lesson15 />} />
            <Route path="lessons/16" element={<Lesson16 />} />
            <Route path="lessons/17" element={<Lesson17 />} />
            <Route path="lessons/18" element={<Lesson18 />} />
            <Route path="lessons/19" element={<Lesson19 />} />
            <Route path="lessons/20" element={<Lesson20 />} />
            <Route path="lessons/21" element={<Lesson21 />} />
            <Route path="lessons/22" element={<Lesson22 />} />
            <Route path="cheatsheets" element={<CheatsheetsList />} />
            <Route path="cheatsheets/linux-basics" element={<LinuxBasics />} />
            <Route path="cheatsheets/permissions" element={<Permissions />} />
            <Route path="cheatsheets/filesystem" element={<Filesystem />} />
            <Route path="cheatsheets/docker" element={<DockerBasics />} />
            <Route path="cheatsheets/git" element={<GitCommands />} />
            <Route path="cheatsheets/networking" element={<Networking />} />
            <Route
              path="cheatsheets/networking-basics"
              element={<NetworkingBasics />}
            />
            <Route
              path="cheatsheets/network-tools"
              element={<NetworkTools />}
            />
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
            <Route path="cheatsheets/ci-cd" element={<CiCd />} />
            <Route path="cheatsheets/dns-domains" element={<DnsDomains />} />
            <Route path="cheatsheets/rsync" element={<Rsync />} />
            <Route path="cheatsheets/log-analysis" element={<LogAnalysis />} />
            <Route path="cheatsheets/nginx-apache" element={<NginxApache />} />
            <Route path="cheatsheets/ssl-tls" element={<SslTls />} />
            <Route path="cheatsheets/sql" element={<Sql />} />
            <Route path="cheatsheets/ansible" element={<Ansible />} />
            <Route
              path="cheatsheets/docker-compose"
              element={<DockerCompose />}
            />
            <Route
              path="cheatsheets/docker-volumes-networks"
              element={<DockerVolumesNetworks />}
            />
            <Route
              path="cheatsheets/docker-images"
              element={<DockerImages />}
            />
            <Route
              path="cheatsheets/python-basics"
              element={<PythonBasics />}
            />
            <Route path="cheatsheets/pip-venv" element={<PipVenv />} />
            <Route path="homework/01" element={<Homework01 />} />
            <Route path="homework/02" element={<Homework02 />} />
            <Route path="homework/03" element={<Homework03 />} />
            <Route path="homework/04" element={<Homework04 />} />
            <Route path="homework/05" element={<Homework05 />} />
            <Route path="homework/06" element={<Homework06 />} />
            <Route path="homework/07" element={<Homework07 />} />
            <Route path="homework/08" element={<Homework08 />} />
            <Route path="homework/09" element={<Homework09 />} />
            <Route path="homework/10" element={<Homework10 />} />
            <Route path="homework/11" element={<Homework11 />} />
            <Route path="homework/12" element={<Homework12 />} />
            <Route path="homework/13" element={<Homework13 />} />
            <Route path="homework/14" element={<Homework14 />} />
            <Route path="homework/15" element={<Homework15 />} />
            <Route path="homework/16" element={<Homework16 />} />
            <Route path="homework/17" element={<Homework17 />} />
            <Route path="homework/18" element={<Homework18 />} />
            <Route path="homework/19" element={<Homework19 />} />
            <Route path="homework/20" element={<Homework20 />} />
            <Route path="homework/21" element={<Homework21 />} />
            <Route path="homework/22" element={<Homework22 />} />
            <Route path="search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
