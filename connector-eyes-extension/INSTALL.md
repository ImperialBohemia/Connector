# Jak nainstalovat "Connector Eyes" do tvého Chrome

Tento systém využívá tvůj aktuální prohlížeč a přihlášení. Instalace je snadná a bezpečná (Developer Mode).

## 1. Příprava
1. Stáhni si tento repozitář k sobě do počítače (pokud ho nemáš).
2. Najdi složku `connector-eyes-extension` v tomto projektu.

## 2. Instalace do Chrome
1. Otevři **Google Chrome**.
2. Do adresního řádku napiš: `chrome://extensions` a stiskni Enter.
3. V pravém horním rohu zapni přepínač **Režim pro vývojáře** (Developer mode).
4. Vlevo nahoře se objeví tlačítka. Klikni na **Načíst rozbalené** (Load unpacked).
5. V okně vyber složku `connector-eyes-extension` (tu, kde je soubor `manifest.json`).
6. Hotovo! Rozšíření **Connector Eyes** s ikonou oka se objeví v seznamu.

## 3. Jak to spustit
1. Klikni na ikonu **Puzzle** vpravo nahoře v Chrome a **připni** (Pin) Connector Eyes, ať ho máš po ruce.
2. Klikni na ikonu **Oka** 👁️. Otevře se postranní panel.
3. Zadej svůj **OpenAI API Key** (uloží se jen u tebe v prohlížeči).
4. Jdi na jakoukoliv stránku (např. Gmail, Amazon, WordPress).
5. Napiš příkaz česky, např.: *"Klikni na tlačítko napsat zprávu a napiš Ahoj"* nebo *"Sjeď dolů a najdi kontakt"*.

## 4. Testování
Pro ověření funkčnosti jsme připravili testovací stránku.
1. Otevři v Chrome soubor `connector-eyes-extension/test/eyes-test.html` (stačí ho přetáhnout do prohlížeče).
2. Otevři panel Connector Eyes.
3. Zadej příkaz: *"Klikni na tlačítko dole (Bottom) a pak napiš do tajného kódu heslo 'Jules123'"*.
4. Sleduj, jak AI sama scrolluje, najde prvky a vyplní je.
