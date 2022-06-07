import Counter from './Counter.svelte';
import { render, fireEvent } from '@testing-library/svelte';

it('it works', async () => {
  const { getByTestId } = render(Counter);

  const increment = getByTestId('increment-btn');
  const counter = getByTestId('counter');

  await fireEvent.click(increment);
  await fireEvent.click(increment);

  // with jest-dom
  expect(counter).toHaveTextContent('2');
});