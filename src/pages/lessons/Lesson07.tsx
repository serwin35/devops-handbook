import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import LessonNav from '../../components/LessonNav';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Lesson07() {
  usePageTitle('Lekcja 07 — Wirtualizacja');

  return (
    <div>
      <PageHeader
        title="Lekcja 07 — Wirtualizacja"
        subtitle="VirtualBox, VMware, Hyper-V, chmura (AWS/Azure), snapshoty, VM vs kontenery"
        color="var(--c-orange)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card title="Co to jest wirtualizacja?">
          <p className="text-sm mb-3">
            Wirtualizacja to podział jednego fizycznego komputera na wiele
            maszyn wirtualnych, z których każda ma własny system operacyjny. To
            jak podział domu na mieszkania.
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>Każda VM działa jak osobny komputer</li>
            <li>Własny system operacyjny w każdej maszynie</li>
            <li>Izolacja zasobów i bezpieczeństwo</li>
            <li>Efektywne wykorzystanie sprzętu</li>
          </ul>
        </Card>

        <Card title="Poziomy izolacji">
          <p className="text-sm mb-3">
            Hypervisor pośredniczy między maszyną wirtualną a sprzętem:
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>
              <strong>Procesor:</strong> wirtualne CPU przydzielane każdej VM
            </li>
            <li>
              <strong>Pamięć:</strong> izolowana pamięć RAM dla każdej maszyny
            </li>
            <li>
              <strong>Dysk:</strong> wirtualne dyski (VDI, VMDK, VHD)
            </li>
            <li>
              <strong>Sieć:</strong> wirtualne karty sieciowe (NIC)
            </li>
          </ul>
        </Card>

        <Card title="VirtualBox — instalacja">
          <p className="text-sm mb-3">
            Instalacja i tworzenie maszyny wirtualnej:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Instalacja VirtualBox
sudo apt install virtualbox \\
  virtualbox-ext-pack`}
          </pre>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>Name: Ubuntu-Server, Type: Linux, Ubuntu 64-bit</li>
            <li>RAM: 4096 MB, CPU: 2, Video: 128 MB</li>
            <li>Dysk: VDI, 20 GB, dynamiczny</li>
            <li>Sieć: Adapter 1 NAT, Adapter 2 Host-only</li>
          </ul>
        </Card>

        <Card title="VMware Workstation/Player">
          <p className="text-sm mb-3">
            Zaawansowana platforma z lepszą obsługą grafiki i USB:
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 text-[var(--c-muted)]">
            <li>Lepsza grafika 3D (DirectX/OpenGL)</li>
            <li>Zaawansowana obsługa USB</li>
            <li>Lepsze zarządzanie snapshotami</li>
          </ul>
          <p className="text-sm mt-3 text-[var(--c-muted)]">
            Konfiguracja: typical install, Ubuntu, 4 GB RAM, 2 CPU, NAT,
            akceleracja 3D.
          </p>
        </Card>

        <Card title="Hyper-V (Windows)">
          <p className="text-sm mb-3">
            Wbudowany hypervisor w systemie Windows:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Włączenie Hyper-V
Enable-WindowsOptionalFeature \\
  -Online \\
  -FeatureName Microsoft-Hyper-V-All`}
          </pre>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# Tworzenie VM w PowerShell
New-VM -Name "UbuntuServer" \\
  -MemoryStartupBytes 4GB \\
  -NewVHDPath "C:\\VMs\\ubuntu.vhdx"
Set-VMProcessor -VMName "UbuntuServer" \\
  -Count 2
Start-VM -Name "UbuntuServer"`}
          </pre>
        </Card>

        <Card title="AWS EC2">
          <p className="text-sm mb-3">Maszyny wirtualne w chmurze Amazon:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`aws ec2 run-instances \\
  --image-id ami-0abcdef1234567890 \\
  --instance-type t2.micro \\
  --key-name MyKeyPair \\
  --security-group-ids sg-903004f8 \\
  --subnet-id subnet-6e7f829e`}
          </pre>
        </Card>

        <Card title="Azure Virtual Machines">
          <p className="text-sm mb-3">
            Lepsza elastyczność sieciowa i integracja z Active Directory:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`az vm create \\
  --resource-group myResourceGroup \\
  --name myVM \\
  --image UbuntuLTS \\
  --admin-username azureuser \\
  --generate-ssh-keys \\
  --size Standard_DS2_v2`}
          </pre>
        </Card>

        <Card title="Snapshots i klonowanie">
          <p className="text-sm mb-3">
            Tworzenie migawek i klonów maszyn wirtualnych:
          </p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# Tworzenie snapshota
VBoxManage snapshot "VM" take "Backup1"

# Przywracanie snapshota
VBoxManage snapshot "VM" restore "Backup1"

# Klonowanie maszyny
VBoxManage clonevm "VM" \\
  --name "Clone" --register`}
          </pre>
        </Card>

        <Card title="Wirtualizacja vs Konteneryzacja">
          <div className="text-sm space-y-3">
            <div>
              <p className="font-semibold mb-1">Maszyny wirtualne (VM):</p>
              <ul className="list-disc list-inside space-y-1 text-[var(--c-muted)]">
                <li>Pełna izolacja sprzętowa</li>
                <li>Własny system operacyjny</li>
                <li>Wyższy koszt zasobów</li>
                <li>Pełna kontrola nad środowiskiem</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-1">Kontenery:</p>
              <ul className="list-disc list-inside space-y-1 text-[var(--c-muted)]">
                <li>Izolacja na poziomie procesów</li>
                <li>Współdzielenie jądra hosta</li>
                <li>Lekkie i szybkie uruchamianie</li>
                <li>Uzupełniają VM, nie zastępują ich</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card title="Wydajność i optymalizacja">
          <p className="text-sm mb-3">Optymalizacja maszyn wirtualnych:</p>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs mb-3">
            {`# Huge pages — lepsza wydajność pamięci
echo "vm.nr_hugepages = 1024" \\
  >> /etc/sysctl.conf`}
          </pre>
          <pre className="bg-[var(--c-bg-secondary)] p-2 rounded text-xs">
            {`# Sprawdzenie wsparcia wirtualizacji CPU
egrep -c '(vmx|svm)' /proc/cpuinfo

# Przypinanie vCPU do fizycznych rdzeni
virsh vcpupin myVM 0 2`}
          </pre>
        </Card>
      </div>

      <LessonNav
        prev={{ to: '/lessons/06', label: '06 — DNS i Domeny' }}
        next={{ to: '/lessons/08', label: '08 — Wkrotce' }}
      />
    </div>
  );
}
