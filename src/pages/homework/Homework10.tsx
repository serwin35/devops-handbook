import { useState } from 'react';
import { usePageTitle } from '../../hooks/usePageTitle';
import PageHeader from '../../components/PageHeader';
import Card from '../../components/Card';
import ExampleBlock, {
  Cmd,
  Comment,
  H,
  V,
  F,
} from '../../components/ExampleBlock';
import InfoBox from '../../components/InfoBox';
import SectionLabel from '../../components/SectionLabel';
import Divider from '../../components/Divider';
import LessonNav from '../../components/LessonNav';

function Spoiler({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="text-[11px] px-3 py-1.5 rounded border border-[var(--c-border)] bg-[var(--c-surface2)] text-[var(--c-accent)] hover:border-[var(--c-accent)] transition-colors"
      >
        {open ? '\u25BC' : '\u25B6'} {title}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

export default function Homework10() {
  usePageTitle('Homework 10');

  return (
    <div>
      <PageHeader
        title="Homework 10 — Repozytoria"
        subtitle="Git Flow, galezienie, merge, konflikty, push, pull, PR"
        color="var(--c-accent)"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Zadanie 1 */}
        <Card title="1. Pierwszy projekt Git" color="var(--c-accent)">
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Zainicjalizuj repozytorium, skonfiguruj uzytkownika, utworz pliki,
            zrob kilka commitow i przegladaj historie.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — inicjalizacja repozytorium</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                mkdir <F>~/my_first_project</F> && cd <F>~/my_first_project</F>
              </Cmd>
              <Cmd>git init</Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — konfiguracja uzytkownika
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                git config user.name <V>"Twoje Imie"</V>
              </Cmd>
              <Cmd>
                git config user.email <V>"twoj@email.com"</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — tworzenie plikow i pierwszy commit
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                echo <V>"# Moj Projekt"</V> {'>'} <F>README.md</F>
              </Cmd>
              <Cmd>
                echo <V>"Version 0.1"</V> {'>'} <F>VERSION.txt</F>
              </Cmd>
              <Cmd>
                git add <H>.</H>
              </Cmd>
              <Cmd>
                git commit <H>-m</H> <V>"Inicjalizacja projektu"</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 4 — kolejne commity
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Dodaj opis do README</Comment>
              <Cmd>
                echo <V>"Opis projektu testowego"</V> {'>>'} <F>README.md</F>
              </Cmd>
              <Cmd>
                git add <F>README.md</F>
              </Cmd>
              <Cmd>
                git commit <H>-m</H> <V>"Dodaj opis do README"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Dodaj plik feature.py</Comment>
              <Cmd>
                echo <V>"def hello(): print('Hello')"</V> {'>'}{' '}
                <F>feature.py</F>
              </Cmd>
              <Cmd>
                git add <F>feature.py</F>
              </Cmd>
              <Cmd>
                git commit <H>-m</H> <V>"Dodaj feature.py"</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 5 — przegladanie historii
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>git log</Cmd>
              <Cmd>
                git log <H>--oneline</H>
              </Cmd>
              <Cmd>
                git log <H>--graph</H> <H>--all</H> <H>--decorate</H>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Komenda <code className="text-xs">git log --oneline</code> to
              najszybszy sposob na przegladanie historii. Dodaj{' '}
              <code className="text-xs">--graph --all --decorate</code> zeby
              zobaczyc galezienie i tagi w formie graficznej.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 2 */}
        <Card
          title="2. Praca z galeziami — Feature Branches"
          color="var(--c-accent)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Utworz galaz feature, dodaj pliki, scal do main, usun galaz.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — tworzenie galezi feature</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                git branch <V>feature/documentation</V>
              </Cmd>
              <Cmd>
                git checkout <V>feature/documentation</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — praca na galezi feature
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                echo <V>"# Dokumentacja projektu"</V> {'>'}{' '}
                <F>DOCUMENTATION.md</F>
              </Cmd>
              <Cmd>
                echo <V>"## Instalacja"</V> {'>>'} <F>DOCUMENTATION.md</F>
              </Cmd>
              <Cmd>
                echo <V>"1. Sklonuj repo"</V> {'>>'} <F>DOCUMENTATION.md</F>
              </Cmd>
              <Cmd>
                git add <F>DOCUMENTATION.md</F>
              </Cmd>
              <Cmd>
                git commit <H>-m</H> <V>"Dodaj dokumentacje projektu"</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — scalanie do main
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                git checkout <V>main</V>
              </Cmd>
              <Cmd>
                git merge <V>feature/documentation</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 4 — weryfikacja i sprzatanie
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                git log <H>--graph</H> <H>--all</H> <H>--decorate</H>
              </Cmd>
              <Cmd>
                git branch <H>-d</H> <V>feature/documentation</V>
              </Cmd>
              <Cmd>
                git branch <H>-v</H>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Uzywaj <code className="text-xs">git branch -d</code> do
              bezpiecznego usuwania — Git odmowi jesli galaz nie zostala
              scalona. Jesli jestes pewien, uzyj{' '}
              <code className="text-xs">git branch -D</code> (duze D) do
              wymuszonego usuniecia.
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 3 */}
        <Card
          title="3. Git Flow — symulacja pracy zespolowej"
          color="var(--c-accent)"
        >
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Utworz pelna strukture Git Flow: develop, feature, release, hotfix,
            tagi.
          </p>
          <Spoiler title="Pokaz rozwiazanie krok po kroku">
            <SectionLabel>Krok 1 — galaz develop</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                git checkout <H>-b</H> <V>develop</V> <V>main</V>
              </Cmd>
              <Cmd>
                git push <H>-u</H> <V>origin</V> <V>develop</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — feature branch
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                git checkout <H>-b</H> <V>feature/auth</V> <V>develop</V>
              </Cmd>
              <Cmd>
                echo <V>"def authenticate(user): pass"</V> {'>'} <F>auth.py</F>
              </Cmd>
              <Cmd>
                git add <F>auth.py</F>
              </Cmd>
              <Cmd>
                git commit <H>-m</H> <V>"Dodaj modul autoryzacji"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Scal feature do develop</Comment>
              <Cmd>
                git checkout <V>develop</V>
              </Cmd>
              <Cmd>
                git merge <H>--no-ff</H> <V>feature/auth</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — release branch
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                git checkout <H>-b</H> <V>release/1.0.0</V> <V>develop</V>
              </Cmd>
              <Comment># Zaktualizuj wersje</Comment>
              <Cmd>
                echo <V>"Version 1.0.0"</V> {'>'} <F>VERSION.txt</F>
              </Cmd>
              <Cmd>
                git add <F>VERSION.txt</F>
              </Cmd>
              <Cmd>
                git commit <H>-m</H> <V>"Bump version to 1.0.0"</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 4 — merge do main i tag
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                git checkout <V>main</V>
              </Cmd>
              <Cmd>
                git merge <H>--no-ff</H> <V>release/1.0.0</V>
              </Cmd>
              <Cmd>
                git tag <H>-a</H> <V>v1.0.0</V> <H>-m</H> <V>"Release 1.0.0"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Scal tez do develop</Comment>
              <Cmd>
                git checkout <V>develop</V>
              </Cmd>
              <Cmd>
                git merge <H>--no-ff</H> <V>release/1.0.0</V>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Flaga <code className="text-xs">--no-ff</code> (no fast-forward)
              wymusza utworzenie merge commita nawet gdy mozliwy jest
              fast-forward. Dzieki temu historia jasno pokazuje, ze praca
              odbywala sie na oddzielnej galezi.
            </InfoBox>
          </Spoiler>
        </Card>

        <Divider />

        {/* Zadanie 4 */}
        <Card
          title="4. Pelny cykl Git-Flow z konfliktami"
          color="var(--c-purple)"
          full
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Utworz repozytorium z pelna struktura Git Flow, pracuj na dwoch
            galeziach feature jednoczesnie, rozwiaz konflikty merge i utworz
            hotfix.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Krok 1 — setup projektu</SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                mkdir <F>~/devops_project</F> && cd <F>~/devops_project</F>
              </Cmd>
              <Cmd>git init</Cmd>
              <Cmd>
                git config user.name <V>"DevOps Engineer"</V>
              </Cmd>
              <Cmd>
                git config user.email <V>"devops@example.com"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Pierwszy commit na main</Comment>
              <Cmd>
                echo <V>"# DevOps Project"</V> {'>'} <F>README.md</F>
              </Cmd>
              <Cmd>
                echo <V>"Version 0.1"</V> {'>'} <F>VERSION.txt</F>
              </Cmd>
              <Cmd>
                git add <H>.</H>
              </Cmd>
              <Cmd>
                git commit <H>-m</H> <V>"Inicjalizacja projektu"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Utworz galaz develop</Comment>
              <Cmd>
                git checkout <H>-b</H> <V>develop</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — Feature 1: monitoring
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                git checkout <H>-b</H> <V>feature/monitoring</V> <V>develop</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Utworz modul monitoringu</Comment>
              <Cmd>
                echo <V>"import logging"</V> {'>'} <F>monitoring.py</F>
              </Cmd>
              <Cmd>
                echo <V>"def check_health(): return True"</V> {'>>'}{' '}
                <F>monitoring.py</F>
              </Cmd>
              <Cmd>
                git add <F>monitoring.py</F>
              </Cmd>
              <Cmd>
                git commit <H>-m</H> <V>"Dodaj modul monitoringu"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Zmodyfikuj README na tej galezi</Comment>
              <Cmd>
                echo <V>"## Monitoring"</V> {'>>'} <F>README.md</F>
              </Cmd>
              <Cmd>
                echo <V>"Modul monitoringu systemu"</V> {'>>'} <F>README.md</F>
              </Cmd>
              <Cmd>
                git add <F>README.md</F>
              </Cmd>
              <Cmd>
                git commit <H>-m</H>{' '}
                <V>"Aktualizuj README — sekcja monitoring"</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — Feature 2: logging (modyfikuje README)
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                git checkout <V>develop</V>
              </Cmd>
              <Cmd>
                git checkout <H>-b</H> <V>feature/logging</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment>
                # Zmodyfikuj README (ten sam plik co feature/monitoring!)
              </Comment>
              <Cmd>
                echo <V>"## Logging"</V> {'>>'} <F>README.md</F>
              </Cmd>
              <Cmd>
                echo <V>"Centralny system logow"</V> {'>>'} <F>README.md</F>
              </Cmd>
              <Cmd>
                git add <F>README.md</F>
              </Cmd>
              <Cmd>
                git commit <H>-m</H> <V>"Aktualizuj README — sekcja logging"</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 4 — merge obu feature do develop (konflikt!)
            </SectionLabel>
            <ExampleBlock variant="purple">
              <Cmd>
                git checkout <V>develop</V>
              </Cmd>
              <Comment># Pierwsza galaz — bez problemow</Comment>
              <Cmd>
                git merge <H>--no-ff</H> <V>feature/monitoring</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Druga galaz — konflikt w README.md!</Comment>
              <Cmd>
                git merge <H>--no-ff</H> <V>feature/logging</V>
              </Cmd>
              <Comment>
                # CONFLICT (content): Merge conflict in README.md
              </Comment>
              <Cmd> </Cmd>
              <Comment># Sprawdz status</Comment>
              <Cmd>git status</Cmd>
              <Cmd> </Cmd>
              <Comment># Rozwiaz konflikt recznie — edytuj README.md</Comment>
              <Comment>
                # Usun znaczniki {'<<<<<<<'}, {'======='}, {'>>>>>>>'}
              </Comment>
              <Cmd>
                nano <F>README.md</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Zatwierdz rozwiazanie konfliktu</Comment>
              <Cmd>
                git add <F>README.md</F>
              </Cmd>
              <Cmd>
                git commit <H>-m</H>{' '}
                <V>"Merge feature/logging — rozwiaz konflikt README"</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Krok 5 — release i tag</SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                git checkout <H>-b</H> <V>release/1.0.0</V> <V>develop</V>
              </Cmd>
              <Cmd>
                echo <V>"Version 1.0.0"</V> {'>'} <F>VERSION.txt</F>
              </Cmd>
              <Cmd>
                git add <F>VERSION.txt</F>
              </Cmd>
              <Cmd>
                git commit <H>-m</H> <V>"Bump version to 1.0.0"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Cmd>
                git checkout <V>main</V>
              </Cmd>
              <Cmd>
                git merge <H>--no-ff</H> <V>release/1.0.0</V>
              </Cmd>
              <Cmd>
                git tag <H>-a</H> <V>v1.0.0</V> <H>-m</H> <V>"Release 1.0.0"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Scal release tez do develop</Comment>
              <Cmd>
                git checkout <V>develop</V>
              </Cmd>
              <Cmd>
                git merge <H>--no-ff</H> <V>release/1.0.0</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Krok 6 — hotfix</SectionLabel>
            <ExampleBlock variant="purple">
              <Cmd>
                git checkout <H>-b</H> <V>hotfix/critical-bug</V> <V>main</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Napraw krytyczny blad</Comment>
              <Cmd>
                echo <V>"def check_health(): return validate() and True"</V>{' '}
                {'>'} <F>monitoring.py</F>
              </Cmd>
              <Cmd>
                echo <V>"Version 1.0.1"</V> {'>'} <F>VERSION.txt</F>
              </Cmd>
              <Cmd>
                git add <F>monitoring.py</F> <F>VERSION.txt</F>
              </Cmd>
              <Cmd>
                git commit <H>-m</H>{' '}
                <V>"Hotfix: napraw walidacje w monitoringu"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Scal hotfix do main</Comment>
              <Cmd>
                git checkout <V>main</V>
              </Cmd>
              <Cmd>
                git merge <H>--no-ff</H> <V>hotfix/critical-bug</V>
              </Cmd>
              <Cmd>
                git tag <H>-a</H> <V>v1.0.1</V> <H>-m</H> <V>"Hotfix 1.0.1"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Scal hotfix tez do develop</Comment>
              <Cmd>
                git checkout <V>develop</V>
              </Cmd>
              <Cmd>
                git merge <H>--no-ff</H> <V>hotfix/critical-bug</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 7 — dokumentacja workflow
            </SectionLabel>
            <ExampleBlock variant="green">
              <Cmd>
                cat {'>'} <F>GIT_WORKFLOW.md</F> {'<<'} <V>EOF</V>
              </Cmd>
              <Cmd># Git Flow Workflow</Cmd>
              <Cmd>- main: stabilna wersja produkcyjna</Cmd>
              <Cmd>- develop: galaz integracyjna</Cmd>
              <Cmd>- feature/*: nowe funkcjonalnosci</Cmd>
              <Cmd>- release/*: przygotowanie wydania</Cmd>
              <Cmd>- hotfix/*: pilne poprawki</Cmd>
              <Cmd>
                <V>EOF</V>
              </Cmd>
              <Cmd>
                git add <F>GIT_WORKFLOW.md</F>
              </Cmd>
              <Cmd>
                git commit <H>-m</H> <V>"Dodaj dokumentacje Git Flow"</V>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Podczas rozwiazywania konfliktu szukaj znacznikow{' '}
              <code className="text-xs">{'<<<<<<< HEAD'}</code>,{' '}
              <code className="text-xs">{'======='}</code> i{' '}
              <code className="text-xs">{'>>>>>>> branch-name'}</code>.
              Polecenie <code className="text-xs">git diff</code> i{' '}
              <code className="text-xs">git log --merge</code> pomagaja
              zrozumiec zrodlo konfliktu. Po rozwiazaniu zawsze przetestuj kod!
            </InfoBox>
          </Spoiler>
        </Card>

        {/* Zadanie 5 */}
        <Card
          title="5. Zdalna wspolpraca — Push, Pull, PR/MR"
          color="var(--c-purple)"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(168,130,255,0.15)] text-[var(--c-purple)] font-bold">
              CHALLENGE
            </span>
          </div>
          <p className="text-[var(--c-muted)] text-xs mb-2">
            Utworz repozytorium na GitHub/GitLab, symuluj kolaboracje z dwoch
            katalogow, utworz Pull Request i posprzataj galeze.
          </p>
          <Spoiler title="Pokaz rozwiazanie">
            <SectionLabel>Krok 1 — utworz repo i sklonuj</SectionLabel>
            <ExampleBlock variant="default">
              <Comment># Utworz repo na GitHub (przez UI lub gh CLI)</Comment>
              <Cmd>
                gh repo create <V>devops-collab</V> <H>--public</H>{' '}
                <H>--clone</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Lub sklonuj istniejace</Comment>
              <Cmd>
                git clone <V>https://github.com/USER/devops-collab.git</V>
              </Cmd>
              <Cmd>
                cd <F>devops-collab</F>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Pierwszy commit</Comment>
              <Cmd>
                echo <V>"# DevOps Collab"</V> {'>'} <F>README.md</F>
              </Cmd>
              <Cmd>
                git add <F>README.md</F>
              </Cmd>
              <Cmd>
                git commit <H>-m</H> <V>"Inicjalizacja repo"</V>
              </Cmd>
              <Cmd>
                git push <H>-u</H> <V>origin</V> <V>main</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 2 — symulacja kolegi (drugi klon)
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                git clone <V>https://github.com/USER/devops-collab.git</V>{' '}
                <F>~/colleague_project</F>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 3 — praca w glownym katalogu
            </SectionLabel>
            <ExampleBlock variant="default">
              <Comment># Z glownego katalogu — utworz feature branch</Comment>
              <Cmd>
                git checkout <H>-b</H> <V>feature/api-docs</V>
              </Cmd>
              <Cmd>
                echo <V>"# API Documentation"</V> {'>'} <F>api.md</F>
              </Cmd>
              <Cmd>
                echo <V>"## Endpoints"</V> {'>>'} <F>api.md</F>
              </Cmd>
              <Cmd>
                git add <F>api.md</F>
              </Cmd>
              <Cmd>
                git commit <H>-m</H> <V>"Dodaj szkielet dokumentacji API"</V>
              </Cmd>
              <Cmd>
                git push <H>-u</H> <V>origin</V> <V>feature/api-docs</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 4 — praca kolegi (drugi katalog)
            </SectionLabel>
            <ExampleBlock variant="purple">
              <Cmd>
                cd <F>~/colleague_project</F>
              </Cmd>
              <Cmd>
                git fetch <V>origin</V>
              </Cmd>
              <Cmd>
                git checkout <V>feature/api-docs</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Kolega dodaje tresc</Comment>
              <Cmd>
                echo <V>"## Authentication"</V> {'>>'} <F>api.md</F>
              </Cmd>
              <Cmd>
                echo <V>"Bearer token required"</V> {'>>'} <F>api.md</F>
              </Cmd>
              <Cmd>
                git add <F>api.md</F>
              </Cmd>
              <Cmd>
                git commit <H>-m</H>{' '}
                <V>"Dodaj sekcje autentykacji do API docs"</V>
              </Cmd>
              <Cmd>
                git push <V>origin</V> <V>feature/api-docs</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">Krok 5 — Pull Request</SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Utworz PR z poziomu CLI</Comment>
              <Cmd>
                gh pr create <H>--title</H> <V>"Dodaj dokumentacje API"</V>{' '}
                <H>--body</H> <V>"Dokumentacja endpointow i autentykacji"</V>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Lub przez interfejs GitHub/GitLab</Comment>
              <Comment># 1. Wejdz na strone repo</Comment>
              <Comment># 2. "Compare & pull request"</Comment>
              <Comment># 3. Wypelnij opis i utworz PR</Comment>
              <Comment># 4. Przegladnij zmiany, zaakceptuj, merge</Comment>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 6 — merge i sprzatanie
            </SectionLabel>
            <ExampleBlock variant="green">
              <Comment># Po zaakceptowaniu PR — merge na GitHub</Comment>
              <Cmd>
                gh pr merge <H>--merge</H>
              </Cmd>
              <Cmd> </Cmd>
              <Comment># Posprzataj galeze</Comment>
              <Cmd>
                git checkout <V>main</V>
              </Cmd>
              <Cmd>
                git pull <V>origin</V> <V>main</V>
              </Cmd>
              <Cmd>
                git branch <H>-d</H> <V>feature/api-docs</V>
              </Cmd>
              <Cmd>
                git push <V>origin</V> <H>--delete</H> <V>feature/api-docs</V>
              </Cmd>
            </ExampleBlock>

            <SectionLabel className="mt-2">
              Krok 7 — dokumentacja wspolpracy
            </SectionLabel>
            <ExampleBlock variant="default">
              <Cmd>
                cat {'>'} <F>COLLABORATION.md</F> {'<<'} <V>EOF</V>
              </Cmd>
              <Cmd># Zasady wspolpracy</Cmd>
              <Cmd>- Zawsze pracuj na feature branch</Cmd>
              <Cmd>- Push regularnie do remote</Cmd>
              <Cmd>- Tworz PR przed merge do main</Cmd>
              <Cmd>- Code review jest obowiazkowy</Cmd>
              <Cmd>- Usuwaj galeze po merge</Cmd>
              <Cmd>
                <V>EOF</V>
              </Cmd>
              <Cmd>
                git add <F>COLLABORATION.md</F>
              </Cmd>
              <Cmd>
                git commit <H>-m</H> <V>"Dodaj zasady wspolpracy"</V>
              </Cmd>
              <Cmd>
                git push <V>origin</V> <V>main</V>
              </Cmd>
            </ExampleBlock>

            <InfoBox>
              Symulacja dwoch uzytkownikow za pomoca dwoch klonow to dobra
              metoda nauki. W prawdziwym projekcie kazdy developer ma wlasny
              klon. Zawsze rob <code className="text-xs">git pull</code> przed
              rozpoczeciem pracy i <code className="text-xs">git push</code> po
              zakonczeniu, zeby uniknac niepotrzebnych konfliktow.
            </InfoBox>
          </Spoiler>
        </Card>
      </div>

      <LessonNav prev={{ to: '/lessons/10', label: '10 — Repozytoria' }} />
    </div>
  );
}
