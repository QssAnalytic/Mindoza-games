#!/usr/bin/env python3
"""Build Mindoza Games into one self-contained HTML page.

    python3 build.py                                   -> dist/index.html (uses the live API)
    python3 build.py http://127.0.0.1:3999             -> dist/index.html pointed at a local API
    python3 build.py http://127.0.0.1:3999 test.html   -> dist/test.html pointed at a local API

The page is src/page.html with src/styles.css and the JavaScript files below dropped in.
Order matters: later files use names defined by earlier ones, and boot() runs last.
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "src")

JS_FILES = [
    "engine.js",    # question generators for the 10 Algebra Quest worlds
    "shell.js",     # state, saving, avatar, map, play loop, shop, progress
    "net.js",       # accounts, cloud save, leaderboard, admin dashboard
    "ict.js",       # Excel Lab (ICT) + game catalogue and home hub
    "sci.js",       # Cell Lab (Science)
    "extra.js",     # super questions, Mystery Doors, road maps, profile, fruits
    "scenes1.js",   # Algebra Quest world scenes 1-4
    "scenes2.js",   # Algebra Quest world scenes 5-10
    "ks3.js",       # KS3 missions engine (Volt Voyage, Atom Forge, Bio Odyssey, ¡Vamos!)
    "ks3art.js",    # KS3 stage art
    "ks3_phy.js",   # KS3 Physics levels
    "ks3_chem.js",  # KS3 Chemistry levels
    "ks3_bio.js",   # KS3 Biology levels
    "ks3_spa.js",   # KS3 Spanish levels
    "fun.js",       # hats, trails, drag, Vault Game, gifts, friends, admin coin/look tools
]

LIVE_API = "https://aq-api-production.up.railway.app"


def read(*parts):
    with open(os.path.join(SRC, *parts), encoding="utf-8") as f:
        return f.read()


def main():
    api = sys.argv[1] if len(sys.argv) > 1 else LIVE_API
    out_name = sys.argv[2] if len(sys.argv) > 2 else "index.html"

    js = "\n".join(read("js", name) for name in JS_FILES) + "\nboot();\n"
    if api != LIVE_API:
        js, n = re.subn(r"const API='[^']*';", "const API='" + api + "';", js, count=1)
        if n != 1:
            sys.exit("Could not find the API address in net.js")
    if "</script" in js:
        sys.exit("A source file contains '</script', which would break the page")

    page = read("page.html")
    page = page.replace("/*STYLES*/", read("styles.css"), 1).replace("/*SCRIPTS*/", js, 1)

    os.makedirs(os.path.join(ROOT, "dist"), exist_ok=True)
    out = os.path.join(ROOT, "dist", out_name)
    with open(out, "w", encoding="utf-8") as f:
        f.write(page)
    print("built", os.path.relpath(out, ROOT), len(page), "chars, API", api)


if __name__ == "__main__":
    main()
