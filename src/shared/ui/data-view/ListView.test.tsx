import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ListView } from './ListView';

describe('ListView Component', () => {
  const mockData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];

  const renderItem = (item: (typeof mockData)[0]) => (
    <div key={item.id} data-testid='list-item'>
      {item.name}
    </div>
  );

  it('should render skeleton when loading', () => {
    render(
      <ListView
        data={[]}
        isLoading={true}
        renderItem={renderItem}
        skeleton={<div data-testid='skeleton'>Loading...</div>}
      />,
    );
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('should render empty state when data is empty', () => {
    render(
      <ListView
        data={[]}
        isLoading={false}
        renderItem={renderItem}
        emptyState={<div data-testid='empty'>No items</div>}
      />,
    );
    expect(screen.getByTestId('empty')).toBeInTheDocument();
  });

  it('should render data items', () => {
    render(<ListView data={mockData} isLoading={false} renderItem={renderItem} />);
    const items = screen.getAllByTestId('list-item');
    expect(items).toHaveLength(2);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('should apply custom className to container', () => {
    const { container } = render(
      <ListView
        data={mockData}
        isLoading={false}
        renderItem={renderItem}
        className='custom-list'
      />,
    );
    expect(container.firstChild).toHaveClass('custom-list');
  });
});
