# SpeedL

Dieses Projekt wurde mit [Angular CLI](https://github.com/angular/angular-cli) Version 21.2.21 erstellt.

## Entwicklungsserver

Um einen lokalen Entwicklungsserver zu starten, führe Folgendes aus:

```bash
ng serve
```

Sobald der Server läuft, öffne deinen Browser und navigiere zu `http://localhost:4200/`. Die Anwendung wird automatisch neu geladen, sobald du eine der Quelldateien änderst.

## Code-Gerüsterstellung (Scaffolding)

Die Angular CLI bietet leistungsstarke Werkzeuge zur Code-Gerüsterstellung. Um eine neue Komponente zu generieren, führe Folgendes aus:

```bash
ng generate component component-name
```

Eine vollständige Liste der verfügbaren Schematics (wie z. B. `components`, `directives` oder `pipes`) erhältst du mit:

```bash
ng generate --help
```

## Build erstellen

Um das Projekt zu bauen, führe Folgendes aus:

```bash
ng build
```

Dadurch wird dein Projekt kompiliert und die Build-Artefakte werden im Verzeichnis `dist/` gespeichert. Standardmäßig wird der Produktions-Build hinsichtlich Leistung und Geschwindigkeit optimiert.

## Unit-Tests ausführen

Um Unit-Tests mit dem [Vitest](https://vitest.dev/)-Test-Runner auszuführen, verwende den folgenden Befehl:

```bash
ng test
```

## aEnd-to-End-Tests ausführen

Die App verwendet [Playwright](https://playwright.dev/) für End-to-End-Tests. Die Tests befinden sich im Verzeichnis `e2e/` und werden in `playwright.config.ts` konfiguriert.

Installiere die Playwright-Browser-Binärdateien einmalig nach der Installation der Abhängigkeiten:

```bash
npx playwright install
```

Führe alle E2E-Tests aus mit:

```bash
npm run e2e
```

Standardmäßig verwendet Playwright die Basis-URL aus der Umgebungsvariable `PLAYWRIGHT_TEST_BASE_URL`. Wenn der Angular-Entwicklungsserver unter `http://localhost:4200/` läuft, setze die Variable, bevor du die Tests ausführst:

```powershell
$env:PLAYWRIGHT_TEST_BASE_URL = 'http://localhost:4200/'
npm run e2e
```

Alternativ kannst du die Variable auch in einer `.env`-Datei hinterlegen:

1. Erstelle die Datei `.env` im Verzeichnis `app/`.
2. Füge folgenden Wert in die `.env`-Datei ein:

```bash
PLAYWRIGHT_TEST_BASE_URL=http://localhost:4200/
```

Nützliche Playwright-Befehle:

```bash
npx playwright test --ui
npx playwright show-report
```

## Weitere Ressourcen

Weitere Informationen zur Verwendung der Angular CLI, einschließlich einer detaillierten Befehlsreferenz, findest du auf der Seite [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
