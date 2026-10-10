import sys,json
from faster_whisper import WhisperModel
m=WhisperModel(sys.argv[2] if len(sys.argv)>2 else "small",device="cpu",compute_type="int8")
segs,_=m.transcribe(sys.argv[1],language="el",word_timestamps=True,vad_filter=False)
W=[]
for s in segs:
    for w in s.words: W.append([round(w.start,2),round(w.end,2),w.word.strip()])
json.dump(W,open("words.json","w"),ensure_ascii=False)
for w in W: print(w)
