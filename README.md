# SpeedL

SpeedL ist eine Erweiterung vom einfachen [Wordle-Erlebnis](https://de.wikipedia.org/wiki/Wordle). Es verbindet sprachliches Fachwissen und das Vermögen, dazu unter Druck Leistung zu erbringen.

## Spielbeschreibung

Deine Mission ist es innerhalb 60 Sekunden so viele Wordles lösen zu können wie irgendwie möglich.

> Mehr kommt noch...

## Team

> Alex Uscata </br>
> Leon Geer </br>
> Yannick Büchler </br>
> Loris Schär

## Aufbau

### Frontend

- Statische Angular Seite, da man das bereits von vorherigen Modulen kennt und die meisten im Team schon damit Bekanntschaft gemacht haben
- TypeScript und CSS

### Backend & Datenbank

- Kein Backend und keine DB, da wir dafür keine Zeit haben und stattdessen Wert auf das Deployment gelegt wird

### Deployment

- Docker
- AWS mit Elastic Container Service

### Design

Das Design bzw. der visuelle Aufbau der App ist als Mockup im Ordner [`docs/mockups`](docs/mockups) hinterlegt.

- Haupt-Mockup: [SpeedL Mockups](docs/mockups/SpeedL%20Mockups.html)

> [!NOTE]
> Das Mockup dient als **Richtwert** für das Design der App. Es muss **nicht 1:1** umgesetzt werden, gibt aber die grundlegende Optik und Struktur vor.

### Lokal starten

Vorher via Package-Manager die CLI von Angular installieren:

```bash
npm install -g @angular/cli
```

Um einen lokalen Entwicklungsserver zu starten, führe folgenden Befehl aus:

```bash
npm install
npm start
```

Sobald der Server läuft, öffne deinen Browser und navigiere zu `http://localhost:4200/`. Die Anwendung wird automatisch neu geladen, sobald du Änderungen an den Quelldateien vornimmst.

### Weitere Funktionen:

Testen:

```bash
ng test
```

Linten:

```bash
ng lint
```

---

## BBZBL Modul 324: Web-Applikation Template

Ziel ist es ein Repository zu erstellen, welches, [wie das Muster](https://github.com/herrhodel/modul-324-muster) eine
Web-Applikation enthält, welche automatisch getestet, gebaut, released und deployed wird.

> [!NOTE]
> Die Web-Applikation muss in einem Ordner `/app` erstellt werden. Ansonsten müssen Folgescripts angepasst werden.

Je nach Thema, können vom Muster die Grundlagen kopiert und abgeändert werden.
Natürlich soll dieses Repo nicht nur ein Nginx sondern eine eigene Applikation beinhalten.

**Wieso nicht direkt das Muster als Grundlage?**

Dies war tatsächlich mal so. Die Erfahrung hat gezeigt, dass die Komplexität
das Verständnis erschwert. Die Idee ist, dass die einzelnen Schritte bewusster
umgesetzt werden und man nicht am Anfang vor lauter Bäume den Wald nicht mehr sieht.

In der ersten Woche wird bewusst das Muster bei allen zum Laufen gebracht. Dies
soll ermöglichen, dass ein Gesamtüberblick von Anfang an existiert.

> [!NOTE]
> Vorgegebene Ordnerstruktur
> Die Ordnerstruktur soll analog zum Muster aufgesetzt werden.
>
> Der Ordner `docs` wird von Anfang an benötigt und ist direkt im starter
> vorgegeben.
