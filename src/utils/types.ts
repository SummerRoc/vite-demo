export interface ChunkMeta {
  start: number;
  end: number;
  index: number;
  hash: string;
  blob: Blob;
}

export interface WorkerMessage {
  file: File;
  start: number;
  end: number;
  CHUNK_SIZE: number;
}

export interface FileChunkItem {
  key: string;
  chunks: ChunkMeta[];
  fileName: string;
}
