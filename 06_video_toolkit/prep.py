# usage: prep.py key src.jpg -> key_cut.png (graded RGBA), key.json (contour paths, face box)
import sys,json,numpy as np,cv2
from PIL import Image
from rembg import remove,new_session
key,src=sys.argv[1],sys.argv[2]
im=Image.open(src).convert('RGB')
s1=new_session('u2net_human_seg');s2=new_session('isnet-general-use')
a1=np.asarray(remove(im,session=s1,only_mask=True)).astype(np.float32)/255
a2=np.asarray(remove(im,session=s2,only_mask=True)).astype(np.float32)/255
m=np.where(a1>.5,np.maximum(a1,a2),a1*a2)  # solid body from human_seg, crisp edges from isnet
mb=(m>.5).astype(np.uint8)
n,lab,st,_=cv2.connectedComponentsWithStats(mb);big=1+np.argmax(st[1:,cv2.CC_STAT_AREA]);mb=(lab==big).astype(np.uint8)
mb=cv2.morphologyEx(mb,cv2.MORPH_CLOSE,np.ones((15,15),np.uint8))
m=m*cv2.GaussianBlur(mb.astype(np.float32),(0,0),1.5)
rgba=np.dstack([np.asarray(im),(m*255).astype(np.uint8)])
Image.fromarray(rgba).save(key+'_cut.png')
H,W=mb.shape
def contour(mask,eps):
    cs,_=cv2.findContours(mask,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE);c=max(cs,key=cv2.contourArea)
    c=cv2.approxPolyDP(c,eps,True)[:,0,:]
    # rotate start to topmost point so the trace starts at the head
    i=int(np.argmin(c[:,1]));c=np.roll(c,-i,0)
    return 'M'+' L'.join(f'{x} {y}' for x,y in c)+' Z'
k=int(W*0.018)|1
dil=cv2.dilate(mb,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(k,k)))
rows=np.where(mb.any(1))[0];y0=int(rows[0]);y1=int(rows[-1])
wid=mb.sum(1).astype(float)
# head: from top down to the neck (narrowest row after the widest head row)
seg=wid[y0:y0+int((y1-y0)*.75)]
hw=int(np.argmax(seg[:max(5,int(len(seg)*.45))]))
neck=y0+hw+int(np.argmin(seg[hw:])) if hw<len(seg)-1 else y0+int(len(seg)*.5)
xs=[np.where(mb[y])[0] for y in range(y0,neck) if mb[y].any()]
cx=float(np.mean([x.mean() for x in xs]));rx=float(max((x.max()-x.min()) for x in xs))/2
faces=[[int(cx-rx),y0,int(2*rx),int(neck-y0)]]
json.dump({'w':W,'h':H,'body':contour(mb,W*0.002),'sticker':contour(dil,W*0.002),'face':faces[0] if faces else None},open(key+'.json','w'))
print(key,W,H,'faces',faces[:2])
