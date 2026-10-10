import asyncio,sys,os
from playwright.async_api import async_playwright
D=os.path.dirname(os.path.abspath(__file__))
FONT="file://"+os.path.abspath(D+"/../fonts/node_modules/@fontsource")
open(D+"/_run.html","w",encoding="utf-8").write(open(D+"/pasok.html",encoding="utf-8").read().replace("FONTDIR",FONT))
FPS=30
async def main(a,b_,step=1):
    async with async_playwright() as p:
        b=await p.chromium.launch(args=["--allow-file-access-from-files"])
        pg=await b.new_page(viewport={"width":1080,"height":1920})
        pg.on("pageerror",lambda e:print("ERR",e))
        await pg.goto("file://"+D+"/_run.html"); await pg.evaluate("window.ready")
        for i in range(a,b_,step):
            await pg.evaluate(f"render({i/FPS})"); await pg.screenshot(path=f"{D}/frames/f{i:04d}.png")
        await b.close()
if __name__=="__main__":
    a=int(sys.argv[1]);b_=int(sys.argv[2]);st=int(sys.argv[3]) if len(sys.argv)>3 else 1
    asyncio.run(main(a,b_,st))
