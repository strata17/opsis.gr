import sys,numpy as np
from PIL import Image,ImageFilter
def grade(src,dst,maxw=2400):
    im=Image.open(src).convert('L')
    if im.width>maxw: im=im.resize((maxw,int(im.height*maxw/im.width)),Image.LANCZOS)
    a=np.asarray(im).astype(np.float32)
    lo,hi=np.percentile(a,1),np.percentile(a,99)
    x=np.clip((a-lo)/(hi-lo),0,1)
    x=(np.tanh((x-.5)*2.6)/np.tanh(1.3)+1)/2
    ink=np.array([13,17,22],np.float32);off=np.array([245,245,242],np.float32)
    rgb=ink+(off-ink)*x[...,None]
    out=Image.fromarray(rgb.clip(0,255).astype(np.uint8)).filter(ImageFilter.UnsharpMask(2,60,3))
    out.save(dst,quality=92)
U='/mnt/user-data/uploads/Downloads/opsis11_'
for k in ['chania','ida','olive','reth','tractor','uni']:
    grade(U+k+'.jpg','bw/'+k+'.jpg')
