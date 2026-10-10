Opsis video toolkit
===================

Every Opsis video is one HTML page (1080x1920) that draws a frame for any time t,
rendered frame by frame with Playwright/Chromium, then muxed with a Python-generated
sound mix. example_project/ is the ΠΑΣΟΚ transfers video (10/10/2026), the most
recent and cleanest template to copy.

Requirements: Python 3, playwright (Chromium), numpy, scipy, Pillow, opencv-python,
rembg (only for cut-outs), ffmpeg.

Fonts: the HTML loads fonts from FONTDIR/noto-serif-display/files/... The scripts
replace FONTDIR with a path to a @fontsource folder. Point the FONT variable at the
top of render.py / prev.py / qa.py to ../04_fonts (same folder layout: <family>/files/<file>
is expected, so either move the woff2 files into a files/ subfolder or edit the
@font-face urls in the HTML).

Per video
---------
1. Script: Greek, break tags, no abbreviations, numbers written in words
   (see the handoff doc). Voice: ElevenLabs "Stefanos - Calm Narrational".
2. Put vo.mp3 in a new folder; ffmpeg -i vo.mp3 -ac 1 -ar 48000 vo.wav
3. Timing: find phrase boundaries from silence (energy below -38 dB, see the
   handoff doc) and place each word's time by hand. words_optional.py does it
   automatically with faster-whisper, but needs to download a model.
4. Photos: Wikimedia Commons only (note author + licence). grade.py -> bw/<key>.jpg.
   For the body-outline effect: python3 prep.py <key> photo.jpg -> <key>_cut.png + <key>.json,
   grade the cut-out, then build cutdata.js (body contour minus photo-border runs = "trace").
5. Copy example_project/pasok.html, edit SH (shots), the text calls
   (wline / line / tline), cards, BEATS, WHIPS, END.
6. python3 prev.py sheet.png 1.0,5.0,... -> preview frames; look at them.
7. python3 qa.py <page>.html <duration> -> must end "issues: 0"
   (checks right edge 1040, left 40, caption zone below 1490, TikTok button rail).
8. python3 render.py 0 N (run two in parallel on halves), frames/f%04d.png
9. python3 audio_<name>.py -> mix.wav (new "tap" word sound, ducked under voice)
10. ffmpeg -framerate 30 -i frames/f%04d.png -i mix.wav -af "loudnorm=I=-15:TP=-1.5:LRA=9"
    -c:v libx264 -preset slow -crf 23 -maxrate 6000k -bufsize 12000k -pix_fmt yuv420p
    -profile:v high -movflags +faststart -c:a aac -b:a 192k -ar 48000 -shortest Opsis_<name>.mp4
11. Write Opsis_<name>_credits.txt (photos + sources) and the caption.
