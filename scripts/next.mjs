import {createRequire} from 'node:module'
import {spawn} from 'node:child_process'
import {readFile} from 'node:fs/promises'
const command=process.argv[2]
if(!['dev','build','start'].includes(command))throw new Error('使用 dev、build 或 start')
const project=JSON.parse(await readFile(new URL('../.tpl/project.json',import.meta.url),'utf8'))
const port=process.env.PORT??String(project.services.web.port.default)
if(!/^\d+$/.test(port)||Number(port)<1||Number(port)>65535)throw new Error('PORT 必须是 1 到 65535 的整数')
const require=createRequire(import.meta.url)
const child=spawn(process.execPath,[require.resolve('next/dist/bin/next'),command,...(command==='build'?[]:['--port',port]),...process.argv.slice(3)],{stdio:'inherit',env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'},windowsHide:true})
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal))
child.on('close',code=>{process.exitCode=code??1})
child.on('error',error=>{console.error(error);process.exitCode=1})
