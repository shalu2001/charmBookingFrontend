import * as React from 'react';
import Rating from '@mui/material/Rating';

interface StarRatingProps {
  name: string;
  value: number | null;
  onChange?: (event: React.ChangeEvent<unknown>, newValue: number | null) => void;
  readOnly?: boolean;
  disabled?: boolean;
  controlled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const StarRating: React.FC<StarRatingProps> = ({
  name,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  size = 'medium',
  controlled = true,
}) => {
  return (
    <Rating
      name={name}
      value={value}
      onChange={controlled ? onChange : undefined}
      readOnly={readOnly}
      disabled={disabled}
      size={size}
      precision={0.5}
    />
  );
};

export default StarRating;