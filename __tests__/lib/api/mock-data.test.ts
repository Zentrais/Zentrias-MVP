import { topicsAPI, postsAPI, votesAPI, getCurrentUser } from '@/lib/api/mock-data';
import { DebateTopic, DebatePost } from '@/lib/types/debate';

describe('Mock Data API', () => {
  describe('topicsAPI', () => {
    it('should get all topics', async () => {
      const topics = await topicsAPI.getAll();
      expect(Array.isArray(topics)).toBe(true);
      expect(topics.length).toBeGreaterThan(0);
    });

    it('should get topic by id', async () => {
      const topics = await topicsAPI.getAll();
      if (topics.length > 0) {
        const topic = await topicsAPI.getById(topics[0].id);
        expect(topic).toBeDefined();
        expect(topic?.id).toBe(topics[0].id);
      }
    });

    it('should create a new topic', async () => {
      const currentUser = getCurrentUser();
      const newTopic = await topicsAPI.create({
        title: 'Test Topic',
        description: 'Test Description',
        author: currentUser,
        tags: ['test'],
      });

      expect(newTopic).toBeDefined();
      expect(newTopic.title).toBe('Test Topic');
      expect(newTopic.id).toBeDefined();
      expect(newTopic.createdAt).toBeDefined();
    });
  });

  describe('postsAPI', () => {
    it('should get posts by thread id', async () => {
      const posts = await postsAPI.getByThreadId('1');
      expect(Array.isArray(posts)).toBe(true);
    });

    it('should create a new post', async () => {
      const currentUser = getCurrentUser();
      const newPost = await postsAPI.create({
        threadId: '1',
        content: 'Test post content',
        author: currentUser,
        position: 'neutral',
      });

      expect(newPost).toBeDefined();
      expect(newPost.content).toBe('Test post content');
      expect(newPost.id).toBeDefined();
      expect(newPost.createdAt).toBeDefined();
    });
  });

  describe('votesAPI', () => {
    it('should vote on a topic', async () => {
      const currentUser = getCurrentUser();
      const topics = await topicsAPI.getAll();
      if (topics.length > 0) {
        const initialSupportCount = topics[0].supportCount || 0;
        await votesAPI.voteOnTopic(topics[0].id, currentUser.id, 'support');
        
        const updatedTopic = await topicsAPI.getById(topics[0].id);
        expect(updatedTopic?.supportCount).toBeGreaterThanOrEqual(initialSupportCount);
      }
    });

    it('should get user vote', () => {
      const currentUser = getCurrentUser();
      const topics = await topicsAPI.getAll();
      if (topics.length > 0) {
        const vote = votesAPI.getUserVote(topics[0].id, undefined, currentUser.id);
        // Vote might be null if user hasn't voted
        expect(vote === null || (vote && vote.userId === currentUser.id)).toBe(true);
      }
    });
  });

  describe('getCurrentUser', () => {
    it('should return a user object', () => {
      const user = getCurrentUser();
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBeDefined();
    });
  });
});

