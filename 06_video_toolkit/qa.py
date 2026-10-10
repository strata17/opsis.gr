import asyncio,os,sys,json
D=os.path.dirname(os.path.abspath(__file__))
FONT="file://"+os.path.abspath(D+"/../fonts/node_modules/@fontsource")
html=sys.argv[1]; T=float(sys.argv[2])
open(D+"/_qa.html","w",encoding="utf-8").write(open(D+"/"+html,encoding="utf-8").read().replace("FONTDIR",FONT))
from playwright.async_api import async_playwright
async def go():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=["--allow-file-access-from-files"])
        pg=await b.new_page(viewport={"width":1080,"height":1920})
        pg.on("pageerror",lambda e:print("ERR",e))
        await pg.goto("file://"+D+"/_qa.html"); await pg.evaluate("window.ready")
        seen={}
        t=0.0
        while t<T:
            for it in await pg.evaluate(f"fitCheck({t})"):
                k=(it['txt'],it['issues'])
                if k not in seen: seen[k]=it
            t+=0.1
        for k,v in seen.items(): print(json.dumps(v,ensure_ascii=False))
        print("QA done, issues:",len(seen))
        await b.close()
asyncio.run(go())
