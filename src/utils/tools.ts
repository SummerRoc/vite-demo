import type { ChunkMeta, WorkerMessage } from './types';

export async function cutFile(file: File): Promise<ChunkMeta[]> {
  const CHUNK_SIZE = 2 * 1024 * 1024; // 每个分片大小
  const THREAD_COUNT = Math.min(navigator.hardwareConcurrency || 4, 8); // 限制最大线程数
  const chunkCount = Math.ceil(file.size / CHUNK_SIZE); // 计算分片数量
  const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT); // 每个线程处理的分片数量
  const result: ChunkMeta[][] = []; // 存储每个线程处理的结果
  let finishCount = 0; // 记录已完成的线程数量
  return new Promise((resolve, reject) => {
    for (let i = 0; i < THREAD_COUNT; i++) {
      const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
      const msg: WorkerMessage = {
        file,
        start: i * threadChunkCount, // 每个线程处理的起始分片索引
        end: Math.min((i + 1) * threadChunkCount, chunkCount), // 每个线程处理的结束分片索引
        CHUNK_SIZE,
      };
      worker.postMessage(msg);
      worker.onmessage = (e) => {
        worker.terminate(); // 终止当前线程
        result[i] = e.data as ChunkMeta[]; // 存储每个线程的处理结果
        finishCount++;
        if (finishCount === THREAD_COUNT) {
          resolve(result.flat()); // 所有线程都完成后，返回结果
        }
      };
      worker.onerror = (err) => {
        worker.terminate();
        reject(new Error(`Worker ${i} 出错：${err.message}`));
      };
    }
  });
}
