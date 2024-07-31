# AAN (Ambient Availability Notification) Desktop

## Übersicht

Die AAN Desktop-App ist eine Electron-basierte Anwendung, die es ermöglicht, den aktuellen Verfügbarkeitsstatus direkt über die native Taskleiste des Betriebssystems festzulegen. Mit einer kompatiblen Hardwarekomponente wird dieser Status über MQTT auf ein physisches Türschild übertragen, sodass Ihr Verfügbarkeitsstatus auch visuell in Ihrer Umgebung angezeigt wird.

## Installation und Ausführung

Folgen Sie diesen Schritten, um die Anwendung lokal auszuführen:

1. **Abhängigkeiten installieren**: Führen Sie den folgenden Befehl aus, um alle erforderlichen Pakete zu installieren:
   ```bash
   npm install
   ```

2. **Anwendung starten**: Nachdem die Installation abgeschlossen ist, können Sie die Anwendung mit folgendem Befehl starten:
   ```bash
   npm start
   ```

Damit wird die Anwendung gestartet und ist über die Taskleiste verfügbar. Sie können nun Ihren Verfügbarkeitsstatus festlegen und, sofern die Hardwarekomponente angeschlossen ist, wird der Status auch auf Ihrem Türschild angezeigt.
