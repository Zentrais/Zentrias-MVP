import { renderHook, waitFor } from '@testing-library/react';
import { useDebate } from '@/hooks/useDebate';

// Mock the API
jest.mock('@/lib/api/mock-data', () => ({
  topicsAPI: {
    getAll: jest.fn(() => Promise.resolve([
      {
        id: '1',
        title: 'Test Topic',
        description: 'Test Description',
        createdAt: new Date().toISOString(),
        author: { id: '1', name: 'Test User' },
        tags: ['test'],
        supportCount: 10,
        counterCount: 5,
      },
    ])),
    getById: jest.fn((id) => Promise.resolve({
      id,
      title: 'Test Topic',
      description: 'Test Description',
      createdAt: new Date().toISOString(),
      author: { id: '1', name: 'Test User' },
      tags: ['test'],
      supportCount: 10,
      counterCount: 5,
    })),
    create: jest.fn((topic) => Promise.resolve({
      id: 'new-id',
      ...topic,
      createdAt: new Date().toISOString(),
      supportCount: 0,
      counterCount: 0,
    })),
  },
  postsAPI: {
    getByThreadId: jest.fn(() => Promise.resolve([])),
    create: jest.fn((post) => Promise.resolve({
      id: 'new-post-id',
      ...post,
      createdAt: new Date().toISOString(),
      supportCount: 0,
      counterCount: 0,
    })),
  },
  votesAPI: {
    voteOnTopic: jest.fn(() => Promise.resolve()),
    voteOnPost: jest.fn(() => Promise.resolve()),
    getUserVote: jest.fn(() => null),
  },
  getCurrentUser: jest.fn(() => ({ id: '1', name: 'Test User' })),
}));

// Mock WebSocket
jest.mock('@/lib/api/websocket-mock', () => ({
  useWebSocket: jest.fn(() => ({
    on: jest.fn(),
    off: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
  })),
}));

describe('useDebate', () => {
  it('should load threads', async () => {
    const { result } = renderHook(() => useDebate());

    expect(result.current.loading).toBe(false);
    
    await waitFor(async () => {
      await result.current.loadThreads();
    });

    await waitFor(() => {
      expect(result.current.threads.length).toBeGreaterThan(0);
    });
  });

  it('should load a single thread', async () => {
    const { result } = renderHook(() => useDebate());

    await waitFor(async () => {
      await result.current.loadThread('1');
    });

    await waitFor(() => {
      expect(result.current.activeThread).toBeDefined();
      expect(result.current.activeThread?.id).toBe('1');
    });
  });

  it('should create a topic', async () => {
    const { result } = renderHook(() => useDebate());

    await waitFor(async () => {
      const newTopic = await result.current.createTopic(
        'New Topic',
        'New Description',
        ['tag1', 'tag2']
      );
      expect(newTopic).toBeDefined();
      expect(newTopic.id).toBe('new-id');
    });
  });

  it('should create a post', async () => {
    const { result } = renderHook(() => useDebate());

    await waitFor(async () => {
      await result.current.loadThread('1');
    });

    await waitFor(async () => {
      const newPost = await result.current.createPost('1', 'Test post content', 'neutral');
      expect(newPost).toBeDefined();
      expect(newPost.content).toBe('Test post content');
    });
  });
});

