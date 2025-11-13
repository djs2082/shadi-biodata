import { CSSProperties } from 'react';

interface StyleTags {
  h1: CSSProperties;
  paragraph: CSSProperties;
}

const Tags: StyleTags = {
  h1: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  paragraph: {
    fontSize: '18px',
    fontWeight: '300',
    lineHeight: 1.6,
    marginBottom: '5px',
  },
};

export default Tags;
