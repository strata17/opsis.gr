import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile
SR=48000; DUR=36.75; N=int(SR*DUR)
rng=np.random.default_rng(11)
def bp(x,lo,hi,o=2): return sosfilt(butter(o,[lo,hi],'band',fs=SR,output='sos'),x)
def hp(x,f,o=2): return sosfilt(butter(o,f,'high',fs=SR,output='sos'),x)
def lp(x,f,o=2): return sosfilt(butter(o,f,'low',fs=SR,output='sos'),x)
L=np.zeros(N); R=np.zeros(N)
def add(sig,t,gain=1.0,pan=0.0):
    i=int(t*SR); n=min(len(sig),N-i)
    if n<=0: return
    L[i:i+n]+=sig[:n]*gain*np.sqrt((1-pan)/2); R[i:i+n]+=sig[:n]*gain*np.sqrt((1+pan)/2)
def env(n,a,d):
    t=np.arange(n)/SR; return np.minimum(1,t/max(a,1e-4))*np.exp(-np.maximum(0,t-a)/d)
def click(g=1.0):
    n=int(0.012*SR); x=hp(rng.standard_normal(n)*env(n,0.0003,0.0025),2500)
    y=np.zeros(int(0.05*SR)); y[:n]+=x; i=int(0.028*SR); y[i:i+n]+=0.7*hp(rng.standard_normal(n)*env(n,0.0003,0.002),1800); return y*g
def thump(f0=110,f1=42,dur=0.35,g=1.0):
    n=int(dur*SR); t=np.arange(n)/SR; f=f1+(f0-f1)*np.exp(-t*28); return np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,0.002,dur/3.2)*g
def swish(dur,lo=700,hi=5000,g=1.0):
    n=int(dur*SR); x=bp(rng.standard_normal(n),lo,hi); t=np.linspace(0,1,n); return x*np.sin(np.pi*t)**1.5*g
def boom(dur=2.2,g=1.0):
    n=int(dur*SR); t=np.arange(n)/SR; f=38+30*np.exp(-t*9)
    s=np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,0.004,0.7)+0.35*lp(rng.standard_normal(n),180)*env(n,0.002,0.25); return s*g
def verb(x,decay=1.1,mix=0.18):
    n=int(decay*SR); ir=lp(rng.standard_normal(n)*np.exp(-np.arange(n)/SR/(decay/5)),6000)
    w=fftconvolve(x,ir)[:len(x)]; w/=np.max(np.abs(w))+1e-9; return x+mix*w*np.max(np.abs(x))
# bed
n=int(DUR*SR); t=np.arange(n)/SR
bed=(0.5*np.sin(2*np.pi*55*t)+0.25*np.sin(2*np.pi*82.4*t+0.3)+0.12*lp(rng.standard_normal(n),350))*np.minimum(1,t/1.0)
add(bed,0,0.07)
def tap(f=210,g=1.0):
    # letterpress 'type block' knock: low woody body + short paper transient, no pitch sweep
    n=int(.09*SR); tt=np.arange(n)/SR
    body=np.sin(2*np.pi*f*tt)*env(n,.0015,.024)+0.35*np.sin(2*np.pi*f*2.76*tt)*env(n,.001,.009)
    tr=bp(rng.standard_normal(n),700,2600)*env(n,.0004,.0035)*0.45
    return lp(body+tr,3500)*g
def pop(f=900,g=1.0): return tap(170+(f-800)*0.25,g)
def tick(g=1.0):
    n=int(.03*SR); x=hp(rng.standard_normal(n),1800)*env(n,.0005,.004); y=np.sin(2*np.pi*180*np.arange(n)/SR)*env(n,.001,.008)*.6; return (x+y)*g
def whip(dur=.32,g=1.0):
    n=int(dur*SR); x=rng.standard_normal(n); out=np.zeros(n); seg=n//8
    for k in range(8):
        lo=300+k*500; out[k*seg:(k+1)*seg]=bp(x[k*seg:(k+1)*seg],lo,lo*3)
    return out*np.sin(np.pi*np.linspace(0,1,n))**1.2*g
def scribble(dur):
    n=int(dur*SR); x=bp(rng.standard_normal(n),2000,8000); m=0.6+0.4*np.sign(np.sin(2*np.pi*14*np.arange(n)/SR)); return x*m*np.sin(np.pi*np.linspace(0,1,n))
def crackle(dur,g=1.0):
    n=int(dur*SR); return hp(rng.standard_normal(n),1200)*(rng.random(n)<.25)*np.exp(-np.arange(n)/SR/(dur/2.2))*g

END=33.6
def taps(lst,g=0.5):
    for t in lst: add(pop(850,g),t)
def big(t): add(pop(650,0.8),t); add(thump(170,45,0.5,0.9),t)
def cut(t): add(click(0.6),t); add(thump(150,55,0.18,0.45),t)
def typing(t0,n,cps):
    for k in range(n): add(tick(0.5),t0+k/cps,1.0,(rng.random()-.5)*.4)
def slap(t,g=0.9): add(lp(rng.standard_normal(int(.15*SR)),900)*env(int(.15*SR),.001,.04),t,g)
# A / B: outlines
add(thump(190,40,0.7,1.1),0.02); add(click(0.8),0.02)
add(scribble(0.8),0.15,0.25,-0.2); add(scribble(0.8),3.1,0.25,0.2)
taps([0.05,0.2,0.91,1.2,1.3,1.84]); big(1.96); add(scribble(0.25),2.05,0.3)
cut(2.95); taps([2.98,3.2]); big(3.35); taps([4.22,4.6,4.75,5.1]); big(5.25); add(scribble(0.25),5.35,0.3)
# C: org chart
cut(6.3); typing(6.36,12,18); add(swish(0.4,1000,6000,0.35),7.55)
add(thump(160,60,0.3,0.7),8.0); add(scribble(0.7),8.2,0.18)
for k in range(3): add(swish(0.25,1500,7000,0.3),8.7+k*.18,1.0,-0.3+0.3*k)
for t in [11.23,12.79,14.28]: add(swish(0.3,600,4500,0.55),t-0.05,1.0,0.15); add(click(0.6),t+0.2); add(thump(150,50,0.3,0.8),t+0.2)
# D: transfer card 1
cut(15.25); typing(15.29,16,18)
add(thump(130,40,0.5,1.1),16.25); slap(16.25)
taps([18.3,18.62,18.9],0.45); taps([20.02],0.6)
add(thump(180,40,0.6,1.3),20.17); slap(20.17)
# whip
add(whip(0.34,0.9),20.85-0.17); add(thump(150,55,0.2,0.6),20.87)
typing(20.93,14,18)
add(thump(130,40,0.5,1.1),21.88); slap(21.88)
taps([24.2,24.55],0.45); taps([25.5],0.6)
add(thump(180,40,0.6,1.3),25.65); slap(25.65)
# F
cut(26.3); taps([26.37,26.5,26.8]); big(26.9)
for t in [26.45,26.6,26.75]: add(thump(140,60,0.2,0.5),t+0.2); add(click(0.3),t+0.2)
# G
cut(27.6); add(swish(0.3,800,5000,0.4),27.6); taps([27.65,27.95])
add(thump(180,38,0.7,1.2),28.75); add(crackle(0.25,0.6),28.75)
for k in range(6): add(tick(0.6),28.75+(k+1)*0.13,1.0,(-0.3 if k%2 else 0.3))
big(29.05)
# H
cut(29.9); taps([30.0,30.1,30.94,31.05]); big(32.31); add(scribble(0.5),32.42,0.35)
# outro
add(swish(0.34,300,4500,0.9),END-0.15,1.0,-0.2); add(thump(120,45,0.3,0.8),END); add(click(0.6),END)
add(thump(260,120,0.18,0.6),END+0.23); add(thump(180,70,0.3,0.8),END+0.40); add(boom(2.2,1.0),END+0.64)
m=int(1.6*SR); tt=np.arange(m)/SR
add((np.sin(2*np.pi*1318.5*tt)+0.6*np.sin(2*np.pi*1975.5*tt)+0.4*np.sin(2*np.pi*2637*tt))*env(m,0.01,0.45),END+0.66,0.06)
sfx=np.stack([L,R],1)
sfx=np.stack([verb(sfx[:,0]),verb(sfx[:,1])],1)
sfx/=np.max(np.abs(sfx))+1e-9
# voice
sr,v=wavfile.read('vo.wav'); v=v.astype(float)/32768.0
V=np.zeros(N); V[:min(len(v),N)]=v[:N]
V/=np.max(np.abs(V))
# duck sfx under voice
e=np.abs(V); k=int(0.05*SR); e=np.convolve(e,np.ones(k)/k,'same'); e=np.clip(e/0.25,0,1)
duck=1-0.65*e
out=np.stack([V*0.9,V*0.9],1)+sfx*0.30*duck[:,None]
fade=np.ones(N); fe=int(0.5*SR); fade[-fe:]=np.linspace(1,0,fe)**2; out*=fade[:,None]
out=np.tanh(out*1.1)*0.9
wavfile.write('mix.wav',SR,(out*32767).astype(np.int16)); print('ok')
