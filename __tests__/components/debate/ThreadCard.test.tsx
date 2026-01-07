import { render, screen } from '@testing-library/react';
import { ThreadCard } from '@/components/debate/ThreadCard';
import { Thread } from '@/hooks/useDebate';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('ThreadCard', () => {
  const mockThread: Thread = {
    id: '1',
    title: 'Test Topic',
    description: 'This is a test topic description',
    status: 'active',
    tags: ['test', 'example'],
    consensusLevel: 0.75,
    createdAt: new Date().toISOString(),
    author: 'Test User',
    supportCount: 25,
    counterCount: 10,
  };

  it('renders thread title', () => {
    render(<ThreadCard thread={mockThread} />);
    expect(screen.getByText('Test Topic')).toBeInTheDocument();
  });

  it('renders thread description', () => {
    render(<ThreadCard thread={mockThread} />);
    expect(screen.getByText('This is a test topic description')).toBeInTheDocument();
  });

  it('renders author name', () => {
    render(<ThreadCard thread={mockThread} />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('renders support and counter counts', () => {
    render(<ThreadCard thread={mockThread} />);
    expect(screen.getByText(/25.*Supported/i)).toBeInTheDocument();
    expect(screen.getByText(/10.*Countered/i)).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<ThreadCard thread={mockThread} />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('example')).toBeInTheDocument();
  });
});

