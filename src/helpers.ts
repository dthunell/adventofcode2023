import { readFileSync } from 'node:fs'

const loadFile = (fileName: string): string => {
  //return readFileSync(`${url.fileURLToPath(new URL('.', import.meta.url))}/../input/${fileName}`, 'utf-8')
  return readFileSync(`./input/${fileName}`, 'utf-8')
}

const descending = (a:number, b: number): number => b - a
const sum = (acc: number, current:number): number => acc + current


export {
  loadFile,
  sum,
  descending
}
