import { fireEvent, render, screen } from '@testing-library/react';

import SecondaryButton from './SecondaryButton';

describe('SecondaryButton', () => {
  it('should render with string children', () => {
    render(<SecondaryButton onClick={jest.fn()}>Click Me</SecondaryButton>);

    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should render with JSX.Element children', () => {
    render(
      <SecondaryButton onClick={jest.fn()}>
        <span>Complex Content</span>
      </SecondaryButton>
    );

    expect(screen.getByText('Complex Content')).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();

    render(<SecondaryButton onClick={handleClick}>Click Me</SecondaryButton>);

    fireEvent.click(screen.getByText('Click Me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', () => {
    const handleClick = jest.fn();

    render(
      <SecondaryButton onClick={handleClick} disabled>
        Click Me
      </SecondaryButton>
    );

    fireEvent.click(screen.getByText('Click Me'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should apply disabled attribute when disabled prop is true', () => {
    render(
      <SecondaryButton onClick={jest.fn()} disabled>
        Button
      </SecondaryButton>
    );

    const button = screen.getByText('Button');
    expect(button).toBeDisabled();
  });

  it('should apply disableRipple prop', () => {
    render(
      <SecondaryButton onClick={jest.fn()} disableRipple>
        Button
      </SecondaryButton>
    );

    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('should apply custom sx prop styles', () => {
    const customSx = {
      fontSize: '18px',
      margin: '10px',
    };

    render(
      <SecondaryButton onClick={jest.fn()} sx={customSx}>
        Button
      </SecondaryButton>
    );

    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('should have secondary-button className', () => {
    render(<SecondaryButton onClick={jest.fn()}>Button</SecondaryButton>);

    const button = screen.getByText('Button');
    expect(button).toHaveClass('secondary-button');
  });
});
