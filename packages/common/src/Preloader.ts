import { IFile, manifestFileName } from './constant'
import { fetchFiles, getPreloadFilesFromFlag, initAllPreloadFiles } from './utils'

interface IOption{
  publicPath: string
  filename?: string
}


export default class Preloader {
  flag: string
  publicPath?: string
  filename: string
  option: {
    publicPath: string
    filename: string
  }
  files: IFile[]

  constructor(option?: IOption){
    this.publicPath = option?.publicPath || ''
    this.filename = option?.filename || manifestFileName
    this.option = {
      publicPath: this.publicPath,
      filename: this.filename
    }

    initAllPreloadFiles({
      publicPath: this.publicPath,
      filename: this.filename
    })
  }

  run(flag: string){
    getPreloadFilesFromFlag(flag, this.option).then(res=>{
      fetchFiles(res)
    })
  }
}