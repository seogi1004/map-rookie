import Queue from '../../../src/client/libs/task-manager/Queue';
import Node from '../../../src/client/libs/task-manager/Node';

describe('Queue', () => {
  test('clear', () => {
    const queue = new Queue<number>();
    (queue as any).count = 1;
    queue.clear();
    expect((queue as any).count).toBe(0);
    expect((queue as any).head.next).toBe((queue as any).tail);
    expect((queue as any).tail.prev).toBe((queue as any).head);
  });

  test('size', () => {
    const queue = new Queue<number>();
    expect(queue.size).toBe(0);
    (queue as any).count = 1;
    expect(queue.size).toBe(1);
  });

  test('enqueue', () => {
    const queue = new Queue<number>();
    const node = new Node();
    expect(queue.size).toBe(0);
    queue.enqueue(node);
    expect(queue.size).toBe(1);
    expect((queue as any).head.next).toBe(node);
  });

  test('dequeue', () => {
    const queue = new Queue<number>();
    const node = new Node();
    queue.enqueue(node);
    expect(queue.size).toBe(1);
    const dequeued = queue.dequeue();
    expect(queue.size).toBe(0);
    expect(dequeued).toBe(node);
  });

  test('enqueue and dequeue', () => {
    const queue = new Queue<number>();
    const node1 = new Node();
    const node2 = new Node();
    const node3 = new Node();
    expect(queue.size).toBe(0);
    queue.enqueue(node1);
    queue.enqueue(node2);
    queue.enqueue(node3);
    expect(queue.size).toBe(3);
    const dequeued1 = queue.dequeue();
    const dequeued2 = queue.dequeue();
    const dequeued3 = queue.dequeue();
    expect(queue.size).toBe(0);
    expect(dequeued1).toBe(node1);
    expect(dequeued2).toBe(node2);
    expect(dequeued3).toBe(node3);
  });

  test('remove', () => {
    const queue = new Queue<number>();
    const node1 = new Node();
    const node2 = new Node();
    expect(queue.size).toBe(0);
    queue.enqueue(node1);
    queue.enqueue(node2);
    expect(queue.size).toBe(2);
    queue.remove(node1);
    expect(queue.size).toBe(1);
    expect((queue as any).head.next).toBe(node2);
  });
});
