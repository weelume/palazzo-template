import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { resolve, join } from 'node:path'
const exec=promisify(execFile),root=resolve(import.meta.dirname,'..'),output=join(root,'.work/packages')
if(process.platform!=='linux')throw new Error('请在本地 WSL Linux 文件系统打包')
await mkdir(output,{recursive:true})
await exec('corepack',['pnpm','pack','--pack-destination',output],{cwd:root,maxBuffer:1024*1024})
const pkg=JSON.parse(await readFile(join(root,'package.json'),'utf8')),archive=join(output,`${pkg.name}-${pkg.version}.tgz`)
const sourceCommit=(await exec('git',['rev-parse','HEAD'],{cwd:root})).stdout.trim()
const sourceDirty=(await exec('git',['status','--porcelain'],{cwd:root})).stdout.trim()!==''
if(sourceDirty)throw new Error('源码存在未提交修改，禁止交付快照')
const sha256=createHash('sha256').update(await readFile(archive)).digest('hex')
await writeFile(join(output,'bundle.json'),JSON.stringify({archive,sha256,sourceCommit,sourceDirty},null,2)+'\n')
console.log(JSON.stringify({archive,sha256,sourceCommit,sourceDirty}))
