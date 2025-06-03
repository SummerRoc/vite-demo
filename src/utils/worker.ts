import SparkMD5 from 'spark-md5';
import type { ChunkMeta, WorkerMessage } from './types';

onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { file, start, end, CHUNK_SIZE } = e.data;
  const chunkPromises: Promise<ChunkMeta>[] = [];
  for (let i = start; i < end; i++) {
    chunkPromises.push(createChunk(file, i, CHUNK_SIZE));
  }
  const chunks = await Promise.all(chunkPromises);
  postMessage(chunks);
};

function createChunk(file: File, index: number, chunkSize: number): Promise<ChunkMeta> {
  return new Promise((resolve, reject) => {
    const start = index * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    const blob = file.slice(start, end);
    fileReader.onload = (e) => {
      const result = e.target?.result;
      if (result instanceof ArrayBuffer) {
        spark.append(result);
        resolve({
          start,
          end,
          index,
          hash: spark.end(),
          blob,
        });
      } else {
        reject(new Error('读取文件失败：result 不是 ArrayBuffer'));
      }
    };
    fileReader.onerror = () => {
      reject(new Error('读取文件失败'));
    };
    fileReader.readAsArrayBuffer(blob);
  });
}
