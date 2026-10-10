import asyncio,os,sys
from playwright.async_api import async_playwright
from PIL import Image
D=os.path.dirname(os.path.abspath(__file__))
FONT="file://"+os.path.abspath(D+"/../fonts/node_modules/@fontsource")
open(D+"/_pv.html","w",encoding="utf-8").write(open(D+"/pasok.html",encoding="utf-8").read().replace("FONTDIR",FONT))
TS=[float(x) for x in sys.argv[2].split(',')]; out=sys.argv[1]
async def go():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=["--allow-file-access-from-files"]);pg=await b.new_page(viewport={"width":1080,"height":1920})
        pg.on("pageerror",lambda e:print("ERR",e));pg.on("console",lambda m:print("LOG",m.text))
        await pg.goto("file://"+D+"/_pv.html"); await pg.evaluate("window.ready")
        ims=[]
        for t in TS:
            await pg.evaluate(f"render({t})"); f=f"{D}/p_{t:05.2f}.png"; await pg.screenshot(path=f); im=Image.open(f); im.thumbnail((270,480)); ims.append(im)
        await b.close()
    cols=min(8,len(ims)); rows=(len(ims)+cols-1)//cols; s=Image.new('RGB',(cols*274,rows*484),'white')
    for i,im in enumerate(ims): s.paste(im,((i%cols)*274,(i//cols)*484))
    s.save(D+"/"+out)
asyncio.run(go())
