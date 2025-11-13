import { fireEvent, render, screen } from '@testing-library/react';

import PrimaryButton from './PrimaryButton';

describe('PrimaryButton', () => {
  it('should render with children text', () => {
    render(<PrimaryButton onClick={jest.fn()}>Click Me</PrimaryButton>);

    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();

    render(<PrimaryButton onClick={handleClick}>Click Me</PrimaryButton>);

    fireEvent.click(screen.getByText('Click Me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', () => {
    const handleClick = jest.fn();

    render(
      <PrimaryButton onClick={handleClick} disabled>
        Click Me
      </PrimaryButton>
    );

    fireEvent.click(screen.getByText('Click Me'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    render(
      <PrimaryButton onClick={jest.fn()} className="custom-class">
        Button
      </PrimaryButton>
    );

    const button = screen.getByText('Button');
    expect(button).toHaveClass('primary-button');
    expect(button).toHaveClass('custom-class');
  });

  it('should apply disabled attribute when disabled prop is true', () => {
    render(
      <PrimaryButton onClick={jest.fn()} disabled>
        Button
      </PrimaryButton>
    );

    const button = screen.getByText('Button');
    expect(button).toBeDisabled();
  });

  it('should apply disableRipple prop', () => {
    render(
      <PrimaryButton onClick={jest.fn()} disableRipple>
        Button
      </PrimaryButton>
    );

    // Button should render without errors
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('should apply custom sx prop styles', () => {
    const customSx = {
      fontSize: '20px',
      padding: '16px',
    };

    render(
      <PrimaryButton onClick={jest.fn()} sx={customSx}>
        Button
      </PrimaryButton>
    );

    expect(screen.getByText('Button')).toBeInTheDocument();
  });
});
