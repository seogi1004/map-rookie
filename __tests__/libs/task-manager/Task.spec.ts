import Task from '../../../src/client/libs/task-manager/Task';
import {
  TaskPriority,
  TaskStatus
} from '../../../src/client/libs/task-manager/enum';
import { wait } from '../../__utils__/common';

const UUID_REGEX = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/;

const MOCK_EXPECTED = 123;

describe('Task', () => {
  test('new', () => {
    const task = new Task(
      TaskPriority.CRITICAL,
      () => {},
    );
    expect(task.status).toBe(TaskStatus.NORMAL);
    expect(task.priority).toBe(TaskPriority.CRITICAL);
    expect(UUID_REGEX.test(task.uuid)).toBeTruthy();
  });

  test('process with sync', (done) => {
    const mockCallback = jest.fn(_ => MOCK_EXPECTED);
    const task = new Task(
      TaskPriority.CRITICAL,
      mockCallback,
      MOCK_EXPECTED,
    );
    task.on('done', (r) => {
      expect(task.status).toBe(TaskStatus.DONE);
      expect(r).toBe(MOCK_EXPECTED);
      expect(mockCallback.mock.calls.length).toBe(1);
      expect(mockCallback.mock.calls[0][0]).toBe(MOCK_EXPECTED);
      done();
    });
    task.process();
  });

  test('process with async', (done) => {
    const mockCallback = jest.fn(_ => wait(() => MOCK_EXPECTED));
    const task = new Task(
      TaskPriority.CRITICAL,
      mockCallback,
      MOCK_EXPECTED,
    );
    task.on('done', (r) => {
      expect(task.status).toBe(TaskStatus.DONE);
      expect(r).toBe(MOCK_EXPECTED);
      expect(mockCallback.mock.calls.length).toBe(1);
      expect(mockCallback.mock.calls[0][0]).toBe(MOCK_EXPECTED);
      done();
    });
    task.process();
  });

  test('process with error', (done) => {
    const mockCallback = jest.fn(_ => {
      throw MOCK_EXPECTED;
    });
    const task = new Task(
      TaskPriority.CRITICAL,
      mockCallback,
      MOCK_EXPECTED,
    );
    task.on('error', (r) => {
      expect(task.status).toBe(TaskStatus.ERROR);
      expect(r).toBe(MOCK_EXPECTED);
      expect(mockCallback.mock.calls.length).toBe(1);
      expect(mockCallback.mock.calls[0][0]).toBe(MOCK_EXPECTED);
      done();
    });
    task.process();
  });

  test('process with abort', (done) => {
    const mockCallback = jest.fn(_ => MOCK_EXPECTED);
    const task = new Task(
      TaskPriority.CRITICAL,
      mockCallback,
      MOCK_EXPECTED,
    );
    task.on('abort', () => {
      task.process();
      expect(task.status).toBe(TaskStatus.ABORT);
      expect(mockCallback.mock.calls.length).toBe(0);
      done();
    });
    task.abort();
  });
});
