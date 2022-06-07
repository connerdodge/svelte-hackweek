import Counter from './Counter.svelte';
import { render, fireEvent } from '@testing-library/svelte';

describe('Counter', () => {
  it('increments', async () => {
    const { getByTestId } = render(Counter);
  
    const increment = getByTestId('increment-btn');
    const counter = getByTestId('counter');
  
    await fireEvent.click(increment);
    await fireEvent.click(increment);
  
    // with jest-dom
    expect(counter).toHaveTextContent('2');
  });

  it('decrements', async () => {
    const { getByTestId } = render(Counter);
  
    const increment = getByTestId('increment-btn');
    const decrement = getByTestId('decrement-btn');
    const counter = getByTestId('counter');
  
    await fireEvent.click(increment);
    await fireEvent.click(decrement);
    await fireEvent.click(decrement);
  
    // with jest-dom
    expect(counter).toHaveTextContent('-1');
  });
})
