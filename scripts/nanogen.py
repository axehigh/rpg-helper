#!/usr/bin/env python3
"""Minimal Gemini image generation/editing via the REST API.

Replaces the defunct `gemini --yolo "/generate ..."` CLI workflow (Google
retired free-tier OAuth for the CLI and the old image-preview model).
Uses GEMINI_API_KEY directly.

Usage:
  nanogen.py --prompt "..." --out nanobanana-output/foo-v2.png [--aspect 4:3]
  nanogen.py --prompt "edit instruction" --edit web/images/campaign/foo.jpg --out ...-v2.png

Model defaults to gemini-3.1-flash-image; override with NANOGEN_MODEL.
"""
import argparse
import base64
import json
import mimetypes
import os
import sys
import time
import urllib.error
import urllib.request

API = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}"


def call(payload, model, key, retries=2):
    req = urllib.request.Request(
        API.format(model=model, key=key),
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
    )
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(req, timeout=300) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            body = e.read().decode(errors="replace")
            if e.code >= 500 and attempt < retries:
                time.sleep(5 * (attempt + 1))
                continue
            sys.exit(f"HTTP {e.code}: {body[:2000]}")
    sys.exit("unreachable")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompt", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--aspect", default=None, help="e.g. 4:3, 3:4, 16:9")
    ap.add_argument("--edit", default=None, help="path to source image to edit")
    args = ap.parse_args()

    key = os.environ.get("GEMINI_API_KEY") or sys.exit("GEMINI_API_KEY not set")
    model = os.environ.get("NANOGEN_MODEL", "gemini-3.1-flash-image")

    parts = []
    if args.edit:
        mime = mimetypes.guess_type(args.edit)[0] or "image/jpeg"
        with open(args.edit, "rb") as f:
            parts.append({"inline_data": {"mime_type": mime, "data": base64.b64encode(f.read()).decode()}})
    parts.append({"text": args.prompt})

    gen_config = {"responseModalities": ["IMAGE"]}
    if args.aspect:
        gen_config["imageConfig"] = {"aspectRatio": args.aspect}

    resp = call({"contents": [{"parts": parts}], "generationConfig": gen_config}, model, key)

    for part in resp.get("candidates", [{}])[0].get("content", {}).get("parts", []):
        data = part.get("inlineData") or part.get("inline_data")
        if data and data.get("data"):
            os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
            with open(args.out, "wb") as f:
                f.write(base64.b64decode(data["data"]))
            print(f"saved {args.out} ({model})")
            return
    sys.exit(f"no image in response: {json.dumps(resp)[:2000]}")


if __name__ == "__main__":
    main()
